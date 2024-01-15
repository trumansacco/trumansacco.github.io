document.addEventListener("DOMContentLoaded", function () {
  function handleMouseMove(event) {
    const navbar = document.getElementById('navbar');
    const bodyRect = document.body.getBoundingClientRect();
    const mouseYRelativeToBody = event.clientY - bodyRect.top;

    if (mouseYRelativeToBody > 0) {
      navbar.classList.remove('show');
    } else {
      navbar.classList.add('show');
    }
  }

  document.addEventListener('mousemove', handleMouseMove);

  document.body.addEventListener('click', function () {
    const particlesElement = document.getElementById('particles-js');
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
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
