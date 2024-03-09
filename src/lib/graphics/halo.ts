import * as THREE from "three"

const material = new THREE.LineBasicMaterial({
    color: "#defcfa"
})

const haloRadius: number = 5
const segments: number = 100
const points: THREE[] = []

for (let i = 0; i <= segments; i++) {
	const theta: number = (i / segments) * Math.PI * 2
	const x: number = haloRadius * Math.cos(theta)
	const y: number = haloRadius * Math.sin(theta)
	points.push(new THREE.Vector3(x, y, 0))
}

const geometry = new THREE.BufferGeometry().setFromPoints(points)

export const halo = new THREE.Line(geometry, material)