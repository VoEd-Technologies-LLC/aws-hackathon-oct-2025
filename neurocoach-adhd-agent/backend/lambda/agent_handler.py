"""
NeuroCoach AgentCore Orchestration Handler

This Lambda function orchestrates the NeuroCoach AI agent workflow,
integrating ASRS screening, coaching, subtype detection, resource
recommendation, and therapy preparation.
"""

import json
import boto3
import logging
import uuid
from datetime import datetime
from typing import Dict, List, Optional
from decimal import Decimal

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
bedrock_runtime = boto3.client('bedrock-runtime')
dynamodb = boto3.resource('dynamodb')
s3 = boto3.client('s3')

# Import ASRS scoring function
from asrs_scoring import score_asrs

def lambda_handler(event, context):
    """
    Main Lambda handler for NeuroCoach agent orchestration

    Expected event format:
    {
        "body": {
            "user_id": "string",
            "session_id": "string (optional)",
            "action": "screening|coaching|resources",
            "data": {
                "asrs_responses": {...} (for screening),
                "message": "user message" (for coaching),
                "context": "challenge area" (optional)
            }
        }
    }
    """

    try:
        # Parse request body
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event['body']

        user_id = body.get('user_id')
        session_id = body.get('session_id', str(uuid.uuid4()))
        action = body.get('action', 'coaching')
        data = body.get('data', {})

        logger.info(f"Processing NeuroCoach request - User: {user_id}, Session: {session_id}, Action: {action}")

        # Route to appropriate handler based on action
        if action == 'screening':
            response = handle_screening(user_id, session_id, data)
        elif action == 'coaching':
            response = handle_coaching(user_id, session_id, data)
        else:
            response = {
                'error': f'Unsupported action: {action}',
                'session_id': session_id
            }

        # Store session data
        store_session_data(user_id, session_id, action, data, response)

        return {
            'statusCode': 200,
            'body': json.dumps(response),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    except Exception as e:
        logger.error(f"Error in agent handler: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

def handle_screening(user_id: str, session_id: str, data: Dict) -> Dict:
    """
    Handle ASRS screening requests

    Args:
        user_id: User identifier
        session_id: Session identifier
        data: Request data containing ASRS responses

    Returns:
        Dictionary with screening results and interpretation
    """

    asrs_responses = data.get('asrs_responses', {})

    if not asrs_responses:
        return {
            'error': 'ASRS responses are required for screening',
            'session_id': session_id
        }

    # Score the ASRS questionnaire
    scoring_results = score_asrs(asrs_responses)

    # Generate AI-powered interpretation using Bedrock
    ai_interpretation = generate_ai_interpretation(scoring_results)

    # Get relevant resources
    resources = get_relevant_resources(scoring_results['subtype'])

    response = {
        'session_id': session_id,
        'action': 'screening',
        'scoring_results': scoring_results,
        'ai_interpretation': ai_interpretation,
        'resources': resources,
        'next_steps': [
            'Review your results with a healthcare professional',
            'Consider starting a coaching session for personalized strategies',
            'Explore the recommended resources for your ADHD subtype'
        ]
    }

    return response

def handle_coaching(user_id: str, session_id: str, data: Dict) -> Dict:
    """
    Handle coaching requests with AI-powered responses

    Args:
        user_id: User identifier
        session_id: Session identifier
        data: Request data containing user message and context

    Returns:
        Dictionary with AI coaching response and recommendations
    """

    user_message = data.get('message', '')
    context = data.get('context', {})
    challenge_area = data.get('challenge_area', '')

    if not user_message:
        return {
            'error': 'User message is required for coaching',
            'session_id': session_id
        }

    # Get user context from DynamoDB
    user_context = get_user_context(user_id)

    # Generate AI coaching response
    coaching_response = generate_coaching_response(
        user_message,
        user_context,
        challenge_area
    )

    # Generate therapy preparation prompts
    therapy_prompts = generate_therapy_prompts(
        user_context.get('subtype', 'Combined'),
        challenge_area
    )

    # Suggest coping strategies
    strategies = suggest_coping_strategies(
        user_context.get('subtype', 'Combined'),
        challenge_area
    )

    response = {
        'session_id': session_id,
        'action': 'coaching',
        'user_message': user_message,
        'coaching_response': coaching_response,
        'strategies': strategies,
        'therapy_prompts': therapy_prompts,
        'context': {
            'subtype': user_context.get('subtype'),
            'challenge_area': challenge_area
        }
    }

    return response

def generate_ai_interpretation(scoring_results: Dict) -> str:
    """
    Generate AI-powered interpretation of ASRS results using Bedrock

    Args:
        scoring_results: Dictionary containing ASRS scoring results

    Returns:
        String with AI-generated interpretation
    """

    prompt = f"""
    You are NeuroCoach, an AI-powered ADHD self-coaching assistant. Based on the following ASRS v1.1 screening results, provide a clear, empathetic, and educational interpretation:

    Screening Results:
    - Part A Score: {scoring_results['part_a_likert_sum']}/24
    - Screening Positive (≥14): {scoring_results['part_a_screen_positive_likert']}
    - ADHD Subtype: {scoring_results['subtype']}
    - Part B Score: {scoring_results['part_b_likert_sum']}/48

    Please provide:
    1. A clear explanation of what these results mean
    2. An overview of the identified ADHD subtype
    3. Encouraging, educational language
    4. Emphasis that this is not a clinical diagnosis
    5. Suggestion to consult healthcare professionals

    Keep the response conversational, supportive, and informative.
    """

    try:
        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229',
            contentType='application/json',
            accept='application/json',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 1000,
                'temperature': 0.7,
                'messages': [
                    {
                        'role': 'user',
                        'content': prompt
                    }
                ]
            })
        )

        result = json.loads(response['body'].read())
        return result['content'][0]['text']

    except Exception as e:
        logger.error(f"Error generating AI interpretation: {str(e)}")
        return generate_fallback_interpretation(scoring_results)

