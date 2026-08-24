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
const easeInOutSine = (value) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(value));
const DEPTH_LIMIT = 4;

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
                const exitWindow = 0.7;
                const exitStartBase = 0.24;
                const stepSize = exitWindow / Math.max(totalCards, 1);
                // Only ~15% overlap, so one card leaves at a time instead of
                // three easing out on top of each other.
                const cardExitDuration = stepSize * 1.15;

                // Continuous position through the deck. Each completed exit
                // advances it by one, so the copy can crossfade in lockstep
                // with the cards rather than switching on a threshold.
                let activeFloat = 0;
                for (let index = 0; index < totalCards - 1; index += 1) {
                    const exitStart = exitStartBase + index * stepSize;
                    activeFloat += easeInOutSine(
                        clamp((nextProgress - exitStart) / cardExitDuration)
                    );
                }
                const nextActiveIndex = Math.min(
                    Math.round(activeFloat),
                    totalCards - 1
                );

                cards.forEach((card, index) => {
                    const centeredIndex = index - (totalCards - 1) / 2;
                    const distance = Math.abs(centeredIndex);
                    const fanRotate = centeredIndex * 8.5;
                    const fanX = centeredIndex * 72;
                    const fanY = distance * 18;
                    const fanLift = -distance * 5;
                    const exitStart = exitStartBase + index * stepSize;
                    const isLastCard = index === totalCards - 1;
                    const exitProgress = isLastCard
                        ? 0
                        : clamp((nextProgress - exitStart) / cardExitDuration);
                    // Symmetric smoothing: no dead zone at the start, no
                    // teleport at the end. Scrubbed motion wants a near-even
                    // relationship to scroll.
                    const exitEase = easeInOutSine(exitProgress);

                    const flyY = interpolate(
                        0,
                        -window.innerHeight * 0.95,
                        exitEase
                    );
                    const flyX = interpolate(0, 62, exitEase);
                    const flyRotate = interpolate(
                        0,
                        -5 + centeredIndex * 1.6,
                        exitEase
                    );

                    // Fade late enough that the card has cleared the stack
                    // before it turns translucent, otherwise two cards' worth
                    // of artwork blend into mud.
                    const fade = clamp((exitProgress - 0.45) / 0.5);

                    const frontness = clamp(1 - Math.abs(activeFloat - index));

                    const stackDepth = Math.min(
                        Math.max(index - nextActiveIndex, 0),
                        DEPTH_LIMIT
                    );

                    gsap.set(card, {
                        x: interpolate(0, fanX, fanProgress) + flyX,
                        y: interpolate(0, fanY + fanLift, fanProgress) + flyY,
                        rotate:
                            interpolate(0, fanRotate, fanProgress) + flyRotate,
                        scale:
                            interpolate(0.94, 1, fanProgress) -
                            exitEase * 0.06 +
                            frontness * 0.025 -
                            stackDepth * 0.018 * fanProgress,
                        opacity: 1 - fade,
                        zIndex: totalCards - index,
                    });

                    card.classList.toggle(
                        "fan-project-card-active",
                        index === nextActiveIndex && exitProgress < 0.5
                    );
                    card.style.setProperty("--card-focus", frontness);
                    card.style.setProperty(
                        "--card-depth",
                        stackDepth * fanProgress
                    );
                    // Softens the departure without fighting the depth filter
                    // already declared in CSS.
                    card.style.setProperty(
                        "--card-exit-blur",
                        `${(exitEase * 3.4).toFixed(2)}px`
                    );
                });

                copyPanels.forEach((panel, index) => {
                    const isActive = index === nextActiveIndex;
                    // A linear tent puts both panels at 50% mid-handoff, which
                    // double-exposes two paragraphs of body copy. Hold full
                    // opacity through the middle and fall off fast so the
                    // overlap is brief and faint.
                    const offset = Math.abs(activeFloat - index);
                    const presence = 1 - clamp((offset - 0.1) / 0.45);
                    const eased = easeInOutSine(presence);
                    gsap.set(panel, {
                        autoAlpha: eased,
                        y: interpolate(18, 0, eased),
                        filter: `blur(${((1 - eased) * 8).toFixed(2)}px)`,
                        pointerEvents: presence > 0.5 ? "auto" : "none",
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
                onToggle: (self) =>
                    triggerRef.current?.classList.toggle(
                        "is-pinned",
                        self.isActive
                    ),
                onUpdate: (self) => renderCards(self.progress),
                onLeave: () => renderCards(1),
                onLeaveBack: () => renderCards(0),
                onRefresh: (self) => renderCards(self.progress),
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
