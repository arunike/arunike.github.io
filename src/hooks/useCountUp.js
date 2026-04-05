import { useState, useEffect, useRef } from "react";

const useCountUp = (target, duration = 1000) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasStarted = useRef(false);
    const prevTarget = useRef(0);
    const rafRef = useRef(null);

    const animateTo = (from, to, dur) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        const startTime = performance.now();
        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / dur, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.round(from + (to - from) * eased));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                prevTarget.current = to;
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    // First-time: wait for element to enter viewport
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted.current) {
                    hasStarted.current = true;
                    observer.disconnect();
                    animateTo(0, target, duration);
                    prevTarget.current = target;
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);
        return () => {
            observer.disconnect();
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Subsequent changes: animate from previous value to new target
    useEffect(() => {
        if (!hasStarted.current) return;
        animateTo(prevTarget.current, target, Math.min(duration, 400));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target]);

    return [count, ref];
};

export default useCountUp;
