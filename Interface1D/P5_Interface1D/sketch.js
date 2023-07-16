/* /////////////////////////////////////

  4.043 / 4.044 Design Studio: Interaction Intelligence
  February  9, 2023
  Marcelo Coelho

  If you come from Processing, there is a Processing version here. 
  Keep in mind that there are some differences between both versions:
  https://github.com/marcelocoelho/Interface1D

*/ /////////////////////////////////////

let currentLevel = 0;    //the current game level

let displaySize = 25;   // how many pixels are visible in the game
let pixelSize = 48;     // how big should they look on screen
let lineWeight = 1;
let lineColor = 80;
let distance = 10;

let playerOne;    // Adding 2 players to the game
let playerTwo;
let target;       // and one target for players to catch.

let display;      // Aggregates our final visual output before showing it on the screen

let controller;   // This is where the state machine and game logic lives

let collisionAnimation;   // Where we store and manage the collision animation

let score;        // Where we keep track of score and winner

let levelOne;
let levelTwo;
let levelThree;
let levelFour;
let levelFive;
let levelSix;
let levelSeven;
let levelEight;

let levelList = [];


let manager;

let colorMap;

let whiteSound;
let blackSound;
let pushSound;
let abruptSound;
let mergeSound;

let colorListOne = ["YELLOWONE", "YELLOWTWO","YELLOWTHREE","YELLOWFOUR"];
let colorListTwo = ["REDONE", "REDTWO","REDTHREE","REDFOUR"];
let colorListThree = ["BLUEONE", "BLUETWO","BLUETHREE","BLUEFOUR"];


let img;

let gameBuffer;
let bgBuffer;

function preload() {
  img = loadImage('./bg.png');
}

