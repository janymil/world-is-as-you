# Audiobook App Project

This is a separate project for the mobile audiobook app.

## Project Structure
- `index.html`: The main app interface.
- `style.css`: Styles specific to this app.
- `app.js`: Logic for the player, playlist, and search.
- `assets/`: Contains .mp3 and .srt (subtitles) files.

## Setup for Android APK Build

Before building the Android APK, you need to set up the `www` folder and Android platform.

### Automated Setup (Recommended)

**Using npm (cross-platform):**
```bash
npm install
npm run setup
```

**Or using shell scripts:**

**On Linux/Mac:**
```bash
./setup-android.sh
```

**On Windows:**
```bash
setup-android.bat
```

All methods will:
1. Create the `www` folder
2. Copy all web assets to `www`
3. Install npm dependencies (if needed)
4. Add the Android platform
5. Sync the Capacitor project

### Manual Setup

If you prefer to set up manually, follow these steps:

1. **Create www folder and copy files:**
   ```bash
   mkdir -p www
   cp index.html style.css app.js manifest.json sw.js mudrosti-db.js desktop-features.js www/
   cp -r assets www/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Add Android platform:**
   ```bash
   npx cap add android
   ```

4. **Sync the project:**
   ```bash
   npx cap sync
   ```

## How to run (Web Development)
Since this app loads subtitle files (.srt) dynamically, it needs to be served via a local web server to avoid browser security restrictions (CORS) when opening file:// directly.

### Option 1: VS Code Live Server
If you use VS Code, right-click `index.html` and choose "Open with Live Server".

### Option 2: Python
Open a terminal in this folder and run:
`python -m http.server`

1. Open `http://localhost:8000` in your browser.

## Features
- **Audio Playback**: Custom player controls with progress bar.
- **Full Text Search**: Search for keywords in the audio content (requires .srt files).
- **Deep Linking**: Clicking a search result jumps directly to that timestamp in the audio.
- **Mobile First**: Designed to feel like a native mobile app.
