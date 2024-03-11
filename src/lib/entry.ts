import * as THREE from "three"
import { halo } from "@/lib/graphics/halo"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 )
const renderer = new THREE.WebGLRenderer({ alpha: true })

let mouseX = 0;
let mouseY = 0;

const haloEl: HTMLElement | null = document.getElementById("halo-canvas")

document.addEventListener( 'mousemove', onDocumentMouseMove )

if (haloEl) {
	renderer.setSize( haloEl.offsetWidth, haloEl.offsetWidth )
	haloEl.appendChild( renderer.domElement )

	window.addEventListener('resize', function(): void {
		var width = haloEl.offsetWidth
		var height = haloEl.offsetWidth
		renderer.setSize(width, height)
	})
}

function degreesToRadians(degrees: number) {
	return degrees * (Math.PI / 180);
}

function cloneYPlus(i: number): void {
	const sizeIterator = (i / 10)
	const clone = halo.clone()

	clone.scale.set(1 - sizeIterator, 1 - sizeIterator, 1 - sizeIterator)
	clone.position.set(i, i, 0)
	clone.rotateZ(degreesToRadians(160))

	scene.add(clone)
}

function onDocumentMouseMove(event: MouseEvent) {
	mouseX = ( event.clientX - window.innerWidth / 2 ) / 1000;
	mouseY = ( event.clientY - window.innerHeight / 2 ) / 1000;
}

function cloneYMinus(i: number): void {
	const sizeIterator = (i / 10)
	const clone = halo.clone()

	clone.scale.set(1 - sizeIterator, 1 - sizeIterator, 1 - sizeIterator)
	clone.position.set(-i, -i, 0)
	clone.rotateZ(degreesToRadians(-20))

	scene.add(clone)
}

function cloneHalo(): THREE.Line {
	scene.add(halo)

	for (let i = 0; i < 3; i++) {	
		cloneYPlus(i)
		cloneYMinus(i)
	}
}

cloneHalo()

camera.position.z = 10

export function animate() {
	requestAnimationFrame( animate )

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	
	renderer.render( scene, camera )
}