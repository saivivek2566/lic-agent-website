// Typewriter Effect
const phrases = [" Insure Securely.", " Build Wealth.", " Plan Today."];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  const typewriter = document.querySelector('.typewriter');
  if (!typewriter) return;

  typewriter.innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop();
      j--;
    }

    if (j === phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }

  const speed = isEnd ? 1000 : isDeleting ? 50 : 100;
  isEnd = false;
  setTimeout(loop, speed);
}

// Form Calculator
document.addEventListener("DOMContentLoaded", () => {
  loop();

  const form = document.getElementById("calc-form");
  const resultBox = document.getElementById("result");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const premium = parseFloat(document.getElementById("premium").value);
    const term = parseInt(document.getElementById("term").value);
    const rate = parseFloat(document.getElementById("rate").value);

    if (age < 18 || age > 65) {
      resultBox.style.display = "block";
      resultBox.style.backgroundColor = "#ffe0e0";
      resultBox.style.color = "#b00020";
      resultBox.innerHTML = "❌ Age must be between 18 and 65.";
      return;
    }

    const totalInvestment = premium * 12 * term;
    const maturityAmount = totalInvestment * Math.pow(1 + rate / 100, term);

    resultBox.style.display = "block";
    resultBox.style.backgroundColor = "#d1ffd6";
    resultBox.style.color = "#006400";
    resultBox.innerHTML = `✅ Estimated Maturity: ₹${Math.round(maturityAmount).toLocaleString()}`;
  });
});