def generate_fallback_interpretation(scoring_results: Dict) -> str:
    """
    Generate fallback interpretation when AI service is unavailable

    Args:
        scoring_results: Dictionary containing ASRS scoring results

    Returns:
        String with rule-based interpretation
    """

    score = scoring_results['part_a_likert_sum']
    subtype = scoring_results['subtype']
    is_positive = scoring_results['part_a_screen_positive_likert']

    if is_positive:
        interpretation = f"Your Part A score of {score} is at or above the screening threshold of 14, suggesting characteristics that may warrant further ADHD evaluation. "
    else:
        interpretation = f"Your Part A score of {score} is below the screening threshold of 14. "

    interpretation += f"Based on your response pattern, your ADHD presentation appears to be {subtype.lower()}. "

    if is_positive:
        interpretation += "This screening suggests you may benefit from discussing these results with a qualified healthcare professional for proper evaluation."
    else:
        interpretation += "However, if you're experiencing significant challenges with attention, organization, or hyperactivity, consider discussing your concerns with a healthcare provider."

    return interpretation

def generate_coaching_response(user_message: str, user_context: Dict, challenge_area: str) -> str:
    """
    Generate AI-powered coaching response using Bedrock

    Args:
        user_message: User's question or challenge
        user_context: User's historical context and subtype
        challenge_area: Specific area of challenge

    Returns:
        String with AI coaching response
    """

    subtype = user_context.get('subtype', 'Combined')

    prompt = f"""
    You are NeuroCoach, an AI-powered ADHD self-coaching assistant. You provide supportive, practical guidance for individuals with ADHD characteristics.

    User Context:
    - ADHD Subtype: {subtype}
    - Challenge Area: {challenge_area}
    - Previous Interactions: {len(user_context.get('session_history', []))} sessions

    User Question: "{user_message}"

    Please provide:
    1. Empathetic acknowledgment of their challenge
    2. 2-3 specific, actionable strategies tailored to their ADHD subtype
    3. Explanation of why these strategies work for their subtype
    4. Follow-up questions to better understand their situation
    5. 2-3 specific talking points for therapy sessions

    Keep your response supportive, practical, and encouraging. Focus on strengths and capabilities.
    """

    try:
        response = bedrock_runtime.invoke_model(
            modelId='anthropic.claude-3-sonnet-20240229',
            contentType='application/json',
            accept='application/json',
            body=json.dumps({
                'anthropic_version': 'bedrock-2023-05-31',
                'max_tokens': 1500,
                'temperature': 0.7,
                'messages': [
                    {
                        'role': 'user',
                        'content': prompt
                    }
                ]
            })
        )

        result = json.loads(response['body'].read())
        return result['content'][0]['text']

    except Exception as e:
        logger.error(f"Error generating coaching response: {str(e)}")
        return generate_fallback_coaching_response(user_message, subtype, challenge_area)

