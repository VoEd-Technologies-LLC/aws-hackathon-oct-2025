# 🏗️ NeuroCoach Master Architecture

## System Overview

**NeuroCoach** is an AWS-native AI-powered ADHD self-coaching agent that provides personalized screening, coaching, and therapy preparation support. The architecture leverages multiple AWS services to create a scalable, secure, and cost-effective solution optimized for the hackathon demonstration.

## Architecture Principles

### Design Philosophy
- **Serverless-First**: Maximize AWS managed services to reduce operational overhead
- **Event-Driven**: Asynchronous processing for better scalability and cost efficiency
- **Security-First**: Implement AWS security best practices from the ground up
- **Cost-Optimized**: Use appropriate service tiers and implement intelligent resource management
- **Resilient**: Design for failure with graceful degradation and error handling

### Key Architectural Patterns
- **Agent-Based Architecture**: AWS Bedrock AgentCore as the central orchestrator
- **Microservices**: Lambda functions for specific business logic components
- **Data Lake**: S3 for unstructured content, DynamoDB for structured data
- **API-First**: RESTful APIs through API Gateway for consistent interfaces
- **Observability**: Comprehensive logging and monitoring with CloudWatch

## System Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User Device   │───▶│  AWS Amplify     │───▶│  API Gateway    │
│  (Web/Mobile)   │    │  (Frontend)      │    │  (REST APIs)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    AWS Bedrock AgentCore                    │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              AI Agent Orchestration                     │  │
│  │  • ASRS Screening & Scoring                            │  │
│  │  • ADHD Subtype Classification                         │  │
│  │  • Personalized Coaching Logic                         │  │
│  │  • Therapy Preparation Prompts                         │  │
│  │  • Sentiment Analysis Integration                      │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   Service Integration Layer                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   AWS Lambda    │  │   AWS Lambda    │  │ AWS Lambda  │  │
│  │   Functions     │  │   Functions     │  │ Functions   │  │
│  │                 │  │                 │  │             │  │
│  │ • ASRS Scoring  │  │ • User Profile  │  │ • Resource  │  │
│  │ • Subtype       │  │ • Session       │  │ • Retrieval │  │
│  │   Detection     │  │   Management    │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Storage Layer                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │ Amazon DynamoDB │  │ Amazon DynamoDB │  │ Amazon S3   │  │
│  │                 │  │                 │  │             │  │
│  │ • User Profiles │  │ • Session Data  │  │ • Resources │  │
│  │ • ASRS Results  │  │ • Chat History  │  │ • PDFs      │  │
│  │ • Preferences   │  │ • Context       │  │ • Guides    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                                        │
                                                        ▼
┌─────────────────────────────────────────────────────────────┐
│                Monitoring & Security Layer                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │ Amazon          │  │ AWS IAM &       │  │ Amazon      │  │
│  │ CloudWatch      │  │ Cognito         │  │ GuardDuty   │  │
│  │                 │  │                 │  │             │  │
│  │ • Metrics       │  │ • Auth          │  │ • Threat    │  │
│  │ • Logs          │  │ • User Mgmt     │  │ • Detection │  │
│  │ • Alarms        │  │ • Sessions      │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### 1. Frontend Layer (AWS Amplify)

#### 1.1 Application Structure
```
neurocoach-frontend/
├── src/
│   ├── components/
│   │   ├── ASRSScreening/
│   │   │   ├── QuestionForm.jsx
│   │   │   ├── ProgressIndicator.jsx
│   │   │   └── ResultsDisplay.jsx
│   │   ├── CoachingChat/
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── ResourceLibrary/
│   │   │   ├── ResourceCard.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   └── DownloadButton.jsx
│   │   └── Common/
│   │       ├── Header.jsx
│   │       ├── Footer.jsx
│   │       └── LoadingSpinner.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Screening.jsx
│   │   ├── Results.jsx
│   │   ├── Coaching.jsx
│   │   └── Resources.jsx
│   ├── services/
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   └── storageService.js
│   └── utils/
│       ├── asrsCalculator.js
│       ├── responseFormatter.js
│       └── validation.js
```

#### 1.2 Key Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Chat**: WebSocket connection for interactive coaching
- **Progressive Loading**: Optimized performance with lazy loading
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support
- **Error Handling**: Graceful degradation with user-friendly error messages

### 2. API Layer (Amazon API Gateway)

