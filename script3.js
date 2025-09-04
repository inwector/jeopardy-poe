//const categories = [
//    {
//        name: "Gems",
//        questions: [
//            { points: 100, question: "?", answer: "" },
//            { points: 200, question: "?", answer: "" },
//            { points: 300, question: "?", answer: "" },
//            { points: 400, question: "?", answer: "" },
//            { points: 500, question: "?", answer: "" }
//        ]
//    },
//    {
//        name: "Unique Items",
//        questions: [
//            { points: 100, question: "?", answer: "" },
//            { points: 200, question: "?", answer: "" },
//            { points: 300, question: "?", answer: "" },
//            { points: 400, question: "?", answer: "" },
//            { points: 500, question: "?", answer: "" }
//        ]
//    },
//    {
//        name: "",
//        questions: [
//            { points: 100, question: "?", answer: "" },
//            { points: 200, question: "?", answer: "" },
//            { points: 300, question: "?", answer: "" },
//            { points: 400, question: "?", answer: "" },
//            { points: 500, question: "?", answer: "" }
//        ]
//    },
//    {
//        name: "",
//        questions: [
//            { points: 100, question: "?", answer: "" },
//            { points: 200, question: "?", answer: "" },
//            { points: 300, question: "?", answer: "" },
//            { points: 400, question: "?", answer: "" },
//            { points: 500, question: "?", answer: "" }
//        ]
//    },
//    {
//        name: "",
//        questions: [
//            { points: 100, question: "?", answer: "" },
//            { points: 200, question: "?", answer: "" },
//            { points: 300, question: "?", answer: "" },
//            { points: 400, question: "?", answer: "" },
//            { points: 500, question: "?", answer: "" }
//        ]
//    }
//];

const categories = [
    {
        name: "Gems",
        questions: [
            { points: 100, question: "Which skill gem allows you to teleport a short distance, leaving behind a burning ground?", answer: "Flame Dash" },
            { points: 200, question: "Which skill gem allows you to throw your weapon in a spiral?", answer: "Spectral Helix" },
            { points: 300, question: "Which support gem gives you charges that increase attack speed, and consumes them to increase movement speed?", answer: "Momentum" },
            { points: 400, question: "Which support gem only increases warcry speed?", answer: "Urgent Orders" },
            { points: 500, question: "Which skill gem stops you and pulls enemies to you?", answer: "Vaal Cyclone" }
        ]
    },
    {
        name: "Unique Items",
        questions: [
            { points: 100, question: "Which unique shield recovers Energy Shield based on your Armour when you Block?", answer: "Aegis Aurora" },
            { points: 200, question: "Which unique bow has the line '30% less Damage'?", answer: "Quill Rain" },
            { points: 300, question: "Which unique item has built-in freeze proliferation?", answer: "Halycon" },
            { points: 400, question: "Which unique item has the line 'Armour also applies to Chaos Damage taken from hits'?", answer: "Fourth Vow" },
            { points: 500, question: "Which unique shield has the line 'Cannot Block Attack Damage'?", answer: "Saffell's Frame" }
        ]
    },
    {
        name: "Notables",
        questions: [
            { points: 100, question: "Which Ranger side notable provides 30 strength and has a lot of protein?", answer: "Beef" },
            { points: 200, question: "Which Duelist side notable provides increased maximum life and life regeneration?", answer: "Golem's Blood" },
            { points: 300, question: "Which Templar side notable provides Area of Effect and Area Damage?", answer: "Amplify" },
            { points: 400, question: "Which Scion side notable provides Increased Mine Duration?", answer: "Destructive Apparatus" },
            { points: 500, question: "Which notable can be anointed with one Opalescent and two Golden oils?", answer: "Charisma" }
        ]
    },
    {
        name: "Buffs",
        questions: [
            { points: 100, question: "Which buff provides 20% attack, cast and movement speed that can be acquired from a Silver flask?", answer: "Onslaught" },
            { points: 200, question: "Which buff grants 100% increased damage, 25% increased attack, cast and movement speed, and 10% physical damage reduction?", answer: "Adrenaline" },
            { points: 300, question: "Which buff disables movement, but grants 90% less Damage taken from Hits, and regenerates mana and energy shield?", answer: "Vaal Arctic Armour" },
            { points: 400, question: "Which buff grants many things, including immunity to stun, chill, freeze, ignite, burning ground and provides 20% increased attack, cast and movement speed?", answer: "Her Embrace" },
            { points: 500, question: "Which item grants a random divination buff when used?", answer: "Wine of the Prophet" }
        ]
    },
    {
        name: "Masteries",
        questions: [
            { points: 100, question: "Which mastery includes '+30 to maximum life'?", answer: "Life" },
            { points: 200, question: "Which mastery includes 'non-vaal strike skills target 1 additional nearby enemy'?", answer: "Attack" },
            { points: 300, question: "Which mastery includes '40% Increased Effect of Onslaught on you'?", answer: "Axe" },
            { points: 400, question: "Which mastery includes 'Gain Unholy Might on Block for 3 seconds'?", answer: "Staff" },
            { points: 500, question: "Which mastery includes '20% Increased effect of Offerings'?", answer: "Minion Offence" }
        ]
    }
];

