var c, ctx, xmax, xmin, ymax, ymin, stage;

var numElements = 6;

window.onload = init;

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    stage = new createjs.Stage("c");
    window.addEventListener("resize", canvasResize());
    canvasResize();
    redraw();
}

function canvasResize(){
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    c.width = xmax;
    c.height = ymax;
    redraw();
}

function randDegrees(ang){
    return Math.floor((Math.random() * (ang+20)) + ang-20);
}

function drawTest(){
    ctx.moveTo(xmax/2, ymax/2);
    ctx.lineTo(0,0);
    ctx.stroke();
    for (var i = 0; i < numElements; i++){
        angle = 360/numElements;
    }
}

function redraw(){
    drawTest();
    //renderCracks();
}

//quadrant 1: no changes
//quadrant 2: negate x coords
//quadrant 3: negate x and y coords
//quadrant 4: negate y coords

function renderCracks() {
    for (var n = 0; n < numElements; n++){
        angle = 1;//TODO

        var quad;
        if (angle == 360){angle = 0}
        if (angle >= 0 && angle < 90){quad = 1;}
        else if (angle >= 90 && angle < 180){quad = 2; angle = angle - 90;}
        else if (angle >= 180 && angle < 270){quad = 3; angle = angle - 180;}
        else if (angle >= 270 && angle < 360){quad = 4; angle = angle - 270;}

        var cracks = [];
        for (var i = 0; i < numElements; i++){
            cracks[i] = generateCrack(angle);
        }
        
        for (var c = 0; c < cracks.size(); c++){
            ctx.beginPath();
            for (var i = 0; i < cracks.length; i++) {
                ctx.lineTo(cracks[i].x, cracks[i].y);
            }
            ctx.stroke();
        }
    }
}

function createLightning() {
    var segmentHeight = groundHeight - ymax/2;
    var lightning = [];
    lightning.push({x: center.x, y: center.y});
    lightning.push({x: Math.random() * (size - 100) + 50, y: groundHeight + (Math.random() - 0.9) * 50});
    var currDiff = maxDifference;
    while (segmentHeight > minSegmentHeight) {
      var newSegments = [];
      for (var i = 0; i < lightning.length - 1; i++) {
        var start = lightning[i];
        var end = lightning[i + 1];
        var midX = (start.x + end.x) / 2;
        var newX = midX + (Math.random() * 2 - 1) * currDiff;
        newSegments.push(start, {x: newX, y: (start.y + end.y) / 2});
      }
      
      newSegments.push(lightning.pop());
      lightning = newSegments;
      
      currDiff /= roughness;
      segmentHeight /= 2;
    }
    return lightning;
}

function randomInt(lower,upper){
    return Math.floor(Math.random()*(upper-lower+1)+lower);
}

function generateCrack(angle){
    if ((xmax/2)*Math.tan(angle) <= ymax){
        var yLen = (xmax/2)*Math.tan(angle);
        var xDest = xmax + 5;
        var yDest = (ymax/2 - yLen) + randomInt(-10,10);
    } else {
        var xLen = (ymax/2)/(Math.tan(angle));
        var xDest = (xmax/2 - xLen) + randomInt(-10,10);
        var yDest = ymax/2 + 5;
    }

    var crack = [];
    crack.push({x: xmax/2, y: ymax/2});
    var numCracks = randomInt(2,7);
    var lenRemaining = Math.sqrt((xDest-xmax/2)^2+(yDest-ymax/2)^2);
    //currX = 
    //currY = 
    for (var i = 1; i < numCracks-1; i++){
        crack.push({x: xDest + (xmax/numCracks), y: yDest + (ymax/numCracks)});
        //lenRemaining = 
    }
    crack.push({x: xDest, y: yDest});
    return crack;
}