#### 2.1 REST API Endpoints
```
POST   /api/screening/submit          # Submit ASRS responses
GET    /api/screening/results/{id}    # Retrieve screening results
POST   /api/coaching/chat             # Send chat message
GET    /api/coaching/history/{id}     # Get chat history
GET    /api/resources                 # List available resources
GET    /api/resources/{id}/download  # Download specific resource
POST   /api/user/profile              # Update user preferences
```

#### 2.2 API Gateway Configuration
- **Throttling**: 100 requests per second per user
- **Caching**: 5-minute TTL for resource endpoints
- **Authentication**: Cognito authorizer for protected endpoints
- **CORS**: Configured for web application access
- **Logging**: Full request/response logging to CloudWatch

### 3. AI Agent Layer (AWS Bedrock AgentCore)

#### 3.1 Agent Configuration
```json
{
  "agentName": "NeuroCoachAgent",
  "agentVersion": "1.0.0",
  "foundationModel": "anthropic.claude-3-sonnet-20240229",
  "instruction": "You are NeuroCoach, an AI-powered ADHD self-coaching assistant...",
  "knowledgeBases": [
    {
      "knowledgeBaseId": "adhd-knowledge-base",
      "description": "ADHD research, coping strategies, and clinical guidelines"
    }
  ],
  "actionGroups": [
    {
      "actionGroupName": "ASRSScoring",
      "description": "Score ASRS questionnaire and determine ADHD subtype",
      "functions": ["score_asrs", "classify_subtype"]
    },
    {
      "actionGroupName": "Coaching",
      "description": "Provide personalized ADHD coaching and strategies",
      "functions": ["generate_strategies", "create_therapy_prompts"]
    }
  ]
}
```

#### 3.2 Agent Actions
- **ASRS Scoring**: Automated scoring of ADHD screening questionnaire
- **Subtype Classification**: Determine inattentive, hyperactive, or combined presentation
- **Strategy Generation**: Create personalized coping strategies based on user profile
- **Therapy Preparation**: Generate discussion points for therapy sessions
- **Resource Recommendation**: Suggest relevant educational materials and tools

### 4. Service Layer (AWS Lambda)

#### 4.1 Lambda Function Architecture
```python
# ASRS Scoring Function
def lambda_handler(event, context):
    try:
        # Parse ASRS responses
        responses = event['body']
        user_id = event['requestContext']['authorizer']['user_id']

        # Score questionnaire
        scorer = ASRSScorer(responses)
        total_score = scorer.calculate_total_score()
        subtype = scorer.determine_subtype()

        # Store results
        dynamodb = boto3.resource('dynamodb')
        table = dynamodb.Table('ASRSResults')

        table.put_item(
            Item={
                'user_id': user_id,
                'timestamp': datetime.utcnow().isoformat(),
                'total_score': total_score,
                'subtype': subtype,
                'responses': responses
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({
                'total_score': total_score,
                'subtype': subtype,
                'interpretation': interpret_score(total_score)
            })
        }
    except Exception as e:
        logger.error(f"Error scoring ASRS: {str(e)}")
        return {'statusCode': 500, 'body': 'Internal server error'}
```

#### 4.2 Function Specifications
- **Memory**: 512MB - 3GB depending on function complexity
- **Timeout**: 30 seconds for most functions, 2 minutes for AI inference
- **Concurrency**: 100 concurrent executions per function
- **VPC**: Private subnet access for enhanced security
- **Environment Variables**: Encrypted configuration and API keys

### 5. Data Layer

#### 5.1 Amazon DynamoDB Schema

**UserProfiles Table**
```
Primary Key: user_id (String)
Attributes:
- email (String)
- created_date (String)
- last_login (String)
- preferences (Map)
- screening_history (List)
```

**ASRSScreenings Table**
```
Primary Key: user_id (String), timestamp (String)
Attributes:
- total_score (Number)
- subtype (String)
- responses (Map)
- interpretation (String)
```

**ChatSessions Table**
```
Primary Key: session_id (String)
Attributes:
- user_id (String)
- messages (List)
- context (Map)
- created_at (String)
- updated_at (String)
```

