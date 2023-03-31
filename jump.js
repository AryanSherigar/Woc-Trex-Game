let myGamePiece;
let currentImageIndex = 0;
//let obstacleOne;
let obstacleImages = ["images/obstacle1.png", "images/obstacle2.png"];
let obstacles = [];
let score;
let background;
let MySoundOne;
let MySoundTwo;
let gamePieceImages = ["images/1.png", "images/2.png","images/3.png",];
const debounceTime = 200;
let time = 0;
//let music;


const startGame = () => {
    myGameArea.start();
    let btn = document.getElementById("btn");
    btn.parentNode.removeChild(btn);
    myGamePiece = new component(85, 97, "images/logo.png", 80, 110, "image");
    //obstacleOne = new component(44.25, 88.25, "images/obstacle1.png", 700, 105, "image");
    score = new component("30px", "consolas", "black", 800, 40, "text");
    background = new component(1887, 22, "images/backgroundOne.png", 0, 171, "background");
    for (let i = 0; i < obstacleImages.length; i++) {
        let obstacle = new component(51, 102, obstacleImages[i], 1500 +getRndInteger(150,300), 95, "image");
        obstacles.push(obstacle);
    }
    MySoundOne = new sound("sounds/death1.mp3");
    MySoundTwo = new sound("sounds/jump1.mp3");
    //music = new sound("sounds/sound.mp3"); 
    //music.play();
    setInterval(startColorChange, 30000);
};

let myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 1000;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        this.frameNo = 0;
        window.addEventListener('keydown', debounce(function(e)  {
            if (e.keyCode === 32) { 
                e.preventDefault();
                myGamePiece.speedY = -17.5;
                MySoundTwo.play();
                 
            }}, debounceTime));
        window.addEventListener('keyup', function(e) {
            myGamePiece.speedY = 0;
        });
        
        
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    },
};
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedY = 0;
    this.speedX =0;
    this.type = type;
    if (type=="image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    //this.image = new Image();
    //this.image.onload = () => {
        //this.draw();
    //};
    //this.image.src = imageSrc;
    this.x = x;
    this.y = y;
    this.context = myGameArea.context;
    this.gravity = 1;
    this.gravitySpeed = 0;

    this.update = function() {
        //this.draw();
        ctx = myGameArea.context;
        if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } /*else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }*/
        if (type == "image" || type == "background") {
            ctx.drawImage(
                this.image, 
                this.x, 
                this.y,
                this.width,
                this.height
                );
            if (type == "background") {
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    
    //this.draw = function() {
       // this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    //};
    this.newPos = function() {
        this.y += this.speedY += this.gravity;
        this.x += this.speedX;
        this.hitBottom();
        this.gravitySpeed += this.gravity;
        if (this.type == "background") { 
            if(this.x <= -(this.width)) {
                this.x = 0;
            }
        }
    }
    this.hitBottom = function() {
        let rockbottom = myGameArea.canvas.height - this.height - 110;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    /*this.crashWith = function(otherobj) {
        for (let i = 0; i < obstacles.length; i++) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
      }}
    */
      this.crashWith = function(otherobj) {
        for (let i = 0; i < obstacles.length; i++) {
            let obstacle = obstacles[i];
            let myleft = this.x+15;
            let myright = this.x + (this.width)-17;
            let mytop = this.y-25;
            let mybottom = this.y + (this.height)-25;
            let otherleft = obstacle.x+10;
            let otherright = obstacle.x + (obstacle.width)+8;
            let othertop = obstacle.y+20;
            let otherbottom = obstacle.y + (obstacle.height)+10;
            let crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            if (crash) {
                return true;
            }
        }
        return false;
    }
    
}
function updateGameArea() {   
    let x, y;
    for (i=0; i < obstacles.length; i +=1 ) {
        if (myGamePiece.crashWith(obstacles[i])) {
        MySoundOne.play();
        myGameArea.stop();
        //music.stop();
        return;
    }
        myGameArea.clear();
        myGameArea.frameNo +=1;
        if (myGameArea.frameNo == 1 || everyinterval(getRndInteger(200, 220))) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 208
            obstacles.push(new component(51, 102, "images/obstacle1.png", x, y, "image"));
            //obstacles.push(new component(51, 102, "images/obstacle2.png", x - getRndInteger(300,1000), y, "image"));
        }
        
        for (i = 0; i < obstacles.length; i += 1) {
            obstacles[i].x += -8;
            obstacles[i].update();
        }
        score.text = "SCORE: " + parseInt((myGameArea.frameNo)/7);
        score.update();
        //obstacleOne.x -= 5;
        background.x -= 8;
        //obstacleOne.update();
        myGamePiece.newPos();
        myGamePiece.update();
        myGamePiece.image.src = gamePieceImages[currentImageIndex];
        let imageDelay = 5;
        if (myGameArea.frameNo % imageDelay == 0) {
        currentImageIndex++;
        if (currentImageIndex >= gamePieceImages.length) {
        currentImageIndex = 0;
        }
        myGamePiece.image.src = gamePieceImages[currentImageIndex];
            }
        background.newPos();
        background.update();
         
}}

/*function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}*/
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        let later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}
function startColorChange() {
    const canvas = document.querySelector('canvas');
    let count = 0;
    const interval = setInterval(() => {
    count++;
    if (count % 2 === 0) {
        canvas.style.backgroundColor = 'white';
    } else {
        canvas.style.backgroundColor = 'black';
    }
    if (count === 10) {
        clearInterval(interval);
    }
    }, 10000);
}
const switchToDarkMode = () => {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
};
