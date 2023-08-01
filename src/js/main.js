// Local Application Library
import Gpt from './chatGPT.js';
// import Login from './login.js';


// Loading Library
import { LoadingWithMask, closeLoadingWithMask } from './loading.js';


// DOM 로그인
const loginButton = document.getElementById('login-button');

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
