//Challenge 1 age in days
function ageInDays() {
  var birthyear = prompt("What year were you born?")
  var age= (2019 - birthyear) * 365;
  var h2 = document.createElement("h2");
  var textAns = document.createTextNode("You are at least " + age + " days old.")
  h2.setAttribute('id', 'ageInDays');
  h2.appendChild(textAns);
  document.getElementById('flex-box-result').appendChild(h2);
}

function reset() {
  document.getElementById('ageInDays').remove();
}

//Generate Cats
function generateCats() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-box-cat');
  image.src = 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small';
  div.appendChild(image);

}

//Rock Paper Scissors
function rpsGame(yourChoice) {
  var humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = choose();

  var winner = decide(humanChoice, botChoice);

  finMessage = finalMessage(winner);

  rpsFrontEnd(yourChoice.id, botChoice, finMessage);
}

 function choose() {
   var num = Math.floor(Math.random() * 3) + 1;
   var choose;
   if (num == 1) {
     choose = 'rock';
   } else if (num == 2) {
     choose = 'paper';
   } else {
     choose = 'scissors';
   }
   return choose;
 }

 function decide(humanChoice, botChoice){
   let result = (humanChoice == 'rock' && botChoice == 'scissors') ? 'human' :
     (humanChoice == 'paper' && botChoice == 'rock') ? 'human' :
     (humanChoice == 'scissors' && botChoice == 'paper') ? 'human' :
     (humanChoice == 'scissors' && botChoice == 'rock') ? 'bot' :
     (humanChoice == 'rock' && botChoice == 'paper') ? 'bot' :
     (humanChoice == 'paper' && botChoice == 'scissors') ? 'bot' :
     'tie';
   return result;
 }

 function finalMessage(winner) {
   var mes = (winner == 'bot') ? 'You lost!' :
     (winner == 'human') ? 'You won!' :
     'You tied!';
   var color_result = (winner == 'bot') ? 'red' :
       (winner == 'human') ? 'green' :
       'gray';
   var final_mes = {
     'message': mes,
     'color': color_result,
   };
   return final_mes;
 }

function rpsFrontEnd(humanImagePick, botImagePick, finalMes) {
  var imagesDB = {
    'rock': document.getElementById('rock').src,
    'paper': document.getElementById('paper').src,
    'scissors': document.getElementById('scissors').src,
  };

  //remove all images from rps
  document.getElementById('rock').remove();
  document.getElementById('paper').remove();
  document.getElementById('scissors').remove();

  var humanDiv = document.createElement('div');
  var botDiv = document.createElement('div');
  var mesDiv = document.createElement('div');

  humanDiv.innerHTML = "<img src='" + imagesDB[humanImagePick] +"' height = 150 width = 150 style='box-shadow: 0px 30px 50px rgba(37, 50, 233, 1);'>";
  mesDiv.innerHTML = "<h1 style='color: " + finalMes['color'] + "; font-size: 60px; padding: 30px'>" + finalMes['message'] + "</h1>";
  botDiv.innerHTML = "<img src='" + imagesDB[botImagePick] +"' height = 150 width = 150 style='box-shadow: 0px 30px 50px rgba(243, 38, 24, 1);'>";
  document.getElementById('flex-box-rps').appendChild(humanDiv);
  document.getElementById('flex-box-rps').appendChild(mesDiv);
  document.getElementById('flex-box-rps').appendChild(botDiv);

}

//Button Color Changer
var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i=0; i< all_buttons.length; i++){
  copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonColor){
  if(buttonColor.value == 'red'){
    buttonsRed();
  } else if (buttonColor.value == 'green') {
    buttonsGreen();
  } else if (buttonColor.value == 'reset') {
    buttonColorReset();
  } else if (buttonColor.value == 'random') {
    buttonColorRandom();
  }
}

function buttonsRed(){
  for (let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-danger');

  }
}

function buttonsGreen(){
  for (let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add('btn-success');

  }
}

