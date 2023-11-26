function navigateToMain() {
    //window.location.href = 'dmv.html';
    container = document.getElementById("questionsContainer");
    container.innerHTML = '<p class="txt">Привет, надеюсь это приложение поможет тебе быстро подготовиться к сдаче экзаменов в Калифорнии.<br>Настоятельно рекомендуем перед тем как начать отвечать на тесты, изучить <a href="https://www.dmv.ca.gov/portal/file/california-driver-handbook-russian-pdf/">справочник водителя штата Калифорния на русском</a></p>';
}

function navigateToAllQuestions() {
    window.location.href = 'all-questions.html';
}

function navigateToSigns() {
    window.location.href = 'signs.html';
}

function navigateToTestMode() {
    window.location.href = 'questions.html';
}


document.getElementById("toggleTheme").addEventListener("click", function() {
    var body = document.body;
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
    } else {
        body.classList.add("dark-mode");
    }
});
