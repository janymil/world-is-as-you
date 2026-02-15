# How to Convert Web App to Android App (APK)

Since your project is built with standard HTML/CSS/JS, the best way to turn it into a mobile app is using **Capacitor**. It wraps your web code into a native Android container.

## Prerequisites
1.  **Node.js**: You need Node.js installed on your computer.
2.  **Android Studio**: You MUST have Android Studio installed to build the final .apk/.aab file.

## Step 1: Initialize Project
Open a terminal in your `audiobook-app` folder and run these commands:

```bash
# 1. Initialize a generic Node.js project
npm init -y

# 2. Install Capacitor core and cli
npm install @capacitor/core
npm install -D @capacitor/cli

# 3. Initialize Capacitor (App Name and Package ID)
# Package ID must be unique (e.g., com.yourname.audiobook)
npx cap init "My Audiobook" "com.mysite.audiobook"
```

## Step 2: Configure Web Directory
Capacitor needs to know where your HTML files are.
1.  Open `capacitor.config.json` (created in Step 1).
2.  Change `"webDir": "www"` to `"webDir": "."` (or wherever your index.html is; usually `.` for simple projects, or `dist` if using a bundler).
    *   *Note: For a simple folder like this, it's safer to move your source files (`index.html`, `style.css`, `app.js`, `assets`) into a subfolder named `www` or `dist` to avoid syncing node_modules.*

## Step 3: Add Android Platform
```bash
# Install android package
npm install @capacitor/android

# Add the platform
npx cap add android
```

## Step 4: Sync and Build
Every time you change your HTML/JS code, you run:
```bash
npx cap sync
```

## Step 5: Open in Android Studio
```bash
npx cap open android
```
This will launch Android Studio. From there:
1.  Wait for Gradle sync to finish.
2.  Connect your phone via USB (with USB Debugging on) or use an Emulator.
3.  Click the green **Run (Play)** button to install the app on your phone.
4.  To build an APK file: Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.

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
    *   App Icon (512x512 PNG)
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