#### 5.2 Amazon S3 Structure
```
neurocoach-resources/
├── educational/
│   ├── asrs-guide.pdf
│   ├── adhd-overview.pdf
│   └── coping-strategies.pdf
├── tools/
│   ├── pomodoro-timer-guide.pdf
│   ├── task-organizer-template.pdf
│   └── focus-techniques.pdf
├── research/
│   ├── nimh-resources.json
│   ├── chadd-links.json
│   └── clinical-guidelines.pdf
└── user-generated/
    └── {user_id}/
        ├── session-notes.pdf
        └── progress-reports.pdf
```

### 6. Security Architecture

#### 6.1 Authentication & Authorization
- **AWS Cognito**: User pool for authentication, identity pool for authorization
- **JWT Tokens**: Access tokens with 1-hour expiration, refresh tokens for extended sessions
- **Role-Based Access**: Different IAM roles for users, admins, and service accounts
- **Multi-Factor Authentication**: Optional MFA for enhanced security

#### 6.2 Data Protection
- **Encryption at Rest**: DynamoDB tables encrypted with AWS KMS keys
- **Encryption in Transit**: TLS 1.3 for all data transmission
- **API Security**: Input validation, rate limiting, and SQL injection prevention
- **Data Classification**: PII identification and appropriate handling

#### 6.3 Network Security
- **VPC Configuration**: Lambda functions in private subnets
- **Security Groups**: Restrictive inbound/outbound rules
- **Network ACLs**: Additional layer of network protection
- **DDoS Protection**: AWS Shield Standard included

### 7. Monitoring & Observability

#### 7.1 CloudWatch Configuration
- **Metrics**: Lambda duration, error rates, invocation counts
- **Logs**: Structured logging with correlation IDs
- **Alarms**: Automated alerts for error thresholds and performance issues
- **Dashboards**: Real-time monitoring of system health

#### 7.2 X-Ray Integration
- **Service Map**: Visual representation of service interactions
- **Trace Analysis**: End-to-end request tracing
- **Performance Insights**: Bottleneck identification
- **Error Tracking**: Detailed error correlation and analysis

### 8. Deployment Architecture

#### 8.1 Infrastructure as Code
- **AWS SAM**: Serverless Application Model for Lambda and API Gateway
- **CloudFormation**: Infrastructure templates for all resources
- **CodePipeline**: Automated deployment from Git commits
- **Parameter Store**: Secure configuration management

#### 8.2 Deployment Stages
- **Development**: Feature branches with manual testing
- **Staging**: Automated deployment with integration tests
- **Production**: Main branch with comprehensive validation
- **Rollback**: Automated rollback capability for failed deployments

## Performance Optimization

### 9.1 Caching Strategy
- **API Gateway Cache**: 5-minute TTL for static resources
- **DynamoDB Accelerator (DAX)**: In-memory caching for frequently accessed data
- **CloudFront**: CDN for static assets and API responses
- **Lambda Layers**: Shared dependencies to reduce function size

### 9.2 Cost Optimization
- **Lambda Pricing**: Use appropriate memory and timeout configurations
- **DynamoDB Billing**: On-demand pricing for variable workloads
- **S3 Lifecycle**: Automatic archival of old resources
- **CloudWatch**: Selective logging to control costs

### 9.3 Scalability Considerations
- **Auto Scaling**: Lambda automatic scaling based on demand
- **Read/Write Capacity**: DynamoDB adaptive capacity for traffic spikes
- **API Gateway Throttling**: Graceful degradation under load
- **Resource Limits**: Monitoring and alerting for service limits

## Error Handling & Resilience

### 10.1 Error Classification
- **Client Errors**: 4xx responses with detailed error messages
- **Server Errors**: 5xx responses with automatic retry logic
- **Service Unavailable**: Circuit breaker pattern for external dependencies
- **Data Corruption**: Comprehensive backup and recovery procedures

### 10.2 Recovery Mechanisms
- **Dead Letter Queues**: Failed message processing and retry
- **Health Checks**: Automated service health monitoring
- **Graceful Degradation**: Core functionality available during partial outages
- **Disaster Recovery**: Multi-region backup and failover capabilities

## Conclusion

This architecture provides a robust, scalable foundation for the NeuroCoach ADHD self-coaching agent. By leveraging AWS serverless services and following cloud-native best practices, the system achieves high availability, security, and performance while maintaining cost efficiency. The modular design allows for easy maintenance and future enhancements, making it well-suited for both the hackathon demonstration and potential production deployment.

The architecture emphasizes ethical AI practices, data privacy, and accessibility, ensuring that the solution not only meets technical requirements but also provides meaningful value to users seeking ADHD support and coaching.
