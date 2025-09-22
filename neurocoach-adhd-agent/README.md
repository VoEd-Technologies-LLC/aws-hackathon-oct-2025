<div align="center">

# 🧠 NeuroCoach: An Autonomous ADHD Self-Coaching Agent

[![AWS AI Agent Hackathon](https://img.shields.io/badge/AWS%20AI%20Agent%20Hackathon-2025-orange)](https://aws-agent-hackathon.devpost.com/)
[![DevPost Submission](https://img.shields.io/badge/DevPost-Submit%20Here-blue)](https://aws-agent-hackathon.devpost.com/)
[![License: Restricted](https://img.shields.io/badge/License-Restricted-red.svg)](#)
[![AWS](https://img.shields.io/badge/Amazon%20Web%20Services-232F3E?logo=amazonaws)](https://aws.amazon.com/)

**An AWS-powered AI agent that provides personalized ADHD screening, coaching, and therapy preparation support**

[📋 Project Plan](PROJECT_PLAN.md) • [🗺️ Roadmap](ROADMAP.md) • [🏗️ Architecture](ARCHITECTURE.md) • [🎬 Demo Script](docs/demo-script.md)

</div>

---

## 👩‍⚕️ **Authorship & Rights**

**Developed by Dr. Alice Vo Edwards, VoEd Technologies LLC**

This code was developed by Dr. Alice Vo Edwards, owner of VoEd Technologies LLC, for the AWS AI Agent Hackathon 2025. No rights are being given away except to the AWS hackathon judges for the purpose of testing and evaluation. All intellectual property rights remain with Dr. Alice Vo Edwards and VoEd Technologies LLC.

**⚠️ Restricted License**: This project is not open source and is not licensed under any open source license. The code is provided solely for the AWS AI Agent Hackathon evaluation purposes.

## 🔗 **GitHub Repository Configuration**

**⚠️ IMPORTANT**: GitHub repository information is stored in the `.env` file for easy reference and persistence across sessions.

**To check GitHub configuration:**
```bash
# View GitHub repository details
cat .env | grep GITHUB
```

**Repository Details** (see `.env` file for complete configuration):
- **GitHub URL**: Check `GITHUB_REPO_URL` in `.env`
- **Repository Name**: Check `GITHUB_REPO_NAME` in `.env`
- **Owner**: Check `GITHUB_OWNER` in `.env`
- **Web Access**: Check `GITHUB_WEB_URL` in `.env`

**Quick Git Commands** (see `.env` file for reference):
```bash
# Check current remote
git remote -v

# Push to main branch
git push -u origin main

# Push to test branch
git push -u origin v0.0.0-test
```

---

## 🎯 Problem Statement

Attention-Deficit/Hyperactivity Disorder (ADHD) affects millions worldwide, yet many remain undiagnosed or struggle with self-management. Existing tools offer only static self-tests or generic advice, leaving individuals without personalized strategies or guidance for effective therapy sessions.

**NeuroCoach bridges this gap** by providing an interactive, AI-powered self-coaching experience that:
- Screens for ADHD tendencies using the validated ASRS v1.1 questionnaire
- Delivers personalized coping strategies based on individual challenges
- Prepares users for productive conversations with human therapists
- Connects users with curated educational resources and tools

## ✨ Solution Overview

NeuroCoach is an autonomous AI agent built on AWS Bedrock that combines clinical screening with interactive coaching to empower individuals with ADHD challenges. The agent provides:

1. **📊 ADHD Screening**: WHO-validated ASRS v1.1 questionnaire with automated scoring
2. **🎯 Personalized Coaching**: Context-aware strategies tailored to user challenges
3. **💬 Interactive Dialog**: Natural conversation flow with follow-up questions
4. **🩺 Therapy Preparation**: Specific talking points for therapy sessions
5. **📚 Resource Library**: Curated ADHD resources and coping tools

## 🏆 Hackathon Alignment

This project is specifically designed to maximize scoring across all AWS AI Agent Hackathon judging criteria:

| Criteria | Weight | NeuroCoach Excellence |
|----------|--------|----------------------|
| **Technical Execution** | 50% | Full AWS Bedrock AgentCore orchestration with multi-service architecture |
| **Value/Impact** | 20% | Addresses ADHD awareness gap with accessible, personalized support |
| **Creativity** | 10% | Novel interactive self-coaching agent with therapy preparation |
| **Functionality** | 10% | Complete user journey from screening to personalized coaching |
| **Presentation** | 10% | Professional 3-minute demo with clear value proposition |

## 🛠️ Technical Architecture

### AWS Services Stack
- **Amazon Bedrock AgentCore** - AI agent orchestration and reasoning
- **AWS Lambda** - Business logic for screening and coaching
- **Amazon DynamoDB** - User profiles and session data storage
- **Amazon S3** - Educational resources and static assets
- **Amazon API Gateway** - RESTful API endpoints
- **AWS Amplify** - Frontend web application hosting
- **Amazon Cognito** - User authentication and authorization
- **Amazon CloudWatch** - Monitoring and observability

### System Flow
```
User Input → Amplify UI → API Gateway → Lambda → Bedrock AgentCore → DynamoDB/S3 → Response
```

## 🔐 Security & API Configuration

### **⚠️ IMPORTANT: API Key Management**

This project uses environment variables for API keys to ensure security. **Never commit API keys to version control.**

### **For Development (Private Version)**
```bash
# 1. Copy environment template
cp .env.example .env

# 2. Fill in your actual AWS API keys in .env
# Edit .env with your real values:
# REACT_APP_USER_POOL_ID=your_actual_user_pool_id
# REACT_APP_API_KEY=your_actual_api_gateway_key
# etc.

# 3. Validate setup
./deploy.sh dev

# 4. Install and run
cd frontend
npm install
npm start
```

### **For Public Release (Hackathon/GitHub)**
```bash
# Create public version without API keys
./deploy.sh public

# This creates a 'neurocoach-public' folder with:
# ✅ All source code
# ✅ Documentation
# ✅ .env.example (template only)
# ❌ No real API keys
# ❌ No .env file
```

### **Required Environment Variables**
```bash
# AWS Cognito (Required)
REACT_APP_USER_POOL_ID=your_user_pool_id
REACT_APP_USER_POOL_CLIENT_ID=your_client_id
REACT_APP_IDENTITY_POOL_ID=your_identity_pool_id

# API Gateway (Required)
REACT_APP_API_ENDPOINT=https://your-api.execute-api.us-east-1.amazonaws.com/prod
REACT_APP_API_KEY=your_api_gateway_key

# AWS S3 (Required)
REACT_APP_S3_BUCKET=your-bucket-name
REACT_APP_AWS_REGION=us-east-1
```

## 🚀 Quick Start

### Prerequisites
- AWS Account with Bedrock access
- Node.js 18+ and npm
- AWS CLI configured
- Git

### Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd neurocoach-adhd-agent
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure AWS Services**
   ```bash
   # Deploy backend infrastructure
   cd backend/infrastructure
   sam deploy --guided

   # Configure environment variables
   cp .env.example .env
   # Edit .env with your AWS resource ARNs
   ```

4. **Start Development Server**
   ```bash
   cd frontend
   npm start
   ```

5. **Deploy to AWS**
   ```bash
   # Deploy frontend
   amplify publish

   # Deploy backend
   sam deploy
   ```

### **🔒 Security Features**
- ✅ Environment variables for all API keys
- ✅ .env file is gitignored
- ✅ Configuration validation on startup
- ✅ Public version script removes sensitive data
- ✅ Clear separation of public vs private code

## 📁 Project Structure

```
neurocoach-adhd-agent/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API and service integrations
│   │   └── utils/           # Utility functions
│   └── public/              # Static assets
├── backend/                 # AWS Lambda functions
│   ├── lambda/              # Function implementations
│   └── infrastructure/      # SAM/CloudFormation templates
├── resources/               # Educational content and guides
├── docs/                    # Documentation and demo materials
├── tests/                   # Unit and integration tests
├── README.md               # This file
├── PROJECT_PLAN.md         # Detailed project plan
├── ROADMAP.md              # Development roadmap
└── ARCHITECTURE.md         # Technical architecture
```

## 🎬 Demo Video Script

The 3-minute demo showcases:

1. **Problem Introduction** (15s) - ADHD challenges and current gaps
2. **ASRS Screening** (30s) - User completes questionnaire
3. **Results & Analysis** (30s) - Agent interprets results and explains
4. **Interactive Coaching** (60s) - User asks about work challenges, receives tailored strategies
5. **Therapy Preparation** (30s) - Agent provides specific talking points
6. **Resource Integration** (30s) - Access to ADHD resources and tools
7. **Impact Statement** (15s) - Value proposition and ethical considerations

## 🧪 Test Scenarios & Walkthroughs

### **Scenario 1: Predominantly Inattentive ADHD (Most Common Presentation)**

**ASRS Responses:**
1. **"How often do you have trouble wrapping up the final details of a project?"** - Often (3)
2. **"How often do you have difficulty getting things in order?"** - Often (3)
3. **"How often do you have problems remembering appointments?"** - Very Often (4)
4. **"How often do you avoid or delay getting started on tasks?"** - Often (3)
5. **"How often do you fidget or squirm?"** - Sometimes (2)
6. **"How often do you feel overly active and compelled to do things?"** - Rarely (1)

**Expected Results:**
- **Part A Score:** 16/24 (Positive screening ≥14)
- **ADHD Subtype:** Inattentive
- **Interpretation:** "Your screening suggests characteristics commonly associated with inattentive ADHD, including challenges with focus, organization, and task completion."

**AI Coaching Test:**
**User Input:** "I keep missing deadlines at work and it's affecting my performance. I start projects but never seem to finish them."

**Expected AI Response:**
"I understand that missing deadlines at work can be challenging with inattentive ADHD. Here are some evidence-based strategies:

**1. Environmental Structure**
Create a dedicated workspace with minimal distractions. Research shows that reducing visual clutter can improve focus by up to 25% for individuals with inattentive ADHD.

**2. Task Breakdown**
Break large projects into smaller, manageable tasks with clear deadlines. A study in the Journal of Attention Disorders found this approach increases completion rates by 40%.

**3. External Accountability**
Consider using body doubling - working alongside someone else. This technique, supported by ADHD coaching research, can significantly improve task initiation.

**Scientific Sources:**
• [ADHD and Environmental Modifications](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Task Breakdown Strategies](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

For your therapy sessions, you might discuss: 'How can I create environmental structures that support my attention challenges at work?'"

---

### **Scenario 2: Predominantly Hyperactive-Impulsive ADHD**

**ASRS Responses:**
1. **"How often do you have trouble wrapping up the final details of a project?"** - Sometimes (2)
2. **"How often do you have difficulty getting things in order?"** - Rarely (1)
3. **"How often do you have problems remembering appointments?"** - Sometimes (2)
4. **"How often do you avoid or delay getting started on tasks?"** - Often (3)
5. **"How often do you fidget or squirm?"** - Very Often (4)
6. **"How often do you feel overly active and compelled to do things?"** - Very Often (4)

**Expected Results:**
- **Part A Score:** 15/24 (Positive screening ≥14)
- **ADHD Subtype:** Hyperactive-Impulsive
- **Interpretation:** "Your screening suggests characteristics commonly associated with hyperactive-impulsive ADHD, including restlessness and challenges with impulse control."

**AI Coaching Test:**
**User Input:** "I can't sit still during meetings and I interrupt people. My boss says I'm too impulsive at work."

**Expected AI Response:**
"I hear that restlessness and impulsivity are challenging for you at work with hyperactive-impulsive ADHD. Here are research-backed strategies:

**1. Movement Breaks**
Schedule short movement breaks every 30-45 minutes. Research shows this can reduce hyperactivity symptoms by 35% during work tasks.

**2. Fidget Tools**
Use stress balls or fidget devices during meetings. A study in the American Journal of Occupational Therapy found these reduce restlessness by 28%.

**3. Standing Workstations**
Consider a standing desk or walking meetings. Evidence suggests this can improve focus and reduce impulsive behaviors in workplace settings.

**Scientific Sources:**
• [Movement Breaks and ADHD](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Fidget Tools Research](https://www.journals.sagepub.com/doi/full/10.1177/0008417419832244)

For therapy, you might discuss: 'How can I manage impulsive responses in professional settings?'"

---

### **Scenario 3: Combined ADHD Presentation**

**ASRS Responses:**
1. **"How often do you have trouble wrapping up the final details of a project?"** - Very Often (4)
2. **"How often do you have difficulty getting things in order?"** - Often (3)
3. **"How often do you have problems remembering appointments?"** - Often (3)
4. **"How often do you avoid or delay getting started on tasks?"** - Very Often (4)
5. **"How often do you fidget or squirm?"** - Often (3)
6. **"How often do you feel overly active and compelled to do things?"** - Often (3)

**Expected Results:**
- **Part A Score:** 20/24 (Positive screening ≥14)
- **ADHD Subtype:** Combined
- **Interpretation:** "Your screening suggests characteristics commonly associated with combined ADHD, including challenges with both attention and hyperactivity."

**AI Coaching Test:**
**User Input:** "I struggle with both staying focused on tasks and sitting still during work. I also have trouble with time management."

**Expected AI Response:**
"I understand that combined ADHD challenges at work benefit from a comprehensive approach:

**1. Structured Routine with Movement**
Create a daily routine that includes both focused work time and movement breaks. This addresses both attention and hyperactivity needs.

**2. Dual Strategy Implementation**
Combine organizational tools (planners, apps) with impulse management techniques (pause-and-plan method). Research shows this dual approach is 45% more effective.

**3. Environmental and Behavioral Strategies**
Use both workspace optimization and behavioral techniques. Studies indicate this combined approach yields the best outcomes for combined presentation.

**Scientific Sources:**
• [Combined ADHD Treatment Approaches](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Dual Strategy Research](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

For therapy sessions, discuss: 'How can I balance structure and flexibility in my work environment?'"

---

### **Scenario 4: Low ADHD Characteristics (Below Clinical Threshold)**

**ASRS Responses:**
1. **"How often do you have trouble wrapping up the final details of a project?"** - Rarely (1)
2. **"How often do you have difficulty getting things in order?"** - Sometimes (2)
3. **"How often do you have problems remembering appointments?"** - Rarely (1)
4. **"How often do you avoid or delay getting started on tasks?"** - Sometimes (2)
5. **"How often do you fidget or squirm?"** - Rarely (1)
6. **"How often do you feel overly active and compelled to do things?"** - Rarely (1)

**Expected Results:**
- **Part A Score:** 6/24 (Below clinical threshold <14)
- **ADHD Subtype:** Inattentive (based on response pattern)
- **Interpretation:** "Your Part A score of 6 is below the screening threshold of 14 and is not typically associated with clinically significant ADHD characteristics."

**AI Coaching Test:**
**User Input:** "I have some trouble focusing at work but I'm not sure if it's ADHD or just normal stress."

**Expected AI Response:**
"I understand you're experiencing some focus challenges at work. Your screening score of 6 is below the threshold typically associated with clinically significant ADHD characteristics. However, let me provide some general strategies that can help with focus and productivity:

**1. Stress Management Techniques**
Practice short mindfulness exercises (5-10 minutes daily). Research shows mindfulness can improve focus by 20-30% even for individuals without ADHD.

**2. Work Environment Optimization**
Create a dedicated workspace with good lighting and minimal distractions. Studies indicate that environmental factors can impact focus regardless of ADHD status.

**3. Time Management Strategies**
Use techniques like time-blocking or the Pomodoro method. These approaches have been shown to improve productivity for many people experiencing work-related focus challenges.

**Scientific Sources:**
• [Mindfulness and Focus](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3964450/)
• [Workplace Environment Research](https://www.sciencedirect.com/science/article/pii/S0005789419301089)

**IMPORTANT MEDICAL DISCLAIMER:** This is not a clinical diagnosis. This screening tool provides educational information only and is not a substitute for professional medical evaluation. Please consult with a qualified healthcare provider for proper ADHD assessment and diagnosis.

Even though your screening score is below the ADHD threshold, if these challenges are significantly impacting your daily life, work performance, or well-being, I recommend discussing your concerns with a healthcare provider. They can help determine if this is related to stress, other factors, or if further evaluation is warranted.

For your therapy sessions, you might discuss: 'I'm experiencing focus challenges at work - could this be related to stress, or should I be evaluated for other possibilities?'"

---

### **Additional Test Cases for AI Coaching**

**Work-Related Challenges:**
- "I get overwhelmed by large projects and don't know where to start"
- "My mind wanders during important meetings"
- "I procrastinate on important tasks until the last minute"
- "I make careless mistakes due to rushing through work"

**School/Academic Challenges:**
- "I can't focus during lectures and fall behind"
- "I start assignments but never finish them"
- "Test anxiety makes it hard to perform well"
- "Group projects are difficult because I lose track of responsibilities"

**Expected AI Response Features:**
- ✅ Empathetic acknowledgment of the challenge
- ✅ 2-3 specific, actionable strategies tailored to ADHD subtype
- ✅ Explanation of why strategies work (evidence-based)
- ✅ Scientific source citations with URLs
- ✅ Specific therapy talking points
- ✅ Follow-up questions for deeper understanding

**Scientific Sources Integration:**
All AI responses include credible sources such as:
- National Institutes of Health (NIH) research papers
- Journal of Attention Disorders studies
- American Journal of Occupational Therapy findings
- Evidence-based treatment guidelines from CHADD and ADDitude Magazine

## 🎯 Key Features

### ADHD Screening
- WHO ASRS v1.1 questionnaire implementation
- Automated scoring and subtype classification
- Plain-language interpretation of results
- Evidence-based assessment criteria

### Personalized Coaching
- Context-aware strategy recommendations
- Interactive follow-up questions
- Progress tracking and adaptation
- Multi-domain support (work, school, relationships)

### Therapy Preparation
- Specific discussion points for therapy sessions
- Communication strategies for healthcare providers
- Progress documentation for continuity of care
- Resource recommendations for ongoing support

### Resource Integration
- Curated ADHD educational materials
- Coping strategy guides and tools
- Links to reputable organizations (CHADD, NIMH)
- Downloadable templates and worksheets

## 🔒 Ethical & Safety Considerations

### Responsible AI Practices
- **Clear Disclaimers**: Always emphasizes this is not a diagnostic tool
- **Professional Referral**: Recommends consultation with healthcare providers
- **Crisis Resources**: Provides immediate access to mental health support
- **Data Privacy**: HIPAA-aligned data handling and user consent

### User Safety Features
- Sentiment analysis to detect distress
- Appropriate resource recommendations
- Professional boundaries and limitations
- Transparent AI decision-making

## 📊 Performance & Scalability

### Optimized Architecture
- Serverless design for cost efficiency
- Auto-scaling based on demand
- CDN integration for global performance
- Caching strategies for improved response times

### Monitoring & Analytics
- Real-time performance monitoring
- User engagement metrics
- Error tracking and alerting
- Usage analytics for continuous improvement

## 🧪 Testing Strategy

### Comprehensive Testing
- Unit tests for Lambda functions
- Integration tests for API endpoints
- End-to-end user journey testing
- Performance and load testing
- Accessibility compliance validation

### Quality Gates
- 80%+ code coverage requirement
- Automated testing on all commits
- Manual testing for critical user paths
- Security vulnerability scanning

## 🚀 Deployment & Operations

### Infrastructure as Code
- AWS SAM templates for reproducible deployments
- Automated CI/CD pipelines
- Environment-specific configurations
- Rollback capabilities for failed deployments

### Cost Optimization
- Serverless pricing model
- Intelligent resource allocation
- Usage-based scaling
- Cost monitoring and alerts

## 📚 Documentation

### Technical Documentation
- [Architecture Guide](ARCHITECTURE.md) - System design and AWS services
- [Project Plan](PROJECT_PLAN.md) - Detailed development roadmap
- [Testing Instructions](docs/testing_instructions.md) - Comprehensive testing guide
- [API Documentation](docs/api-reference.md) - RESTful API specifications
- [Deployment Guide](docs/deployment.md) - Infrastructure setup instructions

### User Documentation
- [User Guide](docs/user-guide.md) - How to use NeuroCoach effectively
- [Demo Script](docs/demo-script.md) - 3-minute presentation script
- [Ethics Statement](docs/ethics-disclaimer.md) - Responsible AI practices
- [FAQ](docs/faq.md) - Common questions and answers

## 🤝 Contributing

### Development Guidelines
- Follow AWS best practices and security guidelines
- Implement comprehensive error handling
- Write clear, maintainable code with documentation
- Ensure accessibility compliance (WCAG 2.1 AA)

### Code Standards
- ESLint and Prettier for code formatting
- Git flow for version control
- Semantic commit messages
- Pull request reviews required

## 📄 License

**⚠️ RESTRICTED LICENSE - NOT OPEN SOURCE**

This project is not licensed under any open source license. The code was developed by Dr. Alice Vo Edwards for the AWS AI Agent Hackathon 2025 and is provided solely for evaluation purposes by the hackathon judges.

**No rights are granted** for use, modification, distribution, or commercial exploitation of this code except as explicitly permitted by the AWS AI Agent Hackathon terms and conditions.

All intellectual property rights remain with the original author, Dr. Alice Vo Edwards.

## 🙏 Acknowledgments

### Clinical Validation
- ASRS v1.1 questionnaire developed by the World Health Organization
- ADHD research and guidelines from NIMH and CHADD
- Clinical consultation for accuracy and appropriateness

### Technical Partners
- AWS Bedrock for AI agent capabilities
- AWS Amplify for frontend hosting
- AWS Lambda for serverless computing

### Community Support
- ADHD advocacy organizations for resource curation
- Mental health professionals for clinical guidance
- Open source community for development tools

## 📞 Support & Contact

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/your-username/neurocoach-adhd-agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/neurocoach-adhd-agent/discussions)
- **Email**: project@neurocoach.dev

## 🔗 Important Links

- **DevPost Submission**: [https://aws-agent-hackathon.devpost.com/](https://aws-agent-hackathon.devpost.com/)
- **AWS Bedrock Documentation**: [https://docs.aws.amazon.com/bedrock/](https://docs.aws.amazon.com/bedrock/)
- **ADHD Resources**: [CHADD](https://chadd.org/), [NIMH](https://www.nimh.nih.gov/health/topics/attention-deficit-hyperactivity-disorder-adhd)
- **ASRS v1.1 Information**: [WHO Adult ADHD Self-Report Scale](https://www.hcp.med.harvard.edu/ncs/asrs.php)

---

<div align="center">

**NeuroCoach** - Empowering individuals with ADHD through AI-powered self-coaching and therapy preparation.

Built with ❤️ for the AWS AI Agent Hackathon 2025

</div>
