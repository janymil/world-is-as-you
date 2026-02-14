document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shared-header');
    if (!container) return;

    container.innerHTML = `
    <nav class="shared-nav">
        <div class="logo">The World is as You Are</div>
        <div class="nav-links">
            <a href="index.html">Domov</a>
            <a href="Uvod.html">O Knihe</a>
            <a href="#chapters">Kapitoly</a>
        </div>
        <div class="nav-actions">
            <div class="search-container">
                <input id="siteSearchInput" placeholder="Hľadať kapitoly..." aria-label="Search" />
                <div id="siteSearchResults" class="search-results" aria-hidden="true"></div>
            </div>
            <a href="Uvod.html" class="cta-btn">Začať Čítať</a>
        </div>
    </nav>
    `;

    // basic styling hook for shared nav (keeps styles local to pages' stylesheet)
});
