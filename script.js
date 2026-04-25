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
    0: "ጥርስዎን 🦷 በቀን ለምን ያህል ጊዜ 🪥 ይቦርሻሉ ❓!",
    1: "በሳምንት አንድ ቀን መቦረሽ 🪥 ጥሩ ነው፣ ነገር ግን የጥርስ መበስበስን 🦷 ለመከላከል ሌላ ቀንም ይጨምሩ!",
    2: "ጥሩ እካሄድ ነው! 🚶‍♂️ በእነዚህ ቀናት ላይ Floss ( ጥርስን በክር ማፅዳት ) ይሞክሩ።",
    3: "በሳምንት ሶስት ቀን 🗓️ ከምንም ይሻላል፣ ነገር ግን የጥርስ ሽፋንዎ (enamel) 🛡️ ተጨማሪ መቦረሽ ያስፈልገዋል።",
    4: "ጥሩ እድገት ነው! 📈 ጤናማ የሳምንት ልምድ 🔄 ለማዳበር ከግማሽ በላይ ደርሰዋል።",
    5: "በጣም ጎበዝ! 🌟 የሳምንት ተከታታይነት ላይ ለመድረስ ሁለት ✌️ ቀናት ብቻ ቀርተውዎታል።",
    6: "በጣም ግሩም ጥንካሬ ነው! 💪 ሲቦርሹ ምላሶንም 👅 አብሮ መቦረሽ እንዳይረሱ",
    7: "እጅግ በጣም ጥሩ 👏 አሁን ደግሞ በቀን ሁለት ጊዜ ለመቦረሽ 🪥 ይሞክሩ"
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

const orbitPaths = document.querySelectorAll('.orbit-path');

// Different speeds (in seconds) to ensure they "exceed" each other
const speeds = [5, 8, 12]; 
const tilts = [
    { x: 75, y: 10 },
    { x: 65, y: -25 },
    { x: 85, y: 35 }
];

orbitPaths.forEach((path, i) => {
    const keyframeName = `orbit-move-${i}`;
    const styleSheet = document.styleSheets[0];
    
    const keyframes = `
        @keyframes ${keyframeName} {
            from { transform: rotateX(${tilts[i].x}deg) rotateY(${tilts[i].y}deg) rotateZ(0deg); }
            to { transform: rotateX(${tilts[i].x}deg) rotateY(${tilts[i].y}deg) rotateZ(360deg); }
        }
    `;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
    // Apply speed and animation
    path.style.animation = `${keyframeName} ${speeds[i]}s linear infinite`;
});
