document.addEventListener("DOMContentLoaded", function () {
  function handleMouseMove(event) {
    const navbar = document.getElementById('navbar');
    const mouseY = event.clientY;
    const mouseYVH = (mouseY / window.innerHeight) * 100;

    const iframe = document.querySelector('iframe');
    const iframeRect = iframe.getBoundingClientRect();
    const isMouseOverIframe = (
      event.clientX >= iframeRect.left &&
      event.clientX <= iframeRect.right &&
      event.clientY >= iframeRect.top &&
      event.clientY <= iframeRect.bottom
    );

    if (mouseYVH > 100 || isMouseOverIframe) {
      navbar.classList.remove('show');
    } else {
      navbar.classList.add('show');
    }
  }

  document.addEventListener('mousemove', handleMouseMove);

  document.body.addEventListener('click', function (event) {
    const particlesElement = document.getElementById('particles-js');

    // Create a click event with mouse coordinates
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: event.clientX,
      clientY: event.clientY,
    });

    // Dispatch the click event to particles-js
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
