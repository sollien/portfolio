import * as THREE from "three"

const material = new THREE.LineBasicMaterial({
    color: "#defcfa"
})

const haloRadius: number = 5
const segments: number = 50
const points: THREE[] = []

for (let i = 0; i <= segments; i++) {
	const theta: number = (i / segments) * Math.PI * 2
	const x: number = haloRadius * Math.cos(theta)
	const y: number = haloRadius * Math.sin(theta)
	points.push(new THREE.Vector3(x, y, 0))
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const halo = new THREE.Line(geometry, material);

// Define the bottom half of the halo based on its vertices
const bottomHalfVertices: THREE[] = []
geometry.attributes.position.array.forEach((vertex: number, index: number) => {
	console.log(vertex)
    // Assuming the halo is centered at (0, 0, 0), check if the vertex is in the bottom half
    if (index % 3 === 1 && vertex < 0) { // Check the y-coordinate (index % 3 === 1)
        bottomHalfVertices.push(new THREE.Vector3(
            geometry.attributes.position.array[index - 1], // x-coordinate
            vertex, // y-coordinate
            geometry.attributes.position.array[index + 1] // z-coordinate
        ));
    }
});

// Define material for the lines
const lineMaterial = new THREE.LineBasicMaterial({ color: "#899c9b" });

// Create lines projecting southward from the bottom half vertices
bottomHalfVertices.forEach(vertex => {
    const startPoint = vertex.clone();
    const endPoint = new THREE.Vector3(vertex.x, vertex.y, vertex.z - 50)
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([startPoint, endPoint]);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    halo.add(line)
})

export {
	halo,
	bottomHalfVertices
}