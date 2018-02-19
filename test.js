var c, ctx, xmax, ymax, stage;

var numElements = 4;

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
    ctx.clearRect(0, 0, xmax, ymax);
    //drawTest();
    renderCracks();
}

function renderCracks() {
    var cracks = []
    for (var n = 0; n < numElements; n++){
        angle = (n*Math.floor(360/(numElements)));
        console.log("angle: " + angle);

        var quad;
        if (angle == 360){angle = 0}
        if (angle >= 0 && angle <= 90){quad = 1;}
        else if (angle > 90 && angle <= 180){quad = 2; angle = 180 - angle;}
        else if (angle > 180 && angle <= 270){quad = 3; angle = angle - 180;}
        else if (angle > 270 && angle <= 360){quad = 4; angle = 360 - angle;}
        console.log("q1 version: " + angle);
        
        drawCrack(generateCrack(quad, angle));
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

function generateCrack(q, angle){
    if (xmax*Math.tan(angle) > ymax/2){
        tempY = ymax/2;
        tempX = tempY/(Math.tan(angle));
    }else{
        tempX = xmax/2;
        tempY = tempX*Math.tan(angle);
    }

    var xcoeff, ycoeff;
    switch(q){
        case 2: 
            xcoeff = -1;
            ycoeff = 1;
            break;
        case 3:
            xcoeff = -1;
            ycoeff = -1;
            break;
        case 4:
            ycoeff = -1;
            xcoeff = 1;
            break;
        default:
            xcoeff = 1;
            ycoeff = 1;
            break;
    }

    var crack = [];
    crack.push({x: xmax/2, y: ymax/2});
    var numCracks = randomInt(2,7);

    var tempCracks = [];
    for (var i = 1; i < numCracks; i++){
        tempCracks.push({x: i*(tempX/numCracks) + randomInt((tempX/numCracks - 15), (tempX/numCracks + 15)), y: i*(tempY/numCracks) + randomInt((tempY/numCracks - 15), (tempY/numCracks + 15))});
    }

    for (var i = 0; i < tempCracks.length; i++){
        crack.push({x: xmax/2 + xcoeff*tempCracks[i].x, y: ymax/2 - ycoeff*tempCracks[i].y});
    }

    crack.push({x: xmax/2 + xcoeff*tempX, y: ymax/2 - ycoeff*tempY});
    return crack;
}