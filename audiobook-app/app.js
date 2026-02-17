// Playlist Configuration
const CHAPTERS = [
    {
        title: "Úvod",
        subtitle: "Svet je taký, aký som ja",
        file: "assets/intro-slovak.mp3",
        srt: "assets/intro-slovak.srt"
    },
    {
        title: "Kapitola 1",
        subtitle: "Kto som?",
        file: "assets/1kapitola-kto-som.mp3",
        srt: "assets/1kapitola-kto-som.srt"
    },
    {
        title: "Kapitola 2",
        subtitle: "Zrkadlo",
        file: "assets/2kapitola-zrkadlo.mp3",
        srt: "assets/2kapitola-zrkadlo.srt"
    },
    {
        title: "Kapitola 3",
        subtitle: "Ako si podmaniť realitu",
        file: "assets/3kapitola-ako-si-podmanit-realitu.mp3",
        srt: "assets/3kapitola-ako-si-podmanit-realitu.srt"
    },
    {
        title: "Kapitola 4",
        subtitle: "Emócie",
        file: "assets/4kapitola-emocie.mp3",
        srt: "assets/4kapitola-emocie.srt"
    },
    {
        title: "Kapitola 5",
        subtitle: "Čas",
        file: "assets/5kapitola-time.mp3",
        srt: "assets/5kapitola-time.srt"
    },
    {
        title: "Kapitola 6",
        subtitle: "Okolnosti",
        file: "assets/6kapitola-okolnosti.mp3",
        srt: "assets/6kapitola-okolnosti.srt"
    },
    {
        title: "Kapitola 7",
        subtitle: "Negatívny hybný moment",
        file: "assets/7kapitola-negativny-moment.mp3",
        srt: "assets/7kapitola-negativny-moment.srt"
    },
    {
        title: "Kapitola 8",
        subtitle: "Preskúmaj Svoje Presvedčenia",
        file: "assets/8kapitola-presvedcenia.mp3",
        srt: "assets/8kapitola-presvedcenia.srt"
    },
    {
        title: "Kapitola 9",
        subtitle: "Postoj Víťaza",
        file: "assets/9kapitola-postoj-vitaza.mp3",
        srt: "assets/9kapitola-postoj-vitaza.srt"
    },
    {
        title: "Kapitola 10",
        subtitle: "Prevezmi Zodpovednosť",
        file: "assets/10kapitola-zodpovednost.mp3",
        srt: "assets/10kapitola-zodpovednost.srt"
    },
    {
        title: "Kapitola 11",
        subtitle: "Falošní Bohovia",
        file: "assets/11kapitola-falosni-bohovia.mp3",
        srt: "assets/11kapitola-falosni-bohovia.srt"
    }
];

// App State
let currentChapterIndex = 0;
let isPlaying = false;
let continuousPlayback = true; // Auto-play next chapter
let searchIndex = []; // Stores all parsed subtitles for search
let currentSubtitles = []; // Stores subtitles for current track to display

// Feature: Speed Control
let playbackSpeed = 1;

// Feature: Bookmarks
let bookmarks = []; // Array of {chapterIndex, timestamp, note, createdAt}

// Feature: Sleep Timer
let sleepTimerID = null;
let sleepTimerSeconds = 0;
let sleepTimerMode = null; // 'timer' or 'endOfChapter'

// --- STORAGE FUNCTIONS (LocalStorage) ---

function saveProgress() {
    localStorage.setItem('audiobook_lastChapter', currentChapterIndex);
    localStorage.setItem('audiobook_lastTimestamp', audio.currentTime);
}

function loadProgress() {
    const savedChapter = localStorage.getItem('audiobook_lastChapter');
    const savedTimestamp = localStorage.getItem('audiobook_lastTimestamp');
    if (savedChapter !== null) {
        return { chapter: parseInt(savedChapter), timestamp: parseFloat(savedTimestamp) };
    }
    return null;
}

