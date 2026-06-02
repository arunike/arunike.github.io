import { useCallback, useEffect, useRef, useState } from "react";
import {
    FiBriefcase,
    FiClock,
    FiCode,
    FiCpu,
    FiHome,
    FiMail,
    FiUser,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

const IDLE_HIDE_DELAY = 3000;

const sections = [
    { id: "landing", label: "Home", Icon: FiHome },
    { id: "about-hero", label: "About", Icon: FiUser },
    { id: "featured-projects", label: "Projects", Icon: FiBriefcase },
    { id: "expertise", label: "Expertise", Icon: FiCpu },
    { id: "timeline", label: "Timeline", Icon: FiClock },
    { id: "skills", label: "Skills", Icon: FiCode },
    { id: "contact", label: "Contact", Icon: FiMail },
];

const SectionNav = ({ scrollTo, loaded, isMenuOpen }) => {
    const [activeSection, setActiveSection] = useState("landing");
    const [isIdleHidden, setIsIdleHidden] = useState(false);
    const [isTimelineControlOverlapping, setIsTimelineControlOverlapping] =
        useState(false);
    const location = useLocation();
    const navRef = useRef(null);
    const lastVisibleNavRectRef = useRef(null);
    const idleTimeoutRef = useRef(null);
    const isNavInteractingRef = useRef(false);

    const clearIdleTimer = useCallback(() => {
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = null;
        }
    }, []);

    const resetIdleTimer = useCallback(() => {
        if (typeof window === "undefined") {
            return;
        }

        clearIdleTimer();
        setIsIdleHidden(false);

        if (
            !loaded ||
            location.pathname !== "/" ||
            activeSection === "landing" ||
            isMenuOpen ||
            isNavInteractingRef.current
        ) {
            return;
        }

        idleTimeoutRef.current = window.setTimeout(() => {
            if (!isNavInteractingRef.current) {
                setIsIdleHidden(true);
            }
        }, IDLE_HIDE_DELAY);
    }, [activeSection, clearIdleTimer, isMenuOpen, loaded, location.pathname]);

    useEffect(() => {
        if (location.pathname === "/") {
            setActiveSection("landing");
            setIsIdleHidden(false);
            return;
        }

        isNavInteractingRef.current = false;
        clearIdleTimer();
        setIsIdleHidden(false);
    }, [clearIdleTimer, location.pathname]);

    useEffect(() => {
        if (!loaded) {
            setIsIdleHidden(false);
        }
    }, [loaded]);

    useEffect(() => {
        if (typeof window === "undefined" || typeof document === "undefined") {
            return;
        }

        if (location.pathname !== "/") {
            return;
        }

        const handleWindowInteraction = (event) => {
            const clientX =
                event && event.clientX
                    ? event.clientX
                    : event && event.touches && event.touches[0]
                      ? event.touches[0].clientX
                      : null;

            if (
                clientX !== null &&
                clientX > 100 &&
                !isNavInteractingRef.current
            ) {
                setIsIdleHidden(true);
            } else {
                resetIdleTimer();
            }
        };

        window.addEventListener("pointermove", handleWindowInteraction);
        window.addEventListener("pointerdown", handleWindowInteraction);
        window.addEventListener("wheel", handleWindowInteraction);
        window.addEventListener("scroll", handleWindowInteraction);
        window.addEventListener("touchstart", handleWindowInteraction);
        window.addEventListener("keydown", handleWindowInteraction);
        document.addEventListener("focusin", handleWindowInteraction);

        return () => {
            window.removeEventListener("pointermove", handleWindowInteraction);
            window.removeEventListener("pointerdown", handleWindowInteraction);
            window.removeEventListener("wheel", handleWindowInteraction);
            window.removeEventListener("scroll", handleWindowInteraction);
            window.removeEventListener("touchstart", handleWindowInteraction);
            window.removeEventListener("keydown", handleWindowInteraction);
            document.removeEventListener("focusin", handleWindowInteraction);
        };
    }, [location.pathname, resetIdleTimer]);

    useEffect(() => {
        if (
            !loaded ||
            location.pathname !== "/" ||
            activeSection === "landing" ||
            isMenuOpen
        ) {
            isNavInteractingRef.current = false;
            clearIdleTimer();
            setIsIdleHidden(false);
            return;
        }

        resetIdleTimer();

        return () => {
            clearIdleTimer();
        };
    }, [
        activeSection,
        clearIdleTimer,
        isMenuOpen,
        loaded,
        location.pathname,
        resetIdleTimer,
    ]);

    useEffect(
        () => () => {
            clearIdleTimer();
        },
        [clearIdleTimer]
    );

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            typeof document === "undefined" ||
            location.pathname !== "/"
        ) {
            setIsTimelineControlOverlapping(false);
            return;
        }

        const timelineLeftControl = document.querySelector(
            ".timeline-fade-left"
        );
        const timelineLeftIcon = timelineLeftControl?.querySelector("svg");

        if (!timelineLeftControl || !timelineLeftIcon) {
            setIsTimelineControlOverlapping(false);
            return;
        }

        const updateControlOverlap = () => {
            if (activeSection !== "timeline") {
                setIsTimelineControlOverlapping(false);
                return;
            }

            const navRect = navRef.current?.getBoundingClientRect();
            const navIsMeasurable =
                navRect && navRect.width > 0 && navRect.height > 0;

            if (
                navIsMeasurable &&
                !isTimelineControlOverlapping &&
                !isIdleHidden
            ) {
                lastVisibleNavRectRef.current = navRect;
            }

            const compareRect = lastVisibleNavRectRef.current || navRect;
            const controlRect = timelineLeftIcon.getBoundingClientRect();
            const controlIsVisible =
                timelineLeftControl.classList.contains("visible") &&
                controlRect.width > 0 &&
                controlRect.height > 0;

            if (!compareRect || !controlIsVisible) {
                setIsTimelineControlOverlapping(false);
                return;
            }

            setIsTimelineControlOverlapping(
                !(
                    controlRect.right < compareRect.left ||
                    controlRect.left > compareRect.right ||
                    controlRect.bottom < compareRect.top ||
                    controlRect.top > compareRect.bottom
                )
            );
        };

        updateControlOverlap();

        const observer = new MutationObserver(updateControlOverlap);
        observer.observe(timelineLeftControl, {
            attributeFilter: ["class"],
            attributes: true,
        });
        window.addEventListener("resize", updateControlOverlap);
        window.addEventListener("scroll", updateControlOverlap);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateControlOverlap);
            window.removeEventListener("scroll", updateControlOverlap);
        };
    }, [
        activeSection,
        isIdleHidden,
        isTimelineControlOverlapping,
        loaded,
        location.pathname,
    ]);

    useEffect(() => {
        if (location.pathname !== "/" || !loaded) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [location.pathname, loaded]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (!element) return;
        if (scrollTo) {
            scrollTo(element, {
                immediate: true,
                force: true,
                lock: true,
            });
        } else {
            element.scrollIntoView({ behavior: "auto", block: "start" });
        }
    };

    if (location.pathname !== "/") {
        return null;
    }

    const sectionNavClassName = [
        "section-nav",
        activeSection === "landing" || isMenuOpen ? "section-nav--blocked" : "",
        isIdleHidden ? "section-nav--idle-hidden" : "",
        isTimelineControlOverlapping
            ? "section-nav--timeline-control-overlap"
            : "",
    ]
        .filter(Boolean)
        .join(" ");

    const handleNavMouseEnter = () => {
        isNavInteractingRef.current = true;
        clearIdleTimer();
        setIsIdleHidden(false);
    };

    const handleNavMouseLeave = () => {
        isNavInteractingRef.current = false;
        resetIdleTimer();
    };

    const handleNavFocus = () => {
        isNavInteractingRef.current = true;
        clearIdleTimer();
        setIsIdleHidden(false);
    };

    const handleNavBlur = (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) {
            return;
        }

        isNavInteractingRef.current = false;
        resetIdleTimer();
    };

    return (
        <nav
            ref={navRef}
            className={sectionNavClassName}
            onMouseEnter={handleNavMouseEnter}
            onMouseLeave={handleNavMouseLeave}
            onFocus={handleNavFocus}
            onBlur={handleNavBlur}
            onClick={resetIdleTimer}
        >
            <ul>
                {sections.map((section) => (
                    <li
                        key={section.id}
                        className={activeSection === section.id ? "active" : ""}
                    >
                        <button
                            onClick={() => scrollToSection(section.id)}
                            aria-label={`Navigate to ${section.label}`}
                            aria-current={
                                activeSection === section.id
                                    ? "location"
                                    : undefined
                            }
                        >
                            <span className="nav-icon" aria-hidden="true">
                                <section.Icon />
                            </span>
                            <span className="nav-label">{section.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SectionNav;
