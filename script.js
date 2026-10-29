const questions = [
  {word:"hat", question:'What does “hat” mean?', options:["A small animal","Something you wear on your head","A kind of food"], answer:1},
  {word:"fish", question:'What is a “fish”?', options:["An animal that lives in water","A piece of furniture","A color"], answer:0},
  {word:"jumping", question:'What does “jumping” describe?', options:["A feeling","An action","A place"], answer:1},
  {word:"happy", question:'Which word means “feeling good or glad”?', options:["Messy","Small","Happy"], answer:2},
  {word:"cleaning", question:'If you are cleaning, what are you doing?', options:["Making something tidy","Going to sleep","Eating lunch"], answer:0},
  {word:"house", question:'What is a “house”?', options:["A toy animal","A place where people live","A type of hat"], answer:1}
];
let questionIndex = 0;
let answered = false;
const questionEl = document.querySelector("#quiz-question");
const optionsEl = document.querySelector("#quiz-options");
const feedbackEl = document.querySelector("#quiz-feedback");
const nextButton = document.querySelector("#next-question");
const progressEl = document.querySelector("#quiz-progress");

function renderQuestion() {
  const q = questions[questionIndex];
  answered = false;
  questionEl.textContent = q.question;
  optionsEl.replaceChildren();
  feedbackEl.textContent = "";
  nextButton.hidden = true;
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index, button));
    optionsEl.append(button);
  });
  progressEl.textContent = questionIndex === questions.length ? "Quiz complete!" : `Word ${questionIndex + 1} of ${questions.length}`;
}
function checkAnswer(index, chosenButton) {
  if (answered) return;
  answered = true;
  const q = questions[questionIndex];
  [...optionsEl.children].forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add("correct");
  });
  if (index === q.answer) {
    feedbackEl.textContent = "Great job! That's correct. ✦";
    feedbackEl.style.color = "#28765f";
  } else {
    chosenButton.classList.add("incorrect");
    feedbackEl.textContent = `Not quite! “${q.word}” is the correct word to remember.`;
    feedbackEl.style.color = "#b93b35";
  }
  nextButton.hidden = false;
  nextButton.textContent = questionIndex === questions.length - 1 ? "Try again ↻" : "Next word →";
}
nextButton.addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % questions.length;
  renderQuestion();
});
renderQuestion();

document.querySelector("#build-sentence").addEventListener("click", () => {
  const subject = document.querySelector("#subject").value;
  const be = document.querySelector("#be-verb").value;
  const action = document.querySelector("#action").value;
  const needsAre = subject === "The children";
  const hint = document.querySelector("#sentence-hint");
  const result = document.querySelector("#sentence-result");
  if ((needsAre && be !== "are") || (!needsAre && be !== "is")) {
    result.textContent = `${subject} ${needsAre ? "are" : "is"} ${action}.`;
    hint.textContent = `Good try! Use “${needsAre ? "are" : "is"}” with “${subject}”.`;
    hint.style.color = "#b56b14";
  } else {
    result.textContent = `${subject} ${be} ${action}.`;
    hint.textContent = "Excellent sentence! ✦";
    hint.style.color = "#28765f";
  }
});

const storyForm = document.querySelector("#story-form");
const storyOutput = document.querySelector("#story-output");
const copyStoryButton = document.querySelector("#copy-story");
const copyFeedback = document.querySelector("#copy-feedback");
storyForm.addEventListener("submit", event => {
  event.preventDefault();
  const character = document.querySelector("#story-character").value.trim();
  const place = document.querySelector("#story-place").value.trim();
  const action = document.querySelector("#story-action").value;
  const ending = document.querySelector("#story-ending").value;
  if (!character || !place) return;
  const sentences = [
    `One day, ${character} is ${place.startsWith("in ") || place.startsWith("at ") || place.startsWith("on ") ? "" : " "}${place}.`,
    `Then, ${character} ${action}.`,
    `Finally, ${ending}`
  ];
  storyOutput.textContent = sentences.join("\n");
  storyOutput.hidden = false;
  copyStoryButton.hidden = false;
  copyFeedback.textContent = "";
});
copyStoryButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(storyOutput.textContent);
    copyFeedback.textContent = "Story copied! Paste it into your notebook or document.";
  } catch {
    copyFeedback.textContent = "Select and copy your story text manually.";
  }
});