function saveBookmarks() {
    localStorage.setItem('audiobook_bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const saved = localStorage.getItem('audiobook_bookmarks');
    bookmarks = saved ? JSON.parse(saved) : [];
}

function addBookmark(chapterIndex, timestamp, note = '') {
    bookmarks.push({
        id: Date.now(),
        chapterIndex,
        timestamp,
        note,
        chapterTitle: CHAPTERS[chapterIndex].title,
        createdAt: new Date().toISOString()
    });
    saveBookmarks();
    return bookmarks[bookmarks.length - 1];
}

function deleteBookmark(bookmarkId) {
    bookmarks = bookmarks.filter(b => b.id !== bookmarkId);
    saveBookmarks();
}

function savePlaybackSpeed() {
    localStorage.setItem('audiobook_speed', playbackSpeed);
}

function loadPlaybackSpeed() {
    const saved = localStorage.getItem('audiobook_speed');
    playbackSpeed = saved ? parseFloat(saved) : 1;
}

// DOM Elements
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');
const titleEl = document.getElementById('current-track-title');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistEl = document.getElementById('playlist');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const searchResultsEl = document.getElementById('search-results');
const transcriptEl = document.getElementById('active-transcript');

// --- INITIALIZATION ---

async function initApp() {
    loadBookmarks();
    loadPlaybackSpeed();
    
    // Load last played chapter and position
    const progress = loadProgress();
    if (progress) {
        currentChapterIndex = progress.chapter;
    }
    
    renderPlaylist();
    loadTrack(currentChapterIndex, false);
    
    // Restore playback speed
    audio.playbackRate = playbackSpeed;
    
    // Restore timestamp after track loads
    if (progress) {
        audio.addEventListener('canplay', () => {
            audio.currentTime = progress.timestamp;
            updateSpeedControlUI();
        }, { once: true });
    }
    
    await buildSearchIndex();
    setupEventListeners();
    updateContinuousPlaybackIcon();
}

// Toggle continuous playback
function toggleContinuousPlayback() {
    continuousPlayback = !continuousPlayback;
    updateContinuousPlaybackIcon();
}

// Update continuous playback icon
function updateContinuousPlaybackIcon() {
    const btn = document.getElementById('continuous-playback-btn');
    if (btn) {
        const icon = btn.querySelector('i');
        if (continuousPlayback) {
            btn.classList.add('active');
            btn.setAttribute('title', 'Kontinuálne prehrávanie: Zapnuté');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('title', 'Kontinuálne prehrávanie: Vypnuté');
        }
    }
}

// --- PLAYER LOGIC ---

function renderPlaylist() {
    playlistEl.innerHTML = '';
    CHAPTERS.forEach((chapter, index) => {
        const li = document.createElement('li');
        li.className = `playlist-item ${index === currentChapterIndex ? 'active' : ''}`;
        li.innerHTML = `
            <div class="chapter-info">
                <div class="title">${chapter.title}</div>
                <div class="subtitle">${chapter.subtitle}</div>
            </div>
            <div class="play-icon">
                <i class="fas ${index === currentChapterIndex && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
            </div>
        `;
        li.onclick = () => {
            if (index === currentChapterIndex) {
                togglePlay();
            } else {
                loadTrack(index, true);
            }
        };
        playlistEl.appendChild(li);
    });
}

async function loadTrack(index, autoPlay = true) {
    currentChapterIndex = index;
    const chapter = CHAPTERS[index];

    audio.src = chapter.file;
    titleEl.textContent = `${chapter.title} - ${chapter.subtitle}`;

    // Reset Transcript
    currentSubtitles = [];
    transcriptEl.style.display = 'none';
    transcriptEl.textContent = '';

    // Load SRT if available
    if (chapter.srt) {
        try {
            const response = await fetch(chapter.srt);
            if (response.ok) {
                const text = await response.text();
                currentSubtitles = parseSRT(text);
            }
        } catch (e) {
            console.error("Failed to load SRT", e);
        }
    }

    renderPlaylist(); // Update active state

    // Load the audio before attempting to play
    audio.load();

    if (autoPlay) {
        // Wait for audio to be ready before playing
        const playWhenReady = () => {
            audio.play().catch((error) => {
                console.log('Autoplay prevented:', error);
                // User interaction required, show play button ready
                isPlaying = false;
                renderPlaylist();
            });
        };

        // If audio is already ready, play immediately
        if (audio.readyState >= 3) { // HAVE_FUTURE_DATA or greater
            playWhenReady();
        } else {
            // Otherwise, wait for canplay event
            audio.addEventListener('canplay', playWhenReady, { once: true });
        }
    }

    // Update Media Session (Lock Screen Controls)
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: chapter.title,
            artist: "Audiokniha",
            album: chapter.subtitle,
            artwork: [
                { src: 'https://via.placeholder.com/512?text=Audiobook', sizes: '512x512', type: 'image/png' }
            ]
        });

        navigator.mediaSession.setActionHandler('play', togglePlay);
        navigator.mediaSession.setActionHandler('pause', togglePlay);
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            if (currentChapterIndex > 0) loadTrack(currentChapterIndex - 1);
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            if (currentChapterIndex < CHAPTERS.length - 1) loadTrack(currentChapterIndex + 1);
        });
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);

    // Update Subtitles
    if (currentSubtitles.length > 0) {
        const subtitle = currentSubtitles.find(s => currentTime >= s.start && currentTime <= s.end);
        if (subtitle) {
            transcriptEl.textContent = subtitle.text;
            transcriptEl.style.display = 'block';
        } else {
            // Optional: Keep last subtitle or clear? Clearing looks cleaner.
            // transcriptEl.textContent = ''; 
        }
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// --- SRT PARSER & SEARCH ---

function parseSRT(srtData) {
    // Normalize line endings
    const normalizedData = srtData.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const pattern = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\n([\s\S]*?)(?=\n\n|\n$|$)/g;
    const result = [];
    let match;
    while ((match = pattern.exec(normalizedData)) !== null) {
        result.push({
            id: match[1],
            start: timeToSeconds(match[2]),
            end: timeToSeconds(match[3]),
            text: match[4].replace(/\n/g, ' ').trim()
        });
    }
    return result;
}

function timeToSeconds(timeString) {
    const [time, ms] = timeString.split(',');
    const [h, m, s] = time.split(':').map(Number);
    return h * 3600 + m * 60 + s + parseInt(ms) / 1000;
}

async function buildSearchIndex() {
    searchIndex = [];
    for (let i = 0; i < CHAPTERS.length; i++) {
        if (CHAPTERS[i].srt) {
            try {
                const response = await fetch(CHAPTERS[i].srt);
                if (response.ok) {
                    const text = await response.text();
                    const parsed = parseSRT(text);
                    // Add chapter index to each subtitle object
                    parsed.forEach(p => {
                        searchIndex.push({
                            ...p,
                            chapterIndex: i,
                            chapterTitle: CHAPTERS[i].title
                        });
                    });
                }
            } catch (e) {
                console.warn(`Could not load SRT for indexing: ${CHAPTERS[i].title}`);
            }
        }
    }
    console.log(`Indexed ${searchIndex.length} subtitle segments.`);
}

function performSearch(query) {
    if (!query || query.length < 2) {
        searchResultsEl.innerHTML = '<div class="empty-state">Zadajte aspoň 2 znaky...</div>';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchIndex.filter(item => item.text.toLowerCase().includes(lowerQuery));

    if (results.length === 0) {
        searchResultsEl.innerHTML = '<div class="empty-state">Žiadne výsledky sa nenašli.</div>';
        return;
    }

    searchResultsEl.innerHTML = '';
    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'search-result-item';

        // Highlight logic
        const text = item.text;
        const regex = new RegExp(`(${query})`, 'gi');
        const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');

        div.innerHTML = `
            <div class="result-timestamp">
                ${item.chapterTitle} • ${formatTime(item.start)}
            </div>
            <div class="result-text">${highlightedText}</div>
        `;

        div.onclick = () => {
            // Close search
            document.getElementById('search-overlay').classList.remove('open');
            // Play track
            if (currentChapterIndex !== item.chapterIndex) {
                loadTrack(item.chapterIndex, false).then(() => {
                    audio.currentTime = item.start;
                    audio.play();
                });
            } else {
                audio.currentTime = item.start;
                audio.play();
            }
        };
        searchResultsEl.appendChild(div);
    });
}


