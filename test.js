let dino = document.getElementById("dino");
let obstacle = document.getElementById("obstacle");
let score = 0;

function jump() {
  let position = 0;
  let intervalId = setInterval(function() {
    if (position == 150) {
      clearInterval(intervalId);
      let downIntervalId = setInterval(function() {
        if (position == 0) {
          clearInterval(downIntervalId);
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    jump();
    
  }
});

let gameIntervalId = setInterval(function() {
  let obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));
  if (obstacleRight == 570) {
    score += 1;
    document.getElementById("score").innerHTML = score;
  }
  if (obstacleRight > 0 && obstacleRight < 60 && parseInt(window.getComputedStyle(dino).getPropertyValue('bottom')) < 60) {
    clearInterval(gameIntervalId);
    document.getElementById("game-over").innerHTML = "Game Over";
    document.getElementById("game-over").style.display = "block";
    
  }
}, 10);
