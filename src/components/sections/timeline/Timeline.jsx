import { useEffect, useRef, useState, useMemo } from "react";
import { experiences } from "./components/timelineData";
import extractColorFromImage from "./components/extractColorFromImage";
import TimelineStats from "./components/TimelineStats";
import TimelineScrollArea from "./components/TimelineScrollArea";
import TimelineTrack from "./components/TimelineTrack";

const MOBILE_BREAKPOINT = 768;
const MOBILE_ROOT_MARGIN = "-10% 0px";
const DESKTOP_ROOT_MARGIN = "0px -20% 0px -20%";
const MOBILE_THRESHOLD = 0.2;
const DESKTOP_THRESHOLD = 0.4;

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
            .reverse();
    }, []);

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
            scrollContainerRef.current.style.scrollBehavior = "auto";
            scrollContainerRef.current.scrollLeft =
                scrollContainerRef.current.scrollWidth;
            scrollContainerRef.current.style.scrollBehavior = "smooth";
            checkScroll();
        }
    }, [orderedExperiences]);

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
                        />
                    </TimelineScrollArea>

                    <TimelineStats stats={experienceStats} />
                </div>
            </div>
        </section>
    );
};

export default Timeline;
