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

const COLLISION_TARGETS = [
    {
        selector: ".timeline-fade-left",
        measure: "svg",
        requiresClass: "visible",
    },
    { selector: ".contact-card-header-main h1" },
    { selector: ".contact-card-header-main p" },
    { selector: ".contact-info" },
    { selector: ".skill-category" },
    { selector: ".skills-heading" },
    { selector: ".landing-footer-symbols" },
];

const SectionNav = ({ scrollTo, loaded, isMenuOpen }) => {
    const [activeSection, setActiveSection] = useState("landing");
    const [isIdleHidden, setIsIdleHidden] = useState(false);
    const [isColliding, setIsColliding] = useState(false);
    const isCollidingRef = useRef(false);
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
        isCollidingRef.current = isColliding;
    }, [isColliding]);

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            typeof document === "undefined" ||
            location.pathname !== "/"
        ) {
            setIsColliding(false);
            return;
        }

        const resolveTargets = () =>
            COLLISION_TARGETS.flatMap(({ selector, measure, requiresClass }) =>
                Array.from(document.querySelectorAll(selector))
                    .filter(
                        (element) =>
                            !requiresClass ||
                            element.classList.contains(requiresClass)
                    )
                    .map((element) =>
                        measure ? element.querySelector(measure) : element
                    )
                    .filter(Boolean)
            );

        const intersects = (rect, navRect) =>
            !(
                rect.right < navRect.left ||
                rect.left > navRect.right ||
                rect.bottom < navRect.top ||
                rect.top > navRect.bottom
            );

        const updateCollision = () => {
            const navRect = navRef.current?.getBoundingClientRect();
            const navIsMeasurable =
                navRect && navRect.width > 0 && navRect.height > 0;

            if (navIsMeasurable && !isCollidingRef.current && !isIdleHidden) {
                lastVisibleNavRectRef.current = navRect;
            }

            const compareRect = lastVisibleNavRectRef.current || navRect;

            if (!compareRect) {
                setIsColliding(false);
                return;
            }

            setIsColliding(
                resolveTargets().some((element) => {
                    const rect = element.getBoundingClientRect();
                    if (rect.width <= 0 || rect.height <= 0) {
                        return false;
                    }
                    return intersects(rect, compareRect);
                })
            );
        };

        let frameId = null;
        const scheduleUpdate = () => {
            if (frameId !== null) {
                return;
            }
            frameId = window.requestAnimationFrame(() => {
                frameId = null;
                updateCollision();
            });
        };

        updateCollision();

        const timelineControl = document.querySelector(".timeline-fade-left");
        const observer = timelineControl
            ? new MutationObserver(scheduleUpdate)
            : null;

        if (observer && timelineControl) {
            observer.observe(timelineControl, {
                attributeFilter: ["class"],
                attributes: true,
            });
        }

        window.addEventListener("resize", scheduleUpdate);
        window.addEventListener("scroll", scheduleUpdate, { passive: true });

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }
            observer?.disconnect();
            window.removeEventListener("resize", scheduleUpdate);
            window.removeEventListener("scroll", scheduleUpdate);
        };
    }, [activeSection, isIdleHidden, loaded, location.pathname]);

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
        // scrollTo returns false when Lenis is not running (reduced motion),
        // so fall through to the native scroll rather than doing nothing.
        const didScroll = scrollTo
            ? scrollTo(element, {
                  immediate: true,
                  force: true,
                  lock: true,
              })
            : false;

        if (!didScroll) {
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
        isColliding ? "section-nav--collision-hidden" : "",
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
