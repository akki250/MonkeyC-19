var PLAY
var END;
var gameState = PLAY;

var ground;

var invisibleGround;

var monkey;

var ObstaclesGroup;
var BananasGroup;

var gameOver;

var restart;

var count;
var jungle,monkey;

function preload() {

  jungle = loadImage("jungle.jpg");
  
  monkeyRunning = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png",);
  
  stone= loadAnimation("stone.png")

}





function setup() {
  createCanvas(800, 500);
 
  PLAY = 1;
  END = 0;
  gameState = PLAY;

  ground = createSprite(400,180,800,20);
  ground.addImage("ground",jungle);
  ground.x = ground.width/2;
  ground.velocityX = -4;
  
  
  
  
  invisibleGround = createSprite(400, 390, 800, 5);
  invisibleGround.visible = false;

  monkey = createSprite(100, 200, 20, 50);
  monkey.x = 100;
  monkey.addAnimation("monkey", monkeyRunning);
  monkey.scale = 0.2;
    
  
  ObstaclesGroup = createGroup();
  BananasGroup = createGroup();
 
  count = 0;
}

function draw() {
    background("lightblue");

    textSize(26);
    fill("red");
    text("Score: " + count, 270, 50);

  
    if (ground.x < 350){
      ground.x = ground.width/2;
    }

    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(invisibleGround);

  
  
   if (gameState === PLAY) {

                
          if (keyDown("space") && monkey.y >= 320) {

            monkey.velocityY = -20;

            monkey.velocityY = monkey.velocityY + 1;

            spawnBanana();

            spawnObstacles();
          }

          if (BananasGroup.isTouching(monkey)) {
            BananasGroup.setLifetimeEach(1);
            count = count + 1;
            monkey.addAnimation("Monkey_01.png")
          }

    
          if (ObstaclesGroup.isTouching(monkey)) {
            gameState = END;
          }
    
  } else if (gameState === END) {
    monkey.setAnimation("Monkey_01.png");
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    BananasGroup.setVelocityXEach(0);

    ObstaclesGroup.setLifetimeEach(0);
    BananasGroup.setLifetimeEach(0);
  } 

  
  
  
  drawSprites();
}


function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  ObstaclesGroup.destroyEach();
  BananasGroup.destroyEach();
  monkey.setAnimation("Monkey_01.png");
  count = 0;
 }



function spawnObstacles() {
    if (World.frameCount % 260 === 0) {
      var obstacle = createSprite(400, 350, 10, 40);
      obstacle.setAnimation("stone.png");
      obstacle.velocityX = -(6);
      obstacle.setCollider("circle", 0, 0, 30);
        
      obstacle.scale = 1;
      obstacle.lifetime = 70;
  
      ObstaclesGroup.add(obstacle);
    }
}


function spawnBanana() {
  if (World.frameCount % 120 === 0) {
    var Banana = createSprite(400, 320, 40, 10);
    Banana.setAnimation("banana.png");
    Banana.y = randomNumber(200, 250);
    Banana.scale = 0.5;
    Banana.velocityX = -(3);
    Banana.setCollider("rectangle", 0, 0, 100, 100, 0);
    //assign lifetime to the variable
    Banana.lifetime = 134;
    Banana.depth = monkey.depth;

    BananasGroup.add(Banana);

  }
}

