const dynamicBlockContent = document.getElementById('dynamic-block-content');

      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', function (event) {
          event.preventDefault();

          const tabName = this.getAttribute('data-tab');
          loadContent(tabName);
        });
      });

      
      function loadContent(tabName) {
        
        const filePath = `content/${tabName}.html`;

        fetch(filePath)
          .then(response => response.text())
          .then(content => {
            dynamicBlockContent.querySelector('#content-container').innerHTML = content;
          })
          .catch(error => console.error('Error loading content:', error));
      }