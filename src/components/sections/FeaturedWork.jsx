/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import project images
import BlueDrop from "../../assets/images/courses/compsci407.png";
import VRGame from "../../assets/images/courses/compsci579.gif";
import Resume from "../../assets/images/projects/resume_builder.png";
import VHR from "../../assets/images/projects/vhr.png";
import BirdFeeder from "../../assets/images/courses/compsci506.png";

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    const projects = useMemo(
        () => [
            {
                id: 1,
                title: "BlueDrop",
                category: "Mobile App",
                description:
                    "Mobile application for water quality monitoring and community engagement. Empowering local communities to track and improve their water sources.",
                tags: ["Android", "Kotlin", "Firebase"],
                image: BlueDrop,
            },
            {
                id: 2,
                title: "Cyberpunk VR",
                category: "Game Dev",
                description:
                    "Immersive VR racing game featuring neon-soaked skyscrapers and high-speed tracks. A thrill ride through a futuristic metropolis.",
                tags: ["Unity", "C#", "VR"],
                image: VRGame,
            },
            {
                id: 3,
                title: "Resume Builder",
                category: "Web App",
                description:
                    "Interactive tool with real-time preview and PDF export. simplifying the job application process with clean, professional templates.",
                tags: ["React", "Node.js", "PDF.js"],
                image: Resume,
            },
            {
                id: 4,
                title: "VHR System",
                category: "Enterprise",
                description:
                    "Comprehensive HR management system separating front and back end services. Handles payroll, employee data, and recruitment flows.",
                tags: ["Java", "Spring Boot", "Vue.js"],
                image: VHR,
            },
            {
                id: 5,
                title: "Smart Bird Feeder",
                category: "AI / IoT",
                description:
                    "IoT device using machine learning to identify bird species in real-time. Features automated feeding schedules and live streaming.",
                tags: ["React", "YOLO", "Computer Vision"],
                image: BirdFeeder,
            },
        ],
        []
    );

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalSlides = projects.length;

        const pin = gsap.fromTo(
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

        return () => {
            pin.kill();
        };
    }, [projects.length]);

    return (
        <section className="featured-work-container" ref={triggerRef}>
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

                {projects.map((project, index) => (
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
                {projects.map((_, index) => {
                    return (
                        <div key={index} className="indicator-group-vertical">
                            <span
                                className={`indicator-num ${progress > (index / projects.length) * 100 ? "active" : ""}`}
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
