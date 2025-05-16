
document.addEventListener("DOMContentLoaded", () => {
    const messageElement = document.getElementById("message");
    const cardsElement = document.getElementById("cards");
    const sumElement = document.getElementById("sum");
    const startGameBtn = document.getElementById("start-game-btn");
    const newCardBtn = document.getElementById("new-card-btn");
    const playerBalanceElement = document.getElementById("player-balance");

    let playerBalance = 200;
    let currentSum = 0;
    let cards = [];

    function getRandomCard() {
        const faceCards = ["J", "Q", "K"];
        const card = Math.floor(Math.random() * 13) + 1;
        return card > 10 ? 10 : card;
    }


    function updateDisplay() {
        cardsElement.textContent = cards.join(", ");
        sumElement.textContent = currentSum;
        messageElement.textContent = "";
    }


    function checkOutcome() {
        if (currentSum === 21) {
            messageElement.textContent = "You've got Blackjack!";
            playerBalance += 50; // Reward for Blackjack
        } else if (currentSum > 21) {
            messageElement.textContent = "Bust! You lose.";
            playerBalance -= 20; // Penalty for bust
        }
        playerBalanceElement.textContent = playerBalance;
    }

    startGameBtn.addEventListener("click", () => {
        cards = [];
        currentSum = 0;
        playerBalance -= 20;
        playerBalanceElement.textContent = playerBalance;


        for (let i = 0; i < 2; i++) {
            const card = getRandomCard();
            cards.push(card);
            currentSum += card;
        }

        updateDisplay();
        newCardBtn.disabled = false;
        checkOutcome();
    });


    newCardBtn.addEventListener("click", () => {
        const card = getRandomCard();
        cards.push(card);
        currentSum += card;
        updateDisplay();
        checkOutcome();

        if (currentSum >= 21) {
            newCardBtn.disabled = true;
        }
    });
});