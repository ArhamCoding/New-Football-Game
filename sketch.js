var canvas, backgroundImage;
var gameState = "ready";

var football_img;
var footballgoal_img;
var footballkeeper_img;
var kickingball_img;
var kickingfootballer_img;
var footballerstanding_img;

var footballer;
var goal;

var score = 0;
var edges;

function preload(){

  football_img = loadImage("images/football_greenBg.png");
  footballgoal_img = loadImage("images/goal.png");
  footballkeeper_img = loadImage("images/footballkeeper.png");
  kickingfootballer_img = loadAnimation("images/backviewkick.png")
  footballerstanding_img = loadAnimation("images/footballerstanding.png")

}

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);

  
  footballer = createSprite (displayWidth/2+100,displayHeight-250, 200, 200);

  footballer.scale = 0.6

  footballer.addAnimation("standing", footballerstanding_img);
  footballer.addAnimation("kicking", kickingfootballer_img);

  goal = createSprite (displayWidth/2-100, 120, 800, 250)
  goal.addImage("goal", footballgoal_img);
  goal.scale = 0.8

  // goal.debug = true;
  goal.setCollider ("rectangle",0,0,400,200)

  goalkeeper = createSprite (displayWidth/2, 200, 20, 30);
  goalkeeper.addImage ("goalie", footballkeeper_img);
  goalkeeper.scale = 0.6

  // goalkeeper.debug = true;
  goalkeeper.setCollider ("rectangle",0,0,30,50)

  ball = createSprite (displayWidth/2-50, displayHeight/2+120, 60,60);
  ball.addImage ("ball", football_img);
  ball.scale = 0.2;

 
}


function draw(){
  background ("green");
  edges = createEdgeSprites();
  textSize(20);
  fill("white");
  text ("GOALS SAVED: "+score, displayWidth/2+200, 50);

  if (ball.isTouching (edges[2])) {
    ball.bounceOff(edges[2]);
    reset();
    gameState = "ready";
  }
   
  if (ball.isTouching (goalkeeper) ) {
    score = score+1
    ball.bounceOff(goalkeeper);
    reset();
    gameState = "ready";
  }
  else if (ball.isTouching (goal)) {
    // ball.bounceOff(goal); 
  }

  if (touches.length>0 || keyDown ("space") && gameState === "ready") {
    gameState = "play";
    footballer.changeAnimation ("kicking", kickingfootballer_img);
    footballer.scale = 0.8
    footballer.x = displayWidth/2+100
    ball.velocityX = Math.round(random (-6, +4))
    ball.velocityY = Math.round(random (-8, -13))
    touches = [];
  }
  if (score === 5) {
    fill ("black");
    text ("Good job! You completed the game!", displayWidth/2-100, 200);
    text ("Press 'R' to restart the game", displayWidth/2-100, 250)
    gameState = "end";
  }

  if ( touches.length>0 || keyDown ("R")&& gameState === "end") {
    score = 0
    reset();
    gameState = "ready";
    touches = [];
  }
  drawSprites();
}

function keyPressed (){
  if (keyIsDown (RIGHT_ARROW)) {
    goalkeeper.x = goalkeeper.x+30;
  }
  if (keyIsDown (LEFT_ARROW)) {
    goalkeeper.x = goalkeeper.x-30
  }
  if (keyIsDown (UP_ARROW)) {
    goalkeeper.y = goalkeeper.y-10
  }
  if (keyIsDown (DOWN_ARROW)) {
    goalkeeper.y = goalkeeper.y+8
  }
}

function reset (){
  ball.x = displayWidth/2-50;
  ball.y = displayHeight/2+120;
  ball.velocityX = 0;
  ball.velocityY = 0;
  footballer.changeAnimation ("standing",footballerstanding_img );
}
