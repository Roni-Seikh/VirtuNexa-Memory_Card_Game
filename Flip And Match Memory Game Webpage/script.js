

// Game Images
const images = [
    'images/img1.jpg', 'images/img2.jpg', 'images/img3.jpg', 'images/img4.jpeg', 'images/img5.png', 
    'images/img6.jpg', 'images/img7.jpg', 'images/img8.jpg', 'images/img9.jpg', 'images/img10.jpg', 
    'images/img11.jpg', 'images/img12.jpeg', 'images/img13.jpg', 'images/img14.jpg', 'images/img15.jpg'
];

const cardsArray = [...images, ...images]; // Duplicate for matching pairs
let shuffledCards = [];
let firstCard = null, secondCard = null;
let score = 0, moves = 0, timer = 0;
let gameInterval = null;

// Shuffle Cards Before Game Starts
function shuffleCards() {
    shuffledCards = [...cardsArray].sort(() => Math.random() - 0.5);
}

// Create Game Board
function createBoard() {
    shuffleCards(); // Shuffle before creating board
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = ""; // Clear previous game board

    shuffledCards.forEach(imageSrc => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.image = imageSrc;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front");

        const backFace = document.createElement("div");
        backFace.classList.add("back");
        const img = document.createElement("img");
        img.src = imageSrc;
        backFace.appendChild(img);

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });

    startTimer();
}

// Flip Card Functionality
function flipCard() {
    if (this.classList.contains("flipped") || secondCard) return; 
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        moves++;
        updateMoves();
        checkMatch();
    }
}

// Check for Match
function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        score++;
        updateScore();
        resetCards();
        if (score === images.length) {
            clearInterval(gameInterval);
            setTimeout(() => alert(`🎉 You won in ${moves} moves and ${timer} seconds!`), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetCards();
        }, 1000);
    }
}

// Reset First & Second Card Selection
function resetCards() {
    firstCard = null;
    secondCard = null;
}

// Update Score Display
function updateScore() {
    document.getElementById("score").textContent = score;
}

// Update Moves Display
function updateMoves() {
    document.getElementById("moves").textContent = moves;
}

// Start Timer
function startTimer() {
    if (gameInterval) clearInterval(gameInterval);
    timer = 0;
    moves = 0;
    document.getElementById("timer").textContent = timer;
    document.getElementById("moves").textContent = moves;
    
    gameInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = timer;
    }, 1000);
}

// Reset Game Function
function resetGame() {
    score = 0;
    timer = 0;
    moves = 0;
    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timer;
    document.getElementById("moves").textContent = moves;
    createBoard();
}

// Attach Reset Button Event
document.getElementById("resetBtn").addEventListener("click", resetGame);

// FAQ Toggle Functionality
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", function () {
        this.parentNode.classList.toggle("active");
    });
});

// Smooth Scrolling for Navbar Links
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute("href"));
        section.scrollIntoView({ behavior: "smooth" });
    });
});

// Contact Form Submission Alert
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    this.reset();
});

// Toggle Menu For Small Screen
function toggleMenu() {
    document.getElementById("nav-links").classList.toggle("active");
}

// Start Game on Page Load
createBoard();