"""
ASRS Scoring Lambda Function for NeuroCoach

This function processes ASRS v1.1 questionnaire responses,
calculates scores, determines ADHD subtype, and provides
interpretation and recommendations.

Based on official ASRS v1.1 documentation and recent scoring updates.
"""

import json
import boto3
import logging
from datetime import datetime
from decimal import Decimal
from typing import Dict, List

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize AWS clients
dynamodb = boto3.resource('dynamodb')

# Define which questions are Part A & Part B
PART_A_QS = list(range(1, 7))    # items 1-6
PART_B_QS = list(range(7, 19))   # items 7-18

def score_asrs(responses: Dict[int, int]) -> Dict:
    """
    Score ASRS v1.1 questionnaire responses using both dichotomous and Likert methods

    Args:
        responses: dict mapping question_number (1-18) to Likert response 0-4

    Returns:
        Dictionary containing:
        - part_a_likert_sum: Sum of Part A responses (0-24)
        - part_a_screen_positive_likert: Boolean indicating if score >= 14
        - part_a_dichotomous_shaded_count: Count of "shaded" responses (3 or 4)
        - part_a_screen_positive_dichotomous: Boolean indicating if shaded count >= 4
        - part_b_likert_sum: Sum of Part B responses
        - total_score_likert: Total ASRS score (Part A + Part B)
        - subtype: Determined ADHD subtype
        - interpretation: Clinical interpretation of results
        - recommendations: Personalized recommendations
    """

    # Validate inputs
    for q in range(1, 19):
        if q not in responses:
            raise ValueError(f"Missing response for question {q}")
        if responses[q] not in [0, 1, 2, 3, 4]:
            raise ValueError(f"Invalid response {responses[q]} for question {q}; must be 0-4 Likert")

    # Part A Likert sum (updated scoring method)
    part_a_sum = sum(responses[q] for q in PART_A_QS)
    part_a_positive_likert = (part_a_sum >= 14)

    # Dichotomous shaded-box count (original method for Part A)
    # Treat responses "Often" or "Very Often" (3 or 4) as "shaded"
    shaded_threshold = 3
    part_a_shaded_count = sum(1 for q in PART_A_QS if responses[q] >= shaded_threshold)
    part_a_positive_dichotomous = (part_a_shaded_count >= 4)

    # Part B sum
    part_b_sum = sum(responses[q] for q in PART_B_QS)

    total_sum = part_a_sum + part_b_sum

    # Determine subtype
    subtype = determine_subtype(responses)

    # Generate interpretation and recommendations
    interpretation = generate_interpretation(part_a_sum, part_a_positive_likert, subtype)
    recommendations = generate_recommendations(subtype, part_a_sum)

    result = {
        "part_a_likert_sum": part_a_sum,
        "part_a_screen_positive_likert": part_a_positive_likert,
        "part_a_shaded_count_dichotomous": part_a_shaded_count,
        "part_a_screen_positive_dichotomous": part_a_positive_dichotomous,
        "part_b_likert_sum": part_b_sum,
        "total_score_likert": total_sum,
        "subtype": subtype,
        "interpretation": interpretation,
        "recommendations": recommendations
    }

    return result

def determine_subtype(responses: Dict[int, int]) -> str:
    """
    Determine ADHD subtype based on ASRS responses

    Args:
        responses: Dictionary of question responses

    Returns:
        String indicating the likely ADHD subtype
    """

    # Inattention items (Part A: 1-4, Part B: 7,8,9,10,11,12,17,18)
    inattention_items = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 17, 18]
    inattention_score = sum(responses.get(q, 0) for q in inattention_items)

    # Hyperactivity items (Part A: 5-6, Part B: 13,14,15,16)
    hyperactivity_items = [5, 6, 13, 14, 15, 16]
    hyperactivity_score = sum(responses.get(q, 0) for q in hyperactivity_items)

    # Determine subtype based on relative scores
    if inattention_score > hyperactivity_score * 1.2:
        return "Inattentive"
    elif hyperactivity_score > inattention_score * 1.2:
        return "Hyperactive-Impulsive"
    else:
        return "Combined"

