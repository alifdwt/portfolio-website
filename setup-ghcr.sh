#!/bin/bash

# Setup script for GHCR authentication on VPS
# Usage: ./setup-ghcr.sh [github_token]

set -e

GITHUB_TOKEN=${1}
USERNAME="alifdwt"
REGISTRY="ghcr.io"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GitHub token required"
    echo "Usage: ./setup-ghcr.sh [github_token]"
    echo ""
    echo "To create a GitHub token:"
    echo "1. Go to https://github.com/settings/tokens"
    echo "2. Click 'Generate new token (classic)'"
    echo "3. Select scopes: read:packages, write:packages"
    echo "4. Copy the token and use it here"
    exit 1
fi

echo "🔐 Setting up GHCR authentication..."

# Login to GHCR
echo $GITHUB_TOKEN | docker login $REGISTRY -u $USERNAME --password-stdin

if [ $? -eq 0 ]; then
    echo "✅ Successfully logged in to GHCR!"
    echo "🏠 Docker credentials saved to ~/.docker/config.json"
    
    # Verify login
    echo "🔍 Verifying authentication..."
    docker system info | grep -A5 "Registry"
    
    echo ""
    echo "🎉 GHCR setup completed!"
    echo "📦 You can now pull/push images to: $REGISTRY/$USERNAME/portfolio-website"
    
else
    echo "❌ Failed to login to GHCR"
    echo "Please check your GitHub token and try again"
    exit 1
fi

# Create a convenient alias for future logins
echo ""
echo "💡 Pro tip: You can also set up a convenient alias:"
echo "echo 'alias ghcr-login=\"echo \$GITHUB_TOKEN | docker login ghcr.io -u $USERNAME --password-stdin\"' >> ~/.bashrc"