// --- BACKGROUND MUSIC LOGIC ---

const bgAudio = document.getElementById('bg-music-player');
const ambienceToggleBtn = document.getElementById('ambience-toggle');
const ambiencePopup = document.getElementById('ambience-popup');
const ambienceVolumeSlider = document.getElementById('ambience-volume');
const ambienceEnableBtn = document.getElementById('ambience-enable-btn'); // New

let isAmbienceEnabled = false;

// Initialize Background Music
// TODO: User must add 'meditation.mp3' to the assets folder!
bgAudio.src = "assets/meditation.mp3";
bgAudio.volume = 0.3; // Default volume matching slider

function toggleAmbienceUI() {
    ambiencePopup.classList.toggle('open');
}

function toggleAmbienceState() {
    isAmbienceEnabled = !isAmbienceEnabled;

    // Update UI
    ambienceToggleBtn.classList.toggle('active', isAmbienceEnabled);
    if (ambienceEnableBtn) {
        ambienceEnableBtn.innerHTML = isAmbienceEnabled ?
            '<i class="fas fa-toggle-on" style="color:var(--accent-gold)"></i>' :
            '<i class="fas fa-toggle-off" style="color:#666"></i>';
    }

    // Sync with playback
    if (isAmbienceEnabled && isPlaying) {
        bgAudio.play().catch(e => console.log("Bg Audio play failed (interaction needed)", e));
    } else {
        bgAudio.pause();
    }
}