def generate_interpretation(part_a_score: int, is_positive: bool, subtype: str) -> str:
    """
    Generate clinical interpretation of ASRS results

    Args:
        part_a_score: Part A Likert sum score
        is_positive: Whether screening is positive (>= 14)
        subtype: Determined ADHD subtype

    Returns:
        String interpretation of results
    """

    # Always include medical disclaimer
    disclaimer = " **IMPORTANT MEDICAL DISCLAIMER:** This is not a clinical diagnosis. This screening tool provides educational information only and is not a substitute for professional medical evaluation. Please consult with a qualified healthcare provider for proper ADHD assessment and diagnosis."

    if is_positive:
        interpretation = f"Your Part A score of {part_a_score} is at or above the screening threshold of 14, suggesting characteristics that warrant further ADHD evaluation. "
    else:
        interpretation = f"Your Part A score of {part_a_score} is below the screening threshold of 14 and is not typically associated with clinically significant ADHD characteristics. "

    interpretation += f"Based on your response pattern, your ADHD presentation appears to be {subtype.lower()}. "

    if is_positive:
        interpretation += "This screening suggests you may benefit from a comprehensive ADHD evaluation by a qualified healthcare professional."
    else:
        interpretation += "However, if you're experiencing significant challenges with attention, organization, or hyperactivity that interfere with your daily life, you should still discuss your concerns with a healthcare provider, as ADHD symptoms can vary widely between individuals."

    interpretation += disclaimer
    return interpretation

def generate_recommendations(subtype: str, part_a_score: int) -> List[str]:
    """
    Generate personalized recommendations based on subtype and severity

    Args:
        subtype: ADHD subtype
        part_a_score: Part A score for severity assessment

    Returns:
        List of personalized recommendations
    """

    # Always include medical disclaimer
    base_recommendations = [
        "**IMPORTANT MEDICAL DISCLAIMER:** This is not a clinical diagnosis. This screening tool provides educational information only and is not a substitute for professional medical evaluation. Please consult with a qualified healthcare provider for proper ADHD assessment and diagnosis.",
        "Consider discussing these results with a healthcare professional for proper evaluation",
        "Track your symptoms and challenges over time to identify patterns",
        "Explore general productivity and organizational tools that may be helpful"
    ]

    # Subtype-specific recommendations
    subtype_recommendations = {
        "Inattentive": [
            "Use external cues and timers to support task initiation and completion",
            "Break large tasks into smaller, manageable steps with visual progress tracking",
            "Set up a structured environment with designated spaces for different activities",
            "Use calendar apps and reminder systems for appointments and deadlines"
        ],
        "Hyperactive-Impulsive": [
            "Incorporate short movement breaks during focused work periods",
            "Practice mindfulness techniques to improve impulse control",
            "Use fidget tools or standing desks to manage restlessness",
            "Create routines that channel excess energy productively"
        ],
        "Combined": [
            "Combine strategies for both inattention and hyperactivity challenges",
            "Use a structured daily routine with built-in movement breaks",
            "Implement both organizational tools and impulse management techniques",
            "Consider body doubling or accountability partnerships for task completion"
        ]
    }

    # Score-based recommendations
    if part_a_score >= 18:
        base_recommendations.insert(1, "Your screening suggests significant ADHD characteristics - professional evaluation is strongly recommended")
    elif part_a_score >= 14:
        base_recommendations.insert(1, "Your screening suggests ADHD characteristics that warrant further evaluation by a healthcare professional")
    else:
        base_recommendations.insert(1, "Your screening score is below the threshold typically associated with ADHD, but if you're experiencing challenges, consult a healthcare provider")

    return base_recommendations + subtype_recommendations.get(subtype, [])

def lambda_handler(event, context):
    """
    Main Lambda handler for ASRS scoring

    Expected event format:
    {
        "body": {
            "user_id": "string",
            "responses": {
                "1": 0-4,
                "2": 0-4,
                ...
                "18": 0-4
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
        responses = body.get('responses', {})

        logger.info(f"Processing ASRS scoring for user: {user_id}")

        # Validate input
        if not user_id:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'user_id is required'})
            }

        if not responses:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'responses are required'})
            }

        # Score the ASRS questionnaire
        scoring_results = score_asrs(responses)

        # Store results in DynamoDB
        table_name = 'ASRSScreenings'
        table = dynamodb.Table(table_name)

        screening_record = {
            'user_id': user_id,
            'timestamp': datetime.utcnow().isoformat(),
            'responses': responses,
            'scoring_results': scoring_results,
            'ttl': int(datetime.utcnow().timestamp()) + (365 * 24 * 60 * 60)  # 1 year TTL
        }

        table.put_item(Item=screening_record)

        logger.info(f"Successfully scored ASRS for user: {user_id}")

        return {
            'statusCode': 200,
            'body': json.dumps(scoring_results),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    except Exception as e:
        logger.error(f"Error processing ASRS scoring: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({'error': 'Internal server error'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

# Example usage for testing
if __name__ == "__main__":
    # Mock responses for testing
    example_responses = {
        1: 3, 2: 2, 3: 4, 4: 2, 5: 3, 6: 4,
        7: 2, 8: 2, 9: 1, 10: 3, 11: 3, 12: 4,
        13: 3, 14: 1, 15: 2, 16: 2, 17: 3, 18: 1
    }

    scores = score_asrs(example_responses)
    print(json.dumps(scores, indent=2))
