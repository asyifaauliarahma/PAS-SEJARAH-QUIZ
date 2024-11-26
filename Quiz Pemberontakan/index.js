const questions = [
  {
      question: "Pemberontakan PKI Madiun pada tahun 1948 terjadi pada masa pemerintahan ?",
      answers: [
          { text: "Soekarno-Hatta", correct: true },
          { text: "Amir Sjarifuddin", correct: false },
          { text: "Mohammad Natsir", correct: false },
          { text: "Ali Sastroamidjojo", correct: false },
      ]
  },
  {
      question: "Siapa yang memimpin pemberontakan DI/TII di Aceh?",
      answers: [
          { text: "Daud Beureueh", correct: true },
          { text: "Kartosuwiryo", correct: false },
          { text: "Kahar Muzakar", correct: false },
          { text: "Amir Fatah", correct: false },
      ]
  },
  {
      question: "Apa penyebab utama pemberontakan PRRI/Permesta?",
      answers: [
          { text: "Intervensi Belanda di Indonesia", correct: false },
          { text: "Ketidakpuasan daerah terhadap pemerintah pusat?", correct: true },
          { text: "Penolakan terhadap sistem pemerintahan parlementer", correct: false },
          { text: "Perbedaan ideologi agama", correct: false },
      ]
  },
  {
      question: "Gerakan Angkatan Perang Ratu Adil (APRA) dipimpin oleh ?",
      answers: [
          { text: "Westerling", correct: true },
          { text: "Musso", correct: false },
          { text: "Kartosuwiryo", correct: false },
          { text: "Tan Malaka", correct: false },
      ]
  },
  {
      question: "Pemberontakan PKI di Madiun pada tahun 1948 bertujuan untuk ?",
      answers: [
          { text: "Membentuk negara Islam", correct: false },
          { text: "Melawan kolonialisme Belanda", correct: false },
          { text: "Menjaga keutuhan NKRI", correct: false },
          { text: "Mendirikan negara komunis", correct: true },
      ]
  },
  {
    question: "Siapa tokoh utama pemberontakan DI/TII di Jawa Barat ? ",
    answers: [
        { text: "Kahar Muzakar", correct: false },
        { text: "Amir Fatah", correct: false },
        { text: "Kartosuwiryo", correct: true },
        { text: "Musso", correct: false },
    ]
},
{
  question: "Pemberontakan RMS (Republik Maluku Selatan) terjadi pada tahun...",
  answers: [
      { text: "1948", correct: false },
      { text: "1950", correct: true },
      { text: "1953", correct: false },
      { text: "1960", correct: false },
  ]
},
{
  question: "Pemberontakan DI/TII di Sulawesi Selatan dipimpin oleh...",
  answers: [
      { text: "Kartosuwiryo", correct: false },
      { text: "Kahar Muzakar", correct: true },
      { text: "Daud Beureueh", correct: false },
      { text: "Westerling", correct: false },
  ]
},
{
  question: "PKI melakukan pemberontakan besar selain di Madiun, yaitu pada tahun...",
  answers: [
      { text: "1948", correct: false },
      { text: "1950", correct: false },
      { text: "1965", correct: true },
      { text: "1970", correct: false },
  ]
},
{
  question: "Apa dampak pemberontakan PKI di Madiun terhadap stabilitas politik Indonesia?",
  answers: [
      { text: "Penguatan kerja sama militer dengan Belanda", correct: false },
      { text: "Stabilitas politik meningkat pesat", correct: false },
      { text: "Meningkatnya ancaman ideologi komunis", correct: true },
      { text: "Pembentukan Negara Islam Indonesia", correct: false },
  ]
}
];

const startScreen = document.getElementById("start-screen");
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-btn");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const pointPerQuestion = 10; // Setiap soal bernilai 10 poin

startButton.addEventListener("click", () => {
  startScreen.style.display = "none"; // Hide start screen
  quizContainer.style.display = "block"; // Show quiz container
  startQuiz(); // Start quiz
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
          button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
      selectedBtn.classList.add("correct");
      score += pointPerQuestion; // Tambahkan 10 poin jika jawaban benar
  } else {
      selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
      if (button.dataset.correct === "true") {
          button.classList.add("correct");
      }
      button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length * pointPerQuestion} points!`; // Tampilkan poin total
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
      handleNextButton();
  } else {
      startQuiz();
  }
});
