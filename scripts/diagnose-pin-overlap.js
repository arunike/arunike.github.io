// Paste into the browser console AT THE MOMENT you see the two sections overlap.
// Prints everything needed to identify why, then copies it to the clipboard.
(() => {
    const off = (el) => {
        let y = 0;
        let n = el;
        while (n) {
            y += n.offsetTop;
            n = n.offsetParent;
        }
        return Math.round(y);
    };
    const info = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return { sel, missing: true };
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            sel,
            position: cs.position,
            overflow: cs.overflow,
            offsetTop: off(el),
            rect: [Math.round(r.top), Math.round(r.bottom)],
            opacity: +cs.opacity,
        };
    };
    const st =
        window.ScrollTrigger || window.gsap?.core?.globals?.().ScrollTrigger;
    const report = {
        userAgent: navigator.userAgent,
        viewport: [innerWidth, innerHeight],
        dpr: devicePixelRatio,
        scrollY: Math.round(scrollY),
        docHeight: document.documentElement.scrollHeight,
        theme: document.documentElement.dataset.theme,
        reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
        fontsStatus: document.fonts?.status,
        pinSpacers: Array.from(document.querySelectorAll(".pin-spacer")).map(
            (s) => Math.round(s.getBoundingClientRect().height)
        ),
        sections: [
            info(".featured-projects-container"),
            info(".featured-projects-pin"),
            info(".expertise-container"),
            info(".expertise-pin"),
        ],
        triggers: st
            ? st.getAll().map((t) => ({
                  trigger: t.trigger?.className?.toString().slice(0, 40),
                  start: Math.round(t.start),
                  end: Math.round(t.end),
                  progress: +t.progress.toFixed(3),
                  isActive: t.isActive,
                  pinned: !!t.pin,
              }))
            : "ScrollTrigger not exposed on window",
    };
    const text = JSON.stringify(report, null, 2);
    console.log(text);
    navigator.clipboard?.writeText(text).then(
        () =>
            console.log(
                "%cCopied to clipboard.",
                "color:#ab3a26;font-weight:bold"
            ),
        () => {}
    );
    return report;
})();
