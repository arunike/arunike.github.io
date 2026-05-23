import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import ReactGA from "react-ga4";
import ResumePdf from "../assets/resume/Richies_Resume.pdf";
import { MOTION } from "../utils/motion";

const Nav = ({ isOpen, setIsOpen, scrollTo, start, stop }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "light";
        }
        const storedTheme = window.localStorage.getItem("theme");
        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }
        return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });
    const location = useLocation();
    const navOverlayRef = useRef(null);
    const openLabelRef = useRef(null);
    const closeLabelRef = useRef(null);
    const navItemRefs = useRef([]);
    const footerHeaderRefs = useRef([]);
    const footerCopyRefs = useRef([]);

    const setNavItemRef = (el) => {
        if (el && !navItemRefs.current.includes(el)) {
            navItemRefs.current.push(el);
        }
    };

    const setFooterHeaderRef = (el) => {
        if (el && !footerHeaderRefs.current.includes(el)) {
            footerHeaderRefs.current.push(el);
        }
    };

    const setFooterCopyRef = (el) => {
        if (el && !footerCopyRefs.current.includes(el)) {
            footerCopyRefs.current.push(el);
        }
    };

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        document.documentElement.setAttribute("data-theme", theme);
        if (typeof window !== "undefined") {
            window.localStorage.setItem("theme", theme);
        }
    }, [theme]);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        const html = document.documentElement;
        const body = document.body;
        html.style.overflow = "";
        body.style.overflow = "";
        body.style.height = "";

        if (start) {
            start();
        }

        const navOverlay = navOverlayRef.current;
        const openLabel = openLabelRef.current;
        const closeLabel = closeLabelRef.current;
        const navItems = navItemRefs.current;
        const footerHeaders = footerHeaderRefs.current;
        const footerCopies = footerCopyRefs.current;
        const animatedItems = [
            ...navItems,
            ...footerHeaders,
            ...footerCopies,
        ].filter(Boolean);

        if (navOverlay) {
            navOverlay.style.pointerEvents = "none";
            gsap.set(navOverlay, { y: "-100%", opacity: 1 });
        }

        if (openLabel) {
            gsap.set(openLabel, { y: "0rem" });
        }
        if (closeLabel) {
            gsap.set(closeLabel, { y: "0rem" });
        }
        if (animatedItems.length) {
            gsap.set(animatedItems, {
                opacity: 0,
                y: "100%",
            });
        }

        setIsOpen(false);
        setIsAnimating(false);
    }, [location.pathname, setIsOpen, start]);

    useEffect(() => {
        const navOverlay = navOverlayRef.current;
        const openLabel = openLabelRef.current;
        const closeLabel = closeLabelRef.current;
        const navItems = navItemRefs.current;
        const footerHeaders = footerHeaderRefs.current;
        const footerCopies = footerCopyRefs.current;
        const animatedItems = [
            ...navItems,
            ...footerHeaders,
            ...footerCopies,
        ].filter(Boolean);

        if (!navOverlay || !openLabel || !closeLabel) {
            return;
        }

        if (typeof document === "undefined") {
            return;
        }

        if (isOpen) {
            setIsAnimating(true);
            navOverlay.style.pointerEvents = "all";

            if (stop) {
                stop();
            }

            const html = document.documentElement;
            const body = document.body;
            html.style.overflow = "hidden";
            body.style.overflow = "hidden";
            body.style.height = "100vh";

            gsap.to(openLabel, {
                y: "-1rem",
                duration: MOTION.duration.fast,
                ease: MOTION.ease,
            });
            gsap.to(closeLabel, {
                y: "-1rem",
                duration: MOTION.duration.fast,
                ease: MOTION.ease,
            });

            // Slide in from top
            gsap.to(navOverlay, {
                y: "0%",
                duration: MOTION.duration.slow,
                ease: MOTION.easeInOut,
                onComplete: () => setIsAnimating(false),
            });

            if (animatedItems.length) {
                gsap.to(animatedItems, {
                    opacity: 1,
                    y: "0%",
                    duration: MOTION.duration.base,
                    stagger: MOTION.stagger.base,
                    delay: 0.3,
                    ease: MOTION.ease,
                });
            }
        } else {
            setIsAnimating(true);
            navOverlay.style.pointerEvents = "none";

            const html = document.documentElement;
            const body = document.body;
            html.style.overflow = "";
            body.style.overflow = "";
            body.style.height = "";

            if (start) {
                start();
            }

            gsap.to(openLabel, {
                y: "0rem",
                duration: MOTION.duration.fast,
                ease: MOTION.ease,
            });
            gsap.to(closeLabel, {
                y: "0rem",
                duration: MOTION.duration.fast,
                ease: MOTION.ease,
            });

            // Slide out to top
            gsap.to(navOverlay, {
                y: "-100%",
                duration: MOTION.duration.slow,
                ease: MOTION.easeInOut,
                onComplete: () => setIsAnimating(false),
            });

            if (animatedItems.length) {
                gsap.to(animatedItems, {
                    opacity: 0,
                    y: "100%",
                    duration: MOTION.duration.base,
                    stagger: -MOTION.stagger.base,
                    ease: MOTION.easeIn,
                });
            }
        }
    }, [isOpen, start, stop]);

    const handleToggle = () => {
        if (!isAnimating) {
            setIsOpen(!isOpen);
        }
    };

    const handleLogoClick = () => {
        const didScroll = scrollTo ? scrollTo(0) : false;
        if (!didScroll && typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        if (isOpen) {
            setIsOpen(false);
        }
    };

    const handleThemeToggle = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    navItemRefs.current = [];
    footerHeaderRefs.current = [];
    footerCopyRefs.current = [];

    return (
        <>
            <nav>
                <div className="logo">
                    <div className="logo-container">
                        <p className="mn">
                            <Link to="/" onClick={handleLogoClick}>
                                R // Z
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="nav-controls">
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={handleThemeToggle}
                        aria-pressed={theme === "dark"}
                    >
                        <p className="mn">
                            {theme === "dark" ? "Dark" : "Light"}
                        </p>
                        <span
                            className={`theme-toggle-indicator ${
                                theme === "dark" ? "active" : ""
                            }`}
                        ></span>
                    </button>
                    <button
                        type="button"
                        className={`menu-toggle-btn ${
                            isOpen ? "menu-open" : ""
                        }`}
                        onClick={handleToggle}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        aria-controls="site-menu"
                        disabled={isAnimating}
                    >
                        <div className="menu-toggle-btn-wrapper">
                            <span className="mn open-label" ref={openLabelRef}>
                                Menu
                            </span>
                            <span
                                className="mn close-label"
                                ref={closeLabelRef}
                            >
                                Close
                            </span>
                        </div>
                    </button>
                </div>
            </nav>

            <div
                id="site-menu"
                className="nav-overlay"
                ref={navOverlayRef}
                aria-hidden={!isOpen}
            >
                <div className="nav-items">
                    <div
                        className={`nav-item ${
                            location.pathname === "/" ? "active" : ""
                        }`}
                        ref={setNavItemRef}
                    >
                        <p>
                            <Link
                                to="/"
                                onClick={handleLogoClick}
                                aria-current={
                                    location.pathname === "/"
                                        ? "page"
                                        : undefined
                                }
                            >
                                Home
                            </Link>
                        </p>
                    </div>
                    <div
                        className={`nav-item ${
                            location.pathname === "/projects" ? "active" : ""
                        }`}
                        ref={setNavItemRef}
                    >
                        <p>
                            <Link
                                to="/projects"
                                aria-current={
                                    location.pathname === "/projects"
                                        ? "page"
                                        : undefined
                                }
                            >
                                Projects
                            </Link>
                        </p>
                    </div>
                    <div
                        className={`nav-item ${
                            location.pathname === "/courses" ? "active" : ""
                        }`}
                        ref={setNavItemRef}
                    >
                        <p>
                            <Link
                                to="/courses"
                                aria-current={
                                    location.pathname === "/courses"
                                        ? "page"
                                        : undefined
                                }
                            >
                                Courses
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="nav-footer">
                    <div className="nav-footer-item">
                        <div
                            className="nav-footer-item-header"
                            ref={setFooterHeaderRef}
                        >
                            <p className="mn">Find Me</p>
                        </div>
                        <div
                            className="nav-footer-item-copy"
                            ref={setFooterCopyRef}
                        >
                            <p className="mn">
                                <a
                                    href="https://github.com/arunike"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Github
                                </a>
                            </p>
                            <p className="mn">
                                <a
                                    href="https://www.linkedin.com/in/richiezhou/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </p>
                            <p className="mn">
                                <a
                                    href={ResumePdf}
                                    download="Richie_Zhou_Resume.pdf"
                                    onClick={() =>
                                        ReactGA.event({
                                            category: "Resume",
                                            action: "download",
                                            label: "Nav Menu",
                                        })
                                    }
                                >
                                    Resume
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="nav-footer-item">
                        <div
                            className="nav-footer-item-copy"
                            ref={setFooterCopyRef}
                        >
                            <p className="mn"></p>
                        </div>
                    </div>
                    <div className="nav-footer-item">
                        <div
                            className="nav-footer-item-header"
                            ref={setFooterHeaderRef}
                        >
                            <p className="mn">Get in Touch</p>
                        </div>
                        <div
                            className="nav-footer-item-copy"
                            ref={setFooterCopyRef}
                        >
                            <p className="mn">
                                <a
                                    href="mailto:richiezhouyjz@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    richiezhouyjz@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;
