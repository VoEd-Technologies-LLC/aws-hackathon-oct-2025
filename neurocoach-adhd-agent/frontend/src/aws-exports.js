/**
 * AWS Amplify Configuration
 *
 * This file contains the AWS configuration for NeuroCoach.
 * API keys and sensitive data are loaded from environment variables.
 *
 * SECURITY: This file is safe to commit to public repositories as it only contains
 * environment variable references, not actual API keys.
 *
 * To set up for development:
 * 1. Copy .env.example to .env
 * 2. Fill in your actual AWS API keys and endpoints
 * 3. The .env file is gitignored and will not be committed
 */

const awsconfig = {
  // AWS Cognito Authentication
  Auth: {
    region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID
  },

  // API Gateway Endpoints
  API: {
    endpoints: [
      {
        name: 'NeuroCoachAPI',
        endpoint: process.env.REACT_APP_API_ENDPOINT,
        region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
        custom_header: async () => {
          return {
            'X-API-Key': process.env.REACT_APP_API_KEY
          };
        }
      }
    ]
  },

  // AWS General Configuration
  aws_project_region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  aws_cognito_region: process.env.REACT_APP_AWS_REGION || 'us-east-1',
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_CLIENT_ID,

  // S3 Storage Configuration
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_S3_BUCKET,
      region: process.env.REACT_APP_S3_REGION || process.env.REACT_APP_AWS_REGION || 'us-east-1'
    }
  },

  // Analytics Configuration (optional)
  Analytics: {
    disabled: process.env.REACT_APP_DEBUG !== 'true'
  }
};

// Configuration validation
const requiredEnvVars = [
  'REACT_APP_USER_POOL_ID',
  'REACT_APP_USER_POOL_CLIENT_ID',
  'REACT_APP_IDENTITY_POOL_ID',
  'REACT_APP_API_ENDPOINT',
  'REACT_APP_API_KEY',
  'REACT_APP_S3_BUCKET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.warn('⚠️  NeuroCoach Configuration Warning:');
  console.warn('Missing environment variables:', missingVars);
  console.warn('Please copy .env.example to .env and fill in your AWS configuration.');
  console.warn('The app will not function properly without these values.');
}

// Development mode logging
if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_DEBUG === 'true') {
  console.log('🧠 NeuroCoach Development Mode');
  console.log('Environment check:', {
    hasUserPool: !!process.env.REACT_APP_USER_POOL_ID,
    hasAPIEndpoint: !!process.env.REACT_APP_API_ENDPOINT,
    hasAPIKey: !!process.env.REACT_APP_API_KEY,
    region: process.env.REACT_APP_AWS_REGION || 'us-east-1'
  });
}

export default awsconfig;
