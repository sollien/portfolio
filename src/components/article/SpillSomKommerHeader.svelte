<script>
	import { onMount } from "svelte"
	import as_001 from "@/assets/images/generative_art/as_001.png"
	import as_002 from "@/assets/images/generative_art/as_002.png"

	let imageContainer
	let title
	let topImage
	let bottomImage
	let words
	let mainContainer
	let clipRect

	onMount(async () => {
		const gsap = (await import("gsap")).default
		const ScrollTrigger = (await import("gsap/ScrollTrigger")).default

		gsap.registerPlugin(ScrollTrigger)

		// Wait for next tick to ensure title is mounted
		await new Promise(resolve => setTimeout(resolve, 0))

		topImage.classList.remove('invisible')

		words = title.textContent.split(" ").map((word, i) => {
			const span = document.createElement("span")
			span.textContent = word
			span.style.display = "inline-block"
			span.style.marginRight = "0.25em"
			return span
		})

		title.textContent = ""
		words.forEach(span => title.appendChild(span))

		// Initial word animation
		words.forEach((word, i) => {
			const cumulativeDelay = i === 0 ? 0 : Array.from({length: i}, (_, index) => 0.5 + (index * 0.2)).reduce((a, b) => a + b, 0)
			gsap.from(word, {
				y: 50,
				opacity: 0,
				duration: 1.5,
				delay: cumulativeDelay,
				ease: "power3.out"
			})
		})

		// Scroll animation
		gsap.to(mainContainer, {
			scrollTrigger: {
				trigger: mainContainer,
				start: "-1px top",
				end: "bottom top",
				pin: true,
				pinSpacing: true
			}
		})

		// Set initial clip path to hide top image and add initial opacity: 0
		topImage.style.clipPath = `inset(100% 0 0 0)`
		topImage.style.opacity = "0"

		// Title animation
		gsap.to(title, {
			y: -window.innerHeight,
			scrollTrigger: {
				trigger: mainContainer,
				start: "-1px top",
				end: "bottom top",
				scrub: true,
				onUpdate: (self) => {
					const titleRect = title.getBoundingClientRect()
					const imageRect = imageContainer.getBoundingClientRect()

					// Calculate clip based on title position relative to image
					const clipHeight = Math.max(0, Math.min(100,
						(imageRect.bottom - (titleRect.top + 50)) / imageRect.height * 100
					))

					topImage.style.clipPath = `inset(${100 - clipHeight}% 0 0 0)`
					// Only show top image once scrolling starts
					topImage.style.opacity = clipHeight > 0 ? "1" : "0"
				}
			}
		})
	})
</script>

<div class="container" bind:this={mainContainer}>
	<div class="content-wrapper">
		<div class="image-container" bind:this={imageContainer}>
			<img
				bind:this={bottomImage}
				class="overlay-image"
				src={as_002.src}
				alt="Style 2"
			/>
			<img
				bind:this={topImage}
				class="overlay-image invisible"
				src={as_001.src}
				alt="Style 1"
			/>
		</div>
		<h1 bind:this={title}>Spillene som en gang kommer</h1>
	</div>
</div>

<style>
	.container {
		min-height: 100vh;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.image-container {
		position: relative;
		width: 80%;
		max-width: 500px;
		aspect-ratio: 1;
		margin-bottom: 4rem;
	}

	.overlay-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	h1 {
		font-size: 2rem;
		text-align: center;
		margin: 0;
	}

	.invisible {
        opacity: 0 !important;
        clip-path: inset(100% 0 0 0) !important;
    }

	@media (min-width: 768px) {
		h1 {
			font-size: 3rem;
		}
	}
</style>
