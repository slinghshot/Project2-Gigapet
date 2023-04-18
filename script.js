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
// This includes arrays of healLines, treatLines, exerciseLines and playLines.
var pet_info = { name: "Bulbasaur", weight: 35, happiness: 5, health: 45, 
    healLines: ["heal feel good","I'm feeling better","Bulbasaur!"],
    treatLines:["Treats make me happy","more treats please","Bulbasaur"],
    exerciseLines: ["Great workout", "I'm exhausted", "no more exercise"],
    playLines:["lets keep going!", "More play time!", "I'm getting tired"] };

// when treat-button is clicked, this function gets called.
// addes 1 to happiness and 0.5 to weight. then calls clickedHealButton, updateMessage and checkAndUpdatePetInfoHtml
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
// when play button is clicked this functions is called
// checks if weight is 0 then alerts user to feed it first. 
function clickedPlayButton() {
  // Increase pet happiness
  pet_info.weight === 0 ? alert("feed me first!"): (pet_info.happiness += 2);
  // Decrease pet weight
  pet_info.weight -= 1;
  clickedHealButton(-5);
  updateMessage(pet_info.playLines);
  checkAndUpdatePetInfoInHtml();
}

// when exercise button is clicked, check if weight is 0, if it is alert and return else decrease happiness and weight
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
// heal button clicked this function is called, with healAmount argument.
// set max and min health, then healAmount gets added to health.
// if pet health is less than minHealth then set it to MinHealth
// if pet health is greater than maxHealth then set it to maxhealth
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

// updateMessage, randomly picks a message from the array that is passed and then set is.
function updateMessage(message){
  let x = Math.floor(Math.random()*message.length);
  document.getElementById('msg').innerHTML=message[x];

}

// checkANdUPdatePetInfoInHtml sets 
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// checkWeightANdHappinessBeforeUpdating function checks happiness and based on it updates pet Image.
// if happiness is less than 5 set image to sad
// if happiness is less greater than 4 set image to neutral
// if happiness = 10 set awesome image
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.happiness <= 4) {
    updatePetImg(".sad");
  }
   else if (pet_info.happiness > 4) {
    updatePetImg(".neutral");
  }

  // pet_info.weight < 0 ? (pet_info.weight = 0) : pet_info.weight;

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
// hides all images and then shows class image that is passed.
function updatePetImg(activate) {
  // My two methods are hide() and show().
  // if pet is 10 happiness its happy image
  // if pet is less than or equal 4 then sad image
  // if pet is above 4 weight and below 10 happiness its neutral image.
  $(".sad").hide();
  $(".awesome").hide();
  $(".neutral").hide();
  $(activate).show();
}
