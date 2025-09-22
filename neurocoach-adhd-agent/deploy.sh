#!/bin/bash

# NeuroCoach Deployment Script
# This script helps with creating public versions by removing sensitive API configurations

set -e

echo "🧠 NeuroCoach Deployment Script"
echo "================================="

# Function to create public version (removes API keys)
create_public_version() {
    echo "📦 Creating public version (removing API configurations)..."

    # Create a copy of the project without sensitive files
    PUBLIC_DIR="neurocoach-public"
    mkdir -p "$PUBLIC_DIR"

    # Copy all files except sensitive ones
    rsync -av --exclude='.env' \
              --exclude='.git' \
              --exclude='*.log' \
              --exclude='node_modules' \
              --exclude='.DS_Store' \
              --exclude='deploy.sh' \
              --exclude='*.backup' \
              ./ "$PUBLIC_DIR/"

    # Create a placeholder .env file for public version
    cat > "$PUBLIC_DIR/.env.example" << 'EOF'
# NeuroCoach Public Version
# This is a demo version without API keys
# To use this application, you need to:
#
# 1. Set up AWS services (Cognito, API Gateway, Lambda, S3, Bedrock)
# 2. Copy this file to .env
# 3. Fill in your actual AWS API keys and endpoints
# 4. Run npm install && npm start

# AWS Configuration (REQUIRED - Fill in your values)
REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_ID=your_user_pool_id_here
REACT_APP_USER_POOL_CLIENT_ID=your_client_id_here
REACT_APP_IDENTITY_POOL_ID=your_identity_pool_id_here

# API Gateway Configuration (REQUIRED)
REACT_APP_API_ENDPOINT=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
REACT_APP_API_KEY=your_api_gateway_key_here

# AWS S3 Configuration (REQUIRED)
REACT_APP_S3_BUCKET=neurocoach-resources-your-account
REACT_APP_S3_REGION=us-east-1

# Optional: Analytics and Monitoring
REACT_APP_GOOGLE_ANALYTICS_ID=your_ga_id_here
REACT_APP_SENTRY_DSN=your_sentry_dsn_here

# Development Settings
REACT_APP_DEBUG=true
REACT_APP_LOG_LEVEL=info
EOF

    # Update README for public version
    sed -i.bak 's|## 🚀 Quick Start|## 🚀 Public Version Setup

⚠️ **This is a public/demo version without API keys**

To run this application:

1. **Set up AWS Services:**
   - Create a Cognito User Pool and Identity Pool
   - Set up API Gateway with Lambda functions
   - Create S3 bucket for resources
   - Enable AWS Bedrock access

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your AWS API keys
   ```

3. **Install and Run:**
   ```bash
   npm install
   npm start
   ```

4. **Deploy to AWS:**
   ```bash
   # Deploy backend
   cd backend/infrastructure
   sam deploy --guided

   # Deploy frontend
   amplify publish
   ```

## 🚀 Quick Start|g' "$PUBLIC_DIR/README.md"

    echo "✅ Public version created in: $PUBLIC_DIR/"
    echo "📝 Updated README with public version instructions"
    echo "🔐 All API keys and sensitive data removed"
    echo ""
    echo "📋 Public Version Contents:"
    ls -la "$PUBLIC_DIR/"
    echo ""
    echo "🚀 To use the public version:"
    echo "   1. cd $PUBLIC_DIR"
    echo "   2. Set up your AWS services"
    echo "   3. Copy .env.example to .env and fill in API keys"
    echo "   4. npm install && npm start"
}

# Function to create development version (keeps API keys)
create_dev_version() {
    echo "🔧 Creating development version (with API configurations)..."

    # Check if .env file exists
    if [ ! -f ".env" ]; then
        echo "❌ Error: .env file not found!"
        echo "Please create .env file with your API keys first."
        echo "Copy .env.example to .env and fill in your values."
        exit 1
    fi

    # Validate .env file has required variables
    required_vars=("REACT_APP_USER_POOL_ID" "REACT_APP_API_ENDPOINT" "REACT_APP_API_KEY")
    missing_vars=()

    for var in "${required_vars[@]}"; do
        if ! grep -q "^${var}=" .env; then
            missing_vars+=("$var")
        fi
    done

    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo "❌ Error: Missing required environment variables:"
        printf '   - %s\n' "${missing_vars[@]}"
        echo "Please update your .env file."
        exit 1
    fi

    echo "✅ Development environment validated"
    echo "📝 Ready for development with API keys"
}

# Function to show help
show_help() {
    echo "NeuroCoach Deployment Script"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  public     Create public version (removes API keys)"
    echo "  dev        Validate development environment"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 public    # Create public version for GitHub"
    echo "  $0 dev       # Check development setup"
}

# Main script logic
case "${1:-help}" in
    "public")
        create_public_version
        ;;
    "dev")
        create_dev_version
        ;;
    "help"|*)
        show_help
        ;;
esac
