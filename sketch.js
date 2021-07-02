var marioImages, mario;
var bg, ground;
var pipeImg, pipe;
var cloudImg, cloud;
var coinImg, coin;
var goombaImg, goomba;
var cloudGroup, pipeGroup, coinGroup, goombaGroup;
var mariodImg, mariod;
var score = 0;
var gameover, gameoverImg, restart, restartImg;


function preload() {
  marioImages = loadAnimation("mario1.png", "mario2.png", "mario3.png", "mario4.png", "mario5.png");
  bg = loadImage("images/background.jpeg");
  groundImg = loadImage("images/ground.png");
  pipeImg = loadImage("images/Warp_pipe.png");
  cloudImg = loadImage("images/cloud.png");
  coinImg = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png");
  goombaImg = loadAnimation("Goomba.png", "goomba2.png");
  mariodImg = loadAnimation("mariodead.png");
  gameoverImg = loadImage("images/gameover.png");
  restartImg = loadImage("images/restart.png");
}
function setup() {
  createCanvas(1200, 400);

  mario = createSprite(50, 320, 10, 10);
  mario.addAnimation("mario", marioImages);

  ground = createSprite(300, 390, 1200, 20);
  ground.addImage(groundImg);
  gameover = createSprite(620,150);
  gameover.addImage("gameover",gameoverImg);
  gameover.scale = 0.3;

  restart = createSprite(1100,40);
  restart.addImage("restart",restartImg);
  restart.scale =0.15;

  gameover.visible = false;
  restart.visible = false;

  
  coinGroup = new Group();
  goombaGroup = new Group();
  pipeGroup = new Group();
  cloudGroup = new Group();
}
function draw() {
  background(bg);
  text("Score: " + score, 50, 100);
  ground.velocityX = -3;
  if (ground.x < 0){
   ground.x = ground.width/2;
  }
  if(keyDown("space")){
    mario.velocityY = -12;
  }
  if(coinGroup.isTouching(mario)){
   
    for(var j =0; j<coinGroup.length;j++){
			if(coinGroup.isTouching(mario)){
				coinGroup.get(j).destroy();
        score = score+2;
			}
		}
  }
  if(goombaGroup.isTouching(mario)){
    mariodImg = loadAnimation("mariodead.png");
    goombaGroup.destroyEach();
    gameover.visible = true;
    restart.visible = true; 

    mario.changeAnimation("dead", mariodImg);
  }
  mario.velocityY = mario.velocityY+0.5;
  mario.collide(ground);
  spawnClouds();
  spawnGoombas();
  spawnCoins();
  spawnPipes();
  drawSprites();
}
function spawnPipes() {
  if(frameCount%300 === 0){
    pipe = createSprite(1200, 320, 10, 10);
    pipe.addImage(pipeImg);
    pipe.scale = 0.07;
    pipe.velocityX = -3;
    pipe.lifetime = 650;
    pipeGroup.add(pipe);
  }
}
function spawnClouds() {
  if(frameCount%135 === 0){
    cloud = createSprite(1200, 50, 10, 10);
    cloud.y = Math.round(random(50, 200));
    cloud.addImage(cloudImg);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
    cloud.lifetime = 650;
    cloudGroup.add(cloud);
  }
}
function spawnCoins() {
  if(frameCount%150 === 0){
    coin = createSprite(1200, 50, 10, 10);
    coin.y = Math.round(random(180, 250));
    coin.addAnimation("coin" ,coinImg);
    coin.scale = 1;
    coin.velocityX = -3;
    coin.lifetime = 650;
    coinGroup.add(coin);
  }
}
function spawnGoombas() {
  if(frameCount%100 === 0){
    goomba = createSprite(1200, 320, 10, 10);
    goomba.addAnimation("goomba" , goombaImg);
    goomba.scale = 0.1;
    goomba.velocityX = -3;
    goomba.lifetime = 650;
    goombaGroup.add(goomba);
  }
}