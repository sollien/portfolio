<script>
    import { Plot, AreaX } from "svelteplot";
    import tentDensityData from "$lib/data/tent_density.json";
    import gazaIcon from "../../assets/images/gaza-icon.png";

    // Define your custom colors here
    const customColors = ["#FF0F63", "#EEFFC7", "#E5E7EB"]; // red, green, blue
    let innerWidth = $state(null);
    let desktop = $derived(innerWidth >= 600);

    // Custom y-axis tick positions and labels
    const customYTicks = [4800, 9400, 27600];
    const customYLabels = ["Khan Younis", "Al Qarara", "Gaza city"];
    let customXTicks = $derived(
        desktop ? [-1000, -500, 0, 500, 1000] : [-1000, -500, 0, 500, 1000],
    );

    // Transform data from wide to long format with specific order for centering
    const data = tentDensityData.flatMap((row) => [
        { y: row.x, x: row.p1, group: "High Risk" },
        { y: row.x, x: row.p2, group: "Medium Risk" },
        { y: row.x, x: row.p3, group: "Low Risk" },
    ]);
</script>

<svelte:window bind:innerWidth />
<div class="mm-graph-wrap">
    <span class="mm-gaza-inset-label">Gaza</span>
    <img class="mm-gaza-inset" src={gazaIcon.src} alt="Inset icon of Gaza" />
    <p class="mm-streamgraph-description">
        Tent density along Gaza beach during the Gaza war, based on a satellite
        snapshot from August 29, 2025.
    </p>
    <Plot
        height={desktop ? 1000 : 700}
        x={{
            axis: "bottom",
            label: "No. of tents",
            grid: true,
            ticks: customXTicks,
            tickFormat: (d) => Math.abs(d),
        }}
        y={{
            axis: "right",
            label: "",
            labelArrow: false,
            grid: true,
            ticks: customYTicks,
            tickFormat: (d, i) => customYLabels[customYTicks.indexOf(d)] || d,
        }}
        color={{
            legend: true,
            label: "Distance from shoreline",
            domain: ["<20 m", "20–50 m", ">50 m"],
            scheme: customColors,
        }}
    >
        <AreaX
            {data}
            x="x"
            y="y"
            z="group"
            curve="basis"
            fill="group"
            opacity={1}
            stack={{ offset: "center" }}
        />
        <text x="0" y={desktop ? 950 : 650} font-size="12" font-weight="500"
            >Gaza south</text
        >
        <text x="0" y="16" font-size="12" font-weight="500">Gaza north</text>
    </Plot>
</div>
<p class="mm-credits">Source: Unosat</p>

<style lang="scss">
    .mm-graph-wrap {
        position: relative;
    }

    .mm-gaza-inset {
        position: absolute;
        top: 52px;
        right: 8px;
        width: 85px;
        height: auto;
        z-index: 2;
        pointer-events: none;
    }

    .mm-gaza-inset-label {
        position: absolute;
        top: 106px;
        right: 4px;
        z-index: 3;
        padding: 2px 6px;
        border-radius: 2px;
        color: #defcfa;
        font-size: 12px;
        line-height: 1;
        pointer-events: none;
    }

    .mm-streamgraph-description {
        margin-bottom: 16px;
        line-height: 1.5;
        font-size: 14px;
    }

    @media (min-width: 600px) {
        .mm-gaza-inset {
            top: 32px;
            right: 0;
            width: 100px;
        }

        .mm-gaza-inset-label {
            top: 102px;
            right: 12px;
            font-size: 12px;
        }
    }

    .mm-credits {
        font-size: 11px;
        color: #a3a3a3;
        margin-top: 8px;
        font-family: Graphik;
    }
</style>
