document.addEventListener("DOMContentLoaded", function () {
  function handleMouseMove(event) {
    const navbar = document.getElementById('navbar');
    const mouseY = event.clientY;

    if (mouseY <= 100) {
      navbar.classList.add('show');
    } else {
      navbar.classList.remove('show');
    }
  }

  document.addEventListener('mousemove', handleMouseMove);

  const particlesElement = document.getElementById('particles-js');

  document.body.addEventListener('click', function (event) {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: event.clientX, // Capture mouse X coordinate
      clientY: event.clientY, // Capture mouse Y coordinate
    });

    particlesElement.dispatchEvent(clickEvent);
  });

  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();

      const tabName = this.getAttribute('data-tab');
      loadContent(tabName);

      document.addEventListener('mousemove', handleMouseMove);
    });
  });

  function loadContent(tabName) {
    const filePath = `content/${tabName}.html`;

    fetch(filePath)
      .then(response => response.text())
      .then(content => {
        document.getElementById('content-container').innerHTML = content;
      })
      .catch(error => console.error('Error loading content:', error));
  }
});
