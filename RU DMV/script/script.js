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
    
    
    function loadQuestions(questionsData, shuffled = false) {
         var container = document.getElementById("questionsContainer");
         container.innerHTML = "";
         var questions = Object.values(questionsData);
         if (shuffled) {
             shuffleArray(questions);
         }

         for (var q in questions) {
             var questionDiv = document.createElement("div");
             questionDiv.className = "question";

             var questionText = document.createElement("p");
             questionText.innerHTML = questions[q].text;
             questionDiv.appendChild(questionText);

             if (questions[q].image_path) {
                 var questionImg = document.createElement("img");
                 questionImg.src = questions[q].image_path;
                 questionImg.className = "question-image";
                 questionDiv.appendChild(questionImg);
             }

             var answerOptionsDiv = document.createElement("div");
             answerOptionsDiv.className = "answer-options";
             if (questionsData === signsQuestions) {
                 answerOptionsDiv.classList.add('signs');
             } else {
                 answerOptionsDiv.classList.add('standard');
             }

             for (var i = 0; i < questions[q].answers.length; i++) {
                 var answerLabel = document.createElement("label");
                 var answerInput = document.createElement("input");
                 answerInput.type = "radio";
                 answerInput.name = q;
                 answerInput.onclick = function() {
                     checkAnswer(this);
                 };
                 answerInput.correct = questions[q].answers[i].correct;
                 if (questions[q].answers[i].image_path) {
                     var answerImg = document.createElement("img");
                     answerImg.src = questions[q].answers[i].image_path;
                     answerImg.className = "answer-image";
                     answerLabel.appendChild(answerImg);
                 }
                 var answerText = document.createTextNode(" " + questions[q].answers[i].text);
                 answerLabel.appendChild(answerInput);
                 answerLabel.appendChild(answerText);
                 answerOptionsDiv.appendChild(answerLabel);
             }

             questionDiv.appendChild(answerOptionsDiv);
             container.appendChild(questionDiv);
         }
     }

     function checkAnswer(inputElement) {
         var parentLabel = inputElement.parentNode;
         var allLabels = parentLabel.parentNode.getElementsByTagName("label");
         for (var i = 0; i < allLabels.length; i++) {
             allLabels[i].classList.remove("correct", "incorrect");
         }
         if (inputElement.correct) {
             parentLabel.classList.add("correct");
         } else {
             parentLabel.classList.add("incorrect");
         }
     }
