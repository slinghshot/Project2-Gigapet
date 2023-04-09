$(function () {
  // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);
  $(".heal-button").click(() => clickedHealButton(10));
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
  pet_info.weight === 0 ? console.log("feed me") : (pet_info.happiness += 2);
  // Decrease pet weight
  pet_info.weight -= 1;
  clickedHealButton(-5);
  updateMessage(pet_info.playLines);
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness -= 1.5;
  // Decrease pet weight
  pet_info.weight -= 3;
  updateMessage(pet_info.exerciseLines);
  checkAndUpdatePetInfoInHtml();
}

function clickedHealButton(healAmount) {
  const maxHealth = 100;
  const minHealth = 0;
  // console.log(pet_info.health, healAmount);
  pet_info.health += healAmount;
  if (pet_info.health < minHealth) {
    pet_info.health = minHealth;
  } else if (pet_info.health > maxHealth) {
    pet_info.health = maxHealth;
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
// if weight <2 then happiness is set to 2, 1 then 1 0 then 0 dead
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight <= 10) {
    pet_info.happiness =
      pet_info.happiness > 10 ? pet_info.weight : pet_info.happiness;
    updatePetImg(".sad");
  } else if (pet_info.weight > 2) {
    updatePetImg(".neutral");
  }

  pet_info.weight < 0 ? (pet_info.weight = 0) : pet_info.weight;

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  } else if (pet_info.happiness >= 10) {
    pet_info.happiness = 10;
    updatePetImg(".awesome");
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
  $(".health").text(pet_info["health"]);
  
  if(pet_info.health===0){
    document.getElementById('msg').innerHTML="heal me first, please!";
  }
  $(".treat-button").prop("disabled",pet_info.health>0? false: true);
  $(".play-button").prop("disabled",pet_info.health>0? false: true);
  $(".exercise-button").prop("disabled",pet_info.health>0? false: true);
}
function updatePetImg(activate) {
  // My two methods are hide() and show().
  // Based on weight and happiness, 
  // if pet is less than 11 weight its sad image
  // if pet is 10 happiness its happy image
  // if pet is above 10 weight and below 10 happiness its neutral image.
  $(".sad").hide();
  $(".awesome").hide();
  $(".neutral").hide();
  $(activate).show();
}
