var c, ctx, xmax, ymax;

window.onload = init;

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    testfunctions();
}

var numElements = 6;

function randDegrees(ang){
    return Math.floor((Math.random() * (ang+20)) + ang-20);
}

function drawCracks(){
    console.log(ctx);
    ctx.beginPath();
    ctx.moveTo(xmax/2, ymax/2);
    ctx.lineTo(0,0);
    ctx.stroke();
    for (var i = 0; i < numElements; i++){
        angle = 360/numElements;
        console.log(angle)
    }
}

function testfunctions(){
    drawCracks();
}