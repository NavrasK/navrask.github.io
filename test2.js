var c, ctx, stage, xmax, ymax, origx, origy;
var numElements = 5;

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
    origx = xmax/2;
    origy = ymax/2;
    redraw();
}

function redraw(){
    ctx.clearRect(0, 0, xmax, ymax);
    cracks();
}

function randomInt(lower, upper){
    return Math.floor(Math.random()*(upper-lower+1)+lower);
}

function cracks(){
    if (numElements > 1){
        angles = [];
        for (i = 0; i < numElements; i++){
            angles.push(Math.ceil(360/numElements)*i);
            console.log("ANGLE: " + angle[i]);
        }
        for (i = 0; i < angles.length; i++){
            crack = genCrack(angles[i]);
            ctx.moveTo(origx, origy);
            ctx.beginPath();
            for (n = 0; n < crack.length; n++){
                ctx.lineTo(crack[n].x, crack[n].y);
            }
            var colr  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
            ctx.strokeStyle = colr;
            ctx.stroke();
        }
    }
}

function genCrack(angle){
    var endx, endy;
    switch(angle){
        case 0:
            endx = xmax / 2;
            endy = 0;
            break;
        case 45:
            endx = xmax;
            endy = 0;
            break;
        case 90:
            endx = xmax;
            endy = ymax / 2;
            break;
        case 135:
            endx = xmax;
            endy = ymax;
            break;
        case 180:
            endx = xmax / 2;
            endy = ymax;
            break;
        case 225:
            endx = 0;
            endy = ymax;
            break;
        case 270:
            endx = 0;
            endy = ymax / 2;
            break;
        case 315:
            endx = 0;
            endy = 0;
            break;
        case 360:
            endx = xmax / 2;
            endy = 0;
            break;
        default:
            if (angle > 315 || angle < 45){
                endy = 0;
                endx = (ymax/2)*(Math.tan(angle));
            } else if (angle > 45 && angle < 135){
                endy = (xmax/2)*(Math.tan(angle));
                endx = xmax;
            } else if (angle > 135 && angle < 225){
                endy = ymax;
                endx = (ymax/2)*(Math.tan(angle));
            } else if (angle > 225 && angle < 360){
                endy = (xmax/2)*(Math.tan(angle));
                endx = 0;
            } else {
                console.log("Angle out of range! Angle = " + angle);
                endy = 0;
                endx = 0;
            }
            break;
    }
    console.log("Ang: " + angle + " (endx, endy): (" + endx  + ", " + endy + ")");
    var numcracks = randomInt(3,7);
    var breakpoints = [];
    for (i = 1; i <= numcracks; i++){
        breakpoints.push({x: origx + (endx - origx) * i/(numcracks+1), y: origy + (endy - origy) * 1/(numcracks+1)});
    }
    var crack = [];
    var maxoffsetx = Math.ceil(0.05*xmax);
    var maxoffsety = Math.ceil(0.05*ymax);
    for (i = 0; i < breakpoints.length; i++){
        var xcord = breakpoints[i].x;
        var ycord = breakpoints[i].y;
        crack.push({x: randomInt(xcord - maxoffsetx, xcord + maxoffsetx), y: randomInt(ycord - maxoffsety, ycord + maxoffsety)});
    }
    crack.push({x: endx, y: endy});
    return crack;
}
