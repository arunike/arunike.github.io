import { useEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
    const lenisRef = useRef(null);

    const start = useCallback(() => {
        const lenis = lenisRef.current;
        if (!lenis) return false;
        lenis.start();
        return true;
    }, []);

    const stop = useCallback(() => {
        const lenis = lenisRef.current;
        if (!lenis) return false;
        lenis.stop();
        return true;
    }, []);

    const scrollTo = useCallback((target, options) => {
        const lenis = lenisRef.current;
        if (!lenis) return false;
        lenis.scrollTo(target, options);
        return true;
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const getScrollSettings = (mobile) =>
            mobile
                ? {
                      duration: 1,
                      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                      direction: "vertical",
                      gestureDirection: "vertical",
                      smooth: true,
                      smoothTouch: true,
                      touchMultiplier: 1.5,
                      infinite: false,
                      lerp: 0.05,
                      wheelMultiplier: 1,
                      orientation: "vertical",
                      smoothWheel: true,
                      syncTouch: true,
                  }
                : {
                      duration: 1.2,
                      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                      direction: "vertical",
                      gestureDirection: "vertical",
                      smooth: true,
                      smoothTouch: false,
                      touchMultiplier: 2,
                      infinite: false,
                      lerp: 0.1,
                      wheelMultiplier: 1,
                      orientation: "vertical",
                      smoothWheel: true,
                      syncTouch: true,
                  };

        let isMobile = window.innerWidth <= 900;
        let lenis = new Lenis(getScrollSettings(isMobile));
        lenisRef.current = lenis;

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time) => {
            if (lenisRef.current) {
                lenisRef.current.raf(time * 1000);
            }
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const handleResize = () => {
            const wasMobile = isMobile;
            isMobile = window.innerWidth <= 900;

            if (wasMobile !== isMobile) {
                lenis.destroy();
                lenis = new Lenis(getScrollSettings(isMobile));
                lenisRef.current = lenis;
                lenis.on("scroll", ScrollTrigger.update);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            gsap.ticker.remove(raf);
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, []);

    return { start, stop, scrollTo };
};

export default useSmoothScroll;
