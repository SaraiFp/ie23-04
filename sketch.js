let slider;
let recursionDepth = 0;
let birds = [];

function setup() {
  createCanvas(600, 600);
  slider = createSlider(0, 10, 0, 1);
  slider.position(20, height + 20);
  slider.style('width', '200px');
  slider.input(updateRecursionDepth);
  noLoop();
  generateBirds(); // Genera las aves
}

function draw() {
  background(255);
  translate(width / 2, height);
  
  // Cambia el color de trazo a un rojo oscuro
  stroke(128, 0, 0); // Rojo oscuro
  
  // Dibuja las aves
  for (let bird of birds) {
    bird.update(slider.value()); // Actualiza la posición de las aves con el slider
    bird.display();
  }
  
  branch(150, slider.value());
}

function branch(len, depth) {
  strokeWeight(map(len, 0, 200, 1, 30));
  line(0, 0, 0, -len);
  translate(0, -len);
  if (depth > 0) {
    push();
    rotate(PI / 6);
    branch(len * 0.7, depth - 1);
    pop();
    push();
    rotate(-PI / 4);
    branch(len * 0.7, depth - 1);
    pop();
  } else {
    for (let i = 0; i < 5; i++) {
      let offsetX = random(-5, 5);
      let offsetY = random(-5, 5);
      line(0, 0, offsetX, offsetY);
    }
  }
}

function generateBirds() {
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height / 2);
    birds.push(new Bird(x, y));
  }
}

class Bird {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = random(1, 3);
  }
  
  update(sliderValue) {
    this.x -= sliderValue * this.speed;
    if (this.x < -50) {
      this.x = width + 50;
      this.y = random(height / 2);
    }
  }
  
  display() {
    fill(0);
    stroke(0);
    triangle(this.x, this.y, this.x + 10, this.y - 5, this.x + 10, this.y + 5);
  }
}

function updateRecursionDepth() {
  recursionDepth = slider.value();
  redraw();
}




