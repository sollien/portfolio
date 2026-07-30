(() => {
    const FIXED_SKELETON_HEIGHT = 250;
    const targetsByChartId = new Map();
    let hasBoundHeightListener = false;

    const setLoadingHeight = (shell, target) => {
        const px = `${FIXED_SKELETON_HEIGHT}px`;
        shell.style.height = px;
        shell.style.minHeight = px;
        target.style.height = px;
        target.style.minHeight = px;
    };

    const releaseFixedHeight = (shell, target) => {
        shell.style.height = "";
        target.style.height = "";
    };

    const markLoaded = (shell, target) => {
        if (!shell || shell.classList.contains("mm-is-loaded")) return;

        releaseFixedHeight(shell, target);
        shell.classList.add("mm-is-loaded");
    };

    const bindHeightListener = () => {
        if (hasBoundHeightListener) return;
        hasBoundHeightListener = true;

        window.addEventListener("message", (event) => {
            const payload = event.data;
            if (!payload || typeof payload !== "object") return;

            const heights = payload["datawrapper-height"];
            if (!heights || typeof heights !== "object") return;

            for (const [chartId, rawHeight] of Object.entries(heights)) {
                const binding = targetsByChartId.get(chartId);
                if (!binding) continue;

                const height = Number(rawHeight);
                if (!Number.isFinite(height) || height <= 0) continue;
                markLoaded(binding.shell, binding.target);
            }
        });
    };

    const initShell = (shell) => {
        if (!shell || shell.dataset.dwSkeletonInit === "1") return;

        const targetId = shell.getAttribute("data-dw-target");
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        setLoadingHeight(shell, target);

        const chartId = targetId.startsWith("datawrapper-vis-")
            ? targetId.slice("datawrapper-vis-".length)
            : "";
        if (chartId) {
            targetsByChartId.set(chartId, { shell, target });
            bindHeightListener();
        }

        shell.dataset.dwSkeletonInit = "1";

        let done = false;
        const finish = () => {
            if (done) return;

            done = true;
            markLoaded(shell, target);
        };

        const bindLoad = (iframe) => {
            iframe.addEventListener("load", finish, { once: true });
        };

        const hasRenderedContent = () => {
            for (const node of target.childNodes) {
                if (node.nodeType !== Node.ELEMENT_NODE) continue;
                const element = node;
                const tag = element.tagName.toLowerCase();
                if (tag !== "script" && tag !== "noscript") return true;
            }
            return false;
        };

        const attachToIframeIfPresent = () => {
            const iframe = target.querySelector("iframe");
            if (!iframe) return false;
            bindLoad(iframe);
            return true;
        };

        if (!attachToIframeIfPresent() && hasRenderedContent()) {
            finish();
        }

        const observer = new MutationObserver(() => {
            if (attachToIframeIfPresent()) {
                finish();
            }

            if (hasRenderedContent()) {
                finish();
            }

            if (done) observer.disconnect();
        });

        observer.observe(target, { childList: true, subtree: true });

        window.setTimeout(() => {
            observer.disconnect();
            finish();
        }, 2500);
    };

    const boot = () => {
        document
            .querySelectorAll(".mm-dw-shell[data-dw-target]")
            .forEach((shell) => initShell(shell));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
    } else {
        boot();
    }
})();
