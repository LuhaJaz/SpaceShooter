var PLAY=2;
var START=1;
var END=0;
var gameState=START;
var score = 0;
var chance = 5;

function preload() {
  
backgroundImage =loadImage("background.jpg");
  aleinImage = loadImage("alein.png")
  spaceshipImage = loadImage("sp.png")
  coinImage = loadImage("coin.png")
  gameoverImage = loadImage("gameover.jpg")
  youwinImage = loadImage("youwin.jpg")
 
}
function setup(){
  createCanvas(600,600);
  bg = createSprite(300,300);
bg.addImage (backgroundImage)
 // bg.scale=1
 // bg.visible=false;
  bg.velocityY = 3
spaceship = createSprite(200,200,20,20)
 
 spaceship.addImage(spaceshipImage)
  spaceship.scale = 0.3
 //ground=createSprite(300,580,600,2)
  aleinGroup = new Group()
  coinGroup = new Group()
  gameover = createSprite(300,300,20,20)
  gameover.addImage(gameoverImage)
 gameover.visible = false;
  youwin = createSprite(300,300,20,20)
  youwin.addImage(youwinImage)
  youwin.visible = false;

}
function draw() {
  background("#00008B");
 
if(gameState===START)
  {
    //Bakcground of start state
    background("black");
    
    //Assigning visibility false to all sprites
    gameover.visible=false;
   bg.visible=false;
   spaceship.visible=false;
   
    //To declare instructions
    textSize(20);
    fill("white");
    text("Read all the instructions before playing the game",80,100);
    text("1. Press Space Key to jump",50,140);
    text("2. Collect coins to score the points",50,170);
    text("3. Don't touch the aliens, or else you will lose a chance",50,200);
    text("4. Game over if you lose all your chances",50,225);
    text("5. You will win when you get 150 points",50,255);
   
    textSize(40);
    text("GOOD LUCK",160,500);
    
    textSize(28);
    text("Press Space Key to Start the Game",100,550);
    
    //To start the game when space key is presses
    if(keyDown("space"))
    {
      gameState=PLAY; 
    }
  }
  //Game State play
  else if(gameState===PLAY)
  {
    spawnaliens();
  spawncoins();
    //Assigning visibility true to all spites
    bg.visible=true;
   spaceship.visible=true;
  
    //To provide infinite scrolling effect to background
    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
  
    
    if(keyDown("space"))
    {
      
   spaceship.velocityY=-4.5;  
   
    }
  
   
 spaceship.velocityY=spaceship.velocityY+0.8;
  
    
    if(keyDown(RIGHT_ARROW))
    {
 
    spaceship.velocityX=3;
    }
  
   
    if(keyDown(LEFT_ARROW))
    {
    
spaceship.velocityX=-3;
    }
  if(spaceship.isTouching(aleinGroup)){
    aleinGroup.destroyEach();
    chance = chance-1
  }
    if(spaceship.isTouching(coinGroup)){
      coinGroup.destroyEach()
      chance = chance+1
      score = score+10
    }
    if(score>=150){
      youwin.visible = true;
      aleinGroup.setVelocityEach(0,0)
      aleinGroup.visible = false;
      coinGroup.setVelocityEach(0,0)
      coinGroup.visible = false;
    }
     if(chance === -1){
      
       gameState = END;
       
    }
  
  }
  
  //End state
  else if(gameState===END)
  {
    //To stop everything and make sprites visible false
 spaceship.velocityX=0;
spaceship.velocityY=0;
    
  
    gameover.visible = true;
     aleinGroup.setVelocityEach(0,0)
      aleinGroup.visible = false;
      coinGroup.setVelocityEach(0,0)
      coinGroup.visible = false;
    
    //To provide infinite scrolling effect to bg
    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
  
  }
 
    //To draw the sprites
    drawSprites();
   

   
 
  fill("white");
  textSize(20);
  text("Score: "+score,50,50);
  text("Chances: "+chance,450,50);
  
  
}
//spawning aleins and coins
function spawnaliens(){
  if(frameCount%80===0){
      alein = createSprite(random(20,500),random(20,520),10,10)
    alein.addImage(aleinImage)
    alein.velocityX = 2
    aleinGroup.add(alein)
    
    alein.scale = 0.2
  }

}
function spawncoins(){
  if(frameCount%100===0){
      coin = createSprite(random(85,520),random(20,400),10,10)
    coin.addImage(coinImage)
    coinGroup.add(coin)
  coin.scale = 0.2
    coin.velocityX = 2
  }

}
