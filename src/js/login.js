// login.js
document.getElementById('login-form').addEventListener('submit', async event => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://www.s3a1.com/user/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        alert('Logged in successfully');
        // You can redirect user to another page after successful login
        window.location.href = '/index.html';
    } else {
        alert('Failed to log in');
    }
});
