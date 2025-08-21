    function openModal() {
      signupModal.style.display = 'flex';
    }

    function closeModal() {
      signupModal.style.display = 'none';
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      document.getElementById('email').value = '';
    }

    function submitSignup() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      if (!username || !password || !email) {
        alert('請填寫所有欄位！');
        return;
      }

      closeModal();
      successMessage.style.display = 'block';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000); 
    }