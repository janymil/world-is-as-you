document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('siteSearchInput');
    const results = document.getElementById('siteSearchResults');
    if (!input || !results) return;

    // Build a lightweight index for chapters/pages. Update range if you add more chapters.
    const pages = [
        { title: 'Domov', path: 'index.html' },
        { title: 'Úvod', path: 'Uvod.html' },
    ];
    for (let i = 1; i <= 23; i++) {
        pages.push({ title: `Kapitola ${i}`, path: `Kapitola${i}.html` });
    }

    function renderMatches(list) {
        if (list.length === 0) {
            results.innerHTML = '<div class="no-results">Nenašlo sa nič</div>';
            results.setAttribute('aria-hidden', 'false');
            return;
        }
        results.innerHTML = list.map(p => `<a class="result-item" href="${p.path}">${p.title}</a>`).join('');
        results.setAttribute('aria-hidden', 'false');
    }

    input.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ''; results.setAttribute('aria-hidden', 'true'); return; }
        const matches = pages.filter(p => p.title.toLowerCase().includes(q) || p.path.toLowerCase().includes(q));
        renderMatches(matches.slice(0, 10));
    });

    // close results on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            results.innerHTML = '';
            results.setAttribute('aria-hidden', 'true');
        }
    });
});
