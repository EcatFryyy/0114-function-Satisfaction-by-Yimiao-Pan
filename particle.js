//create a particle system for fireworks

class Particle {
  constructor(x, y, firework) {
    
    //give the particle a position that passed to it
    this.pos = createVector(x, y);
    
    //seed firework
    this.firework = firework;
    
    //maximum of the particle is 200
    this.lifeSpan = 200;
    
    //acceleration of the particle start at 0
    this.acc = createVector(0, 0);

    //if this is the seed firework
    if (this.firework) {
      //set particle velocity pointing up with a slight angle
      this.vel = createVector(random(-1,1), random(-18, -10));
    } else {
      //set random direction to the exploded particles
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 30));
    }
  }

  applyForce(force) {
    // acceleration = force ÷ mass; a = F ÷ m;
    // here mass is analyticed in for simplicity
    this.acc.add(force);
  }

  update() {
    //if this is not the seed particles
    if (!this.firework) {
      //slow it down
      this.vel.mult(0.9);
      //each frame lifespan goes down by 2
      this.lifeSpan -= 2;
    }
    //takes the velocity and adds it to the position
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // at each moment in time acceleration will be cleared out and start with zero
    this.acc.mult(0);
  }

  //display particle
  display(count, chooseColor) {
    //if it is a seed firework, set particle color to orange
    if (this.firework) {
      strokeWeight(random(0.1, 5));
      stroke(255, 180, 30);//orange
    } else {
      ////set the color combo
      //set particle color combo 1: orange(thin)+red(thick)
      if (chooseColor == 1) {
        if (count < 75) {
          strokeWeight(4);
          stroke(
            random(160, 255),
            random(100, 160),
            random(0, 10),
            this.lifeSpan
          ); //orange
        } else {
          strokeWeight(random(12));
          stroke(
            random(200, 255),
            random(0, 120),
            random(0, 120),
            this.lifeSpan
          ); //red
        }
      }
      //set particle color combo 2:pink(thin)+green(thick)
      else if (chooseColor == 2) {
        if (count < 10) {
          strokeWeight(random(10));
          stroke(
            random(120, 255),
            random(200, 250),
            random(10, 50),
            this.lifeSpan / 3
          ); //green
        } else {
          strokeWeight(random(3, 6));
          stroke(
            random(190, 240),
            random(50, 90),
            random(40, 150),
            this.lifeSpan
          ); //pink
        }
      } //set particle color combo 3:blue + mint
      else if (chooseColor == 3) {
        if (count < 50) {
          strokeWeight(random(20));
          stroke(
            random(10),
            random(50, 160),
            random(120, 255),
            this.lifeSpan / 3
          ); //blue
        } else {
          strokeWeight(random(2, 4));
          stroke(
            random(0, 10),
            random(220, 255),
            random(220, 255),
            this.lifeSpan
          ); //mint
        }
      } //set particle color combo 4:orange+purple
      else {
        if (count <90) {
          strokeWeight(random(7));
          stroke(
            random(160, 255),
            random(100, 160),
            random(0, 50),
            this.lifeSpan
          ); //orange
        } else {
          strokeWeight(random(16));
          stroke(
            random(0, 120),
            random(0, 120),
            random(200, 255),
            this.lifeSpan
          ); //purple
        }
      }
    }

    //draw the particle
    point(this.pos.x, this.pos.y);
  }

  //decide if a particle can be erased
  done() {
    //if lifespan is less than 0
    if (this.lifeSpan < 0) {
      //this particle can be erased
      return true;
    } else {
      //otherwise it cannot be erased
      return false;
    }
  }
}
