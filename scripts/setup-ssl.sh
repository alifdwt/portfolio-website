#!/bin/bash

# SSL setup script for alifdwt.com
# Run this after DNS propagation is complete

set -e

DOMAIN="alifdwt.com"
DEV_DOMAIN="dev.alifdwt.com"
EMAIL="aputradewantara@gmail.com"

echo "🔐 Setting up SSL certificates for alifdwt.com..."

# Check if domains resolve to correct IP
echo "🔍 Checking DNS propagation..."
MAIN_IP=$(dig +short $DOMAIN)
DEV_IP=$(dig +short $DEV_DOMAIN)

echo "DNS Results:"
echo "$DOMAIN resolves to: $MAIN_IP"
echo "$DEV_DOMAIN resolves to: $DEV_IP"

if [ "$MAIN_IP" != "103.127.136.110" ] || [ "$DEV_IP" != "103.127.136.110" ]; then
    echo "❌ DNS not fully propagated yet. Please wait and try again."
    echo "Expected IP: 103.127.136.110"
    exit 1
fi

# Backup current nginx config
sudo cp /etc/nginx/sites-available/portfolio /etc/nginx/sites-available/portfolio.ssl-backup

# Test nginx configuration
sudo nginx -t || {
    echo "❌ Nginx configuration error. Please fix before continuing."
    exit 1
}

# Start nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Create directory for ACME challenges
sudo mkdir -p /var/www/html/.well-known/acme-challenge/
sudo chown -R www-data:www-data /var/www/html/

# Get SSL certificates for main domain
echo "📜 Getting SSL certificate for $DOMAIN..."
sudo certbot certonly \
    --webroot \
    --webroot-path=/var/www/html \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Get SSL certificates for dev domain
echo "📜 Getting SSL certificate for $DEV_DOMAIN..."
sudo certbot certonly \
    --webroot \
    --webroot-path=/var/www/html \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DEV_DOMAIN

# Configure nginx with SSL
echo "⚙️  Updating nginx configuration with SSL..."
sudo certbot install \
    --nginx \
    --cert-name $DOMAIN \
    -d $DOMAIN \
    -d www.$DOMAIN

sudo certbot install \
    --nginx \
    --cert-name $DEV_DOMAIN \
    -d $DEV_DOMAIN

# Test SSL configuration
echo "🧪 Testing SSL configuration..."
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Setup automatic renewal
echo "🔄 Setting up automatic SSL renewal..."
sudo systemctl status certbot.timer || sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Test renewal process
sudo certbot renew --dry-run

echo ""
echo "🎉 SSL setup completed!"
echo ""
echo "🌐 Your sites are now available at:"
echo "   Production: https://alifdwt.com"
echo "   Development: https://dev.alifdwt.com"
echo ""
echo "🔒 SSL certificates will auto-renew every 90 days"
echo ""
echo "🔍 Verify SSL with:"
echo "   curl -I https://alifdwt.com"
echo "   curl -I https://dev.alifdwt.com"