// 單字測驗資料
const quizData = [
    {
        word: "ability",
        options: ["能力", "年齡", "地址", "憤怒"],
        correct: 0
    },
    {
        word: "about",
        options: ["之後", "大約", "單獨", "全部"],
        correct: 1
    },
    {
        word: "abroad",
        options: ["生氣的", "害怕的", "在國外", "古代的"],
        correct: 2
    },
    {
        word: "accept",
        options: ["演出", "建議", "拒絕", "接受"],
        correct: 3
    },
    {
        word: "accident",
        options: ["意外事故", "冒險", "地址", "年齡"],
        correct: 0
    },
    {
        word: "achieve",
        options: ["害怕", "完成", "增加", "演出"],
        correct: 1
    },
    {
        word: "action",
        options: ["地址", "建議", "行動", "年齡"],
        correct: 2
    },
    {
        word: "active",
        options: ["害怕的", "生氣的", "安靜的", "活躍的"],
        correct: 3
    },
    {
        word: "actor",
        options: ["演員", "醫生", "老師", "警察"],
        correct: 0
    },
    {
        word: "address",
        options: ["行動", "地址", "時間", "建議"],
        correct: 1
    },
    {
        word: "adult",
        options: ["小孩", "學生", "成年人", "老師"],
        correct: 2
    },
    {
        word: "advantage",
        options: ["缺點", "問題", "困難", "優點"],
        correct: 3
    },
    {
        word: "adventure",
        options: ["冒險", "日常", "工作", "學習"],
        correct: 0
    },
    {
        word: "advice",
        options: ["命令", "建議", "規則", "要求"],
        correct: 1
    },
    {
        word: "afraid",
        options: ["開心的", "生氣的", "害怕的", "興奮的"],
        correct: 2
    },
    {
        word: "afternoon",
        options: ["早上", "晚上", "中午", "下午"],
        correct: 3
    },
    {
        word: "age",
        options: ["年齡", "時間", "日期", "季節"],
        correct: 0
    },
    {
        word: "agree",
        options: ["反對", "同意", "質疑", "懷疑"],
        correct: 1
    },
    {
        word: "aid",
        options: ["傷害", "阻礙", "幫助", "打擾"],
        correct: 2
    },
    {
        word: "air",
        options: ["水", "土", "火", "空氣"],
        correct: 3
    },
    {
        word: "airport",
        options: ["機場", "車站", "港口", "站牌"],
        correct: 0
    },
    {
        word: "alarm",
        options: ["電視", "鬧鐘", "收音機", "手機"],
        correct: 1
    },
    {
        word: "alive",
        options: ["死的", "睡著的", "活著的", "生病的"],
        correct: 2
    },
    {
        word: "allow",
        options: ["禁止", "拒絕", "阻止", "允許"],
        correct: 3
    },
    {
        word: "alone",
        options: ["單獨的", "熱鬧的", "擁擠的", "熱情的"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft;

// 初始化測驗
function initQuiz() {
    // 隨機打亂題目順序
    shuffleQuestions();
    showQuestion();
}

// 打亂題目順序
function shuffleQuestions() {
    for (let i = quizData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
    }
}

// 顯示當前題目
function showQuestion() {
    const wordElement = document.getElementById('word');
    const optionsElement = document.getElementById('options');
    const currentQuizData = quizData[currentQuestion];

    // 顯示單字
    wordElement.textContent = currentQuizData.word;

    // 顯示選項
    optionsElement.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        optionsElement.innerHTML += `
            <button class="option-btn" onclick="checkAnswer(${index})">${option}</button>
        `;
    });

    // 重置結果顯示
    document.getElementById('result').innerHTML = '';

    // 開始計時
    startTimer();
}

// 計時器功能
function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// 更新計時器顯示
function updateTimerDisplay() {
    document.getElementById('timer').textContent = `剩餘時間: ${timeLeft}秒`;
}

// 時間到處理
function timeUp() {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(button => {
        button.disabled = true;
    });
    
    const correctAnswer = quizData[currentQuestion].options[quizData[currentQuestion].correct];
    document.getElementById('result').innerHTML = `時間到！正確答案是: ${correctAnswer}`;
    
    setTimeout(nextQuestion, 2000);
}

// 檢查答案
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const buttons = document.querySelectorAll('.option-btn');
    const correct = quizData[currentQuestion].correct === selectedIndex;

    // 禁用所有按鈕
    buttons.forEach(button => {
        button.disabled = true;
    });

    // 標示正確和錯誤答案
    buttons[quizData[currentQuestion].correct].classList.add('correct');
    if (!correct) {
        buttons[selectedIndex].classList.add('incorrect');
    }

    // 更新分數和顯示結果
    if (correct) {
        score++;
        document.getElementById('score').textContent = score;
        document.getElementById('result').innerHTML = '答對了！ 🎉';
    } else {
        document.getElementById('result').innerHTML = '答錯了！';
    }

    // 延遲後進入下一題
    setTimeout(nextQuestion, 2000);
}

// 進入下一題
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        const quizElement = document.getElementById('quiz');
        quizElement.innerHTML = `
            <h2>測驗完成！</h2>
            <p>你的最終得分是: ${score}/${quizData.length}</p>
            <button class="option-btn" onclick="resetQuiz()">重新開始</button>
        `;
    }
}

// 重置測驗
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    shuffleQuestions(); // 重新打亂題目順序
    showQuestion();
}

// 單字發音功能
function speakWord() {
    const word = quizData[currentQuestion].word;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 開始測驗
initQuiz();
