#!/bin/bash

# Deploy script for portfolio website using GHCR
# Usage: ./deploy.sh [main|dev|local] [github_token]

set -e

ENVIRONMENT=${1:-main}
GITHUB_TOKEN=${2}
PROJECT_DIR=~/projects/portfolio-website
REGISTRY="ghcr.io"
IMAGE_NAME="alifdwt/portfolio-website"

echo "🚀 Starting deployment for $ENVIRONMENT environment using GHCR..."

# Check if we need GitHub token for authentication
if [ "$ENVIRONMENT" != "local" ] && [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GitHub token required for GHCR authentication"
    echo "Usage: ./deploy.sh [main|dev] [github_token]"
    echo "or for local development: ./deploy.sh local"
    exit 1
fi

# Navigate to project directory
cd $PROJECT_DIR

if [ "$ENVIRONMENT" = "local" ]; then
    echo "🔨 Building and starting local development environment..."
    docker compose --profile local up -d --build portfolio-local
    echo "✅ Local development environment started!"
    echo "🌐 Access at: http://103.127.136.110:3002"
else
    # Login to GHCR
    echo "🔐 Logging in to GitHub Container Registry..."
    echo $GITHUB_TOKEN | docker login ghcr.io -u alifdwt --password-stdin

    # Stop existing container
    echo "🛑 Stopping existing container..."
    if [ "$ENVIRONMENT" = "main" ]; then
        docker compose stop portfolio-main || true
        docker compose rm -f portfolio-main || true
    else
        docker compose stop portfolio-dev || true
        docker compose rm -f portfolio-dev || true
    fi

    # Pull latest image and start container
    echo "📥 Pulling latest image from GHCR..."
    if [ "$ENVIRONMENT" = "main" ]; then
        docker compose pull portfolio-main
        docker compose up -d portfolio-main
        echo "✅ Production environment deployed successfully!"
        echo "🌐 Access at: http://103.127.136.110:3000"
    else
        docker compose pull portfolio-dev
        docker compose up -d portfolio-dev
        echo "✅ Development environment deployed successfully!"
        echo "🌐 Access at: http://103.127.136.110:3001"
    fi
fi

# Clean up unused images
echo "🧹 Cleaning up unused images..."
docker image prune -f

# Show container status
echo "📊 Container status:"
docker compose ps

echo "🎉 Deployment completed!"

# Show image information
if [ "$ENVIRONMENT" != "local" ]; then
    echo "📦 Deployed image:"
    if [ "$ENVIRONMENT" = "main" ]; then
        docker images | grep "$REGISTRY/$IMAGE_NAME" | grep "latest"
    else
        docker images | grep "$REGISTRY/$IMAGE_NAME" | grep "dev"
    fi
fi