def generate_fallback_coaching_response(user_message: str, subtype: str, challenge_area: str) -> str:
    """
    Generate fallback coaching response when AI service is unavailable

    Args:
        user_message: User's question or challenge
        subtype: ADHD subtype
        challenge_area: Specific area of challenge

    Returns:
        String with rule-based coaching response
    """

    responses = {
        'Inattentive': {
            'default': f"I understand that {user_message.lower()} can be challenging with inattentive ADHD. Here are some strategies that often help: 1) Use visual reminders and timers to maintain focus, 2) Break tasks into smaller, manageable steps, 3) Create a structured environment with designated workspaces. These approaches work well because they provide external structure to compensate for internal challenges with attention and organization.",
            'work': "For work challenges with inattentive ADHD, try: 1) Use the Pomodoro technique with 25-minute focused work periods, 2) Set up a dedicated workspace with minimal distractions, 3) Use project management tools with visual progress tracking. Consider discussing workplace accommodations with your employer."
        },
        'Hyperactive-Impulsive': {
            'default': f"I hear that {user_message.lower()} is difficult with hyperactive-impulsive ADHD. Consider: 1) Incorporating movement breaks during focused activities, 2) Using fidget tools or standing desks, 3) Practicing mindfulness techniques for impulse control. These strategies help by channeling excess energy productively and improving self-regulation.",
            'work': "For work challenges with hyperactive-impulsive ADHD, try: 1) Taking short movement breaks every 30-45 minutes, 2) Using stress balls or fidget tools during meetings, 3) Scheduling active tasks during your peak energy times. Consider discussing flexible work arrangements with your employer."
        },
        'Combined': {
            'default': f"I understand that {user_message.lower()} is challenging with combined ADHD. A balanced approach often works best: 1) Structure your environment and routine, 2) Incorporate movement breaks, 3) Use both organizational tools and impulse management techniques. This addresses both the attention and hyperactivity aspects of your ADHD.",
            'work': "For work challenges with combined ADHD, combine strategies: 1) Create a structured daily routine with built-in movement breaks, 2) Use organizational tools for task management, 3) Practice mindfulness for impulse control. Consider discussing comprehensive workplace accommodations."
        }
    }

    return responses.get(subtype, responses['Combined']).get(challenge_area, responses[subtype]['default'])

def suggest_coping_strategies(subtype: str, challenge_area: str) -> List[str]:
    """
    Suggest coping strategies based on subtype and challenge area

    Args:
        subtype: ADHD subtype
        challenge_area: Specific area of challenge

    Returns:
        List of coping strategy strings
    """

    strategies = {
        'Inattentive': [
            'Use external cues and timers to support task initiation',
            'Break large tasks into smaller, visible steps with checklists',
            'Set up a structured environment with designated spaces for different activities',
            'Use calendar apps and reminder systems for appointments and deadlines',
            'Practice the "two-minute rule" - if something takes less than 2 minutes, do it immediately'
        ],
        'Hyperactive-Impulsive': [
            'Incorporate short movement breaks during focused work periods',
            'Practice mindfulness techniques to improve impulse control',
            'Use fidget tools or standing desks to manage restlessness',
            'Create routines that channel excess energy productively',
            'Use the "pause and plan" technique before making decisions'
        ],
        'Combined': [
            'Combine structured routines with built-in movement breaks',
            'Use both organizational tools and impulse management techniques',
            'Practice body doubling - work alongside someone else',
            'Implement both visual progress tracking and energy management',
            'Create a balanced schedule that accounts for both attention and energy needs'
        ]
    }

    base_strategies = strategies.get(subtype, strategies['Combined'])

    # Add challenge-specific strategies
    if challenge_area == 'work':
        base_strategies.extend([
            'Consider discussing workplace accommodations with HR',
            'Use noise-cancelling headphones for better focus',
            'Schedule important tasks during your peak energy times'
        ])
    elif challenge_area == 'relationships':
        base_strategies.extend([
            'Practice active listening techniques',
            'Use reminder systems for important dates and commitments',
            'Communicate your needs and challenges openly with loved ones'
        ])

    return base_strategies[:5]  # Return top 5 strategies

def generate_therapy_prompts(subtype: str, challenge_area: str = None) -> List[str]:
    """
    Generate talking points for therapy sessions

    Args:
        subtype: ADHD subtype
        challenge_area: Specific area of challenge

    Returns:
        List of therapy talking points
    """

    base_prompts = [
        'How can we develop strategies for managing executive functioning challenges?',
        'What coping techniques would be most effective for my ADHD subtype?',
        'How can I improve my self-awareness around ADHD symptoms and patterns?'
    ]

    subtype_prompts = {
        'Inattentive': [
            'What strategies can help with task initiation and completion?',
            'How can I improve my organizational skills and time management?',
            'What tools or systems might help with maintaining focus on important tasks?'
        ],
        'Hyperactive-Impulsive': [
            'How can I better manage impulsive behaviors and decisions?',
            'What techniques can help with emotional regulation?',
            'How can I channel excess energy in positive ways?'
        ],
        'Combined': [
            'How can we address both attention and hyperactivity challenges?',
            'What comprehensive strategies work best for combined presentation?',
            'How can I balance structure with flexibility in my daily life?'
        ]
    }

    challenge_prompts = {
        'work': [
            'What workplace accommodations might be helpful for my ADHD?',
            'How can I discuss my ADHD needs with my employer?',
            'What strategies can improve my job performance and satisfaction?'
        ],
        'relationships': [
            'How does ADHD affect my relationships and communication?',
            'What strategies can improve my relationships despite ADHD challenges?',
            'How can I communicate my needs effectively to my partner/family?'
        ]
    }

    all_prompts = base_prompts + subtype_prompts.get(subtype, [])
    if challenge_area and challenge_area in challenge_prompts:
        all_prompts.extend(challenge_prompts[challenge_area])

    return all_prompts[:6]  # Return top 6 prompts

