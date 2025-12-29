import {
    HashRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Transition from "./components/Transition";
import Home from "./pages/Home";
import CourseTaken from "./pages/courses/CourseTaken";
import Projects from "./pages/projects/Projects";
import useSmoothScroll from "./hooks/useSmoothScroll";
import AnalyticsTracker from "./components/AnalyticsTracker";
import Nav from "./components/Nav";

// CSS
import "./css/transition.css";
import "./css/fonts.css";
import "./css/globals.css";
import "./css/menu.css";
import "./css/home.css";
import "./css/section-nav.css";

// Sections CSS
import "./css/sections/about.css";
import "./css/sections/skills.css";
import "./css/sections/timeline.css";
import "./css/sections/contact.css";
import "./css/sections/footer.css";
import "./css/sections/featured-work.css";
import "./css/sections/expertise.css";

// Pages CSS
import "./css/pages/projects.css";
import "./css/pages/courses.css";

function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        html.style.position = "";
        html.style.overflow = "";
        html.style.height = "";

        body.style.position = "";
        body.style.top = "";
        body.style.width = "";
        body.style.overflow = "";
        body.style.height = "";

        // Force Lenis to restart
        if (window.lenis) {
            window.lenis.start();
            // Force scroll to top
            requestAnimationFrame(() => {
                window.lenis.scrollTo(0, {
                    immediate: true,
                    force: true,
                    lock: true,
                });
            });
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname]);

    return null;
}

function App() {
    useSmoothScroll();
    const [loaded, setLoaded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTransitionComplete = useCallback(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded && !isMenuOpen) {
            document.body.style.overflow = "auto";
            if (window.lenis) window.lenis.start();
        } else if (isMenuOpen) {
            // Let Nav handle scroll locking or do it here.
            // Nav currently handles it.
            // But we might want to coordinate.
            // Leaving it to Nav for now as per previous logic, but Nav affects body style.
        } else {
            document.body.style.overflow = "hidden";
            if (window.lenis) window.lenis.stop();
        }
    }, [loaded, isMenuOpen]);

    // Push Page Down Animation
    useEffect(() => {
        const pageContent = document.querySelector(".page-content");
        if (!pageContent) return;

        if (isMenuOpen) {
            // Push down
            import("gsap").then(({ default: gsap }) => {
                gsap.to(pageContent, {
                    y: "100vh",
                    duration: 1,
                    ease: "power4.inOut",
                });
            });
        } else {
            // Pull up
            import("gsap").then(({ default: gsap }) => {
                gsap.to(pageContent, {
                    y: "0px",
                    duration: 1,
                    ease: "power4.inOut",
                    onComplete: () => {
                        gsap.set(pageContent, { clearProps: "transform" });
                    },
                });
            });
        }
    }, [isMenuOpen]);

    return (
        <Router>
            <ScrollToTop />
            <AnalyticsTracker />
            <Nav isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
            <Transition onComplete={handleTransitionComplete} />

            <div
                className="page-content"
                style={{
                    position: "relative",
                    width: "100%",
                }}
            >
                <Routes>
                    <Route path="/" element={<Home loaded={loaded} />} />
                    <Route path="/courses" element={<CourseTaken />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
