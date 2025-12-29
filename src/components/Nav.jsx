import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

const Nav = ({ isOpen, setIsOpen }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        html.style.overflow = "";
        body.style.overflow = "";
        body.style.height = "";

        // Restart Lenis if it was stopped
        if (window.lenis) {
            window.lenis.start();
        }

        const navOverlay = document.querySelector(".nav-overlay");
        const openLabel = document.querySelector(".open-label");
        const closeLabel = document.querySelector(".close-label");
        const navItems = document.querySelectorAll(".nav-item");

        if (navOverlay) {
            navOverlay.style.pointerEvents = "none";
            gsap.set(navOverlay, { y: "-100%", opacity: 1 });
        }

        // Reset menu UI
        gsap.set(openLabel, { y: "0rem" });
        gsap.set(closeLabel, { y: "0rem" });

        gsap.set(
            [navItems, ".nav-footer-item-header", ".nav-footer-item-copy"],
            {
                opacity: 0,
                y: "100%",
            }
        );

        setIsOpen(false);
        setIsAnimating(false);
    }, [location.pathname, setIsOpen]);

    useEffect(() => {
        const navOverlay = document.querySelector(".nav-overlay");
        const openLabel = document.querySelector(".open-label");
        const closeLabel = document.querySelector(".close-label");
        const navItems = document.querySelectorAll(".nav-item");

        if (isOpen) {
            // OPENING
            setIsAnimating(true);
            navOverlay.style.pointerEvents = "all";

            // Prevent scrolling
            if (window.lenis) window.lenis.stop();

            const html = document.documentElement;
            const body = document.body;
            html.style.overflow = "hidden";
            body.style.overflow = "hidden";
            body.style.height = "100vh";

            gsap.to(openLabel, { y: "-1rem", duration: 0.3 });
            gsap.to(closeLabel, { y: "-1rem", duration: 0.3 });

            // Slide in from top
            gsap.to(navOverlay, {
                y: "0%",
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => setIsAnimating(false),
            });

            gsap.to(
                [navItems, ".nav-footer-item-header", ".nav-footer-item-copy"],
                {
                    opacity: 1,
                    y: "0%",
                    duration: 0.75,
                    stagger: 0.075,
                    delay: 0.3,
                    ease: "power4.out",
                }
            );
        } else {
            // CLOSING
            setIsAnimating(true);
            navOverlay.style.pointerEvents = "none";

            const html = document.documentElement;
            const body = document.body;
            html.style.overflow = "";
            body.style.overflow = "";
            body.style.height = "";

            if (window.lenis) window.lenis.start();

            gsap.to(openLabel, { y: "0rem", duration: 0.3 });
            gsap.to(closeLabel, { y: "0rem", duration: 0.3 });

            // Slide out to top
            gsap.to(navOverlay, {
                y: "-100%",
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => setIsAnimating(false),
            });

            gsap.to(
                [navItems, ".nav-footer-item-header", ".nav-footer-item-copy"],
                {
                    opacity: 0,
                    y: "100%",
                    duration: 0.6,
                    stagger: -0.075,
                    ease: "power4.in",
                }
            );
        }
    }, [isOpen]);

    const handleToggle = () => {
        if (!isAnimating) {
            setIsOpen(!isOpen);
        }
    };

    const handleLogoClick = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0);
        } else {
            window.scrollTo(0, 0);
        }

        if (isOpen) {
            setIsOpen(false);
        }
    };

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
                <div
                    className={`menu-toggle-btn ${isOpen ? "menu-open" : ""}`}
                    onClick={handleToggle}
                >
                    <div className="menu-toggle-btn-wrapper">
                        <p className="mn open-label">Menu</p>
                        <p className="mn close-label">Close</p>
                    </div>
                </div>
            </nav>

            <div className="nav-overlay">
                <div className="nav-items">
                    <div
                        className={`nav-item ${
                            location.pathname === "/" ? "active" : ""
                        }`}
                    >
                        <p>
                            <Link to="/" onClick={handleLogoClick}>
                                Home
                            </Link>
                        </p>
                    </div>
                    <div
                        className={`nav-item ${
                            location.pathname === "/projects" ? "active" : ""
                        }`}
                    >
                        <p>
                            <Link to="/projects">Projects</Link>
                        </p>
                    </div>
                    <div
                        className={`nav-item ${
                            location.pathname === "/courses" ? "active" : ""
                        }`}
                    >
                        <p>
                            <Link to="/courses">Courses</Link>
                        </p>
                    </div>
                </div>
                <div className="nav-footer">
                    <div className="nav-footer-item">
                        <div className="nav-footer-item-header">
                            <p className="mn">Find Me</p>
                        </div>
                        <div className="nav-footer-item-copy">
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
                        </div>
                    </div>
                    <div className="nav-footer-item">
                        <div className="nav-footer-item-copy">
                            <p className="mn"></p>
                        </div>
                    </div>
                    <div className="nav-footer-item">
                        <div className="nav-footer-item-header">
                            <p className="mn">Get in Touch</p>
                        </div>
                        <div className="nav-footer-item-copy">
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
