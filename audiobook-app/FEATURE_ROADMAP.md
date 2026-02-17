# Audiobook App Feature Roadmap

Mobile-optimized enhancements for the "Svet je taký, aký som ja" audiobook app. All features designed with limited mobile screen space in mind.

---

## 🚀 **Phase 1: Core Features (High Priority)**

### 1. **Swipe Gesture Navigation**
- **Description**: Navigate between chapters with left/right swipe gestures
- **Benefits**: More intuitive mobile UX, reduces button tapping
- **Implementation**: Add touch event listeners for swipe detection
- **Screen Space**: No additional UI elements needed
- **Status**: Not Started

### 2. **Bookmarks/Timestamps**
- **Description**: Tap to bookmark a specific moment in a chapter with optional notes
- **Features**:
  - Quick bookmark icon during playback
  - Save timestamp with custom note
  - View all bookmarks in collapsible sidebar
  - Jump to bookmarked moments
- **Benefits**: Users can save important passages
- **Screen Space**: Icon-based, collapsible sidebar
- **Status**: Not Started

### 3. **Playback Speed Control**
- **Description**: Speed adjustment (0.75x, 1x, 1.25x, 1.5x)
- **Implementation**: 
  - Hidden in settings menu or long-press play button
  - Show current speed as indicator
  - Accessible via collapsible menu
- **Benefits**: Let listeners skip slow parts or slow down for understanding
- **Screen Space**: Minimal - icon with dropdown
- **Status**: Not Started

### 4. **Sleep Timer**
- **Description**: Auto-stop playback after X minutes or after current chapter
- **Options**:
  - 15 min, 30 min, 1 hour, or "End of Chapter"
  - Visual countdown
- **Benefits**: Essential for listening before bed
- **Screen Space**: Settings dropdown menu
- **Status**: Not Started

### 5. **Resume Last Played**
- **Description**: Auto-load last chapter and position when app opens
- **Implementation**: Store chapter index and timestamp in localStorage
- **Benefits**: Seamless continuity between sessions
- **Screen Space**: None - background feature
- **Status**: Not Started

---

## 🎯 **Phase 2: Enhanced Features (Medium Priority)**

### 6. **Download Manager**
- **Description**: Download chapters for offline listening
- **Features**:
  - Show download status with small badge/icon per chapter
  - Download queue management
  - Free up storage by deleting chapters
  - Sync downloads across devices
- **Benefits**: Listen without internet (crucial for commutes/travel)
- **Screen Space**: Small badges next to chapter titles
- **Status**: Not Started
- **Note**: Requires significant storage (~100MB+ per chapter)

### 7. **Auto-Pause on Disconnect**
- **Description**: Pause playback when headphones are unplugged
- **Implementation**: Monitor headphone jack or Bluetooth disconnect events
- **Benefits**: Saves battery, prevents audio playing to speakers accidentally
- **Screen Space**: None - background feature
- **Status**: Not Started

### 8. **Lock Screen Controls**
- **Description**: Show player controls on device lock screen
- **Implementation**: Use Capacitor native plugins for lock screen integration
- **Benefits**: Control playback without unlocking phone
- **Screen Space**: System-level feature
- **Status**: Not Started

### 9. **Background Playback**
- **Description**: Continue playing when screen locks or app minimized
- **Implementation**: Enable audio playback in background
- **Benefits**: Standard audiobook app behavior
- **Screen Space**: None - system feature
- **Status**: Needs Verification (may already be enabled)

### 10. **Battery Saver Mode**
- **Description**: Reduce visual effects, animations for lower power consumption
- **Features**:
  - Disable animations
  - Reduce refresh rate
  - Pure black background option (for OLED phones)
  - Dim brightness suggestions
- **Benefits**: Extended listening time on low battery
- **Screen Space**: Settings toggle only
- **Status**: Not Started

---

## 💎 **Phase 3: Premium Features (Nice to Have)**

### 11. **Chapter Notes**
- **Description**: Quick notes per chapter with timestamps
- **Features**:
  - Swipe up from player to access notes panel
  - Save notes per chapter
  - Edit/delete notes
  - Export notes as text
- **Benefits**: Document insights, reflections from reading
- **Screen Space**: Swipe-accessible, hidden by default
- **Status**: Not Started

### 12. **Playback History**
- **Description**: View recently played chapters with resume option
- **Features**:
  - "Recently Played" quick access from home
  - Statistics: hours listened, chapters completed
  - Timeline view of listening
- **Benefits**: Discover where you left off
- **Screen Space**: Collapsible widget
- **Status**: Not Started

