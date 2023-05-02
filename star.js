class Star {
  constructor() {
    this.x = random(-width, width);// x axis of one star
    this.y = random(-height, height);// y axis of one star
    this.z = random(width); //distance from startpoint to near
  }
  
  run(){
    //use run to call update and display function
    this.update();
    this.display();
  }

  update() {
    //speed of moving
    this.z = this.z - random(2, 5);
    //when z is 0, reset to other position to save memmory
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
    }
  }

  display() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    //set star radius
    let r = map(this.z, 0, width, 5, 0);
    //set star color to random orange
    fill(random(160, 255), 
         random(100, 160), 
         random(0, 50), 
         random(120, 180));
    noStroke();
    ellipse(sx, sy, r, r);
  }
}
