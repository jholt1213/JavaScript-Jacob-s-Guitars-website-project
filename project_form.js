// project_form.js
// Tutorial 9 - JavaScript for Jacob's Guitars Form
// Author: Jacob Holt

// === 1. Function that keeps track of current day and time ===
function updateClock() {
    const now = new Date();

    const days = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];
    const dayName = days[now.getDay()];

    const timeString = now.toLocaleTimeString();

    const display = document.getElementById("currentTime");
    if (display) {
        display.textContent = `${dayName} — ${timeString}`;
    }
}

// === 2. Countdown function with setInterval (delay commands) ===
let countdownInterval = null;

function startCountdown(seconds) {
    // Clear any existing countdown
    if (countdownInterval !== null) {
        clearInterval(countdownInterval);
    }

    let remaining = seconds;
    const display = document.getElementById("countdownDisplay");

    if (!display) return;

    display.textContent = remaining.toString(); // number to text conversion

    countdownInterval = setInterval(function () {
        remaining = remaining - 1; // decrement

        // Convert number to text again for display
        display.textContent = remaining.toString();

        if (remaining <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            display.textContent = "Time's up!";
            alert("Countdown finished!"); // JavaScript alert
        }
    }, 1000); // Delay 1 second between updates
}

// === 3. Form submit handler: Math methods, alerts, type conversion ===
function handleFormSubmit(event) {
    event.preventDefault(); // prevent actual submit for demo

    const form = event.target;

    const name = form.custName.value.trim();
    const budgetText = form.budget.value; // this is text initially
    const budgetNumber = Number(budgetText); // text -> number conversion

    // Use a Math method: estimate tax with Math.round
    let estimatedTax = 0;
    if (!isNaN(budgetNumber) && budgetNumber > 0) {
        estimatedTax = Math.round(budgetNumber * 0.07); // 7% rough tax
    }

    // Simple success alert that uses our values
    alert(
        `Thanks, ${name || "Guitarist"}!\n` +
        `Estimated tax on your budget: $${estimatedTax}.\n` +
        `We will email you soon with a custom quote.`
    );
}

// === 4. Initialize everything when the page loads ===
window.addEventListener("DOMContentLoaded", function () {
    // Start the live clock (runs every second)
    updateClock();
    setInterval(updateClock, 1000); // delay: run at specified interval

    // Wire up the countdown button
    const countdownButton = document.getElementById("startCountdownBtn");
    if (countdownButton) {
        countdownButton.addEventListener("click", function () {
            startCountdown(10); // 10-second demo countdown
        });
    }

    // Wire up the form submit handler
    const quoteForm = document.getElementById("quoteForm");
    if (quoteForm) {
        quoteForm.addEventListener("submit", handleFormSubmit);
    }
});
