import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Symbols from "../assets/images/symbols/symbols.png";
import { MOTION } from "../utils/motion";
import splitChars from "../utils/splitChars";

const Landing = ({ loaded }) => {
    const landingRef = useRef(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".landing-header h1 .char", {
                y: "110%",
                duration: MOTION.duration.slow,
                ease: MOTION.ease,
                stagger: MOTION.stagger.tight,
                delay: 0,
            });
        }, landingRef);

        return () => ctx.revert();
    }, [loaded]);

    return (
        <section id="landing" className="landing" ref={landingRef}>
            <div className="landing-header-wrapper">
                <div className="landing-header landing-header-1">
                    <h1 className="masked-line">{splitChars("Richie")}</h1>
                </div>
                <div className="landing-header landing-header-2">
                    <h1 className="masked-line">{splitChars("Zhou")}</h1>
                </div>
            </div>
            <div className="landing-footer">
                <div className="landing-footer-symbols">
                    <img
                        src={Symbols}
                        alt="symbols"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="landing-footer-tags">
                    <p className="mn">Showcase Mode: ON </p>
                </div>
            </div>
        </section>
    );
};

export default Landing;
