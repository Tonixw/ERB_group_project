const itemData = [
      { name: 'jade', url: '/product_jade.html' },
      { name: 'fairytale forever', url: '/product_fairytale.html' },
      { name: 'overload', url: '/product_overload.html' },
      { name: 'pink moment', url: '/product_pink.html' },
      { name: 'summer happiness', url: '/product_summer.html' },
      { name: 'champagne roses', url: '/product_champagne.html' },
      { name: 'luna', url: '/product_luna.html' },
      { name: 'elegant twist', url: '/product_elegant.html' },
      { name: 'i\'m with you', url: '/product_withyou.html' },
      { name: 'warm respect', url: '/product_respect.html' },
      { name: 'devotion', url: '/product_devotion.html' },
      { name: 'fruit flower mix', url: '/product_fruitful.html' }
    ];

    const searchInput = document.getElementById('searchInput');
    const items = document.querySelectorAll('.item');

    searchInput.addEventListener('input', function () {
      const searchTerm = searchInput.value.toLowerCase();

      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });

    items.forEach(item => {
      item.addEventListener('click', function () {
        const url = item.getAttribute('url');
        if (url) {
          window.location.href = url;
        }
      });
    });

    function searchItems() {
      const searchTerm = searchInput.value.toLowerCase();
      const matchedItem = itemData.find(item => item.name.toLowerCase().includes(searchTerm));

      if (matchedItem) {
        window.location.href = matchedItem.url;
      } else {
        alert('無匹配嘅項目！');
      }
    }

    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchItems();
      }
    });