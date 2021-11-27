var START = 0;
var PLAY = 1;
var END = 2;
var score = 0;
var gameState = 0;

var flappyImage;
var buttonImage;
var gameOverImage;
var obstacleImage,obstacle2Image;
var backgroundImage,background1;
var invisibleGround;

function preload(){
  
    obstacle2Image = loadImage("Top.png");
    obstacleImage = loadImage("Bottom .png");
    flappyImage = loadImage("flappy-1.png");
    backgroundImage = loadImage("background.jpg");
    buttonImage = loadImage("Ply Button flappy.png");
    gameOverImage = loadImage("flappy-bird-game-over-png-1.jpg");
  
}

function setup() {
    createCanvas(600, 500);

  background1 = createSprite(460,300,1000,600);
  background1.addImage(backgroundImage);
  background1.scale = 3.5; 
  background1.velocityX = -5; 

  obstacleGroup = new Group();
  obstacleGroup2 = new Group();
  
  invisibleGround = createSprite(300,495,600,5);  
  flappy = createSprite(100,300,50,50);
  flappy.addImage(flappyImage)
  flappy.scale = 0.15;
  
  top1 = createSprite(300,5,600,5);
  
  start = createSprite(300,250,100,50);
  start.addImage(buttonImage);
  start.scale = 0.5;
  
  gameOver = createSprite(300,250,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  gameOver.visible = false;

 } 

function draw() {
  
  background("lightblue");
  text("Score: "+ score, 500,50);

 if(background1.x < 0){
    background1.x = 300
 

  }
  text("Score: "+ score, 500,50);
 if(gameState == START){

   flappy.y = 200;

   background1.visible = false;
   flappy.visible = false;
   obstacleGroup2.destroyEach();
   obstacleGroup.destroyEach();
   start.visible = true;
   
   fill("black");
   textSize(50);
   text("FLAPPY BIRD",150,150);
   
  if(mousePressedOver(start)){
     gameState = PLAY;
     start.visible = false;
  }
      score = 0;
  }

  else if(gameState == PLAY){
         score = score + Math.round(getFrameRate()/60);
       flappy.setCollider("circle",0,0,120);
       invisibleGround.visible = false;
       flappy.bounceOff(top1);
       top1.visible = false;
       background1.visible = true;
       start.visible = false;
       flappy.visible = true;

 if(keyDown("space") && flappy.y <= 600){
    flappy.velocityY = -8; 
   }
    
    flappy.velocityY = flappy.velocityY + 0.8;
    
    obstacles();
    obstacles2();

 if(flappy.isTouching(obstacleGroup)){
              gameState = END;
  }
   
 if(flappy.isTouching(obstacleGroup2)){
              gameState = END;
  }
    
 if(flappy.isTouching(invisibleGround)){
           gameState = END;
  }
  }
  
 else if(gameState == END){
  text("Score: "+ score, 500,50);
  textSize(50);
  text("GAMEOVER ", 160,150); 
         obstacleGroup.destroyEach();
         obstacleGroup2.destroyEach();
         background1.visible = false;
         flappy.visible = false;
         start.visible = true;
       
       
}
if(mousePressedOver(start)){
  gameState = PLAY;
  start.visible = false;
}


  drawSprites();

}

function obstacles(){
  
  if(World.frameCount % 60 == 0){
    
    obstacle = createSprite(600,400,300,300);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 1.0;
    obstacle.y = random(500,575)
    obstacleGroup2.add(obstacle);
    
  }  
  
}
function obstacles2(){
  
  if(World.frameCount % 60 == 0){
    
    obstacle2 = createSprite(600,90,300,10);
    obstacle2.addImage(obstacle2Image);
    obstacle2.velocityX = -5;
    obstacle2.scale = 1.3;
    obstacle2.y = random(20,125 )
    obstacleGroup.add(obstacle2);
    
 }   
 }