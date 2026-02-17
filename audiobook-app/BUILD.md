# Quick Build Instructions

## Prerequisites
- Android Studio must be installed
- Node.js and npm (already available)

## First Time Setup

Before building for the first time, you need to set up the `www` folder and Android platform.

### Automated Setup (Recommended)

**On Linux/Mac:**
```bash
./setup-android.sh
```

**On Windows:**
```bash
setup-android.bat
```

**Or using npm:**
```bash
npm install
npm run setup
```

This will automatically create the `www` folder, copy all assets, and set up the Android platform.

### Manual Setup

If you prefer to do it manually:

1. **Create www folder:**
   ```bash
   mkdir -p www
   ```

2. **Copy files to www:**
   ```bash
   cp index.html style.css app.js mudrosti-db.js desktop-features.js sw.js manifest.json www/
   cp -r assets www/
   ```

3. **Install dependencies and add platform:**
   ```bash
   npm install
   npx cap add android
   npx cap sync
   ```

## Build APK

Once setup is complete, you can build the APK.

### Step 1: Copy any changes to www directory
```bash
npm run prepare-www
```

Or manually:
```bash
cp index.html style.css app.js mudrosti-db.js desktop-features.js sw.js manifest.json www/
cp -r assets www/
```

**Important**: The assets directory is large (~423MB with all audio files). The initial copy may take a moment.

### Step 2: Sync Capacitor
```bash
npm run sync
```

### Step 3: Build in Android Studio
```bash
npm run build:android
```

This will open Android Studio. Then:
1. Wait for Gradle sync to complete
2. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Click "locate" when build completes
4. APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Alternative: Command Line Build
```bash
cd android
./gradlew assembleDebug
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## For Production Release
Use **Build > Generate Signed Bundle / APK** in Android Studio to create a signed release build for the Google Play Store.

See [GUIDE_TO_APK.md](GUIDE_TO_APK.md) for complete documentation.
