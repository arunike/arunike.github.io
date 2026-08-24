import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ProfilePicture from "../../../assets/images/profile_picture.png";
import { MOTION } from "../../../utils/motion";
import splitChars from "../../../utils/splitChars";
import { prefersReducedMotion } from "../../../utils/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
    const sectionRef = useRef(null);
    const portraitRef = useRef(null);
    const portraitImageRef = useRef(null);

    useEffect(() => {
        if (prefersReducedMotion() || !portraitRef.current) {
            return;
        }

        const parallax = gsap.to(portraitRef.current, {
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

        return () => parallax.kill();
    }, []);

    useEffect(() => {
        if (prefersReducedMotion()) {
            return;
        }

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-hero",
                    start: "top 72%",
                    toggleActions: "play none none none",
                },
            });

            timeline
                .from(".about-hero-header .char", {
                    yPercent: 110,
                    duration: MOTION.duration.slow,
                    ease: MOTION.ease,
                    stagger: MOTION.stagger.tight,
                })
                .from(
                    portraitImageRef.current,
                    {
                        scale: 1.14,
                        duration: MOTION.duration.slow,
                        ease: MOTION.ease,
                    },
                    0
                )
                .from(
                    ".about-hero-bio > *",
                    {
                        y: 18,
                        autoAlpha: 0,
                        duration: MOTION.duration.base,
                        ease: MOTION.ease,
                        stagger: MOTION.stagger.base,
                    },
                    0.28
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about-hero" className="about-hero" ref={sectionRef}>
            <div className="about-hero-header">
                <h1 className="masked-line">{splitChars("Hi, I'm")}</h1>
                <h1 className="masked-line">{splitChars("Richie")}</h1>
            </div>
            <div className="about-hero-portrait" ref={portraitRef}>
                <img
                    ref={portraitImageRef}
                    src={ProfilePicture}
                    alt="Portrait of Richie"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="about-hero-bio">
                <p className="ss">
                    I bring a Day 1 mindset to every project: stay close to
                    users, move fast, and keep raising the bar.
                </p>
                <p className="ss">
                    I've built across frontend, backend, web, mobile, and
                    analytics, and I take full ownership from design to
                    delivery, including reliability, edge cases, and long term
                    maintainability. I want to build customer obsessed products
                    that scale and create measurable impact.
                </p>
                <p className="mn">Code / Design / Craft / Repeat</p>
            </div>
        </section>
    );
};

export default AboutMe;
