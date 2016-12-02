//Emily Hargis
//Beer Pong
//Open with Safari

//also fix controls so that both bottles can move at the same time

 var playerleft, playerright, ball;

var radius = 10;
var x = 350;
var speed = 5;
var direction = 1;

var ballstate = 1;

var doonce = 0;
var scoreleft = 0;
var scoreright = 0;
var directionsleft = "Controls:\n 'w' = up\n 's' = down";
var directionsright = "Controls:\n up arrow = up\n down arrow = down";
var score = 0;
var win = "Game \n Over";

var px = 100;
var py = 100;

var px2 = 600;
var py2 = 100;

var ball, bottle1, bottle2, red, blue, title, gif;
var bit, bit1, bit2, bit3, broke, broke1, broke2, broke3;

var pa = [];

var splash = 1;

function preload(){
  ball = loadImage('assets/pongball.png');
  bottle1 = loadImage('assets/beer1.png');
  bottle2 = loadImage('assets/beer2.png');
  table = loadImage('assets/background2.png');
  red = loadImage('assets/red1.png');
  blue = loadImage('assets/blue1.png');
  title = loadImage('assets/title_screen5.png');
  end = loadImage('assets/end_screen2.png');

  bit = loadImage('assets/bit.png');
  bit1 = loadImage('assets/bit1.png');
  bit2 = loadImage('assets/bit2.png');
  bit3 = loadImage('assets/bit3.png');

  broke = loadImage('assets/broke.png');
  broke1 = loadImage('assets/broke1.png');
  broke2 = loadImage('assets/broke2.png');
  broke3 = loadImage('assets/broke3.png');
}

function setup(){
  createCanvas(700, 650);
  //background(table, 700,650);
  //image(title, 350, 325, 700, 650);
  ellipseMode(RADIUS);
  //pa[0] = new Particle(px, py);

   playerleft = createSprite(20, 60);
   playerright = createSprite(20, 60);
   ball = createSprite(radius, radius);

   playerleft.addImage(loadImage("assets/beer1.png", 20, 60));
   playerright.addImage(loadImage("assets/beer2.png"));
   ball.addImage(loadImage("assets/pongball.png"));

   ball.setSpeed(speed,random(-70, 70));
   ball.position.x = 350;
   ball.position.y = 300;

   playerleft.immovable = true;
   playerright.immovable = true;

  //  ball.debug = true;
  //  playerleft.debug = true;
  //  playerright.debug = true;

   playerleft.scale = 2.5;
   playerright.scale = 2.5;

   playerleft.setCollider("rectangle", 0, 0, 13, 55);
   playerright.setCollider("rectangle", 0, 0, 13, 55);
   ball.setCollider("circle", 0, 0, 7, 7);

   backg = loadImage("assets/background2.png");
}

function keyReleased() {
  if (keyCode == 32){
    splash = 0;

  }
}

function draw(){
  println(splash);

  if(splash == 1){
    image(title, -80, 20, 800, 550);
  }

  if(splash == 0){
    image(table, 0, 0, 700, 650);
    image(red, 1, 1, 100, 100);
    image(blue, 428, 1, 100, 100);

    //score text
    fill('white');
    textSize(32);
    text(scoreright, width/2+100, 60);
    text(scoreleft, width/2-330, 60);

    textSize(20);
    text(directionsleft, width/2-310, 578);
    text(directionsright, width/2+100, 578);

    //left player controls
     playerleft.position.x = px;
     playerleft.position.y = py;

     //adding the controls as their own functions made the player unable to control the bottles
     if(keyIsPressed){
       if(key == "w"){
         //println("forward");
         py-=speed;
       }
       if(key == "s"){
         //println("back");
         py+=speed;
       }
     }

     //right player controls
     playerright.position.x = px2;
     playerright.position.y = py2;

     if(keyIsPressed){
       if(keyCode == UP_ARROW){
         //println("forward");
         py2-=speed;
       }
       if(keyCode == DOWN_ARROW){
         //println("back");
         py2+=speed;
       }
     }

     //makes ball bounce
     ball.bounce(playerleft);
     ball.bounce(playerright);

     //records score and respawns ball in random direction
    if(ball.position.x<0) {
      ball.position.x = 350;
      ball.setSpeed(speed,random(-70, 70));
      scoreleft++;
      //pa[pa.length] = new Particle(width/2-30, height/2-50, image(bit, 100, 100));
    }
    if(ball.position.x>width) {
      ball.position.x = 350;
      ball.setSpeed(speed,random(-70, 70));
      scoreright++;
      playerleft.addImage(loadImage("assets/broke.png"));
      }
    if(ball.position.y<0) {
      ball.position.y = 1;
      ball.velocity.y = abs(ball.velocity.y);
      }

    if(ball.position.y>height) {
      ball.position.y = height-1;
      ball.velocity.y = -abs(ball.velocity.y);
      }

    //changing bottles
    if(scoreleft == 0){
      playerleft.addImage(bottle1);
    }
    if(scoreleft == 1){
      playerleft.addImage(broke);
    }
    if(scoreleft == 2){
      playerleft.addImage(broke1);
    }
    if(scoreleft == 3){
      playerleft.addImage(broke2);
    }
    if(scoreleft == 4){
      playerleft.addImage(broke3);
    }

    if(scoreright == 0){
      playerright.addImage(bottle2);
    }
    if(scoreright == 1){
      playerright.addImage(broke);
    }
    if(scoreright == 2){
      playerright.addImage(broke1);
    }
    if(scoreright == 3){
      playerright.addImage(broke2);
    }
    if(scoreright == 4){
      playerright.addImage(broke3);
    }

    //game over screen
    if(scoreleft == 5 || scoreright == 5){
      scoreleft = 0;
      scoreright = 0;
      splash = 2;}

    if(splash == 2){
      image(end, -80, 0, 800, 750)
      fill('white');
      textSize(120);
      text(win, width/2-50, height/2);
  }

   drawSprites();
 }
}
