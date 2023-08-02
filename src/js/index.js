// get the login button and logout button
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const registerButton = document.getElementById('register-button');
const playerlist = document.getElementById('player-list');
const chatbot = document.getElementById('chatbot');


window.showAlert = function(event) {
    event.preventDefault();
    alert('준비 중입니다 :)');
}

// 로그인 상태 확인
// 페이지 로드시 로그인 상태 확인
function checkLoginStatus() {
    const token = localStorage.getItem('token');

    if (token) {
        // We are logged in, hide the login button and show the logout button
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        logoutButton.style.display = 'block';
        chatbot.style.display = 'block';
    } else {
        // Not logged in, hide the logout button and show the login button
        logoutButton.style.display = 'none';
        chatbot.style.display = 'none';
        loginButton.style.display = 'block';
        registerButton.style.display = 'block';
    }
}

// set event handler on button
function logoutUser() {
    // remove the token and check login status
    localStorage.removeItem('token');
    checkLoginStatus();
}


loginButton.onclick = checkLoginStatus;
logoutButton.onclick = logoutUser;
playerlist.onclick = window.showAlert;

// check login status on page load
checkLoginStatus();
