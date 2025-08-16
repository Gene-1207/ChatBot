const chat = document.getElementById("chat");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function factorial(n) {
  if (n < 0) return "undefined";
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;
  addMessage(text, "user");
  input.value = "";

  let reply;

  try {
    const lower = text.toLowerCase();

    // Factorial (e.g., 5!)
    if (/\d+!$/.test(lower)) {
      const num = parseInt(lower.replace("!", ""));
      reply = `${num}! = ${factorial(num)}`;
    }
    // Square root (e.g., sqrt(16))
    else if (lower.startsWith("sqrt(")) {
      const num = parseFloat(lower.match(/sqrt\(([^)]+)\)/)[1]);
      reply = `√${num} = ${Math.sqrt(num)}`;
    }
    // nth root (e.g., root(27,3))
    else if (lower.startsWith("root(")) {
      const parts = lower.match(/root\(([^,]+),([^)]+)\)/);
      const base = parseFloat(parts[1]);
      const n = parseFloat(parts[2]);
      reply = `${n}th root of ${base} = ${Math.pow(base, 1 / n)}`;
    }
    // Power (e.g., 2^3)
    else if (lower.includes("^")) {
      const [base, exp] = lower.split("^").map(Number);
      reply = `${base}^${exp} = ${Math.pow(base, exp)}`;
    }
    // Pi constant
    else if (lower.includes("pi")) {
      reply = `π ≈ ${Math.PI}`;
    }
    // Regular math expression (2+3*4)
    else if (/[\d\+\-\*\/\(\)\.]+/.test(lower)) {
      reply = `Answer: ${eval(lower)}`;
    }
    // Quiz
    else if (lower.includes("quiz")) {
      const a = Math.floor(Math.random() * 10);
      const b = Math.floor(Math.random() * 10);
      reply = `🧮 Quick quiz! What is ${a} + ${b}?`;
    }
    // Facts
    else if (lower.includes("fact")) {
      const facts = [
        "Zero is the only number that cannot be represented in Roman numerals.",
        "A circle has infinite lines of symmetry.",
        "Did you know? 153 is an Armstrong number (1³ + 5³ + 3³ = 153).",
        "Pi (π) is irrational — it never ends or repeats!",
        "Did you know? 123 is a Harshad number (1+2+3 = 6 and 123 is divisible by 6)"];
      reply = facts[Math.floor(Math.random() * facts.length)];
    }
    else {
      reply = "I’m a Math Bot 🤖.Ask me facts, quizzez or any math problem";
    }
  } catch {
    reply = "Hmm, I couldn’t calculate that 🤔. Try again!";
  }

  setTimeout(() => addMessage(reply, "bot"), 500);
}
