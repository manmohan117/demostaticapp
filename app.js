// app.js - simple client-side number guessing and telemetry POST to /api/logGuess

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const newBtn = document.getElementById('newBtn');
const feedback = document.getElementById('feedback');
const telemetryDiv = document.getElementById('telemetry');

let secret = null;
let attempts = 0;

function newGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  feedback.textContent = 'New game started — make a guess!';
  guessInput.value = '';
  appendTelemetryLine(`Game started. (client-only secret set)`);
}

function appendTelemetryLine(text) {
  const el = document.createElement('div');
  el.textContent = `${new Date().toISOString()} — ${text}`;
  telemetryDiv.prepend(el);
}

// Evaluate guess on client, then send telemetry to function to be logged in App Insights
async function handleGuess() {
  const guessedValue = parseInt(guessInput.value, 10);
  if (!guessedValue || guessedValue < 1 || guessedValue > 100) {
    feedback.textContent = 'Please enter a number between 1 and 100.';
    return;
  }
  attempts++;
  let result;
  if (guessedValue === secret) {
    result = 'correct';
    feedback.textContent = `Correct! You found it in ${attempts} attempts.`;
  } else if (guessedValue < secret) {
    result = 'higher';
    feedback.textContent = 'Too low — try higher.';
  } else {
    result = 'lower';
    feedback.textContent = 'Too high — try lower.';
  }

  appendTelemetryLine(`Guess=${guessedValue}, result=${result}, attempts=${attempts}`);

  // Send telemetry to your Azure Function at /api/logGuess
  try {
    await fetch('/api/logGuess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guess: guessedValue,
        result,
        attempts,
        /* OPTIONAL: include any non-sensitive client info, e.g. browser, userId, etc */
        clientTime: new Date().toISOString()
      })
    });
    appendTelemetryLine('(telemetry sent to /api/logGuess)');
  } catch (err) {
    appendTelemetryLine(`(telemetry failed: ${err.message})`);
  }
}

guessBtn.addEventListener('click', handleGuess);
newBtn.addEventListener('click', newGame);
guessInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleGuess(); });

// start
newGame();
