import { useLayoutEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";

import { projects } from "../../../pages/projects/components/projectsData";
import FeaturedProjectsIndicator from "./components/FeaturedProjectsIndicator";
import FeaturedProjectsSlider from "./components/FeaturedProjectsSlider";
import { MOTION } from "../../../utils/motion";

const FeaturedProjects = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const pinRef = useRef(null);
    const rafIdRef = useRef(null);
    const progressRef = useRef(0);

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.isFeatured),
        []
    );

    const [progress, setProgress] = useState(0);

    useLayoutEffect(() => {
        const totalSlides = featuredProjects.length;
        const scrollDistance = 5000;
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            const syncSlideDepth = (nextProgress) => {
                const slides = sectionRef.current?.children;
                if (!slides?.length) return;

                const totalSteps = Math.max(slides.length - 1, 1);
                const stepSize = 1 / totalSteps;

                Array.from(slides).forEach((slide, index) => {
                    const slideProgress = index * stepSize;
                    const rawDistance =
                        stepSize > 0
                            ? (nextProgress - slideProgress) / stepSize
                            : 0;
                    const distance = Math.abs(rawDistance);
                    const clampedDistance = Math.min(Math.max(distance, 0), 1);
                    const focus = 1 - clampedDistance;
                    const direction = Math.min(Math.max(rawDistance, -1), 1);

                    slide.style.setProperty("--slide-focus", focus);
                    slide.style.setProperty(
                        "--slide-distance",
                        clampedDistance
                    );
                    slide.style.setProperty("--slide-direction", direction);
                    slide.style.setProperty(
                        "--media-parallax",
                        `${direction * -32}px`
                    );
                    slide.style.setProperty("--media-scale", 1 + focus * 0.04);
                    slide.style.setProperty(
                        "--copy-y",
                        `${clampedDistance * 18}px`
                    );
                    slide.classList.toggle(
                        "project-slide-active",
                        distance < 0.55
                    );
                });
            };

            const update = () => {
                if (!triggerRef.current || !sectionRef.current) return;

                const rect = triggerRef.current.getBoundingClientRect();
                const scrolled = Math.min(
                    Math.max(-rect.top, 0),
                    scrollDistance
                );
                const nextProgress = scrollDistance
                    ? scrolled / scrollDistance
                    : 0;
                const translateX = -(
                    nextProgress *
                    Math.max(totalSlides - 1, 0) *
                    100
                );

                sectionRef.current.style.transform = `translateX(${translateX}vw)`;
                syncSlideDepth(nextProgress);

                const roundedProgress = Math.round(nextProgress * 100);
                if (progressRef.current !== roundedProgress) {
                    progressRef.current = roundedProgress;
                    setProgress(roundedProgress);
                }
            };

            const scheduleUpdate = () => {
                if (rafIdRef.current) return;
                rafIdRef.current = requestAnimationFrame(() => {
                    rafIdRef.current = null;
                    update();
                });
            };

            const onResize = () => {
                update();
            };

            update();
            window.addEventListener("scroll", scheduleUpdate, {
                passive: true,
            });
            window.addEventListener("resize", onResize);

            return () => {
                window.removeEventListener("scroll", scheduleUpdate);
                window.removeEventListener("resize", onResize);
                if (rafIdRef.current) {
                    cancelAnimationFrame(rafIdRef.current);
                    rafIdRef.current = null;
                }
            };
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
            style={{
                height: `calc(100vh + 5000px)`,
            }}
        >
            <div className="featured-projects-pin" ref={pinRef}>
                <div className="featured-header section-header">
                    <h1 className="section-title">Featured Projects</h1>
                    <p className="featured-subtitle section-subtitle">
                        Selected projects & experiments
                    </p>
                </div>
                <div className="featured-progress-bar">
                    <div
                        className="progress-fill"
                        style={{ height: `${progress}%` }}
                    ></div>
                </div>

                <FeaturedProjectsSlider
                    projects={featuredProjects}
                    sectionRef={sectionRef}
                />

                <FeaturedProjectsIndicator
                    total={featuredProjects.length}
                    progress={progress}
                />

                <div className="featured-projects-footer">
                    <p className="mn">Project Portfolio</p>
                    <p className="mn">///////////////////</p>
                    <p className="mn">
                        <a href="#/projects">View All Projects</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
