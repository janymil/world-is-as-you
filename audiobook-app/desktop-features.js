// Desktop-only features for the audiobook app
// This script adds enhanced features for desktop users without affecting mobile

(function () {
    // Check if running on desktop (screen width >= 1024px)
    function isDesktop() {
        return window.innerWidth >= 1024;
    }

    if (!isDesktop()) {
        return; // Don't initialize desktop features on mobile
    }

    // State
    let currentWisdom = null;
    let wisdomRotationInterval = null;
    let listeningStats = {
        totalTime: 0,
        chaptersCompleted: 0,
        currentStreak: 0,
        lastListenDate: null
    };
    let notes = {};
    let waveformBars = [];

    // Load persisted data
    function loadData() {
        try {
            const storedStats = localStorage.getItem('audiobook-stats');
            if (storedStats) {
                listeningStats = JSON.parse(storedStats);
            }

            const storedNotes = localStorage.getItem('audiobook-notes');
            if (storedNotes) {
                notes = JSON.parse(storedNotes);
            }

            // Update streak based on last listen date
            updateStreak();
        } catch (e) {
            console.error('Failed to load data', e);
        }
    }

    // Update streak tracking
    function updateStreak() {
        const today = new Date().toDateString();
        const lastDate = listeningStats.lastListenDate;

        if (!lastDate) {
            // First time listening
            listeningStats.currentStreak = 1;
            listeningStats.lastListenDate = today;
        } else if (lastDate === today) {
            // Already listened today, no change
            return;
        } else {
            // Check if yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (lastDate === yesterdayStr) {
                // Continue streak
                listeningStats.currentStreak++;
                listeningStats.lastListenDate = today;
            } else {
                // Streak broken, restart
                listeningStats.currentStreak = 1;
                listeningStats.lastListenDate = today;
            }
        }

        saveData();
        updateStatsDisplay();
    }

    // Save data
    function saveData() {
        try {
            localStorage.setItem('audiobook-stats', JSON.stringify(listeningStats));
            localStorage.setItem('audiobook-notes', JSON.stringify(notes));
        } catch (e) {
            console.error('Failed to save data', e);
        }
    }

    // Initialize desktop layout
    function initDesktopLayout() {
        // Check if desktop content already exists
        if (document.querySelector('.desktop-content')) {
            return;
        }

        const container = document.querySelector('.app-container');
        if (!container) return;

        // Create desktop content panel
        const desktopContent = document.createElement('div');
        desktopContent.className = 'desktop-content';
        desktopContent.innerHTML = `
            <!-- Wisdom Card -->
            <div class="wisdom-card">
                <div class="quote" id="wisdom-quote">Načítavam múdrosť...</div>
                <div class="author" id="wisdom-author"></div>
                <div class="category-badge" id="wisdom-category"></div>
            </div>

            <!-- Visual Waveform -->
            <div class="waveform-visual">
                <div class="waveform-bars">
                    <div class="waveform-bar" style="height: 30%"></div>
                    <div class="waveform-bar" style="height: 60%"></div>
                    <div class="waveform-bar" style="height: 100%"></div>
                    <div class="waveform-bar" style="height: 70%"></div>
                    <div class="waveform-bar" style="height: 40%"></div>
                    <div class="waveform-bar" style="height: 80%"></div>
                    <div class="waveform-bar" style="height: 50%"></div>
                </div>
            </div>

            <!-- Progress Stats -->
            <div class="stats-panel">
                <div class="stat-item">
                    <div class="value" id="stat-chapters">0</div>
                    <div class="label">Kapitol dokončených</div>
                </div>
                <div class="stat-item">
                    <div class="value" id="stat-time">0</div>
                    <div class="label">Minút počúvania</div>
                </div>
                <div class="stat-item">
                    <div class="value" id="stat-streak">0</div>
                    <div class="label">Denný streak</div>
                </div>
            </div>

            <!-- Notes Panel -->
            <div class="notes-panel">
                <h3>Moje poznámky</h3>
                <textarea id="notes-textarea" placeholder="Zapíš si svoje myšlienky a poznatky z počúvania..."></textarea>
            </div>

            <!-- Subtitles Panel -->
            <div class="subtitles-panel">
                <h3>Prepis <span id="subtitle-status" style="font-size: 0.8rem; color: var(--text-muted);"></span></h3>
                <div id="desktop-subtitles" class="subtitle-display">
                    <div class="subtitle-placeholder">Prepis sa zobrazí po spustení audioknihy...</div>
                </div>
            </div>
        `;

        container.appendChild(desktopContent);
    }

    // Display random wisdom
    function displayWisdom() {
        if (typeof getRandomMudrost !== 'function') {
            console.warn('Mudrosti database not loaded');
            return;
        }

        currentWisdom = getRandomMudrost();

        const quoteEl = document.getElementById('wisdom-quote');
        const authorEl = document.getElementById('wisdom-author');
        const categoryEl = document.getElementById('wisdom-category');

        if (quoteEl && currentWisdom) {
            quoteEl.textContent = `"${currentWisdom.text}"`;
            authorEl.textContent = `— ${currentWisdom.author}`;
            categoryEl.textContent = currentWisdom.category;

            // Fade in animation
            quoteEl.style.opacity = '0';
            setTimeout(() => {
                quoteEl.style.transition = 'opacity 1s ease-in';
                quoteEl.style.opacity = '1';
            }, 100);
        }
    }

    // Start wisdom rotation
    function startWisdomRotation() {
        displayWisdom(); // Show first wisdom immediately

        // Rotate every 45 seconds
        wisdomRotationInterval = setInterval(() => {
            displayWisdom();
        }, 45000);
    }

    // Stop wisdom rotation
    function stopWisdomRotation() {
        if (wisdomRotationInterval) {
            clearInterval(wisdomRotationInterval);
            wisdomRotationInterval = null;
        }
    }

    // Update stats display
    function updateStatsDisplay() {
        const chaptersEl = document.getElementById('stat-chapters');
        const timeEl = document.getElementById('stat-time');
        const streakEl = document.getElementById('stat-streak');

        if (chaptersEl) chaptersEl.textContent = listeningStats.chaptersCompleted;
        if (timeEl) timeEl.textContent = Math.floor(listeningStats.totalTime / 60);
        if (streakEl) streakEl.textContent = listeningStats.currentStreak;
    }

    // Track listening time
    function startTrackingTime() {
        const audio = document.getElementById('audio-player');
        if (!audio) return;

        let lastUpdate = Date.now();

        audio.addEventListener('timeupdate', () => {
            if (!audio.paused && !audio.ended) {
                const now = Date.now();
                const elapsed = (now - lastUpdate) / 1000; // seconds
                if (elapsed >= 1) {
                    listeningStats.totalTime += elapsed;
                    lastUpdate = now;
                    updateStatsDisplay();
                    saveData();
                }
            }
        });

        audio.addEventListener('pause', () => {
            lastUpdate = Date.now();
        });

        audio.addEventListener('play', () => {
            lastUpdate = Date.now();
        });

        // Track chapter completion
        audio.addEventListener('ended', () => {
            listeningStats.chaptersCompleted++;
            updateStatsDisplay();
            saveData();
        });
    }

    // Control waveform animation
    function setupWaveformControl() {
        const audio = document.getElementById('audio-player');
        if (!audio) return;

        // Get waveform bars
        waveformBars = document.querySelectorAll('.waveform-bar');

        // Stop animation when audio pauses
        audio.addEventListener('pause', () => {
            waveformBars.forEach(bar => {
                bar.style.animationPlayState = 'paused';
            });
        });

        // Start animation when audio plays
        audio.addEventListener('play', () => {
            waveformBars.forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        });

        // Reset to paused state initially
        waveformBars.forEach(bar => {
            bar.style.animationPlayState = 'paused';
        });
    }

    // Setup desktop subtitles
    function setupDesktopSubtitles() {
        const audio = document.getElementById('audio-player');
        const mobileTranscript = document.getElementById('active-transcript');
        const desktopSubtitles = document.getElementById('desktop-subtitles');
        const subtitleStatus = document.getElementById('subtitle-status');

        if (!audio || !desktopSubtitles) return;

        let lastText = '';

        // Create observer to watch mobile transcript changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    const text = mobileTranscript.textContent.trim();
                    
                    // Only update if text actually changed
                    if (text && text.length > 0 && text !== lastText) {
                        desktopSubtitles.innerHTML = `<div class="subtitle-text">${text}</div>`;
                        lastText = text;
                        
                        if (subtitleStatus && subtitleStatus.textContent !== '(aktívne)') {
                            subtitleStatus.textContent = '(aktívne)';
                            subtitleStatus.style.color = 'var(--accent-cyan)';
                        }
                    }
                }
            });
        });

        // Observe mobile transcript for changes
        if (mobileTranscript) {
            observer.observe(mobileTranscript, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }

    // Handle notes
    function setupNotes() {
        const textarea = document.getElementById('notes-textarea');
        if (!textarea) return;

        // Load notes for current chapter
        function loadChapterNotes() {
            const titleEl = document.getElementById('current-track-title');
            if (!titleEl) return;

            const chapter = titleEl.textContent;
            textarea.value = notes[chapter] || '';
        }

        // Save notes
        textarea.addEventListener('input', () => {
            const titleEl = document.getElementById('current-track-title');
            if (!titleEl) return;

            const chapter = titleEl.textContent;
            notes[chapter] = textarea.value;
            saveData();
        });

        // Listen for track changes
        const audio = document.getElementById('audio-player');
        if (audio) {
            audio.addEventListener('loadedmetadata', loadChapterNotes);
        }

        loadChapterNotes();
    }

    // Initialize all desktop features
    function init() {
        loadData();
        initDesktopLayout();

        // Wait for DOM to be fully loaded
        setTimeout(() => {
            startWisdomRotation();
            updateStatsDisplay();
            startTrackingTime();
            setupWaveformControl();
            setupDesktopSubtitles();
            setupNotes();
        }, 500);
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (isDesktop() && !document.querySelector('.desktop-content')) {
                init();
            } else if (!isDesktop() && document.querySelector('.desktop-content')) {
                // Remove desktop features if resized to mobile
                const desktopContent = document.querySelector('.desktop-content');
                if (desktopContent) {
                    desktopContent.remove();
                }
                stopWisdomRotation();
            }
        }, 250);
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
