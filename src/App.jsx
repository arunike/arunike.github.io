import {
    HashRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import {
    useEffect,
    useState,
    useCallback,
    useRef,
    lazy,
    Suspense,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Transition from "./components/Transition";
import useSmoothScroll from "./hooks/useSmoothScroll";
import AnalyticsTracker from "./components/AnalyticsTracker";
import Nav from "./components/Nav";
import SectionNav from "./components/SectionNav";
import BackToTop from "./components/BackToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { MOTION } from "./utils/motion";
import { prefersReducedMotion } from "./utils/prefersReducedMotion";
import { sweepMissedReveals } from "./utils/revealOnScroll";

const Home = lazy(() => import("./pages/Home"));
const CourseTaken = lazy(() => import("./pages/courses/CourseTaken"));
const Projects = lazy(() => import("./pages/projects/Projects"));

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

function MissedRevealSweeper() {
    const location = useLocation();

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        let frame = null;
        let settled = false;

        const detach = () => {
            window.removeEventListener("scroll", handleScroll);
        };

        const run = () => {
            frame = null;
            const { seen, pending } = sweepMissedReveals();

            if (seen > 0 && pending === 0) {
                settled = true;
                detach();
            }
        };

        function handleScroll() {
            if (settled || frame !== null) {
                return;
            }
            frame = window.requestAnimationFrame(run);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            if (frame !== null) {
                window.cancelAnimationFrame(frame);
            }
            detach();
        };
    }, [location.pathname]);

    return null;
}

function PinMeasurementGuard() {
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const refresh = () => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh();
        };

        let frame = null;
        const scheduleRefresh = () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                refresh();
            });
        };

        // Webfonts reflow every heading on this page, which changes section
        // heights well after the mount-time refreshes have run.
        let cancelled = false;
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
                if (!cancelled) refresh();
            });
        }

        window.addEventListener("load", refresh);

        // Catches late images and anything else that changes document height.
        let lastHeight = document.documentElement.scrollHeight;
        const observer = new ResizeObserver(() => {
            const next = document.documentElement.scrollHeight;
            if (Math.abs(next - lastHeight) > 4) {
                lastHeight = next;
                scheduleRefresh();
            }
        });
        observer.observe(document.body);

        return () => {
            cancelled = true;
            if (frame !== null) window.cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("load", refresh);
        };
    }, []);

    return null;
}

// Global CSS
import "./css/transition.css";
import "./css/fonts.css";
import "./css/globals.css";
import "./css/menu.css";
import "./css/sections/footer.css";
import "./css/section-nav.css";

function ScrollToTop({ start, scrollTo }) {
    const location = useLocation();
    const prevPathnameRef = useRef(location.pathname);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

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

        const prevPathname = prevPathnameRef.current;
        prevPathnameRef.current = location.pathname;

        if (prevPathname === "/" && location.pathname !== "/") {
            ScrollTrigger.getAll().forEach((t) => t.kill(true));
            ScrollTrigger.clearScrollMemory();
        }

        if (start) {
            start();
        }

        const didScroll = scrollTo
            ? scrollTo(0, {
                  immediate: true,
                  force: true,
                  lock: true,
              })
            : false;

        if (!didScroll && typeof window !== "undefined") {
            window.scrollTo(0, 0);
        }

        const refresh = () => {
            ScrollTrigger.sort();
            ScrollTrigger.refresh(true);
        };

        const rafId = requestAnimationFrame(refresh);
        const timeoutId = setTimeout(refresh, 300);
        const timeoutId2 = setTimeout(refresh, 900);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(timeoutId);
            clearTimeout(timeoutId2);
        };
    }, [location.pathname, start, scrollTo]);

    return null;
}

function TransitionManager({ onIntroComplete }) {
    const location = useLocation();
    const [transition, setTransition] = useState({ mode: "intro", key: 0 });
    const prevPathnameRef = useRef(location.pathname);

    useEffect(() => {
        if (prevPathnameRef.current === location.pathname) {
            return;
        }

        prevPathnameRef.current = location.pathname;
        setTransition((prev) => ({ mode: "route", key: prev.key + 1 }));
    }, [location.pathname]);

    return (
        <Transition
            key={transition.key}
            mode={transition.mode}
            onComplete={onIntroComplete}
        />
    );
}

function RouteFallback() {
    return (
        <div className="route-fallback" role="status" aria-live="polite">
            <p>Loading</p>
        </div>
    );
}

function App() {
    const { start, stop, scrollTo } = useSmoothScroll();
    const [loaded, setLoaded] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTransitionComplete = useCallback(() => {
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        if (loaded && !isMenuOpen) {
            document.body.style.overflow = "auto";
            if (start) {
                start();
            }
        } else {
            document.body.style.overflow = "hidden";
            if (stop) {
                stop();
            }
        }
    }, [loaded, isMenuOpen, start, stop]);

    // Push Page Down Animation
    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        const pageContent = document.querySelector(".page-content");
        if (!pageContent) return;

        if (prefersReducedMotion()) {
            if (isMenuOpen) {
                gsap.set(pageContent, { y: "100vh" });
            } else {
                gsap.set(pageContent, { clearProps: "transform" });
            }
            return;
        }

        if (isMenuOpen) {
            gsap.to(pageContent, {
                y: "100vh",
                duration: MOTION.duration.slow,
                ease: MOTION.easeInOut,
            });
        } else {
            gsap.to(pageContent, {
                y: "0px",
                duration: MOTION.duration.slow,
                ease: MOTION.easeInOut,
                onComplete: () => {
                    gsap.set(pageContent, { clearProps: "transform" });
                },
            });
        }
    }, [isMenuOpen]);

    return (
        <Router>
            <a className="skip-link" href="#main-content">
                Skip to content
            </a>
            <ScrollToTop start={start} scrollTo={scrollTo} />
            <PinMeasurementGuard />
            <MissedRevealSweeper />
            <AnalyticsTracker />
            <Nav
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                scrollTo={scrollTo}
                start={start}
                stop={stop}
            />
            <TransitionManager onIntroComplete={handleTransitionComplete} />
            <SectionNav
                scrollTo={scrollTo}
                loaded={loaded}
                isMenuOpen={isMenuOpen}
            />
            <BackToTop scrollTo={scrollTo} />

            <main
                id="main-content"
                className="page-content"
                tabIndex="-1"
                style={{
                    position: "relative",
                    width: "100%",
                }}
            >
                <ErrorBoundary>
                    <Suspense fallback={<RouteFallback />}>
                        <Routes>
                            <Route
                                path="/"
                                element={<Home loaded={loaded} />}
                            />
                            <Route path="/courses" element={<CourseTaken />} />
                            <Route path="/projects" element={<Projects />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>
        </Router>
    );
}

export default App;
