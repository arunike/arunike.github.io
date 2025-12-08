import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroImgRef = useRef(null);
    const scrollTriggerInstanceRef = useRef(null);

    useEffect(() => {
        const initAnimations = () => {
            if (scrollTriggerInstanceRef.current) {
                scrollTriggerInstanceRef.current.kill();
            }

            scrollTriggerInstanceRef.current = ScrollTrigger.create({
                trigger: ".hero-img-holder",
                start: "top bottom",
                end: "top 20%",
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.set(".hero-img", {
                        y: `${-110 + 110 * progress}%`,
                        scale: 0.25 + 0.75 * progress,
                        rotation: -15 + 15 * progress,
                    });
                },
            });
        };

        initAnimations();

        const handleResize = () => {
            initAnimations();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (scrollTriggerInstanceRef.current) {
                scrollTriggerInstanceRef.current.kill();
            }
        };
    }, []);

    return (
        <>
            <section id="hero" className="hero">
                <div className="hero-header-wrapper">
                    <div className="hero-header hero-header-1">
                        <h1>Richie</h1>
                    </div>
                    <div className="hero-header hero-header-2">
                        <h1>Zhou</h1>
                    </div>
                </div>
                <div className="hero-footer">
                    <div className="hero-footer-symbols">
                        <img src="/images/global/symbols.png" alt="" />
                    </div>
                    {/* <div className="hero-footer-scroll-down">
                        <p className="mn">
                            <a
                                href="/src/assets/resume/Richies_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-link"
                            >
                                Fetch // Resume
                            </a>
                        </p>
                    </div> */}
                    <div className="hero-footer-tags">
                        <p className="mn">Showcase Mode: ON </p>
                    </div>
                </div>
            </section>

            <section className="hero-img-holder">
                <div className="hero-img">
                    <iframe
                        ref={heroImgRef}
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/2X59GI5eqNw?autoplay=1&mute=1&loop=1&playlist=2X59GI5eqNw"
                        title="Yearning for freedom"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </section>
        </>
    );
};

export default Hero;
