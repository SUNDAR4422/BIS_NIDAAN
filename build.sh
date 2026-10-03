#!/bin/bash
set -e

echo "Installing consumer dependencies..."
npm install --prefix consumer-frontend
echo "Installing manufacturer dependencies..."
npm install --prefix manufacturer-frontend
echo "Installing admin dependencies..."
npm install --prefix admin-frontend

echo "Building consumer..."
npm run build --prefix consumer-frontend
echo "Building manufacturer..."
npm run build --prefix manufacturer-frontend
echo "Building admin..."
npm run build --prefix admin-frontend

echo "Assembling public directory..."
rm -rf dist
mkdir -p dist

# 1. Landing page goes to root
cp -r landing-page/* dist/

# 2. Consumer frontend goes to /consumer
mkdir -p dist/consumer
cp -r consumer-frontend/dist/* dist/consumer/

# 3. Manufacturer frontend goes to /manufacturer
mkdir -p dist/manufacturer
cp -r manufacturer-frontend/dist/* dist/manufacturer/

# 4. Admin frontend goes to /admin
mkdir -p dist/admin
cp -r admin-frontend/dist/* dist/admin/

echo "Build complete."
