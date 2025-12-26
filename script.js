const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which HTML tag is used to create a link?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["color", "bgcolor", "background-color", "backgroundColor"],
    answer: "background-color"
  },
  {
    question: "Which symbol is used for comments in CSS?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"],
    answer: "/* comment */"
  },
  {
    question: "Which of the following is a correct way to declare a JavaScript variable?",
    options: ["var name = 'John';", "variable name = 'John';", "v name = 'John';", "name := 'John';"],
    answer: "var name = 'John';"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("scoreDisplay");

function loadQuestion() {
  const currentData = quizData[currentQuestion];
  questionEl.textContent = currentData.question;
  optionsEl.innerHTML = "";

  currentData.options.forEach(option => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = option;
    btn.onclick = () => selectAnswer(option, btn);
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
}

function selectAnswer(selected, btn) {
  const correct = quizData[currentQuestion].answer;
  if(selected === correct) score++;

  Array.from(optionsEl.children).forEach(b => {
    b.disabled = true;
    if(b.textContent === correct) b.style.background = "#22c55e"; // correct green
    else if(b.textContent === selected) b.style.background = "#ef4444"; // wrong red
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if(currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreDisplay.textContent = "";
  loadQuestion();
});

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
  scoreDisplay.textContent = `Your Score: ${score} / ${quizData.length}`;
}

// Initial load
loadQuestion();
