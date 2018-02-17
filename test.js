var c, ctx, xmax, ymax, stage;

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
    //drawTest();
    renderCracks();
}

function renderCracks() {
    var cracks = []
    for (var n = 0; n < numElements; n++){
        angle = n*(Math.floor(360/numElements)+randomInt(-5,5));

        var quad;
        if (angle == 360){angle = 0}
        if (angle >= 0 && angle < 90){quad = 1;}
        else if (angle >= 90 && angle < 180){quad = 2; angle = angle - 90;}
        else if (angle >= 180 && angle < 270){quad = 3; angle = angle - 180;}
        else if (angle >= 270 && angle < 360){quad = 4; angle = angle - 270;}
        
        crack = generateCrack(quad, angle);
        drawCrack(crack);
    }
}

function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms){
            break;
        }
    }
}

function drawCrack(crack){
    ctx.moveTo(xmax/2, ymax/2);
    var colr  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    ctx.strokeStyle = colr;
    ctx.beginPath();
    for (var i = 0; i < crack.length; i++) {ctx.lineTo(crack[i].x, crack[i].y);}
    ctx.stroke();
}

function randomInt(lower, upper){
    return Math.floor(Math.random()*(upper-lower+1)+lower);
}

//quadrant 1: no changes
//quadrant 2: x = xmax - x
//quadrant 3: x = xmax - x and y = y + ymax
//quadrant 4: y - y + ymax

function generateCrack(q, angle){//add quad
    if ((xmax/2)*Math.tan(angle) <= ymax){
        var yLen = (xmax/2)*Math.tan(angle);
        var xDest = xmax;
        var yDest = (ymax/2 - yLen) + randomInt(-10,10);
    } else {
        var xLen = (ymax/2)/(Math.tan(angle));
        var xDest = (xmax/2 - xLen) + randomInt(-10,10);
        var yDest = ymax/2;
    }

    var crack = [];
    crack.push({x: xmax/2, y: ymax/2});
    var numCracks = randomInt(2,7);
    var lenRemaining = Math.sqrt((xDest-xmax/2)^2+(yDest-ymax/2)^2);

    for (var i = 1; i <= numCracks; i++){
        var d = i*(-5 + lenRemaining / numCracks);
        crack.push({x: (i*(xDest/numCracks))+randomInt(-d,d), y: (i*(yDest/numCracks))+randomInt(-d,d)});
    }

    crack.push({x: xDest, y: yDest});
    return crack;
}