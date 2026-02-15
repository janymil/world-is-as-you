# Audiobook App Project

This is a separate project for the mobile audiobook app.

## Project Structure
- `index.html`: The main app interface.
- `style.css`: Styles specific to this app.
- `app.js`: Logic for the player, playlist, and search.
- `assets/`: Contains .mp3 and .srt (subtitles) files.

## How to run
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
