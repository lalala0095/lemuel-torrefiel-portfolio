# Deploying FastAPI to Google Cloud Run

## Prerequisites
1. Google Cloud project with billing enabled
2. `gcloud` CLI installed and configured
3. Docker installed locally (for testing)

## Setup Steps

### 1. Set Environment Variables
```bash
export PROJECT_ID="your-gcp-project-id"
export SERVICE_NAME="portfolio-api"
export REGION="us-central1"  # Change if needed
```

### 2. Build and Test Locally (Optional)
```bash
# Build the Docker image
docker build -t portfolio-api .

# Run locally
docker run -p 8080:8080 \
  -e PORTFOLIO_MONGODB_URI="your-mongodb-uri" \
  portfolio-api
```

### 3. Deploy to Google Cloud Run

#### Option A: Using gcloud CLI (Recommended)
```bash
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars PORTFOLIO_MONGODB_URI="your-mongodb-uri"
```

#### Option B: Using Cloud Build
```bash
gcloud builds submit \
  --region=$REGION \
  --config=cloudbuild.yaml
```

### 4. Set Environment Secrets
For secure handling of sensitive data:
```bash
# Create a secret in Secret Manager
echo -n "your-mongodb-uri" | gcloud secrets create portfolio-mongodb-uri --data-file=-

# Grant Cloud Run service account access
gcloud secrets add-iam-policy-binding portfolio-mongodb-uri \
  --member=serviceAccount:$PROJECT_ID@appspot.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor

# Deploy with secret reference
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars PORTFOLIO_MONGODB_URI="projects/$PROJECT_ID/secrets/portfolio-mongodb-uri/versions/latest"
```

### 5. Access Your Service
After deployment, you'll get a URL like:
```
https://portfolio-api-xxxxx.run.app
```

Test your endpoints:
```bash
curl https://portfolio-api-xxxxx.run.app/projects
```

## Important Notes

- **Port**: Cloud Run requires services to listen on port `8080`
- **Timeouts**: Default is 5 minutes; adjust if needed in Cloud Run settings
- **Concurrency**: Default is 80; adjust based on your needs
- **Memory**: Default is 256MB; increase for MongoDB operations if needed
- **CORS**: Currently allows all origins (*) - update in production

## Monitoring

View logs:
```bash
gcloud run logs read $SERVICE_NAME --region=$REGION --limit=50
```

View metrics:
```bash
gcloud monitoring metrics-descriptors list
```

## Troubleshooting

1. **Service fails to start**: Check logs with `gcloud run logs read`
2. **MongoDB connection errors**: Verify URI is correct and IP whitelist includes Cloud Run's IPs
3. **CORS issues**: Update `allow_origins` in `main.py` with your frontend domain
4. **Port errors**: Ensure app listens on port 8080

## Cleanup

```bash
gcloud run services delete $SERVICE_NAME --region=$REGION
```
