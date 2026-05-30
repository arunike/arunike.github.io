import { useLayoutEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "../../../pages/projects/components/projectsData";
import FeaturedProjectsSlider from "./components/FeaturedProjectsSlider";
import { MOTION } from "../../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const interpolate = (from, to, progress) => from + (to - from) * progress;
const easeOut = (value) => 1 - Math.pow(1 - clamp(value), 3);
const easeIn = (value) => Math.pow(clamp(value), 3);

const FeaturedProjects = () => {
    const stackRef = useRef(null);
    const triggerRef = useRef(null);
    const progressRef = useRef(0);

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.isFeatured),
        []
    );

    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    useLayoutEffect(() => {
        const totalCards = featuredProjects.length;
        const scrollDistance = Math.max(3600, totalCards * 840);
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            const cards = gsap.utils.toArray(".fan-project-card");
            const copyPanels = gsap.utils.toArray(".featured-copy-card");
            const progressDash = document.querySelector(
                ".featured-scroll-dash"
            );

            if (!cards.length || !triggerRef.current) return undefined;

            gsap.set(cards, {
                transformOrigin: "50% 82%",
                force3D: true,
            });

            const renderCards = (nextProgress) => {
                const fanProgress = easeOut(clamp(nextProgress / 0.22));
                const exitWindow = 0.62;
                const exitStartBase = 0.27;
                const stepSize = exitWindow / Math.max(totalCards, 1);
                const cardExitDuration = 0.22;
                const copySwitchAt = 0.78;
                let nextActiveIndex = 0;

                for (let index = 0; index < totalCards - 1; index += 1) {
                    const exitStart = exitStartBase + index * stepSize;
                    const switchPoint =
                        exitStart + cardExitDuration * copySwitchAt;

                    if (nextProgress >= switchPoint) {
                        nextActiveIndex = index + 1;
                    }
                }

                cards.forEach((card, index) => {
                    const centeredIndex = index - (totalCards - 1) / 2;
                    const side = centeredIndex < 0 ? -1 : 1;
                    const distance = Math.abs(centeredIndex);
                    const fanRotate = centeredIndex * 8.5;
                    const fanX = centeredIndex * 72;
                    const fanY = distance * 18;
                    const fanLift = -distance * 5;
                    const exitStart = exitStartBase + index * stepSize;
                    const exitProgress = clamp(
                        (nextProgress - exitStart) / cardExitDuration
                    );
                    const exitEase = easeIn(exitProgress);
                    const flyX = side * interpolate(220, 520, exitEase);
                    const flyY = interpolate(
                        0,
                        -window.innerHeight * 1.08,
                        exitEase
                    );
                    const flyRotate = side * interpolate(18, 72, exitEase);
                    const frontness = clamp(
                        1 -
                            Math.abs(
                                (nextProgress - exitStartBase) /
                                    Math.max(exitWindow, 0.1) -
                                    index / Math.max(totalCards - 1, 1)
                            ) *
                                1.8
                    );

                    gsap.set(card, {
                        x: interpolate(0, fanX, fanProgress) + flyX * exitEase,
                        y: interpolate(0, fanY + fanLift, fanProgress) + flyY,
                        rotate:
                            interpolate(0, fanRotate, fanProgress) +
                            flyRotate * exitEase,
                        scale:
                            interpolate(0.94, 1, fanProgress) -
                            exitEase * 0.07 +
                            frontness * 0.025,
                        opacity: 1 - clamp((exitProgress - 0.72) / 0.28),
                        zIndex: totalCards - index,
                    });

                    card.classList.toggle(
                        "fan-project-card-active",
                        index === nextActiveIndex && exitProgress < 0.9
                    );
                    card.style.setProperty("--card-focus", frontness);
                });

                copyPanels.forEach((panel, index) => {
                    const isActive = index === nextActiveIndex;
                    gsap.set(panel, {
                        autoAlpha: isActive ? 1 : 0,
                        y: isActive ? 0 : 18,
                        filter: isActive ? "blur(0px)" : "blur(8px)",
                    });
                    panel.classList.toggle(
                        "featured-copy-card-active",
                        isActive
                    );
                });

                if (progressDash) {
                    progressDash.style.setProperty(
                        "--featured-progress",
                        `${Math.round(nextProgress * 100)}%`
                    );
                }

                const roundedProgress = Math.round(nextProgress * 100);
                if (progressRef.current !== roundedProgress) {
                    progressRef.current = roundedProgress;
                    setProgress(roundedProgress);
                }

                setActiveIndex((current) =>
                    current === nextActiveIndex ? current : nextActiveIndex
                );
            };

            if (reducedMotion) {
                renderCards(0.16);
                return undefined;
            }

            renderCards(0);

            const trigger = ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${scrollDistance}`,
                pin: ".featured-projects-pin",
                anticipatePin: 1,
                scrub: true,
                invalidateOnRefresh: true,
                onUpdate: (self) => renderCards(self.progress),
            });

            return () => trigger.kill();
        });

        mm.add("(max-width: 1000px)", () => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add(
                                "project-slide-animated"
                            );
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    rootMargin: MOTION.reveal.rootMargin,
                    threshold: MOTION.reveal.threshold,
                }
            );

            const slides = document.querySelectorAll(".project-slide");
            slides.forEach((slide) => observer.observe(slide));

            return () => {
                slides.forEach((slide) => observer.unobserve(slide));
            };
        });

        return () => {
            mm.revert();
        };
    }, [featuredProjects]);

    return (
        <section
            id="featured-projects"
            className="featured-projects-container"
            ref={triggerRef}
        >
            <div className="featured-projects-pin">
                <div className="featured-header section-header">
                    <p className="featured-kicker">Portfolio Selection</p>
                    <h1 className="section-title">Featured Projects</h1>
                    <p className="featured-subtitle section-subtitle">
                        Product platforms, data tools, and interactive web
                        experiences.
                    </p>
                </div>

                <FeaturedProjectsSlider
                    projects={featuredProjects}
                    stackRef={stackRef}
                    activeIndex={activeIndex}
                />

                <div className="featured-scroll-dash" aria-hidden="true">
                    <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                    <div className="featured-scroll-track">
                        <div className="featured-scroll-fill"></div>
                    </div>
                    <span>
                        {String(featuredProjects.length).padStart(2, "0")}
                    </span>
                    <span className="featured-scroll-percent">{progress}%</span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
