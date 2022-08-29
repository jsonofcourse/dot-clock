// Jason Cantrell

// Original source from:
// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

let font;
let vehicles = [];
let oldTime;
let points,bounds;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(600, 300);
    background(51);
    h = hour();
    m = minute();
    s = second();
    let t = getTime(h, m, s);
    points = font.textToPoints(t, 0, 0, 120, {
        sampleFactor: 0.1
    });
    bounds = font.textBounds(t, 0, 0, 120);

    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function getTime(hr, mn, sc) {
    let timeString = []
    for ( let argument of arguments ) {
      timeString.push(argument.toString().padStart(2,'0'));
    }
    return timeString.join(':')
}

function syncVehiclePoints(vehicles,points) {
    if (points.length > vehicles.length) {
        for (let i = vehicles.length-1; i < points.length; i++) {
            let pt = points[i];
            let vehicle = new Vehicle(pt.x, pt.y);
            vehicles.push(vehicle);
        }
    } else if (points.length < vehicles.length) {
        let spliceCount = vehicles.length - points.length
        vehicles.splice(vehicles.length-spliceCount, vehicles.length)
    }

    for (let j = 0; j < points.length; j++) {
        let p = points[j];
        vehicles[j].target = createVector(p.x, p.y);              
    }
    return vehicles
}

function draw() {
    background(51);
    h = hour();
    m = minute();
    s = second();
    let newTime = getTime(h, m, s);
    
    points = font.textToPoints(newTime, 0, 0, 120, {
        sampleFactor: 0.1
    });
  
    translate((width-bounds.w)/2, (height + bounds.h)/2 );
    if (newTime != oldTime) {
        vehicles = syncVehiclePoints(vehicles,points)
        oldTime = newTime;
    }
    for (let vehicle of vehicles) {
        vehicle.behaviors()
        vehicle.update()
        vehicle.show();
    }
}