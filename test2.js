// Creates a cracked appearance, radiating from the center of the screen, with a specified number of cracks
// https://math.stackexchange.com/questions/3180133/subdivide-a-rectangle-into-n-equal-parts-by-area-radially/3180219#3180219

var c, ctx, xmax, ymax, o, stage;

// How many segments are drawn, Note: minimum 2
var numElements = 0;

window.onload = init;

function init(){
    // Removed for testing 
    numElements = window.prompt("Number of elements (must be greater than 1)", "6");
    if (numElements === null || numElements <= 1){
        window.alert("Invalid value");
        window.location.replace("index.html");
    }
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    stage = new createjs.Stage("c");

    // Bottom Right Cooridinates
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    // Center Coordinates
    o = {x: xmax / 2, y: ymax / 2};
    
    window.addEventListener("resize", canvasResize());
    canvasResize();
}

function canvasResize(){
    xmax = window.innerWidth;
    ymax = window.innerHeight;
    o.x = xmax / 2;
    o.y = ymax / 2;
    c.width = xmax;
    c.height = ymax;
    redraw();
}

function redraw(){
    ctx.clearRect(0, 0, xmax, ymax);
    renderCracks();
}

function rand(min, max){
    return Math.random() * (max - min) + min;
}

function renderCracks(){
    var endpoints = calcAngles();
    var cracks = [];
    for (var i = 0; i < numElements; i++){
        cracks.push([{x: o.x, y: o.y}, endpoints[i]]);
    }
    for (var i = 0; i < numElements; i++){
        cracks[i] = addCracks(cracks[i]);
    }
    for (var i = 0; i < numElements; i++){
        drawCrack(cracks[i]);
    }
}

function drawCrack(crack){
    ctx.moveTo(o.x, o.y);
    var colr  = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    ctx.strokeStyle = colr;
    ctx.beginPath();
    for (var i = 0; i < crack.length; i++) {
        ctx.lineTo(crack[i].x, crack[i].y);
    }
    ctx.stroke();
}

function addCracks(crack){
    // var end = crack.pop();
    // var start = crack[0];
    var numCracks = 2;
    while (rand(0, 3) > 1){
        numCracks = numCracks + 1;
    }
    // for (var i = 0; i < numCracks - 1 ; i++){
    //     var crackx = ((numCracks - i) / numCracks) * start.x + (i / numCracks) * end.x;
    //     var cracky = ((numCracks - i) / numCracks) * start.y + (i / numCracks) * end.y;
    //     crack.push({x: crackx, y: cracky});
    // }
    // crack.push(end);
    // crack = mutateCracks(crack, numCracks);
    return crack;
}

function mutateCracks(crack, numCracks){
    var end = crack.pop();
    var len = numCracks - 1; // last point is added at the end
    console.log("CRACK: " + crack + "\nNUMCRACKS: " + numCracks);
    for (var i = 1; i < len; i++){
        var previousPoint = crack[i - 1];
        var angleToEnd = Math.atan((end.y - previousPoint.y) / (end.x - previousPoint.x))
        var maxAngleMutation = 0;//0.25 * (i / len);
        var angle = angleToEnd + rand(-1 * maxAngleMutation, maxAngleMutation);
        var maxLengthMutation = 0;//10 * (i / len);
        var distToEnd = {x: (end.x - previousPoint.x) * (1 / (len - i + 1)), y: (end.y - previousPoint.y) * (1 / (len - i + 1))};
        var lengthFromPrevious = Math.sqrt(Math.pow(distToEnd.x, 2) + Math.pow(distToEnd.y, 2));
        var length = lengthFromPrevious + rand(-1 * maxLengthMutation, maxLengthMutation);
        console.log("\n\nprev: " + previousPoint + "\nangle: " + angle + "\nlength: " + length);
        crack.push({x: previousPoint.x + length * Math.sin(angle), y: previousPoint.y + length * Math.cos(angle)});
    }
    crack.push(end);
    return crack;
}

function calcAngles(){
    // Measured in Radians
    // 0 is to the right of origin, and continues clockwise
    var angles = [];
    for (var i = 0; i < numElements; i++){
        var ang = (i / numElements) * (2 * Math.PI);
        angles.push(ang);
    }
    var endpoints = [];
    // The maximum length a line segment could be
    var maxval = Math.sqrt(Math.pow(xmax - o.x, 2) + Math.pow(ymax - o.y, 2));
    for (var i = 0; i < numElements; i++){
        var end = {x: o.x + maxval * Math.cos(angles[i]), y: o.y + maxval * Math.sin(angles[i])};
        endpoints.push(end);
    }
    return endpoints;
}