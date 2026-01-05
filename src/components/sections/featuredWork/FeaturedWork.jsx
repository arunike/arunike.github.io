import { useLayoutEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "../../../pages/projects/components/projectsData";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    const featuredProjects = useMemo(
        () => projects.filter((p) => p.isFeatured),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [projects]
    );

    const [progress, setProgress] = useState(0);

    useLayoutEffect(() => {
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

            // Dispatch event to notify Expertise component to re-calculate layout
            // This ensures Expertise rebuilds its ScrollTrigger after FeaturedWork pin is set
            window.dispatchEvent(new Event("featured-work-updated"));
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
                { threshold: 0.1 }
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
        <section className="featured-work-container" ref={triggerRef}>
            <div className="featured-header section-header">
                <h1 className="section-title">Featured Work</h1>
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

            <div className="featured-work-slider" ref={sectionRef}>
                {featuredProjects.map((project, index) => (
                    <div className="project-slide" key={index}>
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

                        <div
                            className="slide-visual"
                            onMouseMove={(e) => {
                                const rect =
                                    e.currentTarget.getBoundingClientRect();
                                const x =
                                    e.clientX - rect.left - rect.width / 2;
                                const y =
                                    e.clientY - rect.top - rect.height / 2;

                                const imgWrapper =
                                    e.currentTarget.querySelector(
                                        ".img-wrapper"
                                    );

                                gsap.to(imgWrapper, {
                                    x: x * 0.1,
                                    y: y * 0.1,
                                    rotationY: x * 0.05,
                                    rotationX: -y * 0.05,
                                    duration: 0.5,
                                    ease: "power2.out",
                                });
                            }}
                            onMouseLeave={(e) => {
                                const imgWrapper =
                                    e.currentTarget.querySelector(
                                        ".img-wrapper"
                                    );
                                gsap.to(imgWrapper, {
                                    x: 0,
                                    y: 0,
                                    rotationY: 0,
                                    rotationX: 0,
                                    duration: 0.5,
                                    ease: "power2.out",
                                });
                            }}
                        >
                            <div
                                className="img-wrapper"
                                style={{ perspective: "1000px" }}
                            >
                                <img src={project.image} alt={project.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="featured-work-indicator">
                {featuredProjects.map((_, index) => {
                    const totalScrollDistance =
                        featuredProjects.length - 1 || 1;
                    const threshold = (index / totalScrollDistance) * 100;
                    const isNumActive = progress >= threshold;

                    return (
                        <div key={index} className="indicator-group-vertical">
                            <span
                                className={`indicator-num ${
                                    isNumActive ? "active" : ""
                                }`}
                            >
                                {`0${index + 1}`}
                            </span>
                            {index < featuredProjects.length - 1 &&
                                [...Array(6)].map((__, i) => {
                                    const totalLinesPerSection = 6;
                                    const sectionStart =
                                        (index / totalScrollDistance) * 100;
                                    const sectionEnd =
                                        ((index + 1) / totalScrollDistance) *
                                        100;
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
                                            style={{
                                                opacity: isActive ? 1 : 0.2,
                                            }}
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
