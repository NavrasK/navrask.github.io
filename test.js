var c, ctx, xmax, ymax;

var numElements = 6;

window.onload = init;

function init(){
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    canvasResize();
    redraw();
}

window.addEventListener("resize", canvasResize());

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
        console.log(angle)
    }
}

function redraw(){
    //drawTest();
    render();
}

var minSegmentHeight = 5;
var groundHeight = ymax - 20;
var color = "hsl(180, 80%, 80%)";
var roughness = 9;
var maxDifference = ymax / 5;

ctx.globalCompositeOperation = "lighter";

ctx.strokeStyle = color;
ctx.shadowColor = color;

ctx.fillStyle = color;
ctx.fillRect(0, 0, xmax, ymax);
ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

function render() {
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 15;
    var lightning = createLightning();
    ctx.beginPath();
    for (var i = 0; i < lightning.length; i++) {
      ctx.lineTo(lightning[i].x, lightning[i].y);
    }
    ctx.stroke();
    requestAnimationFrame(render);
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

//quadrant 1: no changes
//quadrant 2: negate x coords
//quadrant 3: negate x and y coords
//quadrant 4: negate y coords

function crack(len, angle){
    var quad;
    if (angle == 360){angle = 0}
    if (angle >= 0 && angle < 90){quad = 1;}
    else if (angle >= 90 && angle < 180){quad = 2; angle = angle - 90;}
    else if (angle >= 180 && angle < 270){quad = 3; angle = angle - 180;}
    else if (angle >= 270 && angle < 360){quad = 4; angle = angle - 270;}

    if ((xmax/2)*Math.tan(angle) <= ymax){
        var ylen = (xmax/2)*Math.tan(angle);
        var xcoord = xmax + 5;
        var ycoord = (ymax/2 - ylen) + Math.floor((Math.random() * 10) - 10);
    } else {
        var xlen = (ymax/2)/(Math.tan(angle));
        var xcoord = (xmax/2 - xlen) + Math.floor((Math.random() * 10) - 10);
        var ycoord = ymax/2 + 5;
    }

    var crack = [];
    crack.push({x: xmax/2, y: ymax/2});
    crack.push({x: len + Math.random()})
}