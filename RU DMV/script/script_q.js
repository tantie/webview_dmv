var signsQuestions;
var questions;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function parseAndDisplayJSON(jsonString) {
    try {
        var data = JSON.parse(jsonString);
        signsQuestions = data.signs_questions;
        questions = data.questions;
        
        // Здесь можно инициировать начальную загрузку вопросов или знаков, если это необходимо
        // loadQuestions(questions);

    } catch (error) {
        document.body.innerHTML = "<h2 style='color: red;'>Error parsing JSON:</h2><pre style='color: red;'>" + error + "</pre>";
    }

}

var currentQuestionIndex = 0;

function loadQuestion(questionsData) {
    var container = document.getElementById("questionsContainer");
    container.innerHTML = "";
    var question = questionsData[currentQuestionIndex];
    
    var questionDiv = document.createElement("div");
    questionDiv.className = "question";

    var questionText = document.createElement("p");
    questionText.innerHTML = question.text;
    questionDiv.appendChild(questionText);

    if (question.image_path) {
        var questionImg = document.createElement("img");
        questionImg.src = question.image_path;
        questionImg.className = "question-image";
        questionDiv.appendChild(questionImg);
    }

    var answerOptionsDiv = document.createElement("div");
    answerOptionsDiv.className = "answer-options";
    for (var i = 0; i < question.answers.length; i++) {
        var answerLabel = document.createElement("label");
        var answerInput = document.createElement("input");
        answerInput.type = "radio";
        answerInput.name = "answer";
        answerInput.onclick = function() {
            checkAnswer(this);
        };
        answerInput.correct = question.answers[i].correct;
        if (question.answers[i].image_path) {
            var answerImg = document.createElement("img");
            answerImg.src = question.answers[i].image_path;
            answerImg.className = "answer-image";
            answerLabel.appendChild(answerImg);
        }
        var answerText = document.createTextNode(" " + question.answers[i].text);
        answerLabel.appendChild(answerInput);
        answerLabel.appendChild(answerText);
        answerOptionsDiv.appendChild(answerLabel);
    }

    questionDiv.appendChild(answerOptionsDiv);
    container.appendChild(questionDiv);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        currentQuestionIndex = 0;  // начать сначала
    }
    loadQuestion(questions);  // или loadQuestion(signsQuestions) в зависимости от выбора
}

function prevQuestion() {
    currentQuestionIndex--;
    if (currentQuestionIndex < 0) {
        currentQuestionIndex = questions.length - 1;  // перейти к последнему вопросу
    }
    loadQuestion(questions);  // или loadQuestion(signsQuestions) в зависимости от выбора
}
