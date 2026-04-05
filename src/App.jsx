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

const Home = lazy(() => import("./pages/Home"));
const CourseTaken = lazy(() => import("./pages/courses/CourseTaken"));
const Projects = lazy(() => import("./pages/projects/Projects"));

gsap.registerPlugin(ScrollTrigger);

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

        if (isMenuOpen) {
            gsap.to(pageContent, {
                y: "100vh",
                duration: 1,
                ease: "power4.inOut",
            });
        } else {
            gsap.to(pageContent, {
                y: "0px",
                duration: 1,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.set(pageContent, { clearProps: "transform" });
                },
            });
        }
    }, [isMenuOpen]);

    return (
        <Router>
            <ScrollToTop start={start} scrollTo={scrollTo} />
            <AnalyticsTracker />
            <Nav
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
                scrollTo={scrollTo}
                start={start}
                stop={stop}
            />
            <Transition onComplete={handleTransitionComplete} />
            <SectionNav scrollTo={scrollTo} loaded={loaded} />
            <BackToTop scrollTo={scrollTo} />

            <div
                className="page-content"
                style={{
                    position: "relative",
                    width: "100%",
                }}
            >
                <ErrorBoundary>
                    <Suspense fallback={null}>
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
            </div>
        </Router>
    );
}

export default App;
