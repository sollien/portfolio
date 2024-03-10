const mouseDot: HTMLElement | null = document.getElementById("mouseDot")

let mouseX: number = 0
let mouseY: number = 0

let mouseDotX: number = 0
let mouseDotY: number = 0

let ballSpeed: number = 0.05

if (mouseDot) {
	mouseDot.style.pointerEvents = 'none'
}

function animateMove() {
	let distX = mouseX - mouseDotX
	let distY = mouseY - mouseDotY
		
	mouseDotX = mouseDotX + (distX * ballSpeed)
	mouseDotY = mouseDotY + (distY * ballSpeed)

	if (mouseDot) {
		mouseDot.style.left = mouseDotX - 5 + 'px'
		mouseDot.style.top = mouseDotY - 5 + 'px'
	}

	requestAnimationFrame(animateMove)
}

animateMove()
 
document.addEventListener('mousemove',function(e){
	mouseX = e.pageX
	mouseY = e.pageY
})

if (mouseDot) {
	document.addEventListener('mouseover', function(e: MouseEvent) {
		const target = e.target as HTMLAnchorElement
	
		if (target.nodeName === "A") {
			mouseDot.style.backgroundColor = "#defcfa"
		} else {
			mouseDot.style.backgroundColor = "#899c9b"
		}
	})
}
