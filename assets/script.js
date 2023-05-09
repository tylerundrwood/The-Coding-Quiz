let start = document.getElementById('start');
let questions = document.getElementById('questions');
let results = document.getElementById('results');
let answers = document.getElementById('answers');
let resultMessage = document.getElementById('result-message');
let scoreboard = document.getElementById('scoreboard');
let topScore = document.getElementById('topScore');
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
}
