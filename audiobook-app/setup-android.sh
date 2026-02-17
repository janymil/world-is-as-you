#!/bin/bash

# Setup script for Android platform
# This script automates the setup of www folder and Android platform for Capacitor

set -e  # Exit on error

echo "🚀 Setting up Android platform for Capacitor..."

# Check if we're in the right directory
if [ ! -f "capacitor.config.json" ]; then
    echo "❌ Error: capacitor.config.json not found. Please run this script from the audiobook-app directory."
    exit 1
fi

# Step 1: Create www folder
echo "📁 Creating www folder..."
mkdir -p www

# Step 2: Copy web assets
echo "📋 Copying web assets to www folder..."
cp index.html style.css app.js manifest.json sw.js mudrosti-db.js desktop-features.js www/

# Step 3: Copy assets folder
echo "🎵 Copying assets folder (this may take a moment due to audio files size)..."
cp -r assets www/

echo "✅ Web assets copied successfully!"

# Step 4: Install npm dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
else
    echo "✓ npm dependencies already installed"
fi

# Step 5: Add Android platform if not already added
if [ ! -d "android" ]; then
    echo "🤖 Adding Android platform..."
    npx cap add android
else
    echo "✓ Android platform already exists"
fi

# Step 6: Sync the project
echo "🔄 Syncing Capacitor project..."
npx cap sync

echo ""
echo "✅ Setup complete! Your Android platform is ready."
echo ""
echo "Next steps:"
echo "  1. Open Android Studio: npx cap open android"
echo "  2. Build APK: Build > Build Bundle(s) / APK(s) > Build APK(s)"
echo "  3. Find APK at: android/app/build/outputs/apk/debug/app-debug.apk"
echo ""
