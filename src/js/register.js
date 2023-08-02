
document.getElementById('register-form').addEventListener('submit', async event => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const nickname = document.getElementById('nickname').value || "";

    const response = await fetch('https://www.s3a1.com/user/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, nickname }),
    });

    if (response.ok) {
        const data = await response.json();
        alert('Register in successfully');
        // You can redirect user to another page after successful login
        window.location.href = '/login.html';
    } else {
        const errorData = await response.json(); // the response body contains the error messages
        let errorMessage = 'Failed to register'; // default error message

        // DRF validation errors are typically nested under the field name, but this might vary
        if (errorData.username) {
            errorMessage = errorData.username.join(' ');
        } else if (errorData.password) {
            errorMessage = errorData.password.join(' ');
        } else if (errorData.non_field_errors) { // non_field_errors is a common key for non-specific field errors
            errorMessage = errorData.non_field_errors.join(' ');
        }

        alert(errorMessage);
    }
});