const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particulas = []

const NUM_PARTICULAS = 10
const TAM_PARTICULAS = 20

class Particula {
	constructor(cor) {
		this.x = canvas.width * Math.random()
		this.y = canvas.height * Math.random()
		this.vx = 4 * Math.random() - 6
		this.vy = 4 * Math.random() - 6
		this.Color = cor
		this.Draw = function(ctx) {
			ctx.fillStyle = this.Color
			ctx.fillRect(this.x, this.y, TAM_PARTICULAS, TAM_PARTICULAS)
		}
		this.Update = function() {
			this.x += this.vx
			this.y += this.vy
		
			if (this.x<0 || this.x+TAM_PARTICULAS > canvas.width)
				this.vx = -this.vx
		
			if (this.y < 0 || this.y+TAM_PARTICULAS > canvas.height)
				this.vy = -this.vy
		}
	}

	mudarCor(cor) {
		this.Color = cor
	}
}

const loop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	for (var i = 0; i < NUM_PARTICULAS; i++) {
		particulas[i].Update()
		particulas[i].Draw(ctx)
	}
	requestAnimationFrame(loop)
}

const init = () => {
	for (var i = 0; i < NUM_PARTICULAS; i++)
		particulas.push(new Particula("white"))

	loop()
}

init()