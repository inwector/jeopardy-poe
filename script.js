const categories = [
    {
        name: "Gems",
        questions: [
            { points: 100, question: "Which green gem makes you spin and hit enemies around you?", answer: "Cyclone" },
            { points: 200, question: "Which skill is commonly known for making people dizzy and motion sick?", answer: "Flicker Strike" },
            { points: 300, question: "Which skill is the non-vaal red skill gem that has 'Duration', 'Attack' and 'Aura' tags?", answer: "Smite" },
            { points: 400, question: "Which skill gem requires a vendor recipe involving a Replica unique to be acquired?", answer: "Elemental Penetration" },
            { points: 500, question: "Which support gem increases Damage over Time Multiplier for Ailments from Critical Strikes?", answer: "Critical Strike Affliction" }
        ]
    },
    {
        name: "Unique Items",
        questions: [
            { points: 100, question: "Which unique axe provides quality for the socketed support gems?", answer: "Atziri's Disfavour" },
            { points: 200, question: "Which unique boot allows you to deal damage just by moving around?", answer: "Abberath's Hooves" },
            { points: 300, question: "Which unique flask should not be used along with the keystone 'Avatar of Fire'?", answer: "Atziri's Promise" },
            { points: 400, question: "Which unique ring provides flat life regen per character level?", answer: "Kikazaru" },
            { points: 500, question: "Which unique item can have no modifiers on it?", answer: "Adorned" }
        ]
    },
    {
        name: "Bosses",
        questions: [
            { points: 100, question: "Which boss drops Orb of Conflict?", answer: "Maven" },
            { points: 200, question: "Which boss is also known by the name 'Valdo Caeserius'?", answer: "Shaper" },
            { points: 300, question: "Which pinnacle boss is also an exile?", answer: "Sirus" },
            { points: 400, question: "Which boss's uber version awaits at the end of a Citadel Map?", answer: "Uthred" },
            { points: 500, question: "Which legion boss is the leader of Timeless Vaal Army?", answer: "Viper Napuatzi" }
        ]
    },
    {
        name: "Leagues",
        questions: [
            { points: 100, question: "Which league introduced Anointing of amulets?", answer: "Blight" },
            { points: 200, question: "Which league had approximately 50% of players playing Cyclone according to poe.ninja?", answer: "Legion" },
            { points: 300, question: "Which league had exalted orb, as the currency for meta mod crafting, prices drop down to ridiculous numbers like 20 chaos orbs?", answer: "Heist" },
            { points: 400, question: "Which league had no changes to game and character balance?", answer: "" },
            { points: 500, question: "Which league was the second longest full league in PoE history (longest is Settlers with 45 hours)?", answer: "Legacy" }
        ]
    },
    {
        name: "Trivia",
        questions: [
            { points: 100, question: "What are we supposed to say when Le Toucan arrives?", answer: "Praise" },
            { points: 200, question: "Were is Path of Exile's development company, Gear Grinding Games, based in?", answer: "New Zealand" },
            { points: 300, question: "Which game is the recipient of the 'love letter' that is Path of Exile?", answer: "Diablo 2" },
            { points: 400, question: "Who voiced Krillson, Master Fisherman?", answer: "Chris Wilson" },
            { points: 500, question: "What award did Path of Exile win in 2020 in 'Best Evolving Game' category?", answer: "BAFTA" },
        ]
    }
];

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

    startTimer(15);
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
        extraInfo = "\n 💡 Ventor's Gamble will still have an implicit.";
    }
    if (correct) {
        score += currentQuestion.q.points;
        feedback.innerText = "✅ Correct!";
    } else {
        score -= currentQuestion.q.points;
        feedback.innerText = `❌ Wrong! Correct answer: ${currentQuestion.q.answer}` + extraInfo;

    }
    scoreDisplay.innerText = score;

    // Show close button centered
    closeModal.style.display = "inline-block";
    submitAnswer.style.display = "none";   // hide submit after answering
    answerInput.disabled = true;           // prevent changing answer
}

closeModal.onclick = () => {
    modal.classList.remove("open");            // was: modal.style.display = "none";
};

/* Optional quality-of-life closes */
modal.addEventListener("click", (e) => {
    if (e.target === modal && closeModal.style.display !== "none") {
        modal.classList.remove("open");
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
