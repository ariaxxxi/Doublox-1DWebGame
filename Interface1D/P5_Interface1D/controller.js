
// This is where your state machines and game logic lives


class Controller {

    // This is the state we start with.
    constructor() {
        this.gameState = "LOAD";
       
    }
    
    // This is called from draw() in sketch.js with every frame
    update() {

        // STATE MACHINE ////////////////////////////////////////////////
        // This is where your game logic lives
        /////////////////////////////////////////////////////////////////
        switch(this.gameState) {


            case "LOAD":
                manager = new Manager(25, levelList[currentLevel].levelMap, levelList[currentLevel].positionList);
                this.gameState = "PLAY";

            // This is the main game state, where the playing actually happens
            case "PLAY":

                // clear screen at frame rate so we always start fresh      
                display.clear();
            
               // Take the advantage of the nested list manager.elementList, draw the pixel based on their position in the list. i.e. the last element in the list is always drawn on top in that slot
               let totalElement = 0; 
            
               for (let i = 0; i < manager.elementList.length; i++) {
                    if (manager.elementList[i].length != 0) {
                        for (let k = 0; k < manager.elementList[i].length; k++) {
                            let colorTemp = colorMap[manager.elementList[i][k]];
                            display.setPixel(i, colorTemp);
                            totalElement++;
                        }
                    }
                }

                if (totalElement == 2) {
                    this.gameState = "WIN";
                }

           

                break;


            case "WIN":
                // display.setAllPixels(colorMap["WHITE"]);
                let frameToShow = collisionAnimation.currentFrame();    // this grabs number of current frame and increments it 
                
                // then grab every pixel of frame and put it into the display buffer
                for(let i = 0; i < collisionAnimation.pixels; i++) {
                    display.setPixel(i,collisionAnimation.animation[frameToShow][i]);                    
                }

                if (frameToShow == collisionAnimation.animation.length-1)  {
                                        
                    if (currentLevel != 7)
                    {
                        currentLevel++;
                        this.gameState = "LOAD";
                    }
                }
            

            
                

                break;

            // Not used, it's here just for code compliance
            default:
                break;
        }
    }
}




// This function gets called when a key on the keyboard is pressed
function keyPressed() {

    // Move player one to the left if letter A is pressed
    if (key == 'J' || key == 'j') {
        playerOne.move(-1);
        manager.maskElement(-1);
        console.log(manager.elementList);
      }
    
    // And so on...
    if (key == 'L' || key == 'l') {
        playerOne.move(1);
        manager.maskElement(1);
        console.log(manager.elementList);
    }    

    if (key == 'A' || key == 'a') {
        playerOne.move(-1);
        manager.pushElement(-1);
        console.log(manager.elementList);
    }
    
    if (key == 'D' || key == 'd') {
        playerTwo.move(1);
        manager.pushElement(1);
        console.log(manager.elementList);
    }
    
    // When you press the letter R, the game resets back to the play state
    if (key == 'R' || key == 'r') {
        console.log('reset');
        controller.gameState = "LOAD";
    }
  }