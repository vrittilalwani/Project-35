

var dog,sadDog,happyDog, database;
var credit,creditRem;
var foodS,foodStock;
var buyFood;
var fedTime,lastFed;
var feed;
var score,credit1;
var h;


function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
}


function setup() {
  database=firebase.database();
  createCanvas(1200,800);

  dog=createSprite(600,600,20,20);
  dog.addImage(sadDog);
  dog.scale=0.15;

score = new Score();
credit1 = new Credit();

 foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  credit=database.ref('Credit');
  credit.on("value",function(data){
    creditRem=data.val();
  });

  buyFood=createButton("Buy Food");
  buyFood.position(1000,200);
  buyFood.mousePressed(buyaFood);
 
  feed=createButton("Feed the dog");
  feed.position(1000,250);
  feed.mousePressed(feeddog);
}

function draw() {
  background("white");  

 score.display();
 credit1.display();
 
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });

 text("Last Feed "+ lastFed, 450,100);

  drawSprites();
}

function readStock(data){
  foodS=data.val();

}
function buyaFood(){
  creditRem=creditRem-5;
  foodS++;
  database.ref('/').update({
    Credit:creditRem,
    Food:foodS
  })
}

function feeddog(){
  h=hour();
 
  dog.addImage(happyDog);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:h
  })
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}