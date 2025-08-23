#!/bin/bash

# Image management script for portfolio website
# Usage: ./manage-images.sh [list|pull|clean|status] [environment]

set -e

ACTION=${1:-status}
ENVIRONMENT=${2:-main}
REGISTRY="ghcr.io"
IMAGE_NAME="alifdwt/portfolio-website"

case $ACTION in
    "list")
        echo "📦 Available images:"
        docker images | grep "$REGISTRY/$IMAGE_NAME" || echo "No images found"
        echo ""
        echo "🌐 Remote tags available:"
        echo "Visit: https://github.com/alifdwt/portfolio-website/pkgs/container/portfolio-website"
        ;;
    
    "pull")
        if [ "$ENVIRONMENT" = "main" ]; then
            echo "📥 Pulling latest production image..."
            docker pull $REGISTRY/$IMAGE_NAME:latest
        elif [ "$ENVIRONMENT" = "dev" ]; then
            echo "📥 Pulling latest development image..."
            docker pull $REGISTRY/$IMAGE_NAME:dev
        else
            echo "❌ Invalid environment. Use 'main' or 'dev'"
            exit 1
        fi
        ;;
    
    "clean")
        echo "🧹 Cleaning up unused images..."
        docker image prune -f
        echo "🗑️  Removing dangling images..."
        docker rmi $(docker images -f "dangling=true" -q) 2>/dev/null || echo "No dangling images found"
        ;;
    
    "status")
        echo "📊 Current deployment status:"
        echo ""
        echo "🐳 Running containers:"
        docker ps --filter "name=portfolio" --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        echo "📦 Local images:"
        docker images | grep "$REGISTRY/$IMAGE_NAME" || echo "No portfolio images found"
        echo ""
        echo "💾 Disk usage:"
        docker system df
        ;;
    
    "logs")
        if [ "$ENVIRONMENT" = "main" ]; then
            echo "📄 Production logs:"
            docker logs portfolio-main --tail=50
        elif [ "$ENVIRONMENT" = "dev" ]; then
            echo "📄 Development logs:"
            docker logs portfolio-dev --tail=50
        else
            echo "❌ Invalid environment. Use 'main' or 'dev'"
            exit 1
        fi
        ;;
    
    *)
        echo "❌ Invalid action. Available actions:"
        echo "  list     - List available images"
        echo "  pull     - Pull latest image for environment"
        echo "  clean    - Clean up unused images"
        echo "  status   - Show deployment status"
        echo "  logs     - Show container logs"
        echo ""
        echo "Usage: ./manage-images.sh [action] [environment]"
        echo "Example: ./manage-images.sh pull dev"
        ;;
esac