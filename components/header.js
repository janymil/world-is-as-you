document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('shared-header');
    if (!container) return;

    // Header copied from index.html so reusable header matches the page
    container.innerHTML = `
    <nav class="shared-nav">
        <a class="logo" href="index.html">The World is as You Are</a>

        <div class="nav-links">
            <a href="index.html">Domov</a>
            <a href="index.html#about-book">O KNIHE</a>
            <a href="index.html#chapters">KAPITOLY</a>
        </div>

        <div class="nav-actions">
            <div class="search-box">
                <input id="siteSearchInput" placeholder="Hľadať..." aria-label="Search" />
                <button id="siteSearchBtn" class="search-btn" aria-label="Search button"><i class="fas fa-search"></i></button>
            </div>
            <a href="Uvod.html" class="cta-btn">ZAČAŤ ČÍTAŤ</a>
        </div>
    </nav>
    `;

    // Wire search: Enter or button navigates to search page with query
    const input = container.querySelector('#siteSearchInput');
    const btn = container.querySelector('#siteSearchBtn');
    function runSearch() {
        const q = (input && input.value || '').trim();
        if (!q) return;
        location.href = `search.html?q=${encodeURIComponent(q)}`;
    }
    if (input) input.addEventListener('keydown', (e) => { if (e.key === 'Enter') runSearch(); });
    if (btn) btn.addEventListener('click', runSearch);
});
