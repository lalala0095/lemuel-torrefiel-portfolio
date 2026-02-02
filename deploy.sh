#!/bin/bash

# Exit on error
set -e

# Default service name
SERVICE_NAME="portfolio-frontend"
REGION="us-central1" # You might want to make this configurable

# Check if .env exists
if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    exit 1
fi

echo "Reading .env file..."

# Read .env file and construct --set-env-vars string
# This handles optional quotes and comments, and ignores empty lines
ENV_VARS=""
while IFS='=' read -r key value; do
  # Skip comments and empty lines
  [[ $key =~ ^#.*$ ]] && continue
  [[ -z $key ]] && continue
  
  # Remove possible quotes from value (simple removal)
  value=${value%\"}
  value=${value#\"}
  value=${value%\'}
  value=${value#\'}

  # Append to ENV_VARS
  if [ -z "$ENV_VARS" ]; then
    ENV_VARS="$key=$value"
  else
    ENV_VARS="$ENV_VARS,$key=$value"
  fi
done < .env

echo "Deploying to Cloud Run service: $SERVICE_NAME..."

# Deploy command
# We explicitly set using --source . to trigger a build from source (using the Dockerfile)
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --allow-unauthenticated \
  --labels dev-tutorial=devnewyear2026 \
  --set-env-vars "$ENV_VARS"

echo "Deployment initiated successfully!"