//Count questions
let totalQuestions = categories.reduce((sum, cat) => sum + cat.questions.length, 0);
let answeredCount = 0;

let score = 0;
let currentQuestion = null;
let timerInterval;

const board = document.getElementById("board");
const modal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const timerText = document.getElementById("timer");
const answerInput = document.getElementById("answer-input");
const submitAnswer = document.getElementById("submit-answer");
const feedback = document.getElementById("feedback");
const closeModal = document.getElementById("close-modal");
const scoreDisplay = document.getElementById("score");

function buildBoard() {
    // Add category headers
    categories.forEach(cat => {
        const catDiv = document.createElement("div");
        catDiv.className = "category";
        catDiv.innerText = cat.name;
        board.appendChild(catDiv);
    });

    // Add questions row by row
    for (let row = 0; row < 5; row++) {
        categories.forEach(cat => {
            const q = cat.questions[row];
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.innerText = q.points;
            tile.onclick = () => openQuestion(q, tile);
            board.appendChild(tile);
        });
    }

}

function openQuestion(q, tile) {
    if (tile.classList.contains("used")) return;
    currentQuestion = { q, tile };
    tile.classList.add("used");

    modal.classList.add("open");
    questionText.innerText = q.question;

    // reset input/buttons
    answerInput.value = "";
    answerInput.disabled = false;
    feedback.innerText = "";
    submitAnswer.style.display = "inline-block";
    closeModal.style.display = "none";

    startTimer(30);
}


function startTimer(seconds) {
    let timeLeft = seconds;
    timerText.innerText = `Time left: ${timeLeft}`;
    timerText.style.color = "white";
    timerText.style.fontSize = "20px";
    timerText.style.fontWeight = "normal";

    timerInterval = setInterval(() => {
        timeLeft--;
        timerText.innerText = `Time left: ${timeLeft}`;
        if (timeLeft <= 3) {
            timerText.style.color = "red";
            timerText.style.fontSize = "32px";
            timerText.style.fontWeight = "bold";
        }
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuestion(false);
        }
    }, 1000);
}

function endQuestion(correct) {
    clearInterval(timerInterval);
    let extraInfo = "";
    if (!correct && currentQuestion.q.question === "Which unique item can have no modifiers on it?") {
        extraInfo = "\n \n Note: Ventor's Gamble will still have an implicit.";
    }
    if (correct) {
        score += currentQuestion.q.points;
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "limegreen";
        feedback.style.fontSize = "32px";
        feedback.style.fontWeight = "bold";
    } else {
        score -= currentQuestion.q.points;
        feedback.innerHTML = `<span style="font-size:72px;">❌</span><br>Wrong!<br><br>Correct answer: ${currentQuestion.q.answer}${extraInfo}`;
        feedback.style.color = "red";
        feedback.style.fontSize = "28px";
        feedback.style.fontWeight = "bold";

    }
    scoreDisplay.innerText = score;

    // Show close button centered
    closeModal.style.display = "inline-block";
    submitAnswer.style.display = "none";   // hide submit after answering
    answerInput.disabled = true;           // prevent changing answer

    answeredCount++;
}


function endGame() {
    // Clear the board
    const scoreBar = scoreDisplay?.closest("h2");
    if (scoreBar) scoreBar.style.display = "none";

    board.innerHTML = "";


    // Example players (replace with your own)
    const players = [
        { name: "HeavyHeals", score: 700 }
    ];

    // Sort players by score
    players.sort((a, b) => b.score - a.score);

    // Create Game Over screen
    const endScreen = document.createElement("div");
    endScreen.className = "end-screen";
    endScreen.innerHTML = `
        <h1>🎉 Game Over! 🎉</h1>
        <p>Your final score: <strong>${score}</strong></p>
        <h2>🏆 Leaderboard</h2>
        <table class="score-table">
            <tr><th>Rank</th><th>Player</th><th>Score</th></tr>
            ${players.map((p, i) =>
        `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.score}</td></tr>`
    ).join("")}
        </table>
    `;
    board.appendChild(endScreen);

}


closeModal.onclick = () => {
    modal.classList.remove("open");            // was: modal.style.display = "none";
};

/* Optional quality-of-life closes */
modal.addEventListener("click", (e) => {
    if (e.target === modal && closeModal.style.display !== "none") {
        modal.classList.remove("open");
    }

    if (answeredCount === totalQuestions) {
        endGame();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && closeModal.style.display !== "none") {
        modal.classList.remove("open");
    }
});

submitAnswer.onclick = () => {
    const userAns = answerInput.value.trim().toLowerCase();
    const correctAns = currentQuestion.q.answer.toLowerCase();
    endQuestion(userAns === correctAns);

    // auto-focus Close button so you can press Enter twice
    closeModal.focus();
};


buildBoard();
