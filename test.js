var c, ctx, xmax, ymax;

var numElements = 6;

window.onload = init;

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    console.log("(x,y): (" + xmax + ", " + ymax + ")");
    console.log("(x/2,y/2): (" + xmax/2 + ", " + ymax/2 + ")");
    canvasResize();
    redraw();
}

addEvent(window, "resize", canvasResize());

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

function drawCracks(){
    ctx.moveTo(xmax/2, ymax/2);
    ctx.lineTo(0,0);
    ctx.stroke();
    for (var i = 0; i < numElements; i++){
        angle = 360/numElements;
        console.log(angle)
    }
}

function redraw(){
    drawCracks();
}