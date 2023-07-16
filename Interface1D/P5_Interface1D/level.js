class Level {
    // Class that generate levles
    constructor(_displaySize, _whiteStart, _blackStart) {
        this.levelSize = _displaySize;
        let _levelMap = [];
        let _positionList = {};

        for (let i = 0; i < this.levelSize; i++){
            _levelMap[i] = [];
        }
        _levelMap[_whiteStart].push("WHITE");
        _levelMap[_blackStart].push("BLACK");

        _positionList["WHITE"] = _whiteStart;
        _positionList["BLACK"] = _blackStart;
        
        this.levelMap = _levelMap;
        this.positionList = _positionList;
    }

    addBox(targetBox, location) {
        this.levelMap[location].push(targetBox);
        this.positionList[targetBox] = location;
    }
}