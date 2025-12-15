import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProfilePicture from "../../assets/images/profile_picture.png";

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
            <div className="about-hero-portrait" ref={portraitRef}>
                <img src={ProfilePicture} alt="profile picture" />
            </div>
            <div className="about-hero-bio">
                <p className="ss">
                    I bring a Day 1 mindset to every project: stay close to
                    users, move fast, and keep raising the bar. I've built
                    across frontend, backend, web, mobile, and analytics, and I
                    take full ownership from design to delivery, including
                    reliability, edge cases, and long term maintainability. I
                    want to build customer obsessed products that scale and
                    create measurable impact.
                </p>
                <p className="mn">Code / Design / Craft / Repeat</p>
            </div>
        </section>
    );
};

export default AboutMe;
