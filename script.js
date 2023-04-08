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
var pet_info = { name: "Baulbasaur", weight: 15, happiness: 5, health: 45 };

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness += 1;
  // Increase pet weight
  pet_info.weight += 1;
  // Increase pet health
  clickedHealButton(5);
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Increase pet happiness
  pet_info.weight === 0 ? console.log("feed me") : (pet_info.happiness += 2);
  // Decrease pet weight
  pet_info.weight -= 2;
  clickedHealButton(-5);
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Decrease pet happiness
  pet_info.happiness -= 2;
  // Decrease pet weight
  pet_info.weight -= 3;
  clickedHealButton(5);
  checkAndUpdatePetInfoInHtml();
}

function clickedHealButton(healAmount) {
  const maxHealth = 100;
  const minHealth = 0;
  console.log(pet_info.health, healAmount);
  pet_info.health += healAmount;
  if (pet_info.health < minHealth) {
    pet_info.health = minHealth;
  } else if (pet_info.health > maxHealth) {
    pet_info.health = maxHealth;
  }

  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}
// if weight <2 then happiness is set to 2, 1 then 1 0 then 0 dead
function checkWeightAndHappinessBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight <= 2) {
    pet_info.happiness =
      pet_info.happiness > 2 ? pet_info.weight : pet_info.happiness;
    updatePetImg(".c");
  } else if (pet_info.weight > 2) {
    updatePetImg(".a");
  }

  pet_info.weight < 0 ? (pet_info.weight = 0) : pet_info.weight;

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  } else if (pet_info.happiness >= 10) {
    pet_info.happiness = 10;
    updatePetImg(".b");
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $(".name").text(pet_info["name"]);
  $(".weight").text(pet_info["weight"]);
  $(".happiness").text(pet_info["happiness"]);
  $(".health").text(pet_info["health"]);
}
function updatePetImg(a) {
  $(".c").hide();
  $(".b").hide();
  $(".a").hide();
  $(a).show();
}
