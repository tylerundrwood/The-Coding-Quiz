let start = document.getElementById('start');
let questions = document.getElementById('questions');
let results = document.getElementById('results');
let answers = document.getElementById('answers');
let resultMessage = document.getElementById('result-message');
let scoreboard = document.getElementById('scoreboard');
let topScore = document.getElementById('topScore');
let finalAnswerElement = document.getElementById('finalAnswer')
let inputElement = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');
let clearButton = document.getElementById('clear-button');
let displayTime = document.getElementById('time');

//variables with no data
let time;
let interval;
let highScore;
let currentQuestion;

//button click events
document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('multiple-choice').addEventListener('click', checkAnswer);
submitButton.addEventListener('click', saveScore);
clearButton.addEventListener('click', clearScores);
scoreboard.addEventListener('click', revealScoreboard);
backButton.addEventListener('click',returnToStart);

//when page loads hide everything but the start menu

function hideQuiz(){
    start.setAttribute('hidden', true);
    questions.setAttribute('hidden', true);
    answers.setAttribute('hidden',true);
    scoreboard.setAttribute('hidden', true);
}

//quiz questions

//question 1
let question = [{
    questionChoice: "All HTML elements are considered what?",
    options: ["1. Objects", "2. Code", "3. Tables", "4. Boxes"],
    answer: "4. Boxes",
},

//question 2
{
    questionChoice:"What are the CSS properties that are used to add space around sections of content?",
    options: ["1. Break", "2. Padding", "3. Cleaner", "4. Spacing"],
    answer: "2. Padding",
},

//question 3
{
    questionChoice:"What is the format called that is used for storing and transporting data?",
    options:["1. JSON", "2. Font", "3. Syntax", "4. HTML"],
    answer:"1. JSON",
},

//question 4
{
    questionChoice:"In JavaScript, what is a block of code called that is used to perform a specific task?",
    options:["1. Variable", "2. Declaration", "3. Function", "4. String"],
    answer: "3. Function",
},

//question 5
{
    questionChoice:"In JavaScript, what element is used to store and manipulate text, usually in multiples?",
    options: ["1. Recorders", "2. Arrays", "3. Variables", "4. Strings"],
    answer: "4. Strings",  
},
];

//hidden results
function hiddenResultstext(){
    resultMessage.style.display = 'none';
}

//start test function 
function startTest(){
    //remove the hidden attribute
    hideQuiz();
    questions.removeAttribute('hidden');
     //start question with an index of 0
     currentQuestion = 0;
     displayQuestion();

     //when the start button is pressed, the timer is set to 60 seconds
    time = 60;
    // time goes down by 1 second
    interval = setInterval(countdown,1000);
    
    //initiate displayCount function. when start is clicked countdown will appear in top right of page.
    displayCount();
}
//function for when time is at 0, end the quiz
function countdown(){
    time--;
    displayCount();

    if(time < 1){
        endTest();
    }
}

//variable to access display time/displaying the time 
function displayCount() {
    displayTime.textContent = time;
}
//reveal the question and the question option
function displayQuestion(){
    let questions = question[currentQuestion];
    let options = questions.options;

    let questionElement = document.querySelector('#question-choice');
    questionElement.textContent = question.questionChoice;

    for(let x = 0; x < options.length; x++) { 
        let option = options[x];
        let optionButton = document.querySelector("#option" + x);
        optionButton.textContent = option;
    }
}

//compare the users choice with the answer
function choiceIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect subtract time
function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (choiceIsCorrect(optionButton)) {
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
        if (time >= 10) {
            time = time - 10;
            displayCount();
        } else {
            time = 0;
            displayCount();
            endTest();
        }
    }
    //after the question is answered then switches to the next question
    currentQuestion++;
    //when every question is answered, the quiz ends
    if (currentQuestion < question.length) {
        displayQuestion();
    } else{
        endTest();
    }
}

//when the test has ended, show score and clear the timer
function endTest(){
    clearInterval(interval);
    hideQuiz();
    answers.removeAttribute('hidden');
    finalAnswer.textContent = time;
}

function saveScore(event) {
    event.preventDefault();

    //only written if initials are valid
    if (!inputElement.value) {
        alert('Enter your initials. Then press submit!');
        return;
    }
    //save score and initials
    let scoreboardItem = {
        initials: inputElement.value,
        finalAnswer: time,

    };
    updateSavedScoreboard(scoreboardItem)
    //hide all except for the scoreboard
    hideQuiz();
    scoreboard.removeAttribute('hidden');
    displayScoreboard();
}

//update local storage with the scoreboard
function updateSavedScoreboard(scoreboardItem) {
    let topScore = getScoreboard();
    topScore.push(scoreboardItem);
    localStorage.setItem('topScore', JSON.stringify(topScore));
}


