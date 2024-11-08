<script lang="ts">
	import { onMount } from 'svelte'
	import Chart, { type ChartOptions } from 'chart.js/auto'

	let launchCanvas: HTMLCanvasElement
	let memoryCanvas: HTMLCanvasElement
	let chart: Chart

	const launchData = {
		labels: ['Zed', 'Sublime Text 4', 'VS Code', 'CLion'],
		datasets: [{
		    data: [58, 75, 225, 350],
		    backgroundColor: ['#98ff5c', "#434C4B", "#434C4B", "#434C4B"],
			barThickness: 25
		}]
	}

	const memoryData = {
		labels: ['Zed', 'Sublime Text 4', 'VS Code', 'CLion'],
		datasets: [{
		    data: [20, 40, 100, 200],
		    backgroundColor: ['#98ff5c', "#434C4B", "#434C4B", "#434C4B"],
			barThickness: 25
		}]
	}

	const launchOptions: ChartOptions = {
		indexAxis: 'y',
		scales: {
		    x: {
			    title: {
			        display: true,
			        text: 'Milliseconds'
			    }
		    }
		},
		plugins: {
			legend: {
				display: false
			}
		},
		maintainAspectRatio: false,
		responsive: true,
	}

	const memoryOptions: ChartOptions = {
		indexAxis: 'y',
		scales: {
		    x: {
			    title: {
			        display: true,
			        text: 'Megabytes'
			    }
		    }
		},
		plugins: {
			legend: {
				display: false
			}
		},
		maintainAspectRatio: false,
		responsive: true,
	}

	onMount(() => {
		chart = new Chart(launchCanvas, {
		    type: 'bar',
		    data: launchData,
		    options: launchOptions
		})

		chart = new Chart(memoryCanvas, {
		    type: 'bar',
		    data: memoryData,
		    options: memoryOptions
		})

		return () => {
		    chart.destroy()
		}
	})
</script>

<div class="my-10">
	<h3 class="font-bold">Claimed launch speed of Zed vs. other code editors</h3>
	<div class="2xl:mx-[-50px] xl:mx-[-40px] lg:mx-[-30px] h-[220px]">
		<canvas bind:this={launchCanvas}></canvas>
	</div>
</div>
<div class="my-10">
	<h3 class="font-bold">Memory footprint of Zed vs. other code editors</h3>
	<div class="2xl:mx-[-50px] xl:mx-[-40px] lg:mx-[-30px] h-[220px]">
		<canvas bind:this={memoryCanvas}></canvas>
	</div>
</div>
