# Quick Build Instructions

## Prerequisites
- Android Studio must be installed
- Node.js and npm (already available)

## Build APK

### Step 1: Copy any changes to www directory
```bash
cp index.html style.css app.js mudrosti-db.js desktop-features.js sw.js manifest.json www/
cp -r assets www/
```

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
