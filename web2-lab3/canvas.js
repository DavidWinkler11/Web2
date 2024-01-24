console.log("Spojeno");

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var collisionHappened = false; 
var intervalTime = 600;

// Funkcija koja računa udaljenost između dvije točke
function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Klasa igrača
class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        c.fillStyle = this.color;
        c.shadowBlur = 20;
        c.shadowColor = "white";
        c.fillRect(this.x, this.y, this.width, this.height);
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

var player = new Player(canvas.width / 2, canvas.height / 2, 50, 50, "red");

// Lista svih stvorenih asteroida
var asteroids = []; 

// Klasa asteroid
class Asteroid {
    constructor(x, y, dx, dy, radius, imageSrc) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    // Iscrtavanje asteroida
    draw() {
        c.save(); 
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.clip(); 
        c.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        c.restore();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;
    }
}

// Kreiranje asteroida na nasumičnim pozicijama
function spawnAsteroids() {
    function createAsteroid(x, y, dx, dy) {
        var asteroid = new Asteroid(x, y, dx, dy, 40, "Meteor-78.png");
        asteroids.push(asteroid);
    }

    if (Math.random() > 0.5) {
        if (Math.random() >= 0.9) {
            createAsteroid(-30, Math.random() * canvas.height, 3, Math.random() + 1);
            createAsteroid(Math.random() * canvas.width, -30, Math.random() - 2, 3);
            createAsteroid(canvas.width + 30, Math.random() * canvas.height, -3, Math.random() - 2);
            createAsteroid(Math.random() * canvas.width, canvas.height + 30, Math.random() + 1, -3);
        }
        createAsteroid(-30, Math.random() * canvas.height, 3, Math.random() - 2);
        createAsteroid(Math.random() * canvas.width, -30, Math.random() + 1, 3);
        createAsteroid(canvas.width + 30, Math.random() * canvas.height, -3, Math.random() + 1);
        createAsteroid(Math.random() * canvas.width, canvas.height + 30, Math.random() - 2, -3);
    } else {
        if (Math.random() <= 0.1) {
            createAsteroid(-30, Math.random() * canvas.height, 3, Math.random() - 2);
            createAsteroid(Math.random() * canvas.width, -30, Math.random() + 1, 3);
            createAsteroid(canvas.width + 30, Math.random() * canvas.height, -3, Math.random() + 1);
            createAsteroid(Math.random() * canvas.width, canvas.height + 30, Math.random() - 2, -3);
        }
        createAsteroid(-30, Math.random() * canvas.height, 3, Math.random() + 1);
        createAsteroid(Math.random() * canvas.width, -30, Math.random() - 2, 3);
        createAsteroid(canvas.width + 30, Math.random() * canvas.height, -3, Math.random() - 2);
        createAsteroid(Math.random() * canvas.width, canvas.height + 30, Math.random() + 1, -3);
    }
}

// Pozivanje kreiranja asteroida u intervalima 
var interval = setInterval(spawnAsteroids, intervalTime); 

// Pokušaj simulacije svemira u pozadini
function drawBackground() {
    c.fillStyle = 'white';
    for (let i = 0; i < 30; i++) {
        let starX = Math.random() * canvas.width;
        let starY = Math.random() * canvas.height;
        c.fillRect(starX, starY, 3, 3);
    }
}

var timer = 0;

// Formatiranje vremena 
function showTime(milliseconds) {
    let minutes = Math.floor(milliseconds / (60 * 1000));
    let seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    let millisecondsPart = milliseconds % 1000;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${millisecondsPart < 10 ? '00' : millisecondsPart < 100 ? '0' : ''}${millisecondsPart.toFixed(0)}`;
}


// Provjera je li došlo do sudara
function checkCollision(player, asteroid) {
    let distance = getDistance(player.x + player.width / 2, player.y + player.height / 2, asteroid.x, asteroid.y);
    return distance+20< player.width / 2 + asteroid.radius;
}

// U slučaju sudara stavi flag na true
function handleCollision() {
    collisionHappened = true; 
}

// Implementacija kretanja igrača
var keys = {};
window.addEventListener('keydown', function (e) {
    keys[e.key] = true;
});

window.addEventListener('keyup', function (e) {
    keys[e.key] = false;
});

// Usporedi trenutno vrijeme s najboljim vremenom
function checkHighScore(currentScore) {
   if(localStorage.highscore && currentScore > localStorage.highscore ){
        localStorage.highscore = currentScore;
        
   }else{
    if(!localStorage.highscore && currentScore > 0){
        localStorage.highscore = currentScore;
    }
   }
}

// Gameplay loop
function gameLoop() {
    if (keys.ArrowUp && player.y > 0) {
        player.move(0, -3);
    }
    if (keys.ArrowDown && player.y < canvas.height - player.height) {
        player.move(0, 3);
    }
    if (keys.ArrowLeft && player.x > 0) {
        player.move(-3, 0);
    }
    if (keys.ArrowRight && player.x < canvas.width - player.width) {
        player.move(3, 0);
    }

    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].move();

        if (checkCollision(player, asteroids[i])) {
            handleCollision();
        }
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.fillText('Your score: ' + showTime(timer), 20, 30);

    c.fillStyle = 'white';
    c.font = '20px Arial';
    c.fillText('Highscore: ' + showTime(localStorage.highscore ? localStorage.highscore : 0), 20, 60);

    // Draw everything
    player.draw();
    drawBackground();

    // Draw and move each asteroid
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].draw();
    }

    // Uz pretpostavku da browser osvježava 60 puta u sekundi
    timer += 1000/60;
    
    // Ako nije došlo do sudara nastavi loop
    if(!collisionHappened){
        requestAnimationFrame(gameLoop);
    }else { // U suprotnom ispiši GAME OVER! 
        console.log(localStorage.highscore);
        checkHighScore(timer);
        console.log(localStorage.highscore);
        c.reset();
        c.fillStyle = 'Red';
        c.font = '60px Arial';
        c.fillText("GAME OVER!", canvas.width/2 - 100, canvas.height/2);
        c.fillStyle = 'white';
        c.font = '30px Arial';
        c.fillText("Your score: " + showTime(timer), canvas.width/2 - 50, canvas.height/2 + 50);
        c.fillStyle = 'white';
        c.font = '30px Arial';
        c.fillText("Highscore: " + showTime(localStorage.highscore), canvas.width/2 - 43, canvas.height/2 + 100);
    }
}
// Započni igru
gameLoop();