var c, ctx, xmax, ymax;

window.onload = init;

function init(){
    var c = document.getElementById("c");
    var ctx = c.getContext("2d");
    var xmax = window.innerWidth;
    var ymax = window.innerHeight;

}

var numElements = 6;

function randDegrees(ang){
    return Math.floor((Math.random() * (ang+20)) + ang-20);
}

function center(){
    return xmax/2, ymax/2;
}

function drawCracks(){
    ctx.moveTo(center());
    ctx.lineTo(xmax+20,ymax+20);
    ctx.stroke();
    for (var i = 0; i < numElements; i++){
        angle = 360/numElements;
    }
}