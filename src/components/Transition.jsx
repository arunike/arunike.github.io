import { useEffect } from "react";
import gsap from "gsap";
import { MOTION } from "../utils/motion";
import { prefersReducedMotion } from "../utils/prefersReducedMotion";

const HIDDEN_CLIP = "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)";
const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const WIPED_CLIP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const ROUTE_DURATION = 0.34;
const ROUTE_STAGGER = 0.045;

const Transition = ({ mode = "intro", onComplete }) => {
    const isRoute = mode === "route";

    useEffect(() => {
        const finish = () => {
            gsap.set(".transition", { display: "none" });
        };

        if (prefersReducedMotion()) {
            gsap.set(".transition", { display: "none" });
            if (onComplete) onComplete();
            return;
        }

        if (isRoute) {
            const tl = gsap.timeline({ onComplete: finish });

            gsap.set(".transition-text", { opacity: 0 });

            tl.to(".transition-overlay", {
                clipPath: WIPED_CLIP,
                duration: ROUTE_DURATION,
                stagger: ROUTE_STAGGER,
                ease: MOTION.ease,
            });

            if (onComplete) onComplete();

            return () => tl.kill();
        }

        const tl = gsap.timeline({ onComplete: finish });

        gsap.set(".transition-text h1", { opacity: 0, y: 20 });
        gsap.set(".transition-overlay", { clipPath: HIDDEN_CLIP });

        tl.to(".transition-overlay", {
            clipPath: FULL_CLIP,
            duration: MOTION.duration.slow,
            stagger: { each: MOTION.stagger.relaxed, from: "end" }, // Dark -> Orange
            ease: MOTION.easeInOut,
        })
            // Text appears gracefully during the build-up
            .to(
                ".transition-text h1",
                {
                    opacity: 1,
                    y: 0,
                    duration: MOTION.duration.base,
                    ease: MOTION.ease,
                },
                ">-1.7" // Text appears after background covers screen
            );

        // Fade out text slightly before the overlay dissolves
        tl.to(".transition-text", {
            opacity: 0,
            duration: MOTION.duration.fast,
            ease: MOTION.easeIn,
        });

        // Dissolve the whole transition container
        tl.to(
            ".transition",
            {
                opacity: 0,
                duration: MOTION.duration.fast,
                ease: MOTION.easeInOut,
                onStart: () => {
                    if (onComplete) onComplete();
                },
            },
            "<"
        );

        return () => tl.kill();
    }, [isRoute, onComplete]);

    const overlayStyle = isRoute ? { clipPath: FULL_CLIP } : undefined;

    return (
        <div className={`transition ${isRoute ? "transition--route" : ""}`}>
            <div
                className="transition-overlay overlay-1"
                style={overlayStyle}
            ></div>
            <div
                className="transition-overlay overlay-2"
                style={overlayStyle}
            ></div>
            <div
                className="transition-overlay overlay-3"
                style={overlayStyle}
            ></div>
            <div
                className="transition-overlay overlay-4"
                style={overlayStyle}
            ></div>
            <div
                className="transition-overlay overlay-5"
                style={overlayStyle}
            ></div>

            <div className="transition-text">
                <h1>RICHIE</h1>
            </div>
        </div>
    );
};

export default Transition;
