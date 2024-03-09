import * as THREE from "three"
import { halo } from "@/lib/graphics/halo"

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

function cloneHalo(): THREE.Line {
	scene.add(halo)

	for (let i = 0; i < 6; i++) {	
		const sizeIterator = (i / 10)
		const clone = halo.clone()

		clone.scale.set(1 - sizeIterator, 1 - sizeIterator, 1 - sizeIterator)

		// If "i" is an even number
		if (i % 2 === 0) {
			clone.position.set(sizeIterator, sizeIterator, sizeIterator)
		} else {
			clone.position.set(-sizeIterator, -sizeIterator, -sizeIterator)
		}

		scene.add(clone)
	}
}

cloneHalo()

camera.position.z = 10

export function animate() {
	requestAnimationFrame( animate )

	renderer.render( scene, camera )
}