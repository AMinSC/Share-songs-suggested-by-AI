/** chatGPT 의 질문을 업데이트 해주고 답변을 웹페이지에 제공 */
class Gpt {
    /**
     * chatGPT API를 활용하여 질문하는 클래스입니다.
     * @param {Element} $chatList - 답변을 그려줄곳의 요소값입니다.
     * @param {string} question - chatGPT에게 하는 질문입니다.
     */
    constructor($chatList, question, userId) {
        this.$chatList = $chatList;
        this.question = question;
        this.userId = userId;
        this.openAIUrl = `https://www.s3a1.com/chatbot/`;

        this.data = [
            {
                "user": this.userId,
                "role": "system",
                "prompt": "assistant는 팝송노래 전문가이다."
            },
        ];

        // 화면에 뿌려줄 (질문)데이터
        this.questionData = [];
        
        // 질문을 업데이트 함
        this.sendQuestion(this.question);
    }

    /**
     * 질문을 입력받고, 질문 쿼리에 push하는 함수
     * @param {string} question - chatGPT에게 하는 질문 
     */
    sendQuestion(question) {
        if (question) {
            this.data.push({
                user: this.userId,
                role: "user",
                prompt: question,
            });
            this.questionData.push({
                user: this.userId,
                role: "user",
                prompt: question,
            });
        }
    }

    /**
     * 화면에 답변 그려주는 함수
     * @param {string} answer - GPT의 답변을 받습니다.
     */
    answerRender(answer) {
        // 기존 결과를 빈 값으로 처리한 후 갱신
        if (document.querySelector('#answerPoint .answer')) {
            document.querySelector('#answerPoint .answer').remove()
        }
        const li = document.createElement("li");
        li.classList.add("answer");
        li.innerText = answer;
        this.$chatList.appendChild(li);
    }
    /**
     * api 요청보내는 함수
     * api key 노출을 방지하기 위해, Netlify 서버리스 기능을 활용
     * @returns - chatGPT 답변중 노래 리스트만 추출해서 반환합니다.
     */
    async apiPost() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const requestBody = {
                conversations: this.data.map(conversation => ({
                    user: userId,
                    role: conversation.role,
                    prompt: conversation.prompt,
                })),
            };
            const response = await fetch(this.openAIUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    // "userId": userId,
                },
                body: JSON.stringify(requestBody),
                redirect: "follow"
            });
                const result = await response.json();
                this.answer = result.conversation[2].prompt;
                this.answerRender(this.answer);
            } catch (err) {
                console.log(err);
        }
    }
}

export default Gpt;
