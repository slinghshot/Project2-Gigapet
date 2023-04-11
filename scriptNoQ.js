document.addEventListener("DOMContentLoaded", function() {
  // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  document.querySelector(".treat-button").addEventListener("click", clickedTreatButton);
  document.querySelector(".play-button").addEventListener("click", clickedPlayButton);
  document.querySelector(".exercise-button").addEventListener("click", clickedExerciseButton);
  document.querySelector(".heal-button").addEventListener("click", function() { clickedHealButton(10); });
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Bulbasaur", weight: 35, happiness: 5, health: 45, 
    healLines: ["heal feel good","I'm feeling better","Bulbasaur!"],
    treatLines:["Treats make me happy","more treats please","Bulbasaur"],
    exerciseLines: ["Great workout", "I'm exhausted", "no more exercise"],
    playLines:["lets keep going!", "More play time!", "I'm getting tired"] };

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness += 1;
  // Increase pet weight
  pet_info.weight += 0.5;
  // Increase pet health
  clickedHealButton(1);
  updateMessage(pet_info.treatLines);
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.weight === 0 ? alert("feed me first!"): (pet_info.happiness += 2);
  // Decrease pet weight
  pet_info.weight -= 1;
  clickedHealButton(-5);
  updateMessage(pet_info.playLines);
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  if(pet_info.weight===0){
    alert('Feed Me First!');
    return;
  }
  // Decrease pet happiness
  pet_info.happiness -= 1.5;
  // Decrease pet weight
  pet_info.weight -= 3;
  updateMessage(pet_info.exerciseLines);
  checkAndUpdatePetInfoInHtml();
}

function clickedHealButton(healAmount) {
  const MAXHEALTH = 100;
  const MINHEALTH = 0;
  // console.log(pet_info.health, healAmount);
  pet_info.health += healAmount;
  if (pet_info.health < MINHEALTH) {
    pet_info.health = MINHEALTH;
  } else if (pet_info.health > MAXHEALTH) {
    pet_info.health = MAXHEALTH;
  }
  if(pet_info.health===100){
    pet_info.weight=35;
    pet_info.happiness=10;
  }
  updateMessage(pet_info.healLines);
  checkAndUpdatePetInfoInHtml();
}
function updateMessage(message){
  let x = Math.floor(Math.random()*message.length);
  document.getElementById('msg').innerHTML=message[x];
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  
  if (pet_info.happiness <= 4) {
    updatePetImg("sad");
  } else if (pet_info.happiness > 4) {
    updatePetImg("neutral");
  }

  pet_info.weight = (pet_info.weight < 0) ? 0 : pet_info.weight;

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  } else if (pet_info.happiness >= 10) {
    pet_info.happiness = 10;
    updatePetImg("awesome");
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  document.querySelector(".name").textContent = pet_info["name"];
  document.querySelector(".weight").textContent = pet_info["weight"];
  document.querySelector(".happiness").textContent = pet_info["happiness"];
  document.querySelector(".health").textContent = pet_info["health"];

  if (pet_info.health === 0) {
    document.getElementById('msg').innerHTML = "heal me first, please!";
  }
  document.querySelector(".treat-button").disabled = (pet_info.health > 0) ? false : true;
  document.querySelector(".play-button").disabled = (pet_info.health > 0) ? false : true;
  document.querySelector(".exercise-button").disabled = (pet_info.health > 0) ? false : true;
}

function updatePetImg(activate) {
  // My two methods are hide() and show().
  // if pet is 10 happiness its happy image
  // if pet is less than or equal 4 then sad image
  // if pet is above 4 weight and below 10 happiness its neutral image.
  document.querySelector(".sad").style.display = "none";
  document.querySelector(".awesome").style.display = "none";
  document.querySelector(".neutral").style.display = "none";
  document.querySelector("." + activate).style.display = "block";
}