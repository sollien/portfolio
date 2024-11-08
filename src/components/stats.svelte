<script lang="ts">
	import { VisXYContainer, VisLine, VisAxis } from '@unovis/svelte'
  
	type DataRecord = { x: number, y: number }
	export let data: DataRecord[] = [
	  { x: 0, y: 0 },
	  { x: 1, y: 2 },
	  { x: 2, y: 1 },
	]
  </script>
  
  <VisXYContainer>
	<VisLine {data} x={d => d.x} y={d => d.y}/>
	<VisAxis type="x"/>
	<VisAxis type="y"/>
  </VisXYContainer>