function buttonColorReset(){
  for (let i=0; i<all_buttons.length; i++){
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(copyAllButtons[i]);

  }
}

function buttonColorRandom(){
  var choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

  for (let i=0; i<all_buttons.length; i++){
    var randomNum = Math.floor(Math.random() * 4);
    all_buttons[i].classList.remove(all_buttons[i].classList[1]);
    all_buttons[i].classList.add(choices[randomNum]);

  }
}

//Blackjack
let blackjackGame = {
  'you': {'scoreSpan': '#player-hand', 'div': '#player-board', 'score':0},
  'dealer': {'scoreSpan': '#computer-hand', 'div': '#computer-board', 'score':0},
  'cards': ['2', '3','4','5','6','7','8','9','10','J','Q','K','A'],
  'cardsMap':  {'2':2, '3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/assets/sounds/swish.m4a');
const winSound = new Audio('static/assets/sounds/cash.mp3');
const loseSound = new Audio('static/assets/sounds/aww.mp3');

document.querySelector('#bj-hit-btn').addEventListener('click', blackjackHit);
document.querySelector('#bj-deal-btn').addEventListener('click', blackjackDeal);
document.querySelector('#bj-stand-btn').addEventListener('click', dealerLogic);

function blackjackHit() {
  let card = randomCard();
  showCard(card,YOU);
  updateScore(card,YOU);
  showScore(YOU);
  console.log(YOU['score']);
}

function randomCard() {
  let randomIndex = Math.floor(Math.random()*13);
  return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer['score'] <= 21) {
  let cardImage = document.createElement('img');
  cardImage.src = `static/assets/images/${card}.png`;
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
}

}

function blackjackDeal() {
  let yourImages = document.querySelector('#player-board').querySelectorAll('img');
  for(i=0;i<yourImages.length;i++){
    yourImages[i].remove();
  }

  let computerImages = document.querySelector('#computer-board').querySelectorAll('img');
  for(i=0;i<computerImages.length;i++){
    computerImages[i].remove();
  }

  resetScore(YOU, DEALER);

}
function updateScore(card, activePlayer){
  if (card == 'A') {
    if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21 ) {
      activePlayer['score'] += blackjackGame['cardsMap'][card][1];
    }else {
      activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }
  }else {
      activePlayer['score'] += blackjackGame['cardsMap'][card];
  }


}
function showScore(activePlayer){
  if(activePlayer['score'] > 21) {
    document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
    document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
  } else {
  document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
  }
}
function resetScore(player, dealer){
    document.querySelector(player['scoreSpan']).textContent = 0;
    document.querySelector(player['scoreSpan']).style.color = 'white';
    player['score'] = 0;
    document.querySelector(dealer['scoreSpan']).textContent = 0;
    document.querySelector(dealer['scoreSpan']).style.color = 'white';
    dealer['score'] = 0;
}


function dealerLogic(){
  let card = randomCard();
  showCard(card,DEALER);
  updateScore(card,DEALER);
  showScore(DEALER);
  if (DEALER['score'] >= 17){
    showResult(computeWinner());
  }
}
function computeWinner() {
  let winner;

  if (YOU['score'] <= 21) {
    if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
      console.log('You Won!');
      winner = YOU;
    } else if (YOU['score'] < DEALER['score']) {
      console.log('You Lost!');
      winner = DEALER;
    } else if (YOU['score'] == DEALER['score']) {
      console.log('You Tied!');
    }
  } else {
    console.log('You Lost!');
    winner = DEALER;
  }
  console.log('winner :'+winner);
  return winner;
}

function showResult(winner){
  let message, messageColor;

  if(winner == YOU) {
    message = "You Won!";
    messageColor = 'green';
    winSound.play();
  } else if (winner == DEALER){
    message = 'You Lost!';
    messageColor = 'red';
    loseSound.play();
  } else{
    message = 'You Tied!';
    messageColor = 'black';
  }
  document.querySelector('#blackjack-result').textContent = message;
  document.querySelector('#blackjack-result').style.color = messageColor;
}
