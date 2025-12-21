import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import TikTokLogo from "../../assets/images/experience/TikTok.png";
import LumenLogo from "../../assets/images/experience/Lumen.png";
import NorthernTrustLogo from "../../assets/images/experience/NorthernTrust.png";
import RockitcoinLogo from "../../assets/images/experience/Rockitcoin.png";
import UNFCULogo from "../../assets/images/experience/UNFCU.png";

const extractColorFromImage = (imageSrc) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );
            const data = imageData.data;

            let r = 0,
                g = 0,
                b = 0;
            let count = 0;

            // Sample pixels and calculate average (skip very light/dark pixels)
            for (let i = 0; i < data.length; i += 4 * 10) {
                // Sample every 10th pixel
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const alpha = data[i + 3];

                // Skip transparent or very light pixels
                if (
                    alpha > 100 &&
                    red + green + blue < 700 &&
                    red + green + blue > 50
                ) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }

            if (count > 0) {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(
                    `#${((1 << 24) + (r << 16) + (g << 8) + b)
                        .toString(16)
                        .slice(1)}`
                );
            } else {
                resolve("#000000");
            }
        };

        img.onerror = () => resolve("#000000");
    });
};

const Timeline = () => {
    const timelineRef = useRef([]);
    const scrollContainerRef = useRef(null);
    const [experienceColors, setExperienceColors] = useState({});
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const [showTimeline, setShowTimeline] = useState(false);
    const [introWord, setIntroWord] = useState("");
    const [introStage, setIntroStage] = useState("idle");

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
        setShowLeftFade(scrollLeft > 20);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 20);
    };

    const scrollBy = (amount) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: amount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const experiences = useMemo(
        () => [
            {
                id: "tiktok",
                company: "TikTok",
                role: "Software Engineer",
                department:
                    "Global Monetization and Platform - Ads Interface and Platform",
                location: "San Jose, CA",
                duration: "January 2025 - Present",
                achievements: [
                    "Integrated proprietary off-platform top-up system for iOS advertisers in the U.S. using Go, implementing secure payment flows and recharge APIs to reduce platform fees.",
                ],
                technologies: ["Go", "Redis", "Kafka", "SQL"],
                isActive: true,
                logo: TikTokLogo,
            },
            {
                id: "lumen",
                company: "Lumen Technologies",
                role: "Software Engineer Intern",
                department: "Virtual Network Platform - IP Engineering",
                location: "New York, NY",
                duration: "May 2024 - August 2024",
                achievements: [
                    "Architected fault-tolerant messaging system using Kafka, implementing message deduplication and partition management to reliably process Millions EMP protocol messages per hour and improve throughput.",
                ],
                technologies: ["Groovy", "Kafka", "AWS"],
                logo: LumenLogo,
            },
            {
                id: "northern-trust",
                company: "Northern Trust",
                role: "Software Engineer Intern",
                department: "Goals Driven Wealth Management",
                location: "Chicago, IL",
                duration: "June 2023 - August 2023",
                achievements: [
                    "Designed sophisticated algorithms for risk assessment and portfolio optimization on a client-centric wealth management platform in Java, providing clients with customizable investment plan recommendations.",
                ],
                technologies: ["Spring Boot", "Java", "C++", "Azure"],
                logo: NorthernTrustLogo,
            },
            {
                id: "rockitcoin",
                company: "Rockitcoin",
                role: "Software Developer Intern",
                department: "Web Development",
                location: "Chicago, IL",
                duration: "August 2022 - March 2023",
                achievements: [
                    "Revamped authentication microservices in Node.js, implementing JWT token-based authentication and HTTP-only cookies, preventing credential exposure and reducing unauthorized access attempts.",
                ],
                technologies: ["React", "TypeScript", "Node.js", "Firebase"],
                logo: RockitcoinLogo,
            },
            {
                id: "unfcu",
                company: "UNFCU",
                role: "Full Stack Developer Intern",
                department: "Enterprise Application and Service",
                location: "New York, NY",
                duration: "June 2022 - August 2022",
                achievements: [
                    "Built savings rate recommendation engine with real-time financial analytics in JavaScript, catalyzing higher account completion rates through personalized suggestions.",
                ],
                technologies: [
                    "JavaScript",
                    "React",
                    "Node.js",
                    "Python",
                    "MySQL",
                ],
                logo: UNFCULogo,
            },
        ],
        []
    );

    useEffect(() => {
        // Extract colors from logos
        const extractColors = async () => {
            const colors = {};
            for (const exp of experiences) {
                colors[exp.id] = await extractColorFromImage(exp.logo);
            }
            setExperienceColors(colors);
        };

        extractColors();
    }, [experiences]);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const observerOptions = {
            root: isMobile ? null : scrollContainerRef.current,
            rootMargin: isMobile ? "-10% 0px" : "0px -20% 0px -20%",
            threshold: isMobile ? 0.2 : 0.4,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("timeline-animated");
                } else {
                    entry.target.classList.remove("timeline-animated");
                }
            });
        }, observerOptions);

        const currentTimelineRefs = timelineRef.current;
        currentTimelineRefs.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        checkScroll();
        window.addEventListener("resize", checkScroll);

        return () => {
            currentTimelineRefs.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
            window.removeEventListener("resize", checkScroll);
        };
    }, [experiences]);

    const orderedExperiences = useMemo(() => {
        return [...experiences].reverse();
    }, [experiences]);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = "auto";
            scrollContainerRef.current.scrollLeft =
                scrollContainerRef.current.scrollWidth;
            scrollContainerRef.current.style.scrollBehavior = "smooth";
        }
    }, [orderedExperiences]);

    useEffect(() => {
        if (showTimeline && scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft =
                scrollContainerRef.current.scrollWidth;
            checkScroll();
        }
    }, [showTimeline]);

    const featureWords = useMemo(() => {
        const locations = [
            ...new Set(
                experiences.map((exp) => exp.location.split(",")[0].trim())
            ),
        ];
        const techs = [
            ...new Set(experiences.flatMap((exp) => exp.technologies)),
        ];

        const pool = [...locations, ...techs];
        return pool.sort(() => 0.5 - Math.random()).slice(0, 4);
    }, [experiences]);

    const playIntroSequence = useCallback(async () => {
        for (let i = 0; i < featureWords.length; i++) {
            setIntroWord(featureWords[i]);
            await new Promise((r) => setTimeout(r, 800));
        }

        setShowIntro(false);

        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.scrollBehavior = "auto";
            scrollContainerRef.current.scrollLeft =
                scrollContainerRef.current.scrollWidth;
            setTimeout(() => {
                if (scrollContainerRef.current)
                    scrollContainerRef.current.style.scrollBehavior = "smooth";
            }, 50);
        }

        setTimeout(() => setShowTimeline(true), 100);
    }, [featureWords]);

    useEffect(() => {
        const section = document.getElementById("timeline");
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    showIntro &&
                    introStage === "idle"
                ) {
                    setIntroStage("playing");
                    playIntroSequence();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [showIntro, introStage, playIntroSequence]);

    const addToRefs = (el) => {
        if (el && !timelineRef.current.includes(el)) {
            timelineRef.current.push(el);
        }
    };

    return (
        <section id="timeline" className="timeline-section">
            <div className="timeline-container">
                <div className="timeline-header section-header">
                    <h1 className="section-title">Professional Timeline</h1>
                    <p className="timeline-subtitle section-subtitle">
                        My software engineer journey
                    </p>
                </div>

                {showIntro && (
                    <div
                        className={`timeline-intro-overlay ${introStage === "playing" ? "active" : ""}`}
                    >
                        <div key={introWord} className="intro-word">
                            {introWord}
                        </div>
                    </div>
                )}

                <div
                    className={`timeline-content-wrapper ${showTimeline ? "visible" : "hidden"}`}
                >
                    <div className="timeline-scroll-wrapper">
                        <div
                            className={`timeline-fade-left ${showLeftFade ? "visible" : ""}`}
                            onClick={() => scrollBy(-300)}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </div>

                        <div
                            className={`timeline-fade-right ${showRightFade ? "visible" : ""}`}
                            onClick={() => scrollBy(300)}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>

                        <div
                            className="timeline-line-wrapper"
                            ref={scrollContainerRef}
                            onScroll={checkScroll}
                        >
                            <div className="timeline-track">
                                <div className="timeline-line"></div>

                                {orderedExperiences.map((exp, index) => {
                                    const expColor =
                                        experienceColors[exp.id] || "#000000";

                                    const positionClass = exp.position
                                        ? `timeline-${exp.position}`
                                        : index % 2 === 0
                                          ? "timeline-top"
                                          : "timeline-bottom";

                                    return (
                                        <div
                                            key={exp.id}
                                            ref={addToRefs}
                                            className={`timeline-item ${positionClass}`}
                                        >
                                            <div className="timeline-content">
                                                <div
                                                    className="timeline-card"
                                                    style={{
                                                        borderLeft: `4px solid ${expColor}`,
                                                        background: `linear-gradient(135deg, ${expColor}08 0%, ${expColor}18 100%)`,
                                                    }}
                                                >
                                                    {/* Company Header */}
                                                    <div className="timeline-company-header">
                                                        <div className="timeline-company-logo">
                                                            <img
                                                                src={exp.logo}
                                                                alt={
                                                                    exp.company
                                                                }
                                                            />
                                                        </div>
                                                        <div className="timeline-company-info">
                                                            <h3
                                                                className="timeline-role"
                                                                style={{
                                                                    color: expColor,
                                                                }}
                                                            >
                                                                {exp.role}
                                                            </h3>
                                                            <h4 className="timeline-company">
                                                                {exp.company}
                                                            </h4>
                                                        </div>
                                                        {exp.isActive && (
                                                            <span className="timeline-active-badge">
                                                                Current
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Department */}
                                                    <div
                                                        className="timeline-department"
                                                        style={{
                                                            borderLeftColor:
                                                                expColor,
                                                        }}
                                                    >
                                                        {exp.department}
                                                    </div>

                                                    {/* Location & Duration */}
                                                    <div className="timeline-meta">
                                                        <span className="timeline-location">
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                            >
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                                <circle
                                                                    cx="12"
                                                                    cy="10"
                                                                    r="3"
                                                                />
                                                            </svg>
                                                            {exp.location}
                                                        </span>
                                                        <span className="timeline-duration">
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                            >
                                                                <rect
                                                                    x="3"
                                                                    y="4"
                                                                    width="18"
                                                                    height="18"
                                                                    rx="2"
                                                                    ry="2"
                                                                />
                                                                <line
                                                                    x1="16"
                                                                    y1="2"
                                                                    x2="16"
                                                                    y2="6"
                                                                />
                                                                <line
                                                                    x1="8"
                                                                    y1="2"
                                                                    x2="8"
                                                                    y2="6"
                                                                />
                                                                <line
                                                                    x1="3"
                                                                    y1="10"
                                                                    x2="21"
                                                                    y2="10"
                                                                />
                                                            </svg>
                                                            {exp.duration}
                                                        </span>
                                                    </div>

                                                    {/* Achievements */}
                                                    <div className="timeline-achievements">
                                                        {exp.achievements.map(
                                                            (
                                                                achievement,
                                                                idx
                                                            ) => (
                                                                <p key={idx}>
                                                                    {
                                                                        achievement
                                                                    }
                                                                </p>
                                                            )
                                                        )}
                                                    </div>

                                                    {/* Technologies */}
                                                    <div className="timeline-tech-stack">
                                                        {exp.technologies.map(
                                                            (tech, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="timeline-tech-tag"
                                                                    style={{
                                                                        backgroundColor: `${expColor}20`,
                                                                        color: expColor,
                                                                        borderColor: `${expColor}40`,
                                                                    }}
                                                                >
                                                                    {tech}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="timeline-dot"
                                                style={{
                                                    borderColor: expColor,
                                                }}
                                            >
                                                <div
                                                    className="timeline-dot-inner"
                                                    style={{
                                                        backgroundColor:
                                                            expColor,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="timeline-stats">
                        <div className="timeline-stat-item">
                            <span className="timeline-stat-number">
                                {
                                    experiences.filter(
                                        (exp) => exp.isActive !== false
                                    ).length
                                }
                            </span>
                            <span className="timeline-stat-label">
                                Experiences
                            </span>
                        </div>
                        <div className="timeline-stat-item">
                            <span className="timeline-stat-number">
                                {
                                    [
                                        ...new Set(
                                            experiences.flatMap(
                                                (exp) => exp.technologies
                                            )
                                        ),
                                    ].length
                                }
                            </span>
                            <span className="timeline-stat-label">
                                Technologies
                            </span>
                        </div>
                        <div className="timeline-stat-item">
                            <span className="timeline-stat-number">
                                {
                                    [
                                        ...new Set(
                                            experiences.map(
                                                (exp) => exp.location
                                            )
                                        ),
                                    ].length
                                }
                            </span>
                            <span className="timeline-stat-label">Cities</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Timeline;
