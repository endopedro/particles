const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let particulas = []

const NUM_PARTICULAS = 100
const TAM_PARTICULAS = 20
const COR_INFECTADA = "red"

class Particula {
	constructor(cor) {
		this.x = canvas.width * Math.random()
		this.y = canvas.height * Math.random()
		this.vx = 12 * Math.random() - 6
		this.vy = 12 * Math.random() - 6
		this.Color = cor
	}

	mudarCor(cor) {
		this.Color = cor
	}

	draw(ctx) {
		ctx.fillStyle = this.Color
		ctx.fillRect(this.x, this.y, TAM_PARTICULAS, TAM_PARTICULAS)
	}

	update() {
		this.x += this.vx
		this.y += this.vy

		if (this.x<0 || this.x+TAM_PARTICULAS > canvas.width)
			this.vx = -this.vx

		if (this.y < 0 || this.y+TAM_PARTICULAS > canvas.height)
			this.vy = -this.vy

		particulas.forEach(particula => {
			if(this != particula) {
				let distanciaX = Math.abs(particula.x - this.x);
				let distanciaY = Math.abs(particula.y - this.y);
				let distancia = Math.sqrt(Math.pow(distanciaX, 2) + Math.pow(distanciaY, 2));
				if(distancia < TAM_PARTICULAS) {
					this.vx = -this.vx
					this.vy = -this.vy

					if(particula.Color == COR_INFECTADA) this.mudarCor(COR_INFECTADA)
				}
			}
		})
	}
}

const loop = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	for (var i = 0; i < NUM_PARTICULAS; i++) {
		particulas[i].update()
		particulas[i].draw(ctx)
	}

	requestAnimationFrame(loop)
}

const init = () => {
	for (var i = 0; i < NUM_PARTICULAS; i++)
		particulas.push(new Particula("white"))

	particulas[0].mudarCor(COR_INFECTADA)

	loop()
}

init()