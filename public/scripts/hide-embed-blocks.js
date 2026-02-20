(() => {
    const STYLE_ID = "mm-hide-embed-blocks";
    const CSS = [
        ".block-getTheData, .block-attribution, .separator { display: none !important; }",
        ".block-headline span, .title-content, .axis-label, .text .export-text, .labels .label { color: #defcfa !important; font-family: 'Space Mono', monospace !important; }",
        ".y-tick-label tspan, .block-description, .x-tick-label tspan, .block-source .caption { color: #AFB1B6 !important; font-family: 'Space Mono', monospace !important; }",
        ".regression-line { stroke: #AFB1B6 !important; }",
    ].join("\n");

    const injectStyle = (shadowRoot) => {
        if (!shadowRoot || typeof shadowRoot.getElementById !== "function") return;
        if (shadowRoot.getElementById(STYLE_ID)) return;

        const style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = CSS;
        shadowRoot.appendChild(style);
    };

    const scanForShadowRoots = (rootElement) => {
        if (!rootElement || rootElement.nodeType !== Node.ELEMENT_NODE) return;

        const root = /** @type {Element} */ (rootElement);
        if (root.shadowRoot) injectStyle(root.shadowRoot);

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
        for (
            let node = walker.currentNode;
            node;
            node = walker.nextNode()
        ) {
            const element = /** @type {Element} */ (node);
            if (element.shadowRoot) injectStyle(element.shadowRoot);
        }
    };

    const boot = () => {
        scanForShadowRoots(document.documentElement);

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    scanForShadowRoots(node);
                }
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        let remainingScans = 20;
        const interval = window.setInterval(() => {
            scanForShadowRoots(document.documentElement);
            remainingScans -= 1;
            if (remainingScans <= 0) window.clearInterval(interval);
        }, 500);
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
