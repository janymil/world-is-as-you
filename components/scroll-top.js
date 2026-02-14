/**
 * Scroll to Top Component
 * Injects a scroll-to-top button into the page.
 */

(function() {
    // Create the button element
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.title = 'Scroll to Top';
    
    // Initial styles
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '30px';
    scrollBtn.style.right = '30px';
    scrollBtn.style.width = '50px';
    scrollBtn.style.height = '50px';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.backgroundColor = 'var(--accent-gold, #fbbf24)'; // Fallback color
    scrollBtn.style.color = '#0f172a'; // Dark text/icon
    scrollBtn.style.border = 'none';
    scrollBtn.style.outline = 'none';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.display = 'none'; // Hidden by default
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.justifyContent = 'center';
    scrollBtn.style.fontSize = '1.2rem';
    scrollBtn.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.4)';
    scrollBtn.style.zIndex = '9999';
    scrollBtn.style.transition = 'all 0.3s ease';
    scrollBtn.style.opacity = '0';
    scrollBtn.style.transform = 'translateY(20px)';

    // Hover effects
    scrollBtn.onmouseover = function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px rgba(251, 191, 36, 0.6)';
    };
    scrollBtn.onmouseout = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(251, 191, 36, 0.4)';
    };

    // Append to body
    document.body.appendChild(scrollBtn);

    // Scroll Logic
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollBtn.style.display = 'flex';
            // Small delay to allow display:flex to apply before opacity transition
            setTimeout(() => {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'translateY(0)';
            }, 10);
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(20px)';
            setTimeout(() => {
                if (scrollBtn.style.opacity === '0') {
                    scrollBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Click Event
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

})();
