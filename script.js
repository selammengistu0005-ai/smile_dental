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

document.addEventListener('DOMContentLoaded', () => {
    const orbitPaths = document.querySelectorAll('.orbit-path');
    const speeds = [4, 8, 12]; 
    const orbitConfigs = [
        { x: 0, y: 0, start: 0 },    // Path 1
        { x: 0, y: 0, start: 120 },  // Path 2
        { x: 0, y: 0, start: 240 }   // Path 3
        ];

    const styleTag = document.createElement('style');
    document.head.appendChild(styleTag);
    const sheet = styleTag.sheet;

    orbitPaths.forEach((path, i) => {
        if (!path) return; // Safety check
        const config = orbitConfigs[i];
        const keyframeName = `orbit-move-${i}`;
        
        const keyframes = `
            @keyframes ${keyframeName} {
                from { transform: rotateX(${config.x}deg) rotateY(${config.y}deg) rotateZ(${config.start}deg); }
                to { transform: rotateX(${config.x}deg) rotateY(${config.y}deg) rotateZ(${config.start + 360}deg); }
            }
        `;

        sheet.insertRule(keyframes, sheet.cssRules.length);
        path.style.animation = `${keyframeName} ${speeds[i]}s linear infinite`;
    });
});

// --- Tooth Scrubbing Game Logic ---
const bacteriaLayer = document.getElementById('bacteria-layer');
const gameStatus = document.getElementById('game-status');
const bacteriaImgUrl = "https://raw.githubusercontent.com/selammengistu0005-ai/smile_dental/main/Bacteria_image-removebg-preview.png";

const totalBacteria = 4; // How many jumpy bugs to start with

function startScrubGame() {
    for (let i = 0; i < totalBacteria; i++) {
        const bug = document.createElement('img');
        bug.src = bacteriaImgUrl;
        bug.className = 'bacteria bacteria-animate';
        
        // Randomly place bacteria around the center of the tooth
        // Adjusting these numbers moves them closer or further from the tooth
        const randomTop = Math.floor(Math.random() * 50) + 20; 
        const randomLeft = Math.floor(Math.random() * 60) + 50;
        
        bug.style.top = `${randomTop}px`;
        bug.style.left = `${randomLeft}px`;
        
        // Individual health for each bug
        let scrubCount = 0;
        const requiredScrubs = 3; 

        // The "Scrubbing" Logic
        bug.addEventListener('mousemove', () => {
            scrubCount++;
            
            // Visual feedback: bug gets smaller and fades
            const progress = (requiredScrubs - scrubCount) / requiredScrubs;
            bug.style.opacity = progress;
            bug.style.transform = `scale(${0.5 + (progress * 0.5)})`;

            if (scrubCount >= requiredScrubs) {
                bug.remove();
                updateGameStatus();
            }
        });

        bacteriaLayer.appendChild(bug);
    }
}

function updateGameStatus() {
    const remaining = document.querySelectorAll('.bacteria').length;
    if (remaining === 0) {
        gameStatus.textContent = "✨ ጽዱ ነው! (It's Clean!) ✨";
        gameStatus.style.color = "var(--accent-color)";
        gameStatus.style.fontWeight = "bold";
    } else {
        gameStatus.textContent = `${remaining} bacteria left... keep scrubbing!`;
    }
}

// Initialize the game
startScrubGame();
