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



// 사용자가 로그인했는지 확인
// 사용자가 로그인했는지 여부를 결정하는 로직을 구현해야 합니다.
if (checkLoginStatus()) {
    const token = localStorage.getItem('token');

    axios.get('https://www.s3a1.com/user/conversations/', {
        headers: { 'Authorization': `Bearer ${token}` }  // 헤더에 토큰 포함
    })
        .then(response => {
        const conversationsDiv = document.getElementById('conversations-list');
        const conversations = response.data;

        conversations.forEach(conversation => {
            // 대화 데이터의 구조에 따라 이 부분을 조정해야 할 수 있습니다.
            const conversationDiv = document.createElement('div');
            conversationDiv.innerHTML = `
                <p>질문: ${conversation.prompt}</p>
                <p>응답: ${conversation.response}</p>
                <a href="conversations/${conversation.id}/">자세히 보기</a>
            `;

            conversationsDiv.appendChild(conversationDiv);
        });
    })
    .catch(error => {
    console.error('대화를 가져오는 중 오류 발생:', error);
    });
}