def get_relevant_resources(subtype: str) -> List[Dict]:
    """
    Get relevant resources based on ADHD subtype

    Args:
        subtype: ADHD subtype

    Returns:
        List of resource dictionaries
    """

    resources = {
        'Inattentive': [
            {
                'title': 'CHADD - Inattentive ADHD Resources',
                'description': 'Resources specifically for inattentive ADHD presentation',
                'url': 'https://chadd.org/for-adults/inattentive-adhd/',
                'type': 'website'
            },
            {
                'title': 'ADDitude Magazine - Focus & Attention',
                'description': 'Articles and strategies for improving focus and attention',
                'url': 'https://www.additudemag.com/category/adhd-treatment/focus-concentration/',
                'type': 'website'
            }
        ],
        'Hyperactive-Impulsive': [
            {
                'title': 'CHADD - Hyperactive-Impulsive ADHD',
                'description': 'Resources for hyperactive-impulsive ADHD presentation',
                'url': 'https://chadd.org/for-adults/hyperactive-impulsive-adhd/',
                'type': 'website'
            },
            {
                'title': 'ADDitude Magazine - Hyperactivity & Impulsivity',
                'description': 'Strategies for managing hyperactivity and impulsivity',
                'url': 'https://www.additudemag.com/category/adhd-treatment/hyperactivity-impulsivity/',
                'type': 'website'
            }
        ],
        'Combined': [
            {
                'title': 'CHADD - Combined ADHD Resources',
                'description': 'Comprehensive resources for combined ADHD presentation',
                'url': 'https://chadd.org/for-adults/combined-adhd/',
                'type': 'website'
            },
            {
                'title': 'ADDitude Magazine - Combined Type ADHD',
                'description': 'Strategies for managing both inattention and hyperactivity',
                'url': 'https://www.additudemag.com/category/adhd-treatment/combined-type/',
                'type': 'website'
            }
        ]
    }

    return resources.get(subtype, resources['Combined'])

def get_user_context(user_id: str) -> Dict:
    """
    Retrieve user context from DynamoDB

    Args:
        user_id: User identifier

    Returns:
        Dictionary containing user context
    """

    try:
        table = dynamodb.Table('UserProfiles')
        response = table.get_item(Key={'user_id': user_id})

        if 'Item' in response:
            return response['Item'].get('context', {})
        else:
            return {}

    except Exception as e:
        logger.error(f"Error retrieving user context: {str(e)}")
        return {}

def store_session_data(user_id: str, session_id: str, action: str, request_data: Dict, response_data: Dict):
    """
    Store session data in DynamoDB

    Args:
        user_id: User identifier
        session_id: Session identifier
        action: Action performed
        request_data: Request data
        response_data: Response data
    """

    try:
        table = dynamodb.Table('ChatSessions')

        session_record = {
            'session_id': session_id,
            'user_id': user_id,
            'timestamp': datetime.utcnow().isoformat(),
            'action': action,
            'request_data': request_data,
            'response_data': response_data,
            'ttl': int(datetime.utcnow().timestamp()) + (90 * 24 * 60 * 60)  # 90 day TTL
        }

        table.put_item(Item=session_record)

    except Exception as e:
        logger.error(f"Error storing session data: {str(e)}")

# Example usage for testing
if __name__ == "__main__":
    # Test screening request
    test_event = {
        'body': {
            'user_id': 'test-user-123',
            'action': 'screening',
            'data': {
                'asrs_responses': {
                    1: 3, 2: 2, 3: 4, 4: 2, 5: 3, 6: 4,
                    7: 2, 8: 2, 9: 1, 10: 3, 11: 3, 12: 4,
                    13: 3, 14: 1, 15: 2, 16: 2, 17: 3, 18: 1
                }
            }
        }
    }

    # Test coaching request
    test_coaching_event = {
        'body': {
            'user_id': 'test-user-123',
            'action': 'coaching',
            'data': {
                'message': 'I keep missing deadlines at work',
                'challenge_area': 'work'
            }
        }
    }

    print("Testing NeuroCoach Agent Handler...")
    print("Screening test and coaching test would run here in AWS Lambda environment")
