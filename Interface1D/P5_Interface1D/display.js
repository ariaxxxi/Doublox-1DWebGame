// This is used to aggregrate visual information from all objects before we display them. 
// First we populate display and then we show it to user.
// This is particularly helpful once you start outputting your game to an LED strip, of if you want to have two separate 'screens'


class Display {

    constructor(_displaySize, _pixelSize) {
  
      this.displaySize = _displaySize;
      this.pixelSize = _pixelSize;
      this.initColor = color(0);      // default color
      
      this.displayBuffer = [];

      // Assign black to all pixels. Black = off
      for(let i = 0; i < this.displaySize; i++){
        this.displayBuffer[i] = this.initColor;
      }
  
    }
  
     // Color a specific pixel in the buffer
    setPixel(  _index,  _color) {
        this.displayBuffer[_index]  = _color;
    }
  

    // Color all pixels in the buffer
    setAllPixels( _color) {
      
      for(let i = 0; i < displaySize; i++) { 
        display.setPixel(i, _color); 
      }
    }


    // Now write it to screen
    // This is the only function in the entire software that writes something directly to the screen.
    show() {

      for (let i =0; i< this.displaySize; i++) {
        
        fill(this.displayBuffer[i]);
        if(this.displayBuffer[i] == color(0,0,0)){ //stroke the black player
          strokeWeight(2);
          stroke(255);
        }
        strokeWeight(lineWeight);
        stroke(lineColor);
        
        //front face 
        rect(i*(this.pixelSize+distance),pixelSize/2,this.pixelSize,this.pixelSize);

        //top face
        quad(0+i*(this.pixelSize+distance), pixelSize/2, 
            pixelSize/2+i*(this.pixelSize+distance), 0, 
            pixelSize/2*3+i*(this.pixelSize+distance), 0, 
            pixelSize+i*(this.pixelSize+distance), pixelSize/2);
        // quad(0, 25, 25, 0, 75, 0, 50, 25);

        //right face
        quad(pixelSize+i*(this.pixelSize+distance), pixelSize/2*3, 
            pixelSize/2*3+i*(this.pixelSize+distance), pixelSize, 
            pixelSize/2*3+i*(this.pixelSize+distance), 0, 
            pixelSize+i*(this.pixelSize+distance), pixelSize/2);

        // quad(50, 75, 75, 50, 75, 0, 50, 25);
      }
    }
  
    // Let's empty the display before we start adding things to it again
    clear() {

        for(let i = 0; i < this.displaySize; i++) {    
        this.displayBuffer[i] = this.initColor; 
        }
    }
    

  }