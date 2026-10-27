const questions = [
  {
    question: "Which language is mainly used to structure the content of a web page?",
    options: ["HTML", "CSS", "Python", "SQL"],
    answer: 0,
    explanation: "HTML defines the structure and content of web pages."
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1,
    explanation: "Mars looks reddish because of iron oxide on its surface."
  },
  {
    question: "What is 12 × 8?",
    options: ["86", "92", "96", "108"],
    answer: 2,
    explanation: "12 multiplied by 8 equals 96."
  },
  {
    question: "Which part of a plant usually absorbs water from the soil?",
    options: ["Flower", "Leaves", "Stem", "Roots"],
    answer: 3,
    explanation: "Roots absorb water and minerals from the soil."
  },
  {
    question: "Which property is commonly used in CSS to change text color?",
    options: ["font-style", "color", "background-image", "text-align"],
    answer: 1,
    explanation: "The CSS color property sets the foreground color of text."
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: 3,
    explanation: "The Pacific Ocean is the largest and deepest ocean."
  },
  {
    question: "Which device is used to enter text into a computer?",
    options: ["Monitor", "Keyboard", "Speaker", "Projector"],
    answer: 1,
    explanation: "A keyboard is an input device used to type text and commands."
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["50°C", "75°C", "100°C", "150°C"],
    answer: 2,
    explanation: "At standard atmospheric pressure, water boils at about 100°C."
  },
  {
    question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?",
    options: ["let", "const", "fixed", "define"],
    answer: 0,
    explanation: "let declares a block-scoped variable that can be reassigned."
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: 1,
    explanation: "A hexagon is a polygon with six sides."
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionCount = document.getElementById("question-count");
const liveScore = document.getElementById("live-score");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const feedback = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach(item => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  answered = false;
  const item = questions[currentQuestion];
  questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  liveScore.textContent = `Score: ${score}`;
  progressBar.style.width = `${(currentQuestion / questions.length) * 100}%`;
  questionText.textContent = item.question;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  feedback.className = "feedback";
  nextBtn.disabled = true;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "See Results →" : "Next Question →";

  item.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option";
    button.type = "button";
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = optionText;
    button.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const optionButtons = [...optionsContainer.querySelectorAll(".option")];
  optionButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === selectedIndex && selectedIndex !== item.answer) button.classList.add("wrong");
  });

  if (selectedIndex === item.answer) {
    score++;
    feedback.textContent = `Correct! ${item.explanation}`;
    feedback.classList.add("good");
  } else {
    feedback.textContent = `Not quite. ${item.explanation}`;
    feedback.classList.add("bad");
  }
  liveScore.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
}

function showResults() {
  showScreen(resultScreen);
  const percentage = Math.round((score / questions.length) * 100);
  document.getElementById("final-score").textContent = score;
  document.getElementById("percentage-text").textContent = `${percentage}% score`;
  document.getElementById("result-bar").style.width = `${percentage}%`;

  let title, message, icon;
  if (percentage === 100) {
    title = "Perfect score!";
    message = "Excellent work. You answered every question correctly.";
    icon = "🏆";
  } else if (percentage >= 70) {
    title = "Great job!";
    message = "You have a strong result. Keep practising to learn even more.";
    icon = "🎉";
  } else if (percentage >= 40) {
    title = "Good effort!";
    message = "You are making progress. Review the explanations and try again.";
    icon = "📚";
  } else {
    title = "Keep learning!";
    message = "Every attempt helps you improve. Review the questions and give it another try.";
    icon = "🌱";
  }
  document.getElementById("result-title").textContent = title;
  document.getElementById("result-message").textContent = message;
  document.getElementById("result-icon").textContent = icon;
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  if (!answered) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});
restartBtn.addEventListener("click", startQuiz);
