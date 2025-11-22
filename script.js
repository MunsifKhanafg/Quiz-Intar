import { quiz } from "./question.js";

let questionNumber = 1;
let questionIndex = 0;
let totalQuestions = quiz.length;
let score = 0;
let showScore = document.querySelector('.score');
let showQuestionNumber = document.querySelector('.questionsolve');
let selectAnswer = '';
let fullTime ;  
let fullTimer=document.querySelector('.timer');
let countdown = null;   
let timer_over=document.querySelector('.time_over');


// variable ---------------------------------------------
const questionask = document.querySelector('.question');
const options1 = document.querySelector('.option1');
const options2 = document.querySelector('.option2');
const options3 = document.querySelector('.option3');
const options4 = document.querySelector('.option4');

const hidden_sart_page = document.querySelector('.quiz_info');
const startquiz = document.querySelector('.askQuestions');
const quiz_result_page = document.querySelector('.quiz-result');
const allption = document.querySelectorAll('.options');



// buttons ------------------------------------------------------------------------
const startButton = document.querySelector('.start_quiz_button');
const nextquestionbtn = document.querySelector('.next-button');
const previousButton = document.querySelector('.previce-button');
const restartButton = document.querySelector('.restart');
const homeButton = document.querySelector('.home');
const circle = document.querySelector('.circle');
const scoreText = document.querySelector('.scoreText');



// start button intarctivety--------------------------------------------------------
startButton.addEventListener('click', () => {
    hidden_sart_page.classList.add('active');
    startquiz.classList.remove('active');
    fullTimer.classList.add('active');
    previousButton.classList.remove('active');
    
 startQuizTimer();


});

function startQuizTimer() {
    clearInterval(countdown);     
    fullTime = 5 * 60;           

    countdown = setInterval(() => {

        let minutes = Math.floor(fullTime / 60);
        let seconds = fullTime % 60;

        fullTimer.innerText =
            `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        fullTime--;

        if (fullTime < 0) {
            timer_over.classList.add('active');
            fullTimer.classList.remove('active');
            
            clearInterval(countdown);
            
               quiz_result_page.classList.add('active');
        startquiz.classList.add('active');
        clearInterval(fullTimer);
        showScore.innerText = `your score ${score} out of ${quiz.length}`;
     circle.style.background = `conic-gradient(
        #f7d000 0deg ${score / totalQuestions * 360}deg,
        #e0e0e0 ${score / totalQuestions * 360}deg 360deg
)`;
 let percent = Math.round((score / totalQuestions) * 100);
    scoreText.innerText = `${percent}%`;
        questionIndex = 0;
        backbuttons();
        toStartPage();
       
    }
     

    }, 1000);
}

// startQuizTimer()

function backbuttons() {
    restartButton.addEventListener('click', () => {
        questionIndex = 0;
         score=0;
          nextquestion();
        startquiz.classList.remove('active');
        quiz_result_page.classList.remove('active');
        nextquestionbtn.innerText = 'Next';
        previousButton.classList.remove('active');
        nextquestionbtn.classList.remove('active');
        showQuestionNumber.innerText = `Question ${questionIndex + 1} of ${totalQuestions}`;
        timer_over.classList.remove('active');
        fullTimer.classList.add('active');
        startQuizTimer();
       
    })
}
function toStartPage() {
    
    homeButton.addEventListener('click', () => {
         questionIndex = 0;
         nextquestion();
        timer_over.classList.remove('active');
         score=0;
          hidden_sart_page.classList.remove('active');
         quiz_result_page.classList.remove('active');
         timer_over.classList.remove('active');
         fullTimer.classList.remove('active');
         
    })
}

//==========================================
 
nextquestionbtn.addEventListener('click', () => {

    if (selectAnswer === "") {
        alert("Please select an option!");
        return;

    }
    if (selectAnswer == quiz[questionIndex].answer) {
        score++;
    }

    if (questionIndex < quiz.length - 1) {

        questionIndex++;
        questionNumber++;
        nextquestion();
        displayPreviousBtn();
    }
    

    else {
        // timer_over.classList.a('active')
        quiz_result_page.classList.add('active');
        startquiz.classList.add('active');
        clearInterval(fullTimer);
        showScore.innerText = `your score ${score} out of ${quiz.length}`;
       circle.style.background = `conic-gradient(
        #f7d000 0deg ${score / totalQuestions * 360}deg,
        #e0e0e0 ${score / totalQuestions * 360}deg 360deg
)`;
 let percent = Math.round((score / totalQuestions) * 100);
    scoreText.innerText = `${percent}%`;
        questionIndex = 0;
        backbuttons();
        toStartPage();
       stopQuizTimer();
        
        
    }


})
function stopQuizTimer() {
    clearInterval(countdown);
    fullTimer.innerText = "0:00";
    
}
previousButton.addEventListener('click', () => {
    if (questionIndex > 0) {

        questionIndex--;
        questionNumber--;
        nextquestion();



    }
    if (questionIndex === 0) {
        previousButton.classList.remove('active');
    }
})
// show display Previous  button
function displayPreviousBtn() {


    if (questionIndex == quiz.length - 1) {
        nextquestionbtn.innerText = 'Submit';
    }
    if (questionIndex > 0) {
        previousButton.classList.add('active');
    }



}

function nextquestion() {

    questionask.innerHTML = quiz[questionIndex].question;
    options1.innerText = quiz[questionIndex].options[0];
    options2.innerText = quiz[questionIndex].options[1];
    options3.innerText = quiz[questionIndex].options[2];
    options4.innerText = quiz[questionIndex].options[3];

    showQuestionNumber.innerText = `Question ${questionIndex + 1} of ${totalQuestions}`;

    selectAnswer = '';



}
function selectOptions() {
    const allOptions = document.querySelectorAll('.option');


    allOptions.forEach((opt) => {
        opt.addEventListener('click', () => {
            selectAnswer = opt.innerText;
            nextquestionbtn.classList.add('active');


        });
    });
}
selectOptions();






