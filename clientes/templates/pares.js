const cards = [
    { id: 1, value: '🍎' }, { id: 2, value: '🍎' },
    { id: 3, value: '🍌' }, { id: 4, value: '🍌' },
    { id: 5, value: '🍍' }, { id: 6, value: '🍍' },
    { id: 7, value: '🍇' }, { id: 8, value: '🍇' },
    { id: 9, value: '🍉' }, { id: 10, value: '🍉' },
    { id: 11, value: '🍒' }, { id: 12, value: '🍒' },
    { id: 13, value: '🍓' }, { id: 14, value: '🍓' },
    { id: 15, value: '🍑' }, { id: 16, value: '🍑' }
];

let flippedCards = [];
let matchedCards = 0;
let attempts = 0;
let timer;
let time = 0;

const gameBoard = document.getElementById('gameBoard');
const attemptsDisplay = document.getElementById('attempts');
const matchesDisplay = document.getElementById('matches');
const timeDisplay = document.getElementById('time');
const victoryMessage = document.getElementById('victoryMessage');
const finalAttempts = document.getElementById('finalAttempts');
const finalTime = document.getElementById('finalTime');
const overlay = document.getElementById('overlay');

function shuffleCards() {
    return [...cards].sort(() => Math.random() - 0.5);
}

function startNewGame() {
    matchedCards = 0;
    attempts = 0;
    flippedCards = [];
    time = 0;
    attemptsDisplay.textContent = attempts;
    matchesDisplay.textContent = `${matchedCards}/8`;
    timeDisplay.textContent = "00:00";
    victoryMessage.classList.add('hidden');
    overlay.classList.add('hidden');
    
    const shuffledCards = shuffleCards();
    gameBoard.innerHTML = '';
    
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;  // Guardamos el valor en el dataset
        
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = card.value;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = '❓';
        
        cardElement.append(cardContent, cardBack);
        gameBoard.appendChild(cardElement);
        
        cardElement.addEventListener('click', flipCard);
    });
    
    startTimer();
}

function flipCard(event) {
    const card = event.target.closest('.card');
    if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        attempts++;
        attemptsDisplay.textContent = attempts;
        
        // Compara los valores de las cartas, no el id
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
            flippedCards = [];
            matchedCards++;
            matchesDisplay.textContent = `${matchedCards}/8`;
            
            if (matchedCards === 8) {
                clearInterval(timer);
                finalAttempts.textContent = attempts;
                finalTime.textContent = formatTime(time);
                victoryMessage.classList.remove('hidden');
                overlay.classList.remove('hidden');
            }
        } else {
            setTimeout(() => {
                flippedCards[0].classList.remove('flipped');
                flippedCards[1].classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        timeDisplay.textContent = formatTime(time);
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function closeVictoryMessage() {
    victoryMessage.classList.add('hidden');
    overlay.classList.add('hidden');
}

function resetGame() {
    startNewGame();
}

startNewGame();
