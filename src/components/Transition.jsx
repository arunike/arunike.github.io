import { useEffect } from "react";
import gsap from "gsap";

const Transition = ({ onComplete }) => {
    useEffect(() => {
        const revealTransition = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                    gsap.set(".transition", { display: "none" });
                },
            });

            // Initial state: Start as a tiny point in Bottom-Right
            const startClip =
                "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)";
            const fullClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

            gsap.set(".transition-text h1", { opacity: 0, y: 20 });

            gsap.set(".transition-overlay", { clipPath: startClip }); // Start Hidden

            tl.to(".transition-overlay", {
                clipPath: fullClip,
                duration: 1.0,
                stagger: { each: 0.3, from: "end" }, // Dark -> Orange
                ease: "expo.inOut",
            })
                // Text appears gracefully during the build-up
                .to(
                    ".transition-text h1",
                    { opacity: 1, y: 0, duration: 0.8 },
                    "<+=0.3"
                );

            // Fade out text slightly before the overlay dissolves
            tl.to(".transition-text", {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
            });

            // Dissolve the whole transition container
            tl.to(".transition", {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
            });
        };

        // Trigger reveal transition on mount
        revealTransition();
    }, [onComplete]);

    return (
        <div className="transition">
            <div className="transition-overlay overlay-1"></div>
            <div className="transition-overlay overlay-2"></div>
            <div className="transition-overlay overlay-3"></div>
            <div className="transition-overlay overlay-4"></div>
            <div className="transition-overlay overlay-5"></div>

            <div className="transition-text">
                <h1>RICHIE ZHOU</h1>
            </div>
        </div>
    );
};

export default Transition;
