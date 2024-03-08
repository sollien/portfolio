import * as THREE from "three"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ alpha: true })

const skullEl: HTMLElement | null = document.getElementById("skull-canvas")

if (skullEl) {
	renderer.setSize( skullEl.offsetWidth, skullEl.offsetWidth )
	skullEl.appendChild( renderer.domElement )

	window.addEventListener('resize', function(): void {
		var width = skullEl.offsetWidth
		var height = skullEl.offsetWidth
		renderer.setSize(width, height)
	})
}

const material = new THREE.LineBasicMaterial({
    color: "#defcfa"
});

let circle: THREE = new THREE.Line()
const circleRadius: number = 5
const segments: number = 100

function createCircle() {
	const points: THREE[] = []

	for (let i = 0; i <= segments; i++) {
		const theta: number = (i / segments) * Math.PI * 2
		const x: number = circleRadius * Math.cos(theta)
		const y: number = circleRadius * Math.sin(theta)
		points.push(new THREE.Vector3(x, y, 0))
	}

	const geometry = new THREE.BufferGeometry().setFromPoints(points)
	circle = new THREE.Line(geometry, material)
}

createCircle()

scene.add(circle)

camera.position.z = 10

export function animate() {
	requestAnimationFrame( animate )

	renderer.render( scene, camera )
}