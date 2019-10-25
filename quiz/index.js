// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Which actor below appears in 'Game of Thrones'?",
        imgSrc : "img/gothrones.jpg",
        choiceA : "Peter Dinklage",
        choiceB : "Stephen Merchant",
        choiceC : "Val Kilmer",
        correct : "A"
    },{
        question : "What is the name of the lead characher in 'God of War' on PlayStation?",
        imgSrc : "img/gowar.jpg",
        choiceA : "Nathan Drake",
        choiceB : "Kratos",
        choiceC : "Hades",
        correct : "B"
    },{
        question : "What country was Elon Musk born in?",
        imgSrc : "img/spacex.jpg",
        choiceA : "Canada",
        choiceB : "Australia",
        choiceC : "South Africa",
        correct : "C"
    },
    {
        question : "Which of the following is an album by Nas?",
        imgSrc : "img/nas.jpg",
        choiceA : "Reasonable Doubt",
        choiceB : "Hollywood's Bleeding",
        choiceC : "Illmatic",
        correct : "C"
    }, {
        question : "Who won the Oscar for 'Best Actor' in There Will Be Blood?",
        imgSrc : "img/blood.jpg",
        choiceA : "Christopher Waltz",
        choiceB : "Daniel-Day Lewis",
        choiceC : "Steve Buscemi",
        correct : "B"
    },{
        question : "Who won the FA Cup in 2014, 2015 and 2017?",
        imgSrc : "img/football.jpg",
        choiceA : "Man City",
        choiceB : "Chelsea",
        choiceC : "Arsenal",
        correct : "C"
    },
    {
        question : "Who played the lead role in Joker (2019)?",
        imgSrc : "img/joker.jpg",
        choiceA : "Jared Leto",
        choiceB : "Jack Nicholson",
        choiceC : "Joaquin Phoenix",
        correct : "C"
    }, {
        question : "Which sport does Jon Jones compete in?",
        imgSrc : "img/jon.jpg",
        choiceA : "Snooker",
        choiceB : "MMA",
        choiceC : "Tennis",
        correct : "B"
    },{
        question : "Which of the following athletes is NOT Vegan??",
        imgSrc : "img/vegan.jpg",
        choiceA : "Novak Djokovic",
        choiceB : "Lewis Hamilton",
        choiceC : "Rory McIlroy",
        correct : "C"
    },
    {
        question : "Who played the T-1000 in Terminator 2?",
        imgSrc : "img/t2.jpg",
        choiceA : "David Duchovny",
        choiceB : "Linda Hamilton",
        choiceC : "Robert Patrick",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
const questionTime = 20; // 10s
let count = questionTime;
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
  timeGauge.style.animation = "headingFrameSecond 11s ease-in";
    if(count > -1) {
        counter.innerHTML = count;
        timeGauge.style.width = (questionTime - count) * gaugeUnit +  "px";
        count--;
    } else {
        timeGauge.style.animation = "none";
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
        count = questionTime;
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = questionTime;
    timeGauge.style.animation = "none";
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