function setup() {

  // createCanvas((displaySize*(pixelSize+distance))+pixelSize/2, pixelSize/2*3);     // dynamically sets canvas size
  createCanvas(windowWidth, windowHeight);

  // gameBuffer = createGraphics((displaySize*(pixelSize+distance))+pixelSize/2, pixelSize/2*3);
  // bgBuffer = createGraphics(widowWidth, windowHeight);
  // createCanvas(windowWidth, windowHeight);
  display = new Display(displaySize, pixelSize);        //Initializing the display

  playerOne = new Player(color(80), 2, displaySize);   // player black
  playerTwo = new Player(color(255), 5, displaySize);        //player white

  target = new Player(color(255,255,0), 7, displaySize);    // Initializing target using the Player class 

  collisionAnimation = new Animation();     // Initializing animation

  controller = new Controller();            // Initializing controller

  score = {max:3, winner:color(0,0,0)};     // score stores max number of points, and color 



  ///////// Level 1
  levelOne = new Level(25, 5, 2);

  levelOne.addBox("YELLOWONE", 7);
  levelOne.addBox("YELLOWTWO", 12);
  levelOne.addBox("REDONE", 9);
  levelOne.addBox("REDTWO", 23);
  


    ///////// Level 2
    levelTwo = new Level(25, 13, 8);

    levelTwo.addBox("YELLOWONE", 7);
    levelTwo.addBox("YELLOWTWO", 12);
    levelTwo.addBox("REDONE", 9);
    levelTwo.addBox("REDTWO", 23);
    levelTwo.addBox("BLUEONE", 1);
    levelTwo.addBox("BLUETWO", 4);


    ///////// Level 3
    levelThree = new Level(25, 2, 10);

    levelThree.addBox("YELLOWONE", 3);
    levelThree.addBox("YELLOWTWO", 15);
    levelThree.addBox("REDONE", 8);
    levelThree.addBox("REDTWO", 18);
    levelThree.addBox("BLUEONE", 5);
    levelThree.addBox("BLUETWO", 24);



    ///////// Level 4
    levelFour = new Level(25, 2, 10);

    levelFour.addBox("YELLOWONE", 3);
    levelFour.addBox("YELLOWTWO", 15);
    levelFour.addBox("YELLOWTHREE", 12);
    levelFour.addBox("YELLOWFOUR", 20);
    levelFour.addBox("REDONE", 8);
    levelFour.addBox("REDTWO", 18);
    levelFour.addBox("BLUEONE", 5);
    levelFour.addBox("BLUETWO", 24);


    ///////// Level 5
    levelFive = new Level(25, 4, 12);

    levelFive.addBox("YELLOWONE", 5);
    levelFive.addBox("YELLOWTWO", 13);
    levelFive.addBox("YELLOWTHREE", 18);
    levelFive.addBox("YELLOWFOUR", 24);
    levelFive.addBox("REDONE", 0);
    levelFive.addBox("REDTWO", 8);
    levelFive.addBox("REDTHREE", 11);
    levelFive.addBox("REDFOUR", 16);
    levelFive.addBox("BLUEONE", 9);
    levelFive.addBox("BLUETWO", 21);




    levelSix = new Level(25, 1, 10);

    levelSix.addBox("YELLOWONE", 5);
    levelSix.addBox("YELLOWTWO", 11);
    levelSix.addBox("YELLOWTHREE", 19);
    levelSix.addBox("YELLOWFOUR", 24);
    levelSix.addBox("REDONE", 7);
    levelSix.addBox("REDTWO", 12);
    levelSix.addBox("REDTHREE", 15);
    levelSix.addBox("REDFOUR", 23);
    levelSix.addBox("BLUEONE", 2);
    levelSix.addBox("BLUETWO", 17);


    
    levelSeven = new Level(25, 0, 13);

    levelSeven.addBox("YELLOWONE", 3);
    levelSeven.addBox("YELLOWTWO", 12);
    levelSeven.addBox("YELLOWTHREE", 17);
    levelSeven.addBox("YELLOWFOUR", 24);
    levelSeven.addBox("REDONE", 7);
    levelSeven.addBox("REDTWO", 10);
    levelSeven.addBox("REDTHREE", 15);
    levelSeven.addBox("REDFOUR", 21);
    levelSeven.addBox("BLUEONE", 4);
    levelSeven.addBox("BLUETWO", 8);
    levelSeven.addBox("BLUETHREE", 14);
    levelSeven.addBox("BLUEFOUR", 18);



    levelEight = new Level(25, 9, 13);

    levelEight.addBox("YELLOWONE", 4);
    levelEight.addBox("YELLOWTWO", 15);
    levelEight.addBox("YELLOWTHREE", 19);
    levelEight.addBox("YELLOWFOUR", 24);
    levelEight.addBox("REDONE", 0);
    levelEight.addBox("REDTWO", 6);
    levelEight.addBox("REDTHREE", 12);
    levelEight.addBox("REDFOUR", 20);
    levelEight.addBox("BLUEONE", 3);
    levelEight.addBox("BLUETWO", 10);
    levelEight.addBox("BLUETHREE", 16);
    levelEight.addBox("BLUEFOUR", 21);


  levelList = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight];

  // manager = new Manager(25, levelList[currentLevel].levelMap, levelList[currentLevel].positionList);



  colorMap = {
    "WHITE" : color(255,255,255),
    "BLACK" : color(80),
    "YELLOWONE" : color(255,200,94),
    "YELLOWTWO" : color(255,200,94),
    "YELLOWTHREE" : color(255,200,94),
    "YELLOWFOUR" : color(255,200,94),
    "REDONE" : color(255,94,94),
    "REDTWO" : color(255,94,94),
    "REDTHREE" : color(255,94,94),
    "REDFOUR" : color(255,94,94),
    "BLUEONE" : color(94,168,255),
    "BLUETWO" : color(94,168,255),
    "BLUETHREE" : color(94,168,255),
    "BLUEFOUR" : color(94,168,255)
  }
  

  whiteSound = loadSound('./sfx/move.wav');
  blackSound = loadSound('./sfx/mask.wav');
  pushSound = loadSound('./sfx/push.wav');
  abruptSound = loadSound('./sfx/abrupt.wav');
  mergeSound = loadSound('./sfx/merge.wav');

  console.log(levelOne.levelMap);
  console.log(levelOne.positionList);


}

function draw() {
  // background(0);    
  image(img, 0,0,windowWidth, windowHeight);

  translate((width - (displaySize*(pixelSize+distance))+pixelSize/2)/2, height /2-pixelSize/5*4) ;
  // start with a blank screen
  
  
  // Runs state machine at determined framerate
  controller.update();

  // After we've updated our states, we show the current one 
  display.show();
  

}


