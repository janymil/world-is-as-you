document.addEventListener("DOMContentLoaded", function () {
    const footerContainer = document.getElementById('shared-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <div class="footer-note" style="margin-top: 3rem; margin-bottom: 2rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; max-width: 800px; margin-left: auto; margin-right: auto; text-align: left;">
                <div style="display: flex; gap: 1rem; align-items: start;">
                    <i class="fas fa-book-reader" style="color: #94a3b8; font-size: 1.2rem; margin-top: 3px;"></i>
                    <div>
                        <h5 style="color: #cbd5e1; margin-bottom: 0.5rem; font-family: 'Montserrat', sans-serif;">Poznámka k "Hlbším rozborom"</h5>
                        <p style="font-size: 0.9rem; color: #94a3b8; margin: 0; line-height: 1.5;">
                            Tieto sekcie sú určené pre čitateľov, ktorí hľadajú logické a racionálne vysvetlenia metafyzických princípov. 
                            Ak intuitívne rezonujete s posolstvom knihy, nie je nevyhnutné ich študovať. Slúžia ako most pre myseľ, ktorá potrebuje dôkazy.
                        </p>
                    </div>
                </div>
            </div>
            <p style="margin-top: 2rem; color: #64748b; font-size: 0.8rem; text-align: center;">&copy; 2026 The World is as You Are. Všetky práva vyhradené.</p>
        `;
    }
});
