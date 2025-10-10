// theme.js - Dark mode toggle with localStorage persistence

(function() {
    'use strict';
    
    // Get saved theme from localStorage or default to 'light'
    const getSavedTheme = () => {
        return localStorage.getItem('theme') || 'light';
    };
    
    // Apply theme to document
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update button text and icon if button exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-toggle-icon');
            const text = themeToggle.querySelector('.theme-toggle-text');
            
            if (theme === 'dark') {
                if (icon) icon.textContent = '☀️';
                if (text) text.textContent = 'Modalità Chiara';
                themeToggle.setAttribute('aria-label', 'Passa alla modalità chiara');
            } else {
                if (icon) icon.textContent = '🌙';
                if (text) text.textContent = 'Modalità Scura';
                themeToggle.setAttribute('aria-label', 'Passa alla modalità scura');
            }
        }
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        
        // Add a subtle animation class
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    };
    
    // Apply theme immediately on page load (before DOM is ready)
    applyTheme(getSavedTheme());
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Create and inject the top bar if it doesn't exist
        if (!document.querySelector('.top-bar')) {
            createTopBar();
        }
        
        // Set up the toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            
            // Apply the correct theme and button state
            applyTheme(getSavedTheme());
        }
    });
    
    // Create top bar HTML
    function createTopBar() {
        const topBar = document.createElement('div');
        topBar.className = 'top-bar';
        topBar.innerHTML = `
            <div class="top-bar-info">
                <div class="top-bar-name">Kimi Ergulec</div>
                <div class="top-bar-university">Università di Verona</div>
            </div>
            <button id="theme-toggle" class="theme-toggle" aria-label="Passa alla modalità scura">
                <span class="theme-toggle-icon">🌙</span>
                <span class="theme-toggle-text">Modalità Scura</span>
            </button>
        `;
        
        // Insert at the beginning of body
        document.body.insertBefore(topBar, document.body.firstChild);
    }
    
    // Handle system theme preference changes
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', (e) => {
        // Only apply system preference if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
})();