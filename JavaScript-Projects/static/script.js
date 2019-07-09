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

function generateCats() {
  var image = document.createElement('img');
  var div = document.getElementById('flex-box-cat');
  image.src = 'http://thecatapi.com/api/images/get?format=src&type=gif&size=small';
  div.appendChild(image);

}

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

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for (let i=0; i< all_buttons.length; i++){
  copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);
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
