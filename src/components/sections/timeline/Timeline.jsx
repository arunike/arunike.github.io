import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "./components/timelineData";
import extractColorFromImage from "./components/extractColorFromImage";
import TimelineStats from "./components/TimelineStats";
import TimelineScrollArea from "./components/TimelineScrollArea";
import TimelineTrack from "./components/TimelineTrack";
import { MOTION } from "../../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 768;
const MOBILE_ROOT_MARGIN = "-10% 0px";
const DESKTOP_ROOT_MARGIN = "0px -20% 0px -20%";
const MOBILE_THRESHOLD = MOTION.reveal.threshold;
const DESKTOP_THRESHOLD = MOTION.reveal.threshold;
const MONTHS = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

const parseMonthYear = (value) => {
    const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (!match) return null;

    const month = MONTHS[match[1].toLowerCase()];
    const year = Number(match[2]);

    if (month === undefined || Number.isNaN(year)) return null;

    return { month, year };
};

const getExperienceEndTime = (duration) => {
    const endValue = duration.split(/\s+-\s+/)[1];

    if (endValue?.toLowerCase() === "present") {
        return Number.POSITIVE_INFINITY;
    }

    const end = parseMonthYear(endValue || "");
    if (!end) return Number.NEGATIVE_INFINITY;

    return end.year * 12 + end.month;
};

const Timeline = () => {
    const timelineRef = useRef([]);
    const scrollContainerRef = useRef(null);
    const observerRef = useRef(null);
    const isMobileRef = useRef(window.innerWidth <= MOBILE_BREAKPOINT);
    const [experienceColors, setExperienceColors] = useState({});
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);

    const checkScroll = () => {
        if (!scrollContainerRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;
        setShowLeftFade(scrollLeft > 20);
        setShowRightFade(scrollLeft < scrollWidth - clientWidth - 20);

        const maxScroll = Math.max(scrollWidth - clientWidth, 1);
        const progress = Math.min(Math.max(scrollLeft / maxScroll, 0), 1);
        const track =
            scrollContainerRef.current.querySelector(".timeline-track");

        if (track) {
            track.style.setProperty("--timeline-progress", progress);
        }
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
        const extractColors = async () => {
            const colors = {};
            for (const exp of experiences) {
                colors[exp.id] = await extractColorFromImage(exp.logo);
            }
            setExperienceColors(colors);
        };

        extractColors();
    }, []);

    useEffect(() => {
        const createObserver = () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            isMobileRef.current = isMobile;

            const observerOptions = {
                root: isMobile ? null : scrollContainerRef.current,
                rootMargin: isMobile ? MOBILE_ROOT_MARGIN : DESKTOP_ROOT_MARGIN,
                threshold: isMobile ? MOBILE_THRESHOLD : DESKTOP_THRESHOLD,
            };

            observerRef.current = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("timeline-animated");
                    } else if (!isMobile) {
                        entry.target.classList.remove("timeline-animated");
                    }
                });
            }, observerOptions);

            timelineRef.current.forEach((ref) => {
                if (ref) observerRef.current.observe(ref);
            });
        };

        const handleResize = () => {
            const nextIsMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            if (nextIsMobile !== isMobileRef.current) {
                createObserver();
            }
            checkScroll();
        };

        createObserver();
        checkScroll();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const orderedExperiences = useMemo(() => {
        return [...experiences]
            .filter((exp) => exp.isActive !== false)
            .sort(
                (first, second) =>
                    getExperienceEndTime(first.duration) -
                    getExperienceEndTime(second.duration)
            );
    }, []);
    const mostRecentExperienceId =
        orderedExperiences[orderedExperiences.length - 1]?.id;

    const experienceStats = useMemo(() => {
        const activeExperiences = experiences.filter(
            (exp) => exp.isActive !== false
        );
        const uniqueTechnologies = new Set(
            experiences.flatMap((exp) => exp.technologies)
        );
        const uniqueLocations = new Set(experiences.map((exp) => exp.location));

        return {
            activeCount: activeExperiences.length,
            techCount: uniqueTechnologies.size,
            locationCount: uniqueLocations.size,
        };
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            const targetItem = timelineRef.current.find(
                (item) => item?.dataset.experienceId === mostRecentExperienceId
            );

            scrollContainerRef.current.style.scrollBehavior = "auto";
            scrollContainerRef.current.scrollLeft = targetItem
                ? targetItem.offsetLeft -
                  (scrollContainerRef.current.clientWidth -
                      targetItem.offsetWidth) /
                      2
                : scrollContainerRef.current.scrollWidth;
            scrollContainerRef.current.style.scrollBehavior = "smooth";
            checkScroll();
        }
    }, [mostRecentExperienceId, orderedExperiences]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        if (mediaQuery.matches) return;

        const ctx = gsap.context(() => {
            const section = document.getElementById("timeline");
            if (!section) return;

            const header = section.querySelector(".timeline-header");
            const line = section.querySelector(".timeline-line");
            const dots = section.querySelectorAll(".timeline-dot");
            const contentWrapper = section.querySelector(
                ".timeline-content-wrapper"
            );
            const stats = section.querySelector(".timeline-stats");

            const mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                });

                if (header) {
                    tl.fromTo(
                        header,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                    );
                }

                if (line) {
                    tl.fromTo(
                        line,
                        { scaleX: 0, transformOrigin: "left center" },
                        { scaleX: 1, duration: 1.2, ease: "power2.inOut" },
                        "-=0.4"
                    );
                }

                if (dots.length > 0) {
                    tl.fromTo(
                        dots,
                        { scale: 0 },
                        {
                            scale: 1,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            stagger: 0.15,
                        },
                        "-=1.0"
                    );
                }

                if (contentWrapper) {
                    tl.fromTo(
                        contentWrapper,
                        { opacity: 0, y: 45 },
                        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
                        "-=1.0"
                    );
                }

                if (stats) {
                    tl.fromTo(
                        stats,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                        "-=0.6"
                    );
                }
            });

            mm.add("(max-width: 768px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                });

                if (header) {
                    tl.fromTo(
                        header,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
                    );
                }

                if (line) {
                    tl.fromTo(
                        line,
                        { scaleY: 0, transformOrigin: "top center" },
                        { scaleY: 1, duration: 1.2, ease: "power2.inOut" },
                        "-=0.3"
                    );
                }

                if (contentWrapper) {
                    tl.fromTo(
                        contentWrapper,
                        { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                        "-=0.8"
                    );
                }

                if (stats) {
                    tl.fromTo(
                        stats,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                        "-=0.4"
                    );
                }
            });
        });

        return () => {
            ctx.revert();
        };
    }, []);

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

                <div className="timeline-content-wrapper visible">
                    <TimelineScrollArea
                        showLeftFade={showLeftFade}
                        showRightFade={showRightFade}
                        onScrollBy={scrollBy}
                        scrollContainerRef={scrollContainerRef}
                        onScroll={checkScroll}
                    >
                        <TimelineTrack
                            experiences={orderedExperiences}
                            experienceColors={experienceColors}
                            addToRefs={addToRefs}
                            mostRecentExperienceId={mostRecentExperienceId}
                        />
                    </TimelineScrollArea>

                    <TimelineStats stats={experienceStats} />
                </div>
            </div>
        </section>
    );
};

export default Timeline;
