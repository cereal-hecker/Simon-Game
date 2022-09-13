var gamePattern = []

var buttonColours = ["red", "blue", "green", "yellow"]

var userClickedPattern = []

var level = 0

start = false

$(document).keypress(function() {
    if (start === false){
        $("#level-title").text("Level " + level)
        nextSequence()
        start = true
    }
})

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)
})

function nextSequence() {
    userClickedPattern = []
    level = level + 1
    $("#level-title").text("Level " + level)
    var randomNumber = Math.floor(4 * Math.random())
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
    
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } else{
        var audio = new Audio("sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        startOver()
    }
}

function startOver() {
    level = 0
    gamePattern = []
    userClickedPattern = []
    start = false
}