### 13. **Smart Skip Controls**
- **Description**: Skip forward/backward by 15s or 30s
- **Implementation**:
  - Long-press play button to reveal skip options
  - Or dedicated skip buttons (if space permits)
- **Benefits**: Fine-grained control over playback position
- **Screen Space**: Hidden by default or compactible
- **Status**: Not Started

### 14. **Dark Mode Variants**
- **Description**: Multiple theme options for different lighting conditions
- **Options**:
  - Pure Black (OLED optimization)
  - Dark Gray (current theme)
  - High Contrast Mode
  - Sepia tone option
- **Benefits**: Eye comfort in different environments, accessibility
- **Screen Space**: Settings menu
- **Status**: Partially Complete (dark mode exists)

### 15. **Haptic Feedback**
- **Description**: Vibration feedback on button presses and state changes
- **Features**:
  - Toggle haptics on/off
  - Different vibration patterns for different actions
- **Benefits**: Tactile feedback improves responsiveness feel
- **Screen Space**: Settings toggle
- **Status**: Not Started

### 16. **Share Impressive Moments**
- **Description**: Share quotes or moments from transcripts via social media
- **Features**:
  - Highlight text in transcript
  - Create share-card with quote + chapter info
  - Pre-filled social media captions
- **Benefits**: Community building, viral potential
- **Screen Space**: Transcript share button
- **Status**: Not Started

### 17. **Cloud Sync (Future)**
- **Description**: Sync bookmarks, progress, settings across devices
- **Requirements**: Backend server, user authentication
- **Benefits**: Pick up on tablet/desktop, continue on phone
- **Status**: Not Started / Requires Infrastructure

---

## 📊 **Feature Comparison Table**

| Feature | Effort | Impact | Mobile-Friendly | Priority |
|---------|--------|--------|-----------------|----------|
| Swipe Navigation | Low | High | ✅ Yes | 1 |
| Bookmarks | Medium | High | ✅ Yes | 2 |
| Speed Control | Low | High | ✅ Yes | 3 |
| Sleep Timer | Low | High | ✅ Yes | 4 |
| Resume Last Played | Low | Medium | ✅ Yes | 5 |
| Download Manager | High | High | ✅ Yes | 6 |
| Auto-Pause on Disconnect | Low | Medium | ✅ Yes | 7 |
| Lock Screen Controls | Medium | Medium | ✅ Yes | 8 |
| Background Playback | Low | High | ✅ Yes | 9 |
| Battery Saver | Medium | Medium | ✅ Yes | 10 |
| Chapter Notes | Medium | Medium | ✅ Yes | 11 |
| Playback History | Low | Low | ✅ Yes | 12 |
| Smart Skip Controls | Low | Medium | ✅ Yes | 13 |
| Dark Mode Variants | Medium | Low | ✅ Yes | 14 |
| Haptic Feedback | Low | Low | ✅ Yes | 15 |
| Share Moments | Medium | Low | ✅ Yes | 16 |
| Cloud Sync | High | High | ⚠️ Maybe | 17 |

---

## 🎯 **Recommended Implementation Order**

### **Week 1-2: Quick Wins**
1. Resume Last Played (5 min)
2. Swipe Navigation (2-3 hours)
3. Playback Speed Control (2 hours)

### **Week 3-4: Core Features**
4. Sleep Timer (1-2 hours)
5. Bookmarks System (4-6 hours)
6. Auto-Pause on Headphone Disconnect (1 hour)

### **Week 5+: Polish & Premium**
7. Download Manager (8-12 hours) - *Complex feature*
8. Lock Screen Controls (3-4 hours)
9. Haptic Feedback (1-2 hours)
10. Additional themes & refinements

---

## 💾 **Data Storage Considerations**

For persistent features (bookmarks, notes, progress):
- Use **localStorage** for client-side storage (bookmarks, timestamps, settings)
- Use **IndexedDB** for larger storage needs (downloaded chapters, full notes)
- Structure: `bookmarks = { chapterIndex, timestamp, note, createdAt }`

---

## 🔄 **Version Planning**

- **v1.1**: Swipe navigation, Resume gameplay, Speed control
- **v1.2**: Sleep timer, Bookmarks, Auto-pause
- **v1.3**: Download manager, Settings improvements
- **v2.0**: Cloud sync, sharing, premium features

---

## 📝 **Notes**

- All features designed to NOT clutter the mobile screen
- Use icons, collapsible menus, and gestures to stay compact
- Test on small screens (4-5 inches) regularly
- Prioritize touch-friendly interactions over text labels
- Consider accessibility (visible labels via aria-labels even if hidden)

---

**Last Updated**: February 16, 2026
