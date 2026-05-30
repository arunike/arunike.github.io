import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BadgerIcon from "../../../assets/images/badger_cs.png";
import ExpertiseCard from "./components/ExpertiseCard";
import { expertiseCards } from "./components/expertiseData";
import { MOTION } from "../../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const easeIn = (value) => Math.pow(clamp(value), 3);

const Expertise = () => {
    const profileIconRef = useRef(null);
    const triggerRef = useRef(null);
    const progressRef = useRef(0);

    const [progress, setProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const totalCards = expertiseCards.length;

    useLayoutEffect(() => {
        const scrollDistance = Math.max(3000, totalCards * 920);
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            const cards = gsap.utils.toArray(".expertise-card-3d");
            const progressDash = document.querySelector(
                ".expertise-scroll-dash"
            );

            if (!cards.length || !triggerRef.current) return undefined;

            gsap.set(cards, {
                transformOrigin: "50% 100%", // pivot rotation around the bottom center
                force3D: true,
            });

            if (profileIconRef.current) {
                gsap.to(profileIconRef.current, {
                    rotation: 360,
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    },
                });
            }

            const renderCards = (nextProgress) => {
                const exitRanges = [
                    { start: 0.16, end: 0.44 }, // Card 0 exit
                    { start: 0.5, end: 0.78 }, // Card 1 exit
                ];

                let nextActiveIndex = 0;
                const activePoints = [0.44, 0.78];
                for (let i = 0; i < totalCards - 1; i++) {
                    if (nextProgress >= activePoints[i]) {
                        nextActiveIndex = i + 1;
                    }
                }

                cards.forEach((card, index) => {
                    let translateY = 0; // px for stacked deck
                    let translateYPercent = 0; // % for card flying up
                    let rotateX = 0;
                    let scale = 1;
                    let opacity = 1;

                    let exitProgress = 0;
                    if (index < totalCards - 1) {
                        const range = exitRanges[index];
                        if (nextProgress > range.start) {
                            exitProgress = clamp(
                                (nextProgress - range.start) /
                                    (range.end - range.start)
                            );
                        }
                    }

                    let pullProgress = 0;
                    if (index > 0) {
                        const prevRange = exitRanges[index - 1];
                        if (nextProgress > prevRange.start) {
                            pullProgress = clamp(
                                (nextProgress - prevRange.start) /
                                    (prevRange.end - prevRange.start)
                            );
                        }
                    }

                    if (index > nextActiveIndex) {
                        const depth = index - nextActiveIndex;
                        const currentDepth = depth - pullProgress;
                        translateY = currentDepth * 32; // 32px stack offset
                        scale = 1 - currentDepth * 0.035;
                        rotateX = 0; // Starts completely flat
                        opacity = 1;
                    } else {
                        const exitEase = easeIn(exitProgress);
                        translateYPercent = exitEase * -115; // Fly up by 115% of height
                        rotateX = exitEase * 50; // Tilt backward (top side rotates away) on exit from 0 to 50deg
                        scale = 1 - exitEase * 0.07;
                        opacity = 1 - clamp((exitProgress - 0.72) / 0.28);
                    }

                    gsap.set(card, {
                        y:
                            index <= nextActiveIndex
                                ? `${translateYPercent}%`
                                : translateY,
                        rotateX: rotateX,
                        scale: scale,
                        opacity: opacity,
                        zIndex: totalCards - index,
                    });

                    card.classList.toggle(
                        "expertise-card-3d-active",
                        index === nextActiveIndex
                    );
                });

                if (progressDash) {
                    progressDash.style.setProperty(
                        "--expertise-progress",
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
                pin: ".expertise-pin",
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
                                "expertise-card-3d-animated"
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

            const slides = document.querySelectorAll(".expertise-card-3d");
            slides.forEach((slide) => observer.observe(slide));

            return () => {
                slides.forEach((slide) => observer.unobserve(slide));
            };
        });

        return () => {
            mm.revert();
        };
    }, [totalCards]);

    return (
        <section
            id="expertise"
            className="expertise-container"
            ref={triggerRef}
        >
            <div className="expertise-pin">
                <div className="expertise-header section-header">
                    <div className="expertise-header-logo-row">
                        <div
                            className="expertise-profile-icon"
                            ref={profileIconRef}
                        >
                            <img
                                src={BadgerIcon}
                                alt="badger cs logo"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <p className="expertise-kicker">
                            My Vision. My Expertise.
                        </p>
                    </div>
                    <h1 className="section-title">Software Engineering</h1>
                    <h1 className="section-title italic-title">
                        & Areas of Expertise
                    </h1>
                </div>

                <div className="expertise-deck-stage">
                    <div className="expertise-cards-stack">
                        {expertiseCards.map((card, index) => (
                            <ExpertiseCard
                                key={card.id}
                                card={card}
                                index={index}
                                isActive={index === activeIndex}
                            />
                        ))}
                    </div>
                </div>

                <div className="expertise-scroll-dash" aria-hidden="true">
                    <span>01</span>
                    <div className="expertise-scroll-track">
                        <div className="expertise-scroll-fill"></div>
                    </div>
                    <span>03</span>
                    <span className="expertise-scroll-percent">
                        {progress}%
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Expertise;
