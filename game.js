
//create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];

//create a new empty array called gamePattern.
var gamePattern = [];

//create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//variable called level and start at level 0.
var level = 0;

// when that happens for the first time, call nextSequence().
$(document).keypress(() => {
  if (!started) {

    //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  
  // passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);

});


//Create a new function called checkAnswer(),
function checkAnswer(currentLevel) {

  //Write an if statement inside checkAnswer().
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //Call nextSequence() after a 1000 millisecond delay.
      setTimeout( () => {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
        //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
      //Call startOver() if the user gets the sequence wrong.
      startOver();

      }
  

  }


//1. Use jQuery to detect when trigger a handler function.
$(".btn").click(function() {

  //create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);

   animatePress(userChosenColour);

});



//create a new function called nextSequence()
function nextSequence() {

  
  //Inside nextSequence(), increase the time nextSequence() is called.
  level++;

  //Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  //Inside the new function generate a new random number.
  var randomNumber = Math.floor(Math.random() * 4);

  //Create a new variable called randomChosenColour.
  var randomChosenColour = buttonColours[randomNumber];

  //Add the new randomChosenColour to the end of the gamePattern.
  gamePattern.push(randomChosenColour);

  // can use jQuery to animate a flash to the button selected 
  setInterval(() => {
    $("#" + randomChosenColour).fadeIn().fadeOut();
  }, 100);

// the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playGround(randomChosenColour);

}


  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
//   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//   //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
//   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
//   audio.play();

function playSound (name){

  
//to play the sound for the button colour selected
  var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress (currentColor){
   //Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
   $("#" + currentColor).addClass("pressed");

   //to remove the pressed class after a 100 milliseconds.
   setTimeout( () => {
     $("#" + currentColor).removeClass("pressed");
   }, 100);

}
//Create a new function called startOver().
function startOver() {

  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
