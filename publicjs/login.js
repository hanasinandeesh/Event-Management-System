document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Redirect to dashboard on successful login
        window.location.href = '/dashboard';
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  