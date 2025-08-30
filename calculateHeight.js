function setBodyHeightVariable() {
    const height = document.body.scrollHeight;
    document.documentElement.style.setProperty('--body-height', `${height}px`);
  }
  
  // Initial setzen
  setBodyHeightVariable();
  
  // Bei Änderungen neu setzen
  const resizeObserver = new ResizeObserver(setBodyHeightVariable);
  resizeObserver.observe(document.body);
  
  // Optional: auch bei Window-Resize updaten
  window.addEventListener('resize', setBodyHeightVariable);