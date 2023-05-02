/*
Food heaven, 13/01/2023
by Yimiao Pan
Interaction instrction: click once on any place of the canvas to start
=Particle code inspiration from Daniel Shiffman
Pxplosion sound  by jnsjknn
Eating sound 1 by LUCASARPONTV
Eree copyright food picture by Pexels Rajesh TP
*/

//fireworks variables
let fireworks = []; //Create an empty array to store fireworks
let gravity; //particle gravity
let e1, e2; //firework explode sound

//star variables
let stars = []; //Create an empty array to store the stars
let starSpeed; //moving speed of the star
let starNum = 1000; //amount of stars

let food; //eating sound
let holy; //holy sound after eating

let instruct = "Click to eat!"; //interactive instruction

function preload() {
  e1 = loadSound("Sounds/e1.mp3");//preload firework explode sound 1
  e2 = loadSound("Sounds/e2.mp3");//preload firework explode sound 2
  f1 = loadSound("Sounds/f1.mp3");//preload food eating sound
  holy = loadSound("Sounds/holy.mp3");//preload holy sound
  food = loadImage("Food/burger.png");//preload burger photo
}

function setup() {
  frameRate(90);//set framerate to 90
  createCanvas(windowWidth, windowHeight);
  background(1, 1, 30);//set the background to dark blue

  ////set instrction text
  push();
  textFont("Calibri");
  textSize(30);
  //show the instruction text
  fill(255, 150, 30);
  text(instruct, width / 2 - 80, (height / 7) * 5);
  pop();

  ////display food picture, put it in center
  imageMode(CENTER);
  image(food, width / 2, height / 2);

  ////set eating sound volume
  f1.setVolume(0.15);

  ////set the gravity as an vector head down
  gravity = createVector(0, random(0.1, 0.25));

  ////when star is off window, reset it to a different position in same array
  for (let n = 0; n < starNum; n++) {
    stars.push(new Star(random(width), random(height)));
  }

  noLoop();
}

function mousePressed() {
  f1.play(); //play eating sound
  holy.play(); //play holy sound
  loop();
}

function draw() {
  background(1, 1, 30, 20);//set the background to dark blue

  ////set explode sound volume
  e1.setVolume(0.15);
  e2.setVolume(0.15);

  ////draw stars
  push();
  let starCurve = random(0, 5);
  let curveFreq = random(20, 40);
  //give stars curly  falling trail
  translate(
    width / 2 + sin(height / curveFreq) * starCurve,
    height / 2 + cos((width / 2 / curveFreq) * starCurve)
  );
  //update and display stars
  for (let n = 0; n < stars.length; n++) {
    stars[n].run();
  }
  pop();

  ////firerworks shooting
  //6.5% chance of making new fireworks every  new frame
  if (random(100) < 6.5) {
    fireworks.push(new Firework());
  }
  
  //update and display exsiting fireworks
  for (let i = 0; i < fireworks.length; i++) {
    fireworks[i].run();
    if (fireworks[i].done()) {
      //when particle completly faded out, delete it from the array to free some memory
      splice(i, 1);
    }
  }
  console.log(fireworks.length);
}

function keyPressed(){
  if (key == 's') {
    save('food-heaven.png');
  }
}
