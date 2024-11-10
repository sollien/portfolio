<script lang="ts">
	import { onMount } from 'svelte'
	import Chart, { type ChartOptions } from 'chart.js/auto'

	let launchCanvas: HTMLCanvasElement
	let chart: Chart

	const launchData = {
		labels: ['Claude 3.5', 'GPT-4o', 'Gemini 1.5 Pro', 'LLama-400b'],
		datasets: [{
		    data: [92, 90.2, 84.1, 84.1],
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
			        text: 'Performance (in %)',
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

		return () => {
		    chart.destroy()
		}
	})
</script>

<div class="my-10">
	<h3 class="font-bold">Coding proficiency of Claude 3.5 vs. other AI  models</h3>
	<div class="2xl:mx-[-50px] xl:mx-[-40px] lg:mx-[-30px] h-[220px]">
		<canvas bind:this={launchCanvas}></canvas>
	</div>
</div>
