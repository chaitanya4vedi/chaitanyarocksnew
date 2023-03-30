const toggleButton = document.getElementById('dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (toggleButton) toggleButton.checked = true;
} else if (currentTheme == 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (toggleButton) toggleButton.checked = false;
}

toggleButton.addEventListener('click', function() {
    let theme = 'light';
    if (document.documentElement.getAttribute('data-theme') === 'light') {
        theme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

if (!currentTheme) {
    if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
