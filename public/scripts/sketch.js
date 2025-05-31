let gridMod = 0
let speed = 1
let angle = 0

const paddingY = 30
let paddingX = 0

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	paddingX = 5
} else {
	paddingX = 30
}

let mouseXPos = 0
let mouseYPos = 0

// Repulsor parameters
const repulsionRadius = 300
const maxRepulsionStrength = 700

const sketchContainer = document.getElementById("p5div")
let containerWidth = sketchContainer.offsetWidth

function setup() {
	const canvas = createCanvas(containerWidth, containerWidth / 1.7)
	canvas.parent('p5div')
	angleMode(DEGREES)
}

function draw() {
	background("#121615")
	const columns = 15
	const rows = 15

	for (let x = 0; x < columns; x++) {
		for (let y = 0; y < rows; y++) {
			drawTriangle(x, y, columns)
		}
	}
}

function mouseMoved() {
	mouseXPos = mouseX
	mouseYPos = mouseY
}

function touchMoved() {
	mouseXPos = mouseX
	mouseYPos = mouseY
}

function drawTriangle(x, y, columns) {
	const availableWidth = containerWidth - 1 * paddingX
	const availableHeight = (containerWidth / 1.7) - 1 * paddingY

	const relativeXSize = availableWidth / columns
	const relativeYSize = availableHeight / columns

	const triangleWidth = relativeXSize / 2
	const triangleHeight = relativeYSize / 3

	// Triangle oscillation offset effect
	let amplitude = 5
	let yOffset = sin((frameCount * 2) + (x * 50) + y) * amplitude

	// Calculate triangle position
	let triangleX = paddingX + x * relativeXSize
	let triangleY = paddingY + y * relativeYSize + yOffset

	let distToMouse = dist(mouseXPos, mouseYPos, triangleX, triangleY)

	// Apply repulsion if the triangle is close to the mouse
	if (distToMouse < repulsionRadius) {
		let normalizedDist = distToMouse / repulsionRadius
		let repulsionStrength = maxRepulsionStrength * (1.7 - normalizedDist)

		// Create a protection zone near the center - minimum distance enforced only when very close
		const minDistance = 20  // Minimum distance to protect against extreme forces
		let effectiveDist = distToMouse < minDistance ? minDistance : distToMouse

		let forceX = (triangleX - mouseXPos) / effectiveDist * repulsionStrength / effectiveDist
		let forceY = (triangleY - mouseYPos) / effectiveDist * repulsionStrength / effectiveDist

		triangleX += forceX
		triangleY += forceY
	}

	fill("#899c9b")
	noStroke()
	triangle(
		triangleX,
		triangleY,
		triangleX + triangleWidth,
		triangleY,
		triangleX,
		triangleY + triangleHeight
	)
}

function windowResized() {
	containerWidth = sketchContainer.offsetWidth
	resizeCanvas(containerWidth, containerWidth / 1.7)

	setup()
}
