let startQuiz = document.getElementById('start');
let questionsQuiz = document.getElementById('questions');
let results = document.getElementById('results');
let answers = document.getElementById('answers');
let resultMessage = document.getElementById('result-message');
let scoreboard = document.getElementById('scoreboard');
let resultDiv = document.getElementById('result-div');
let topScore = document.getElementById('topScore');
let finalAnswerElement = document.getElementById('finalAnswer')
let inputElement = document.getElementById('initials');
let submitButton = document.getElementById('submit-button');
let clearButton = document.getElementById('clear-button');
let scoresHref =document.getElementById('scores-href');
let displayTime = document.getElementById('time');
let backButton = document.getElementById('back-button');

//variables with no data
let time;
let interval;
let highscoreArr;
let currentQuestion;

//button click events
backButton.addEventListener('click',returnToStart);
document.getElementById('start-button').addEventListener('click', startTest);
document.getElementById('multiple-choice').addEventListener('click', checkAnswer);
submitButton.addEventListener('click', saveScore);
//clearButton.addEventListener('click', erase);
scoreboard.addEventListener('click', revealScoreboard);

//when page loads hide everything but the start menu

function hideQuiz(){
    startQuiz.setAttribute('hidden', true);
    questionsQuiz.setAttribute('hidden', true);
    answers.setAttribute('hidden',true);
    scoreboard.setAttribute('hidden', true);
}

//quiz questions

//question 1
let questions = [{
    questionText: "All HTML elements are considered what?",
    options: ["1. Objects", "2. Code", "3. Tables", "4. Boxes"],
    answer: "4. Boxes",
},

//question 2
{
    questionText:"What are the CSS properties that are used to add space around sections of content?",
    options: ["1. Break", "2. Padding", "3. Cleaner", "4. Spacing"],
    answer: "2. Padding",
},

//question 3
{
    questionText:"What is the format called that is used for storing and transporting data?",
    options:["1. JSON", "2. Font", "3. Syntax", "4. HTML"],
    answer:"1. JSON",
},

//question 4
{
    questionText:"In JavaScript, what is a block of code called that is used to perform a specific task?",
    options:["1. Variable", "2. Declaration", "3. Function", "4. String"],
    answer: "3. Function",
},

//question 5
{
    questionText:"In JavaScript, what element is used to store and manipulate text, usually in multiples?",
    options: ["1. Recorders", "2. Arrays", "3. Variables", "4. Strings"],
    answer: "4. Strings",  
},
];

//hidden results
function hideResultMessage(){
    resultDiv.style.display = 'none';
}

//start test function 
function startTest(){
    //remove the hidden attribute
    hideQuiz();
    questionsQuiz.removeAttribute('hidden');
     //start question with an index of 0
     currentQuestion = 0;
     displayQuestions();

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
function displayQuestions(){
    let question = questions[currentQuestion];
    let options = question.options;

    let h2QuestionElement = document.querySelector('#question-text');
    h2QuestionElement.textContent = question.questionText;

    for(let x = 0; x < options.length; x++) { 
        let option = options[x];
        let optionButton = document.querySelector("#option" + x);
        optionButton.textContent = option;
    }
}

//compare the users choice with the answer
function choiceIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].checkAnswer;
}

//if answer is incorrect subtract time
function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
   // resultDiv.style.display = "block";
    if (choiceIsCorrect(optionButton)) {
        resultMessage.textContent = "Correct!";
        setTimeout(hideResultMessage, 1000);
    } else {
        resultMessage.textContent = "Incorrect!";
        setTimeout(hideResultMessage, 1000);
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
    if (currentQuestion < questions.length) {
        displayQuestions();
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
    let highscoreArr = getScoreboard();
    highscoreArr.push(scoreboardItem);
    localStorage.setItem('highscoreArr', JSON.stringify(highscoreArr));
}

// get (highscoreArr) form local storage and parse it into a javascript object
function getScoreboard() {
    let savedScoreboard = localStorage.getItem('highscoreArr');
   if (savedScoreboard !== null) {
    let highscoreArr = JSON.parse(savedScoreboard);
    return highscoreArr;
   } else {
    highscoreArr = [];
   }
   return highscoreArr;
}

function displayScoreboard() {
    let sortedHighscoreArr = gatherScoreboard();
    topScore.innerHTML = "";
    for (let x = 0; x < sortedHighscoreArr.length; x++) {
        let scoreboardEntry = sortedHighscoreArr[x];
        let newListItem = document.createElement('li');
        newListItem.textContent=scoreboardEntry.initials + scoreboardEntry.answers;
        topScore.append(newListItem);
    }
}

//arrage scoreboard from low to high scores
function gatherScoreboard() {
    let sortedHighscoreArr = getScoreboard();
    if (!highscoreArr) {
        return;
    }
    highscoreArr.sort(function(a, b){
        return b.answers - a.answers;
    });
    return highscoreArr;
}

//clear the page
function erase() {
    localStorage.clear();
    displayScoreboard();
}

//once the user exits the scoreboard,show the start screen and hide everything else
function returnToStart() {
    hideQuiz();
    startQuiz.removeAttribute('hidden');
};

function revealScoreboard() {
    hideQuiz();
    scoreboard.removeAttribute('hidden');

     //reset test clock to 0
     clearInterval(interval);

     displayCount();

     displayScoreboard();
};
