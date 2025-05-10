// FUNCTION TO SWITCH SCREENS 
const playButton = document.querySelector('.play-btn');
const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');
const thirdScreen = document.querySelector('.third-screen'); // Third screen
const resultMessage = document.getElementById('resultMessage');
const prizeAmount = document.getElementById('prizeAmount');
const claimButton = document.getElementById('claimButton');
const questionText = document.querySelector('.question-text');
const optionsContainer = document.getElementById('optionsContainer');
const screens = document.querySelectorAll('.screen');


// Handle play button click to show second screen
playButton.addEventListener('click', () => {
  firstScreen.style.display = 'none';
  secondScreen.style.display = 'block';
  thirdScreen.style.display = 'none'; // Optional, but keep it hidden initially
  loadQuestion(currentQuestion); // Load the first question
});




// FIRST SCREEN 

// FUNCTION TO SET THE CURRENT DAY 
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const currentDay = days[today.getDay()];

document.getElementById("quizDay").innerText = `${currentDay}'s`;


//  FUNCTON TO SET COUNTDOWN TIME DAILY
const updateClock = () => {
   const now = new Date();
   let hours = now.getHours();
   const minutes = now.getMinutes();
   const seconds = now.getSeconds();
   const ampm = hours >= 12 ? 'PM' : 'AM';

   hours = hours % 12;
   hours = hours ? hours : 12; // 0 becomes 12

   document.getElementById("hours").innerText = String(hours).padStart(2, "0");
   document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
   document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
   // Optionally add: document.getElementById("ampm").innerText = ampm;
};

setInterval(updateClock, 1000);
updateClock();





// SECOND SCREEN 

// Use server-rendered username
const username = user.name || "guest";

// Track user progress
let currentQuestion = 0;
let score = 0;
let prize = 0;
let questions = [];

// Load question and options
function loadQuestion(index) {
  const q = questions[index];
  questionText.innerText = decodeHTMLEntities(q.question);
  optionsContainer.innerHTML = "";

  document.getElementById("questionNumber").innerText = `.${index + 1}`;

  q.options.forEach(optionText => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.innerText = decodeHTMLEntities(optionText);
    div.addEventListener("click", () => handleAnswer(div, optionText, q.answer));
    optionsContainer.appendChild(div);
  });
}

// Handle answer selection
function handleAnswer(selectedDiv, selected, correct) {
  document.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

  if (selected === correct) {
    selectedDiv.style.background = "green";
    selectedDiv.style.color = "white";
    score++;
    prize += 0.50;
  } else {
    selectedDiv.style.background = "red";
    selectedDiv.style.color = "white";
  }

  setTimeout(() => {
    if (currentQuestion === 1) {
      showResult();
    } else {
      currentQuestion++;
      loadQuestion(currentQuestion);
    }
  }, 1000);
}

// Show result screen and message
function showResult() {
  firstScreen.style.display = 'none';
  secondScreen.style.display = 'none';
  thirdScreen.style.display = 'block';

  let resultMessageText = "";
  let prizeAmountValue = 0;

  if (score === 2) {
    resultMessageText = "Congratulations! You won $1";
    prizeAmountValue = 1;
  } else if (score === 1) {
    resultMessageText = "Cool! You won $0.50";
    prizeAmountValue = 0.5;
  } else {
    resultMessageText = "OUCH! Try again tomorrow, you earned $0";
    prizeAmountValue = 0;
  }

  resultMessage.innerText = resultMessageText;
  prizeAmount.innerText = `You earned $${prizeAmountValue}`;

  claimButton.style.display = prizeAmountValue > 0 ? 'block' : 'none';
  backButton.style.display = prizeAmountValue === 0 ? 'block' : 'none';
}

// Handle claim
claimButton.addEventListener("click", () => {
  let currentBalance = parseFloat(document.querySelector(".balance").innerText.replace(/[^0-9.]/g, '')) || 0;
  currentBalance += prize;
  document.querySelector(".balance").innerText = `$${currentBalance.toFixed(2)}`;
  localStorage.setItem(`${username}_balance`, currentBalance.toFixed(2));

  Toastify({
    text: `🎉claimed $${prize}. New balance $${currentBalance.toFixed(2)}🎉`,
    backgroundColor: "green",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
  }).showToast();

  claimButton.style.display = 'none';

  setTimeout(() => {
    thirdScreen.style.display = 'none';
    firstScreen.style.display = 'block';
    resetQuiz();
  }, 3000);

  setTimeout(() => {
    location.reload();
  }, 3000);
});

// Handle back button if user earned $0
backButton.addEventListener("click", () => {
  thirdScreen.style.display = 'none';
  firstScreen.style.display = 'block';
  resetQuiz();
  location.reload();
});

// Fetch questions from OpenTDB
function fetchTriviaQuestions() {
  fetch("https://opentdb.com/api.php?amount=2&category=27&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => {
      questions = data.results.map(q => ({
        question: q.question,
        options: shuffle([...q.incorrect_answers, q.correct_answer]),
        answer: q.correct_answer
      }));
      loadQuestion(currentQuestion);
      markPlayedToday();
    });
}

// Shuffle options
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Decode HTML entities from API
function decodeHTMLEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

// Reset quiz state
function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  prize = 0;
  document.getElementById("questionNumber").innerText = ".1";
}

// LocalStorage helpers
function alreadyPlayedToday() {
  const lastPlayed = localStorage.getItem(`${username}_lastPlayedDate`);
  const today = new Date().toISOString().split("T")[0];
  return lastPlayed === today;
}

function markPlayedToday() {
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(`${username}_lastPlayedDate`, today);
}

// Initialize quiz on page load
window.onload = () => {
  const savedBalance = localStorage.getItem(`${username}_balance`);
  if (savedBalance) {
    document.querySelector(".balance").innerText = `$${parseFloat(savedBalance).toFixed(2)}`;
  }

  const firstScreen = document.getElementById("firstScreen");
  const secondScreen = document.getElementById("secondScreen");
  const thirdScreen = document.getElementById("thirdScreen");

  if (alreadyPlayedToday()) {
    document.getElementById("questionNumber").innerText = ".0";
    questionText.innerText = "You already played today's quiz. Come back tomorrow!";
    optionsContainer.innerHTML = "";

    const backButton = document.getElementById("back");
    backButton.style.display = "block";

    backButton.addEventListener("click", () => {
      location.reload();
    });
  } else {
    fetchTriviaQuestions();
  }
};
