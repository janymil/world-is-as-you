# How to Convert Web App to Android App (APK)

Since your project is built with standard HTML/CSS/JS, the best way to turn it into a mobile app is using **Capacitor**. It wraps your web code into a native Android container.

## ✅ Setup Complete!

The Capacitor project has been set up and is ready to build! The following has been configured:

- ✅ Capacitor installed and initialized
- ✅ Android platform added
- ✅ PNG icons created (192x192 and 512x512)
- ✅ manifest.json updated with PNG icons
- ✅ Project synced and ready to build

## Quick Start - Building Your APK

### Option 1: Using Android Studio (Recommended for APK)

1. **Sync the project** (if you made any changes to web files):
   ```bash
   npm run sync
   ```

2. **Open in Android Studio**:
   ```bash
   npm run build:android
   ```
   Or manually:
   ```bash
   cd /path/to/audiobook-app
   npx cap open android
   ```

3. **Build the APK in Android Studio**:
   - Wait for Gradle sync to finish
   - Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**
   - Once complete, click "locate" to find your APK file
   - The APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`

4. **Install on your device**:
   - Transfer the APK to your Android phone
   - Enable "Install from Unknown Sources" in Settings
   - Open and install the APK

### Option 2: Using Gradle Command Line (No Android Studio UI)

If you have Android Studio installed but prefer command line:

```bash
cd android
./gradlew assembleDebug
```

The APK will be created at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Making Changes to Your Web App

Whenever you modify the web files (HTML, CSS, JS):

1. Update the source files (NOT in the `www` folder)
2. Copy them to `www`:
   ```bash
   # Copy individual files
   cp index.html www/
   cp style.css www/
   cp app.js www/
   
   # Or copy all at once
   cp index.html style.css app.js mudrosti-db.js desktop-features.js sw.js manifest.json www/
   cp -r assets www/
   ```

3. Sync with Capacitor:
   ```bash
   npm run sync
   ```

## Project Structure

```
audiobook-app/
├── index.html              # Source files (edit these)
├── style.css
├── app.js
├── mudrosti-db.js
├── desktop-features.js
├── sw.js
├── manifest.json
├── assets/                 # Audio files and icons
│   ├── icon-192.png       # Generated PNG icons
│   ├── icon-512.png
│   └── *.mp3, *.srt
├── www/                    # Build directory (auto-generated, don't edit)
├── android/                # Android project (auto-generated)
├── package.json
├── capacitor.config.json
└── .gitignore
```

## Prerequisites

1. **Node.js**: Already installed ✅
2. **Android Studio**: You MUST have Android Studio installed to build the final .apk/.aab file.
   - Download from: https://developer.android.com/studio

## Initial Setup (Already Done!)

The following steps have already been completed for this project:

```bash
# 1. Initialize Node.js project
npm init -y

# 2. Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# 3. Initialize Capacitor
npx cap init "Svet si ty audiokniha" "com.worldisasyou.audiobook" --web-dir="www"

# 4. Create PNG icons
convert assets/logo.svg -resize 192x192 assets/icon-192.png
convert assets/logo.svg -resize 512x512 assets/icon-512.png

# 5. Add Android platform
npx cap add android

# 6. Sync project
npx cap sync
```

---

# Google Play Store Requirements

To publish your app to the Google Play Store, you need:

## 1. Developer Account
*   Link: [Google Play Console](https://play.google.com/console)
*   Cost: **$25 USD** (one-time registration fee).
*   Identity verification is required.

## 2. Signed App Bundle (.aab)
*   For the store, you don't upload an `.apk` anymore. You upload an `.aab` (Android App Bundle).
*   In Android Studio: **Build > Generate Signed Bundle / APK**.
*   You will need to create a "Keystore" file (keep this safe! If you lose it, you can't update your app).

## 3. Store Listing Details
*   **App Title**: up to 30 characters.
*   **Short Description**: up to 80 characters.
*   **Full Description**: up to 4000 characters.
*   **Graphics**:
    *   App Icon (512x512 PNG) ✅ Already created
    *   Feature Graphic (1024x500 PNG)
    *   Phone Screenshots (min 2)
    *   Tablet Screenshots (optional but recommended)

## 4. Legal & Privacy
*   **Privacy Policy**: You must host a Privacy Policy (a simple web page) URL and link it in the store listing. Since your app uses local files and (presumably) doesn't collect data, the policy is simple, but still required.

## 5. Content Rating
*   You must complete a quick questionnaire about your content (violence, language, etc.) to get an age rating (e.g., PEGI 3, Everyone).

## Important Technical Note: Background Audio
By default, web apps often stop playing audio when the screen turns off to save battery.
*   To fix this in Capacitor, you might need to install a specific plugin like `capacitor-community/media`.
*   You will also need to configure "Background Modes" in Android Studio manifest settings.

## Troubleshooting

### "www is not a valid value for webDir"
Make sure you have copied your web files to the `www` directory and `capacitor.config.json` has `"webDir": "www"`.

### Changes not appearing in the app
Run `npm run sync` to copy updated files to the Android project.

### Gradle sync failed
Make sure Android Studio is properly installed with the Android SDK. Check the error messages in Android Studio.

## Available NPM Scripts

- `npm run sync` - Sync web assets to native platform
- `npm run copy` - Copy web assets without updating plugins
- `npm run build:android` - Sync and open in Android Studio
- `npm run update` - Update Capacitor dependencies
