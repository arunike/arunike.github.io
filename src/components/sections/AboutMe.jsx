import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const portraitRef = useRef(null);
    const scrollTriggerRef = useRef(null);

    useEffect(() => {
        const initAnimation = () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }

            if (portraitRef.current) {
                scrollTriggerRef.current = gsap.to(portraitRef.current, {
                    scale: 1.1,
                    rotation: -10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".about-hero",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }
        };

        initAnimation();

        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
            }
        };
    }, []);

    return (
        <section id="about-hero" className="about-hero">
            <div className="about-hero-header">
                <h1>Hi, I'm</h1>
                <h1>Richie</h1>
            </div>
            <div className="about-hero-bio">
                <p className="ss">
                    Ever since I was young, programming have been something that
                    I am passionate about. I have worked on various of
                    applications and platforms, including frontend, backend,
                    web, mobile application development, and data analyst. I
                    would like to utilize my skills as a Software Engineer to
                    create applications that create an impact in the world.,
                </p>
                <p className="mn">Code / Design / Craft / Repeat</p>
            </div>
            <div className="about-hero-portrait" ref={portraitRef}>
                <img
                    src="/src/assets/images/profile_picture.png"
                    alt="profile picture"
                />
            </div>
        </section>
    );
};

export default AboutMe;
