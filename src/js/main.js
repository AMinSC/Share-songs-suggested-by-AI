// Local Application Library
import Gpt from './chatGPT.js';
// import Login from './login.js';


// Loading Library
import { LoadingWithMask, closeLoadingWithMask } from './loading.js';


// DOM 요소(질문 가이드)
const $radioButtons = document.querySelectorAll("input[type='radio']");
// DOM 요소를 변수에 지정
const $input = document.querySelector('input');
const $form = document.querySelector('form');

// youtubeIFramePlayer에 YT가 완전히 호출되도록 해결하는 함수.
const ytReady = new Promise(function (resolve) {
    // 호출 시 Promise를 해결합니다.
    window.onYouTubeIframeAPIReady = function () {
        resolve();
    };
});

// 안내 문구
// main.js
window.showAlert = function(event) {
    event.preventDefault();
    alert('준비 중입니다 :)');
}
const playerListLink = document.querySelector('.menu');
playerListLink.addEventListener('click', showAlert);


// HTML 폼에서 submit 이벤트를 처리하는 코드
$form.addEventListener('submit', async e => {
    e.preventDefault();
    // DOM 요소(질문 가이드 : 목적 작성 후 값 가져오기)
    const $textField = document.getElementById('target').value;

    // 체크박스에서 선택된 값을 가져옵니다.
    const selectedYears = [];
    $radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            selectedYears.push(radioButton.id);
        }
    });
    $input.value = null;
    LoadingWithMask('../asset/Infinity-0.8s-200px.gif');
    // GPT 질문 정의 + 목적이 없을(빈 칸)경우 default값 주기
    let question;
    if ($textField) {
        question = `${selectedYears}에 인기있던 '${$textField}'에 맞는 감성적인 팝송 리스트 10개 추천 해줘`;
    }
    else {
        question = `${selectedYears}에 인기있던 "새벽에 듣기 좋은"에 맞는 감성적인 팝송 리스트 10개 추천 해줘`;
    }


    // GPT 인스턴스 변수 생성
    const InstanceGpt = new Gpt(document.querySelector('#answerPoint'), question);
    const answer = await InstanceGpt.apiPost();
    closeLoadingWithMask();
});



// 로그인 상태 확인
function checkLoginStatus() {
    const token = localStorage.getItem('token');

    if (token) {
        // 로그인된 상태임, 로그인 버튼을 숨기고 로그아웃 버튼을 보여줌
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        // 로그인되지 않은 상태임, 로그아웃 버튼을 숨기고 로그인 버튼을 보여줌
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
    }
}

// 로그인 버튼과 로그아웃 버튼을 가져옴
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');

// 버튼에 이벤트 핸들러 설정
loginButton.onclick = checkLoginStatus;
logoutButton.onclick = function() {
    localStorage.removeItem('token');
    checkLoginStatus();
}

// 페이지 로드시 로그인 상태 확인
checkLoginStatus();

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
        localStorage.setItem('token', data.token);  // 토큰을 로컬 스토리지에 저장
        alert('Logged in successfully');
        // 로그인 성공 후 다른 페이지로 리다이렉트
        window.location.href = '/index.html';
    } else {
        alert('Failed to log in');
    }
});

