import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Symbols from "../assets/images/symbols/symbols.png";

const Landing = ({ loaded }) => {
    const landingRef = useRef(null);

    useLayoutEffect(() => {
        if (!loaded) return;

        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".landing-header h1 .char", {
                y: "110%",
                duration: 1,
                ease: "power4.out",
                stagger: 0.05,
                delay: 0,
            });
        }, landingRef);

        return () => ctx.revert();
    }, [loaded]);

    // Split text into characters for animation
    const splitText = (text) => {
        return text.split("").map((char, i) => (
            <span key={i} className="char" style={{ display: "inline-block" }}>
                {char === " " ? "\u00A0" : char}
            </span>
        ));
    };

    return (
        <section id="landing" className="landing" ref={landingRef}>
            <div className="landing-header-wrapper">
                <div className="landing-header landing-header-1">
                    <h1 style={{ overflow: "hidden", display: "flex" }}>
                        {splitText("Richie")}
                    </h1>
                </div>
                <div className="landing-header landing-header-2">
                    <h1 style={{ overflow: "hidden", display: "flex" }}>
                        {splitText("Zhou")}
                    </h1>
                </div>
            </div>
            <div className="landing-footer">
                <div className="landing-footer-symbols">
                    <img src={Symbols} alt="symbols" />
                </div>
                <div className="landing-footer-tags">
                    <p className="mn">Showcase Mode: ON </p>
                </div>
            </div>
        </section>
    );
};

export default Landing;
