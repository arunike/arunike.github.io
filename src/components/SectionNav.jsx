import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const IDLE_HIDE_DELAY = 3000;

const sections = [
    { id: "landing", label: "Home" },
    { id: "about-hero", label: "About" },
    { id: "featured-projects", label: "Projects" },
    { id: "expertise-header", label: "Expertise" },
    { id: "timeline", label: "Timeline" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

const SectionNav = ({ scrollTo, loaded, isMenuOpen }) => {
    const [activeSection, setActiveSection] = useState("landing");
    const [isIdleHidden, setIsIdleHidden] = useState(false);
    const location = useLocation();
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

        const handleWindowInteraction = () => {
            resetIdleTimer();
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
            scrollTo(element, { duration: 1.2 });
        } else {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (location.pathname !== "/") {
        return null;
    }

    const sectionNavClassName = [
        "section-nav",
        activeSection === "landing" || isMenuOpen ? "section-nav--blocked" : "",
        isIdleHidden ? "section-nav--idle-hidden" : "",
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
                        >
                            <span className="nav-dot"></span>
                            <span className="nav-label">{section.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SectionNav;
