const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const PARTICLES_NUM = 200;
const PARTICLES_SIZE = 10;
const INFECTED_COLOR = "red";

class Particle {
  constructor(cor) {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = 12 * Math.random() - 6;
    this.vy = 12 * Math.random() - 6;
    this.Color = cor;
  }

  changeColor(cor) {
    this.Color = cor;
  }

  draw(ctx) {
    ctx.fillStyle = this.Color;
    ctx.fillRect(this.x, this.y, PARTICLES_SIZE, PARTICLES_SIZE);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x + PARTICLES_SIZE > canvas.width)
      this.vx = -this.vx;

    if (this.y < 0 || this.y + PARTICLES_SIZE > canvas.height)
      this.vy = -this.vy;

    particles.forEach((particle) => {
      if (this != particle) {
        let distanceX = Math.abs(particle.x - this.x);
        let distanceY = Math.abs(particle.y - this.y);
        let distance = Math.sqrt(
          Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
        );
        if (distance < PARTICLES_SIZE) {
          this.vx = -this.vx;
          this.vy = -this.vy;

          if (particle.Color == INFECTED_COLOR)
            this.changeColor(INFECTED_COLOR);
        }
      }
    });
  }
}

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < PARTICLES_NUM; i++) {
    particles[i].update();
    particles[i].draw(ctx);
  }

  requestAnimationFrame(loop);
};

const init = () => {
  for (var i = 0; i < PARTICLES_NUM; i++) particles.push(new Particle("white"));

  particles[0].changeColor(INFECTED_COLOR);

  loop();
};

init();