// Sync Background Audio with Main Player
function syncBackgroundAudio(shouldPlay) {
    if (isAmbienceEnabled) {
        if (shouldPlay) {
            bgAudio.play().catch(() => { });
        } else {
            bgAudio.pause();
        }
    }
}

// --- SWIPE GESTURE DETECTION ---

let touchStartX = 0;
let touchEndX = 0;

function detectSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next chapter
            if (currentChapterIndex < CHAPTERS.length - 1) {
                loadTrack(currentChapterIndex + 1);
            }
        } else {
            // Swiped right - previous chapter
            if (currentChapterIndex > 0) {
                loadTrack(currentChapterIndex - 1);
            }
        }
    }
}

// --- SPEED CONTROL ---

function setPlaybackSpeed(speed) {
    playbackSpeed = speed;
    audio.playbackRate = speed;
    savePlaybackSpeed();
    updateSpeedControlUI();
}

function updateSpeedControlUI() {
    const buttons = document.querySelectorAll('.speed-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.speed == playbackSpeed) {
            btn.classList.add('active');
        }
    });
}

// --- BOOKMARKS ---

function toggleBookmarkCurrentPosition() {
    const existingBookmark = bookmarks.find(
        b => b.chapterIndex === currentChapterIndex && 
        Math.abs(b.timestamp - audio.currentTime) < 1
    );
    
    if (existingBookmark) {
        deleteBookmark(existingBookmark.id);
        alert('Záložka bol odstránená');
    } else {
        addBookmark(currentChapterIndex, audio.currentTime);
        alert('Záložka bola vytvoreného');
    }
    updateBookmarkUI();
}

