// Select the toggle container and the two icon images
const themeToggle = document.getElementById('theme-toggle');
const lightIcon = document.getElementById('theme-icon-light');
const darkIcon = document.getElementById('theme-icon-dark');
const body = document.body;

// 1. Check for saved user preference on page load
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
}

// 2. Add click event listener to the toggle
themeToggle.addEventListener('click', () => {
    // Toggle the 'dark-mode' class on the body
    body.classList.toggle('dark-mode');

    // Update icons and save preference
    if (body.classList.contains('dark-mode')) {
        // Switch to Dark Mode visuals
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to Light Mode visuals
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    }
});
// --- Replacement Snippet for Tracker ---
const dayBoxes = document.querySelectorAll('.day-box');
const adviceBox = document.getElementById('brushing-advice');

const adviceList = {
    0: "Select the days you've brushed to get personalized advice!",
    1: "Brushing once a week is a start, but aim for daily to prevent cavities!",
    2: "You're getting there! Try to add a morning routine to these days.",
    3: "Three days is better than none, but your enamel needs more protection.",
    4: "Good progress! You're more than halfway to a healthy weekly habit.",
    5: "Great job! Just two more days to reach a perfect weekly streak.",
    6: "Excellent consistency! Your dentist will be very impressed.",
    7: "Perfect! You're a dental health superstar. Keep up the 2x daily habit!"
};

dayBoxes.forEach(box => {
    box.addEventListener('click', () => {
        // Toggle the 'selected' class for the blue glow
        box.classList.toggle('selected');

        // Recalculate count of selected days
        const count = document.querySelectorAll('.day-box.selected').length;

        // Update advice text
        if (adviceBox) {
            adviceBox.textContent = adviceList[count] || "Keep up the great work!";
        }
    });
});