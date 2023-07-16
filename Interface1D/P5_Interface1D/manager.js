class Manager {

    // Class that tracks position of everything and checks collision
    constructor(_displaySize, _levelMap, _positionList) {
        this.rowLength = _displaySize;

        // Level map is a nested list that indicates the position of every element of the game
        this.elementList = _levelMap;
        this.positionList = _positionList;
    }

    getPosition(targetName) {
        return this.positionList[targetName];
    }

    pushElement(direction) {
        // Push and move
        let whitePosition = this.getPosition("WHITE");
        //Check collision
        let tempNext = this.getNextPosition(whitePosition, direction);
        let tempNextNext = this.getNextPosition(tempNext, direction);

        // let positionValue = Object.values(this.positionList);

        if (this.elementList[tempNext].length == 0 ||
            this.elementList[tempNext][this.elementList[tempNext].length - 1] == "BLACK") {
            this.elementList[whitePosition].pop();
            this.elementList[tempNext].push("WHITE");
            this.positionList["WHITE"] = tempNext;
            whiteSound.play();
        } else {
            let nextElement = this.elementList[tempNext][this.elementList[tempNext].length - 1];
            let nextNextElement = this.elementList[tempNextNext][this.elementList[tempNextNext].length - 1];
            if (this.elementList[tempNextNext].length == 0 || 
                this.elementList[tempNextNext][this.elementList[tempNextNext].length - 1] == "BLACK") {
                this.elementList[tempNext].pop();
                this.elementList[tempNextNext].push(nextElement);
                this.positionList[nextElement] = tempNextNext;

                this.elementList[whitePosition].pop();
                this.elementList[tempNext].push("WHITE");
                this.positionList["WHITE"] = tempNext;
                pushSound.play();
            } else if (this.isSame(this.elementList[tempNextNext][this.elementList[tempNextNext].length - 1],
                this.elementList[tempNext][this.elementList[tempNext].length - 1])) {
                this.elementList[tempNext].pop();
                this.elementList[tempNextNext].pop();
                this.positionList[nextElement] = 1000;
                this.positionList[nextNextElement] = 1000;

                this.elementList[whitePosition].pop();
                this.elementList[tempNext].push("WHITE");
                this.positionList["WHITE"] = tempNext;

                mergeSound.play();
                   
            } else {
                abruptSound.play();
            }
        }
    }

    isSame(target, next) {


        if (colorListOne.indexOf(target) != -1 && colorListOne.indexOf(next) != -1) {
            return true;
        }
        if (colorListTwo.indexOf(target) != -1 && colorListTwo.indexOf(next) != -1) {
            return true;
        }
        if (colorListThree.indexOf(target) != -1 && colorListThree.indexOf(next) != -1) {
            return true;
        }

        return false;
    }

    maskElement(direction) {
        let blackPosition = this.getPosition("BLACK");
        let whitePosition = this.getPosition("WHITE");
        let tempNext = this.getNextPosition(blackPosition, direction);

        // Mask and move
        // Always below white

        if (this.elementList[blackPosition].length != 3) {
            if (blackPosition == whitePosition) {
                // If white is on top of black, take black out from bottom
                this.elementList[blackPosition].shift();
                this.elementList[tempNext].push("BLACK");
                this.positionList["BLACK"] = tempNext;
                blackSound.play();
            }
            else if (this.elementList[tempNext][this.elementList[tempNext].length - 1] == "WHITE") {
                // If next element is white, insert black underneath the white
                this.elementList[blackPosition].pop();
                this.elementList[tempNext].unshift("BLACK");
                this.positionList["BLACK"] = tempNext;
                blackSound.play();
            } else {
                // Put black on top of any other colors
                this.elementList[blackPosition].pop();
                this.elementList[tempNext].push("BLACK");
                this.positionList["BLACK"] = tempNext;
                blackSound.play();
            }
        } else {
            abruptSound.play();
        }
    }

    getNextPosition(currentPosition, direction) {
        let nextPosition = currentPosition + direction;

        if (nextPosition == this.rowLength) {
            nextPosition = 0;
        } else if (nextPosition == -1) {
            nextPosition = this.rowLength - 1;
        }
        return nextPosition;
    }
}