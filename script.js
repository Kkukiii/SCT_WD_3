const quizData = [
  {
    question: "Which language is used to style web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "c"
  },
  {
    question: "What does HTML stand for?",
    a: "Hyper Trainer Marking Language",
    b: "Hyper Text Markup Language",
    c: "Hyper Text Marketing Language",
    d: "Hyper Text Markup Leveler",
    correct: "b"
  },
  {
    question: "Which is the correct syntax for a function in JavaScript?",
    a: "function = myFunction()",
    b: "function:myFunction()",
    c: "function myFunction()",
    d: "myFunction() = function",
    correct: "c"
  },
  {
    question: "Which company developed the React library?",
    a: "Microsoft",
    b: "Google",
    c: "Amazon",
    d: "Facebook",
    correct: "d"
  },
  {
    question: "What does CSS stand for?",
    a: "Creative Style System",
    b: "Cascading Style Sheets",
    c: "Computer Styled Sections",
    d: "Colorful Style Sheets",
    correct: "b"
  }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const options = {
  a: document.getElementById('option-1'),
  b: document.getElementById('option-2'),
  c: document.getElementById('option-3'),
  d: document.getElementById('option-4')
};
const answers = document.querySelectorAll('.answer');
const submitBtn = document.getElementById('submit');

const resultEl = document.createElement('div');
resultEl.id = 'result';
document.querySelector('.quiz-section').appendChild(resultEl);

const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
progressBar.style.height = '10px';
progressBar.style.background = '#4caf50';
progressBar.style.width = '0%';
progressBar.style.marginBottom = '15px';
progressBar.style.transition = '0.3s';
document.querySelector('.quiz-section').prepend(progressBar);

// Load first question
loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentData = quizData[currentQuiz];
  questionEl.textContent = currentData.question;
  options.a.textContent = currentData.a;
  options.b.textContent = currentData.b;
  options.c.textContent = currentData.c;
  options.d.textContent = currentData.d;

  // Update progress bar
  let progressPercent = ((currentQuiz) / quizData.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function getSelected() {
  let selectedAnswer = undefined;
  answers.forEach(answerEl => {
    if (answerEl.checked) {
      selectedAnswer = answerEl.id;
    }
  });
  return selectedAnswer;
}

function deselectAnswers() {
  answers.forEach(answerEl => (answerEl.checked = false));
}

submitBtn.addEventListener('click', () => {
  const selected = getSelected();

  if (selected) {
    if (selected === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResult();
    }
  } else {
    alert("Please select an answer before submitting.");
  }
});

function showResult() {
  document.getElementById('quiz').style.display = 'none';
  progressBar.style.width = '100%';

  let message = `🎉 You scored ${score} out of ${quizData.length}!`;
  if (score === quizData.length) {
    message += `<br><br><span style="font-size:22px;">Perfect Score! 💯</span>`;
    triggerConfetti(); 
  }

  resultEl.innerHTML = `
    <h2>${message}</h2>
    <button onclick="location.reload()" id="submit">Restart Quiz</button>
  `;
  resultEl.style.display = 'block';
}


function triggerConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
