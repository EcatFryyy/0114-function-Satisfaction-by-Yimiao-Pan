//keep track of both indivisual and array of particle

class Firework {
  constructor() {
    
    //color of the firework is the color passed to this object
    //new particle is not explode here
    this.firework = new Particle(random(width), height, true);
    //use boolean to track when firework is exploded or not(here not)
    this.exploaded = false;
    //creat new array for the firework particles
    this.particles = [];
    //set 4 random senarios to control the exploded particle color
    this.chooseColor = Math.floor(Math.random() * 4 + 1);
  }

run(){
  //use run to call update and display function
  this.update();
  this.display();
}
  
  update() {
    if (!this.exploaded) {
      //if firework wxploded
      this.firework.applyForce(gravity);
      this.firework.update(); //update firework position

      //when this firework reach max height
      if (this.firework.vel.y >= 0) {
        // explode into more particles and the status of it is exploded
        this.explode();
      }
    } else {
      //repeat the process of every particles of the present firework
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity); //apply gravity
        this.particles[i].update(); //updatevalues
        if (this.particles[i].done()) {
          //if this particle is  not visible anymore
          this.particles.splice(i, 1); //delete it from the array to free some memory
        }
      }
    }
  }

  explode() {
    //choose random explode sound to play
    if (random(2) < 1) e1.play();
    else e2.play();

    //when explode, create a firework has 80 to 400 particles
    for (let i = 0; i <= random(80, 2000); i++) {
      //the particle start point
      let p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.col,
        false
      );
      this.particles.push(p);
      this.exploaded = true;
    }
  }

  //display firework on canvas
  display() {
    if (!this.exploaded) {
      //if not exploded
      this.firework.display(); //display the firework
    }else{
      this.count = 0;
    //display exsisting chosen firework particles
    for (var i = 0; i < this.particles.length; i++) {
      //start counting
      this.count ++;
      this.particles[i].display(this.count,this.chooseColor);
      }
    }
  }
  
  done() {
    //when explode & seed particles faded out
    if ((this.exploded && this.particles, length == 0)) {
      return true;
    } else {
      return false;
    }
  }
}