function updateBookmarkUI() {
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const bookmarksList = document.getElementById('bookmarks-list');
    
    if (!bookmarksList) return;
    
    // Check if current position is bookmarked
    const isBookmarked = bookmarks.some(
        b => b.chapterIndex === currentChapterIndex && 
        Math.abs(b.timestamp - audio.currentTime) < 1
    );
    
    if (bookmarkBtn) {
        bookmarkBtn.classList.toggle('bookmarked', isBookmarked);
    }
    
    // Update bookmarks list
    bookmarksList.innerHTML = '';
    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<div class="empty-state">Žiadne záložky</div>';
        return;
    }
    
    bookmarks.forEach(bookmark => {
        const div = document.createElement('div');
        div.className = 'bookmark-item';
        div.innerHTML = `
            <div class="bookmark-info">
                <div class="bookmark-chapter">${bookmark.chapterTitle}</div>
                <div class="bookmark-time">${formatTime(bookmark.timestamp)}</div>
                ${bookmark.note ? `<div class="bookmark-note">${bookmark.note}</div>` : ''}
            </div>
            <button class="bookmark-delete-btn" data-id="${bookmark.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        div.addEventListener('click', (e) => {
            if (!e.target.closest('.bookmark-delete-btn')) {
                loadTrack(bookmark.chapterIndex);
                setTimeout(() => {
                    audio.currentTime = bookmark.timestamp;
                }, 100);
            }
        });
        
        div.querySelector('.bookmark-delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteBookmark(bookmark.id);
            updateBookmarkUI();
        });
        
        bookmarksList.appendChild(div);
    });
}

// --- SLEEP TIMER ---

function setSleepTimer(mode, duration) {
    // Clear existing timer
    if (sleepTimerID) {
        clearTimeout(sleepTimerID);
    }
    
    sleepTimerMode = mode;
    sleepTimerSeconds = duration;
    
    if (mode === 'timer' && duration > 0) {
        sleepTimerID = setTimeout(() => {
            audio.pause();
            isPlaying = false;
            renderPlaylist();
            alert(`Spánková časovač skončil. Prehrávanie zastavené.`);
            sleepTimerMode = null;
            sleepTimerSeconds = 0;
            updateSleepTimerUI();
        }, duration * 1000);
    } else if (mode === 'endOfChapter') {
        // Will be handled in 'ended' event
    }
    
    updateSleepTimerUI();
}

function updateSleepTimerUI() {
    const timerSelect = document.getElementById('sleep-timer-select');
    if (timerSelect) {
        timerSelect.value = sleepTimerMode || '';
    }
}

// --- EVENT LISTENERS ---

function setupEventListeners() {
    // Audio Events
    audio.addEventListener('ended', () => {
        // Handle sleep timer "end of chapter" mode
        if (sleepTimerMode === 'endOfChapter') {
            audio.pause();
            isPlaying = false;
            renderPlaylist();
            alert(`Spánková časovač: Koniec kapitoly. Prehrávanie zastavené.`);
            sleepTimerMode = null;
            updateSleepTimerUI();
            return;
        }
        
        if (continuousPlayback && currentChapterIndex < CHAPTERS.length - 1) {
            // Auto-play next chapter
            loadTrack(currentChapterIndex + 1, true);
        } else {
            // Stop playback
            isPlaying = false;
            renderPlaylist();
            syncBackgroundAudio(false); // Stop bg music at end
        }
    });

    audio.addEventListener('timeupdate', (e) => {
        updateProgress(e);
        // Auto-save progress every 5 seconds
        if (Math.floor(audio.currentTime) % 5 === 0) {
            saveProgress();
        }
    });

    audio.addEventListener('play', () => {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        renderPlaylist();
        syncBackgroundAudio(true);
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        renderPlaylist();
        syncBackgroundAudio(false);
        saveProgress();
    });

    // Swipe gesture listeners
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        detectSwipe();
    }, false);

    // Controls
    playBtn.addEventListener('click', togglePlay);

    prevBtn.addEventListener('click', () => {
        if (audio.currentTime > 5) {
            audio.currentTime = 0;
        } else {
            if (currentChapterIndex > 0) loadTrack(currentChapterIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentChapterIndex < CHAPTERS.length - 1) loadTrack(currentChapterIndex + 1);
    });

    // Continuous Playback Toggle
    const continuousBtn = document.getElementById('continuous-playback-btn');
    if (continuousBtn) {
        continuousBtn.addEventListener('click', toggleContinuousPlayback);
    }

    progressContainer.addEventListener('click', setProgress);

    // Search Toggle
    document.getElementById('search-toggle-btn').addEventListener('click', () => {
        document.getElementById('search-overlay').classList.add('open');
        setTimeout(() => document.getElementById('search-input').focus(), 100);
    });

    document.getElementById('close-search-btn').addEventListener('click', () => {
        document.getElementById('search-overlay').classList.remove('open');
    });

    // Search Input
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // --- AMBIENCE LISTENERS ---

    // Toggle Popup
    ambienceToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAmbienceUI();
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (!ambiencePopup.contains(e.target) && !ambienceToggleBtn.contains(e.target)) {
            ambiencePopup.classList.remove('open');
        }
    });

    // Enable/Disable Switch
    if (ambienceEnableBtn) {
        ambienceEnableBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAmbienceState();
        });
    }

    // --- SPEED CONTROL LISTENERS ---
    const speedToggleBtn = document.getElementById('speed-toggle-btn');
    const speedMenu = document.getElementById('speed-menu');
    
    if (speedToggleBtn) {
        speedToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            speedMenu.classList.toggle('open');
        });
    }
    
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setPlaybackSpeed(parseFloat(btn.dataset.speed));
            speedMenu.classList.remove('open');
        });
    });
    
    // Close speed menu when clicking outside
    document.addEventListener('click', (e) => {
        if (speedMenu && !speedMenu.contains(e.target) && !speedToggleBtn.contains(e.target)) {
            speedMenu.classList.remove('open');
        }
    });

    // --- BOOKMARK LISTENERS ---
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', toggleBookmarkCurrentPosition);
    }

    const bookmarksPanel = document.getElementById('bookmarks-panel');
    const closeBookmarksBtn = document.getElementById('close-bookmarks-btn');
    
    if (closeBookmarksBtn) {
        closeBookmarksBtn.addEventListener('click', () => {
            if (bookmarksPanel) {
                bookmarksPanel.classList.remove('open');
            }
        });
    }
    
    // Add books panel toggle to header or playlist for access
    const bookmarksToggleBtn = document.getElementById('bookmarks-toggle-btn');
    if (bookmarksToggleBtn) {
        bookmarksToggleBtn.addEventListener('click', () => {
            if (bookmarksPanel) {
                bookmarksPanel.classList.toggle('open');
            }
        });
    }
    
    // Close bookmarks panel when clicking the panel background
    if (bookmarksPanel) {
        bookmarksPanel.addEventListener('click', (e) => {
            if (e.target === bookmarksPanel) {
                bookmarksPanel.classList.remove('open');
            }
        });
    }

    // --- SLEEP TIMER LISTENERS ---
    const sleepTimerSelect = document.getElementById('sleep-timer-select');
    if (sleepTimerSelect) {
        sleepTimerSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value === 'endOfChapter') {
                setSleepTimer('endOfChapter', 0);
            } else if (value) {
                const seconds = parseInt(value);
                setSleepTimer('timer', seconds);
            } else {
                setSleepTimer(null, 0);
            }
        });
    }

    // Volume Slider
    ambienceVolumeSlider.addEventListener('input', (e) => {
        bgAudio.volume = e.target.value;
    });

}

// Start
initApp();
