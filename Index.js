const choicesArray = ["✂","🗿","🧻"]
let computerChoice = "";
let playerChoice = "";

// Different elements are stored as variables:
const startBtn = $("#start-btn");
const restartBtn = $("#restart-btn");
restartBtn.hide();
const submitBtn = $("#submit-btn");
submitBtn.hide();
const resultContainer = $(".result-container");
resultContainer.hide();
const upperGameField = $("#game-field .upper-part");
const resultPoints = document.getElementById("result-points");
const roundNumField = document.getElementById("round-num-field");

let playerWins;
let winnerDiv;
let playerPoints;
let computerPoints;
let isTie = false;
let resultText;
let rounds;
let roundNo;


//Screen 1: Start of the game via Start-Button:
startBtn.click(askForRoundNumber);

//Screen 2:
function askForRoundNumber() {
    startBtn.hide();
    restartBtn.hide(); //in case you restart the game but not reload the page
    submitBtn.show();
    playerPoints = 0;
    computerPoints = 0;
    roundNo = 0;
    //Rendering text and Input:
    upperGameField.html(`
    <h1>Wie viele Runden möchtest du Spielen?</h1>
    <input id = "round-input" class="user-input" type="number" min="1">`);

    //Get hold of Input and Submit-Button:
    const roundInput = document.getElementById("round-input");
    submitBtn.unbind("click");
    submitBtn.click(function () {
        rounds = roundInput.value;
        if(rounds > 0){
            playOneRound()
        }
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
    submitBtn.show();
    submitBtn.unbind("click");
    submitBtn.click(function () {
        playerChoice = choicesArray[choiceInput.selectedIndex];
        console.log("Der Spieler wählt: " + playerChoice);
        evaluateRound();
    })
    const choiceQuestion =`
            <h1>Triff eine Entscheidung!</h1>
            <select class="user-input" id="selection-list">
                <option value="selection1">✂</option>
                <option value="selection2">🗿</option>
                <option value="selection3">🧻</option>
            </select>`

    upperGameField.html(choiceQuestion);
    const choiceInput = document.getElementById("selection-list");

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
    resultPoints.textContent = "?";
    submitBtn.hide();
    upperGameField.hide();
    $("#player-choice p").text(playerChoice);
    $("#computer-choice p").text(computerChoice);
    resultContainer.show();

}
function highlightWinner(){

    if(isTie){
        resultText = "Gleichstand! Beide bekommen 1 Punkt."
    }else if(playerWins){
        resultText = "1 Punkt für den Spieler!"
    }else{
        resultText = "1 Punkt für den Computer!"
    }
    resultPoints.textContent = resultText;
    if(isTie === false) {
        if (playerWins) {
            winnerDiv = document.getElementById("player-choice");
        } else {
            winnerDiv = document.getElementById("computer-choice");
        }
        winnerDiv.classList.add("winner")
    }
    setTimeout(function(){
        resultContainer.hide();
        upperGameField.show();
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
    upperGameField.html(`
    <h1>Der Endstand lautet:</h1>
    <p>Spieler-Punkte: ${playerPoints}</p>
    <p>Computer-Punkte: ${computerPoints}</p>     
    `);

    setTimeout(function(){
        if(playerPoints > computerPoints){
            upperGameField.html(`<h1>Gratuliere, du hast gewonnen!</h1>
                                 <img class="result-pic" src="img/winner.avif">`);

        } else if(playerPoints === computerPoints){
            upperGameField.html(`<h1>Ein harter Kampf - Gleichstand!</h1>
                                  <img class="result-pic" src="img/gleichstand.jpg">`);

        }else{
            upperGameField.html(`<h1>Ojeh du hast Verloren!</h1>
                                 <img class="result-pic" src="img/loser.jpg">`);
        }
        restartBtn.show();
        restartBtn.click(askForRoundNumber);
    },3000);
}




