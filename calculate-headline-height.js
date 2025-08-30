document.addEventListener('DOMContentLoaded', function () {
    const headlineWrapper = document.querySelector('.headline-wrapper');
    const headline = headlineWrapper.querySelector('h1');

    // Maße ermitteln
    const height = headline.offsetHeight;
    const width = headline.offsetWidth;

    // Inline-Styles auf Wrapper setzen (optional)
    headlineWrapper.style.height = height + 'px';
    headlineWrapper.style.width = width + 'px';

    // CSS-Variablen setzen
    document.documentElement.style.setProperty('--headline-height', height + 'px');
    document.documentElement.style.setProperty('--headline-width', width + 'px');
  });