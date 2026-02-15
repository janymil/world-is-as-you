document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shared-header');
    if (!container) return;

    // Header Structure: Clean separate of Desktop and Mobile visual elements
    container.innerHTML = `
    <nav class="shared-nav">
        
        <!-- --- DESKTOP LOGO --- -->
        <a class="logo logo-desktop" href="index.html">The World is as You Are</a>
        
        <!-- --- MOBILE LOGO (Icon Only) --- -->
        <a class="logo logo-mobile" href="index.html" aria-label="Home">
            <i class="fas fa-globe"></i>
        </a>

        <!-- --- DESKTOP NAVIGATION --- -->
        <div class="nav-links desktop-only">
            <a href="index.html">Domov</a>
            <a href="index.html#about-book">O KNIHE</a>
            <a href="index.html#chapters">KAPITOLY</a>
            <a href="https://realita.mywire.org/audiobook-app" target="_blank">AUDIO KNIHA</a>
        </div>

        <!-- --- RIGHT SIDE ACTIONS --- -->
        <div class="nav-actions">
            
            <!-- Desktop Search (Input + Button) -->
            <div class="search-box desktop-only">
                <input id="siteSearchInput" placeholder="Hľadať..." aria-label="Search" />
                <button id="siteSearchBtn" class="search-btn" aria-label="Search button"><i class="fas fa-search"></i></button>
            </div>

            <!-- Desktop CTA Button -->
            <a href="Uvod.html" class="cta-btn desktop-only">ZAČAŤ ČÍTAŤ</a>

            <!-- --- MOBILE ICONS GROUP --- -->
            <div class="mobile-icons">
                <!-- Mobile Search Icon -->
                <button class="icon-btn mobile-search-trigger" aria-label="Search">
                    <i class="fas fa-search"></i>
                </button>

                <!-- Mobile 'Read Book' Icon -->
                <a href="Uvod.html" class="icon-btn mobile-read-btn" aria-label="Start Reading">
                    <i class="fas fa-book-open"></i>
                </a>

                <!-- Hamburger Menu -->
                <button class="hamburger" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

        </div>

        <!-- --- MOBILE FULLSCREEN OVERLAY --- -->
        <div class="mobile-menu-overlay">
            
            <!-- Close Button inside Overlay -->
            <button class="close-menu-btn" aria-label="Close Menu">&times;</button>

            <div class="mobile-menu-content">
                
                <!-- Search Inside Menu -->
                <div class="mobile-search-bar">
                    <input id="mobileSearchInput" placeholder="Hľadať..." />
                    <button id="mobileSearchBtn"><i class="fas fa-search"></i></button>
                </div>

                <div class="mobile-nav-links">
                    <a href="index.html" class="mobile-link">Domov</a>
                    <a href="index.html#about-book" class="mobile-link">O KNIHE</a>
                    <a href="index.html#chapters" class="mobile-link">KAPITOLY</a>
                    <a href="https://realita.mywire.org/audiobook-app" class="mobile-link" target="_blank">AUDIO KNIHA</a>
                    <a href="Uvod.html" class="mobile-link highlight-link">ZAČAŤ ČÍTAŤ</a>
                </div>
            </div>
        </div>

    </nav>
    `;

    // --- LOGIC ---

    const hamburger = container.querySelector('.hamburger');
    const closeBtn = container.querySelector('.close-menu-btn');
    const mobileMenu = container.querySelector('.mobile-menu-overlay');
    const searchTrigger = container.querySelector('.mobile-search-trigger');
    const mobileSearchInput = container.querySelector('#mobileSearchInput');

    // Toggle Menu Function
    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');

        if (isActive) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        } else {
            mobileMenu.classList.add('active');
            hamburger.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    // Search Trigger (Opens menu and focuses search)
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
            setTimeout(() => {
                if (mobileSearchInput) mobileSearchInput.focus();
            }, 300);
        });
    }

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // --- SEARCH FUNCTIONALITY ---
    const siteInput = container.querySelector('#siteSearchInput');
    const siteBtn = container.querySelector('#siteSearchBtn');
    const mobInput = container.querySelector('#mobileSearchInput');
    const mobBtn = container.querySelector('#mobileSearchBtn');

    function runSearch(inputEl) {
        const q = (inputEl && inputEl.value || '').trim();
        if (!q) return;
        location.href = `search.html?q=${encodeURIComponent(q)}`;
    }

    if (siteInput) siteInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(siteInput); });
    if (siteBtn) siteBtn.addEventListener('click', () => { runSearch(siteInput); });

    if (mobInput) mobInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(mobInput); });
    if (mobBtn) mobBtn.addEventListener('click', () => { runSearch(mobInput); });

});
