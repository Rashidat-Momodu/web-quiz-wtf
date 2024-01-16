const questions = [
    {
        question: "What does the acronym 'DOM' stand for in JavaScript?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Model", correct: false },
            { text: "Document Oriented Model", correct: false },
            { text: "Dynamic Object Model", correct: false }
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "int", correct: false },
            { text: "variable", correct: false },
            { text: "v", correct: false }
        ]
    },
    {
        question: "What is the purpose of the `JSON.stringify()` method in JavaScript?",
        answers: [
            { text: "Parsing JSON", correct: false },
            { text: "Converting a JavaScript object to a JSON string", correct: true },
            { text: "Converting a JSON string to a JavaScript object", correct: false },
            { text: "Checking if a variable is JSON", correct: false }
        ]
    },
    {
        question: "What is the difference between `let` and `const` in JavaScript for variable declaration?",
        answers: [
            { text: "`let` is used for constants, and `const` is used for variables.", correct: false },
            { text: "`let` allows reassignment, while `const` does not.", correct: true },
            { text: "There is no difference; they are interchangeable.", correct: false },
            { text: "`const` is outdated and should not be used.", correct: false }
        ]
    },
    {
        question: "What does the term 'closure' refer to in JavaScript?",
        answers: [
            { text: "A way to close a program", correct: false },
            { text: "A function that is defined inside another function", correct: true },
            { text: "The final step in a loop", correct: false },
            { text: "A type of loop in JavaScript", correct: false }
        ]
    },
    {
        question: "What is the purpose of the `addEventListener` method in JavaScript?",
        answers: [
            { text: "To add two numbers together", correct: false },
            { text: "To listen for and respond to events", correct: true },
            { text: "To create a new HTML element", correct: false },
            { text: "To include an external JavaScript file", correct: false }
        ]
    },
    {
        question: "Which of the following is a falsy value in JavaScript?",
        answers: [
            { text: "true", correct: false },
            { text: "1", correct: false },
            { text: "'null'", correct: true },
            { text: "undefined", correct: true }
        ]
    },
    {
        question: "What does the term 'hoisting' mean in JavaScript?",
        answers: [
            { text: "Elevating a variable or function declaration to the top of its containing scope", correct: true },
            { text: "Jumping to the end of a function", correct: false },
            { text: "Moving an element on the web page", correct: false },
            { text: "Changing the color of an element dynamically", correct: false }
        ]
    },
    {
        question: "What is the purpose of the `this` keyword in JavaScript?",
        answers: [
            { text: "Referring to the current HTML document", correct: false },
            { text: "Referring to the current function's scope", correct: false },
            { text: "Referring to the current object", correct: true },
            { text: "Referring to the next iteration in a loop", correct: false }
        ]
    },
    {
        question: "Which method is used to stop the propagation of an event in JavaScript?",
        answers: [
            { text: "`stopEvent()`", correct: false },
            { text: "`preventDefault()`", correct: false },
            { text: "`stopPropagation()`", correct: true },
            { text: "`haltEvent()`", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    resetTimer();
    const questionContainer = document.getElementById("question-container");
    const answerButtons = document.getElementById("answer-buttons");
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer));
        answerButtons.appendChild(button);
    });

    document.getElementById("feedback-container").textContent = "";
    startTimer();
}

function checkAnswer(answer) {
    stopTimer();
    const feedbackContainer = document.getElementById("feedback-container");
    const nextButton = document.getElementById("next-button");

    if (answer.correct) {
        feedbackContainer.textContent = "Correct!";
        score++;
    } else {
        feedbackContainer.textContent = `Incorrect! The correct answer is: ${getCorrectAnswer()}`;
    }

    nextButton.disabled = false;
}

function getCorrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    return currentQuestion.answers.find(answer => answer.correct).text;
}

function nextQuestion() {
    const nextButton = document.getElementById("next-button");
    nextButton.disabled = true;

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    const scoreContainer = document.getElementById("score-container");
    const timerContainer = document.getElementById("timer-container");
    const feedbackContainer = document.getElementById("feedback-container");

    scoreContainer.textContent = `Score: ${score}/${questions.length}`;
    timerContainer.textContent = "Quiz completed!";
    
    feedbackContainer.innerHTML = "<h2>Quiz Summary:</h2>";
    questions.forEach((question, index) => {
        const result = question.answers.find(answer => answer.correct).correct ? "Correct" : "Incorrect";
        feedbackContainer.innerHTML += `<p>${index + 1}. ${question.question} - ${result}</p>`;
    });
}

function startTimer() {
    const timerContainer = document.getElementById("timer");
    let timeLeft = 15;

    timer = setInterval(() => {
        timerContainer.textContent = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    document.getElementById("timer").textContent = "";
}

// ... (previous code)

function showQuestion() {
    resetTimer();
    const questionContainer = document.getElementById("question-container");
    const answerButtons = document.getElementById("answer-buttons");
    const currentQuestion = questions[currentQuestionIndex];

    // Display the question number and text
    questionContainer.innerHTML = `<p id="question-number">Question ${currentQuestionIndex + 1}</p>`;
    questionContainer.innerHTML += `<p id="question-text">${currentQuestion.question}</p>`;

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(answer));
        answerButtons.appendChild(button);
    });

    document.getElementById("feedback-container").textContent = "";
    startTimer();
}

// ... (remaining code)




document.getElementById("next-button").addEventListener("click", nextQuestion);
startQuiz();


