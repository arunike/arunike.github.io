/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "../../pages/projects/component/projects";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.isFeatured),
        []
    );

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalSlides = featuredProjects.length;
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1001px)", () => {
            gsap.fromTo(
                sectionRef.current,
                {
                    translateX: 0,
                },
                {
                    translateX: `-${(totalSlides - 1) * 100}vw`,
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=5000",
                        scrub: 0.6,
                        pin: true,
                        onUpdate: (self) => {
                            setProgress(Math.round(self.progress * 100));
                        },
                    },
                }
            );
        });

        return () => {
            mm.revert();
        };
    }, [featuredProjects.length]);

    return (
        <section className="featured-work-container" ref={triggerRef}>
            <div className="featured-header section-header">
                <h1 className="section-title">Featured Work</h1>
                <p className="featured-subtitle section-subtitle">
                    Selected projects & experiments
                </p>
            </div>
            {/* Custom Scroll Indicator (Left Side) */}
            <div className="featured-progress-bar">
                <div
                    className="progress-fill"
                    style={{ height: `${progress}%` }}
                ></div>
            </div>

            <div className="featured-work-slider" ref={sectionRef}>
                {/* Intro / Header Slide? Optional. Let's start with project 1 directly or having a header on top? 
                    User wants "Narrative". Let's put a header on the first slide alongside the content or just start. 
                    Let's stick to the plan: Projects + View All. 
                */}

                {featuredProjects.map((project, index) => (
                    <div className="project-slide" key={index}>
                        {/* Slide Content (Left) */}
                        <div className="slide-content">
                            <span className="project-watermark">
                                {`0${index + 1}`}
                            </span>
                            <h3 className="project-cat">{project.category}</h3>
                            <h2 className="project-title">{project.title}</h2>
                            <p className="project-desc">
                                {project.description}
                            </p>

                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="p-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Slide Visual (Right) */}
                        <div className="slide-visual">
                            <div className="img-wrapper">
                                <img src={project.image} alt={project.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="featured-work-indicator">
                {featuredProjects.map((_, index) => {
                    return (
                        <div key={index} className="indicator-group-vertical">
                            <span
                                className={`indicator-num ${progress > (index / featuredProjects.length) * 100 ? "active" : ""}`}
                            >
                                {`0${index + 1}`}
                            </span>
                            {[...Array(6)].map((__, i) => {
                                const totalLinesPerSection = 6;
                                const sectionStart =
                                    (index / projects.length) * 100;
                                const sectionEnd =
                                    ((index + 1) / projects.length) * 100;
                                const lineStep =
                                    (sectionEnd - sectionStart) /
                                    totalLinesPerSection;
                                const lineThreshold =
                                    sectionStart + i * lineStep;

                                const isActive = progress > lineThreshold;

                                return (
                                    <div
                                        key={i}
                                        className="i-line"
                                        style={{ opacity: isActive ? 1 : 0.2 }}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            <div className="featured-work-footer">
                <p className="mn">Project Portfolio</p>
                <p className="mn">///////////////////</p>
                <p className="mn">
                    <a href="#/projects">View All Projects</a>
                </p>
            </div>
        </section>
    );
};

export default FeaturedWork;
