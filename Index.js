const choicesArray = ["✂","🗿","🧻"]
let computerChoice = "";
let playerChoice = "";
const startBtn = document.getElementById("start-btn");
const roundNumField = document.getElementById("round-num-field");
const gameField = document.getElementById("game-field");
let playerWins;
let winnerDiv;
let playerPoints;
let computerPoints;
let isTie = false;
let resultText;
let rounds;
let roundNo;

//Start of the game via Start-Button:
startBtn.addEventListener("click", askForRoundNumber);


function askForRoundNumber() {
    playerPoints = 0;
    computerPoints = 0;
    roundNo = 0;
    const roundQuestionHtml = `
    <h1>Wie viele Runden möchtest du Spielen?</h1>
    <input id = "round-input" class="user-input" type="number" min="1">
    <button id="submit-btn" type="submit">Bestätigen</button>
    `
    gameField.innerHTML = roundQuestionHtml;
    //Get hold of Input and Submit-Button:
    const roundInput = document.getElementById("round-input");
    const submitBtn = document.getElementById("submit-btn");

    submitBtn.addEventListener("click", function () {
        rounds = roundInput.value;
        console.log(rounds);
        playOneRound()
    })
}

function playOneRound(){
    roundNo ++;
    roundNumField.style.backgroundColor = "deeppink";
    roundNumField.innerHTML =`<p class="round-no">${roundNo}. Runde:</p>`
    getComputerGuess();
    getPlayerChoice();
}

function getComputerGuess(){
    const randomIndex = Math.floor(Math.random()*3);
    computerChoice = choicesArray[randomIndex];
    console.log("Der Computer wählt " + computerChoice);
}

function getPlayerChoice(){
    const choiceQuestion =`
            <h1>Triff eine Entscheidung!</h1>
            <select class="user-input" id="selection-list">
                <option value="selection1">✂</option>
                <option value="selection2">🗿</option>
                <option value="selection3">🧻</option>
            </select>
            <button id="submit-btn2" type="submit">Bestätigen</button>`
    gameField.innerHTML = choiceQuestion;
    const choiceInput = document.getElementById("selection-list");
    const submitBtn2 = document.getElementById("submit-btn2");
    submitBtn2.addEventListener("click", function () {
        playerChoice = choicesArray[choiceInput.selectedIndex];
        console.log("Der Spieler wählt: " + playerChoice);
        evaluateRound();
    })
}

function evaluateRound(){
    calculatePoints();
    showChoices();
    setTimeout(highlightWinner, 2000);
}

function calculatePoints(){
    isTie = false;
    if(computerChoice === "✂") {
        if (playerChoice === "✂"){
            isTie = true;
        } else if(playerChoice === "🗿"){
            playerWins = true;
        }else{
            playerWins = false;
        }
    }else if(computerChoice === "🗿"){
        if (playerChoice === "🗿"){
            isTie = true;
        } else if(playerChoice === "🧻"){
            playerWins = true;
        }else{
            playerWins = false;
        }
    //Computer has "Paper":
    }else{
        if (playerChoice === "🧻"){
            isTie = true;
        } else if(playerChoice === "✂"){
            playerWins = true;
        }else{
            playerWins = false;
        }
    }
    //Equal signs:
    if(isTie){
        playerPoints++;
        computerPoints++;
    //one Winner:
    }else{
        if(playerWins){
            playerPoints ++;
        }else{
            computerPoints++;
        }
    }
}

function showChoices(){
    const resultsHtml = `
    <div class="result-container">
        <div id="computer-choice">
            <h1>COMPUTER:</h1> 
            <p>${computerChoice}</p>
        </div>
        <div id="result-points">
        <h1>?</h1>
        </div>
        <div id="player-choice"> 
            <h1>PLAYER:</h1>
            <p>${playerChoice}</p>
        </div>
    </div>`
    gameField.innerHTML = resultsHtml;
}
function highlightWinner(){
    if(isTie){
        resultText = "Gleichstand! Beide bekommen 1 Punkt."
    }else if(playerWins){
        resultText = "1 Punkt für den Spieler!"
    }else{
        resultText = "1 Punkt für den Computer!"
    }
    const resultPoints = document.getElementById("result-points");
    resultPoints.innerHTML = `<p>${resultText}</p>`
    if(isTie === false) {
        if (playerWins) {
            winnerDiv = document.getElementById("player-choice");
        } else {
            winnerDiv = document.getElementById("computer-choice");
        }
        winnerDiv.classList.add("winner")
    }
    setTimeout(function(){
        if(winnerDiv){
            winnerDiv.classList.remove("winner");
        }
        rounds --;
        console.log(rounds);
        if(rounds > 0){
            playOneRound();
        }
        else{
            endGame();
        }
    },4000);
}

function endGame(){
    roundNumField.innerHTML = "";
    gameField.innerHTML = `
    <h1>Der Endstand lautet:</h1>
    <p>Spieler-Punkte: ${playerPoints}</p>
    <p>Computer-Punkte: ${computerPoints}</p>     
    `
    setTimeout(function(){
        if(playerPoints > computerPoints){
            gameField.innerHTML = `<h1>Gratuliere, du hast gewonnen!</h1>
                                   <img class="result-pic" src="img/winner.avif">
                                   <button id="restart-btn">Nochmal spielen</button>`

        } else if(playerPoints === computerPoints){
            gameField.innerHTML = `<h1>Ein harter Kampf - Gleichstand!</h1>
                                   <img class="result-pic" src="img/gleichstand.jpg">
                                   <button id="restart-btn">Nochmal spielen</button>`

        }else{
            gameField.innerHTML = `<h1>Ojeh du hast Verloren!</h1>
                                   <img class="result-pic" src="img/loser.jpg">
                                   <button id="restart-btn">Nochmal spielen</button>`
        }
        const restartBtn = document.getElementById("restart-btn");
        restartBtn.addEventListener("click", askForRoundNumber);
    },3000);
}




