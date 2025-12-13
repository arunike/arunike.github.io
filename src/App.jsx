import {
    HashRouter as Router,
    Routes,
    Route,
    useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Transition from "./components/Transition";
import Home from "./pages/Home";
import CourseTaken from "./pages/CourseTaken";
import Projects from "./pages/Projects";
import useSmoothScroll from "./hooks/useSmoothScroll";
import "./css/transition.css";
import "./css/fonts.css";
import "./css/globals.css";
import "./css/menu.css";
import "./css/home.css";
import "./css/about.css";
import "./css/work.css";
import "./css/skills.css";
import "./css/timeline.css";
import "./css/projects.css";
import "./css/contact.css";
import "./css/footer.css";
import "./css/section-nav.css";

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

    return (
        <Router>
            <ScrollToTop />
            <Transition />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseTaken />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </Router>
    );
}

export default App;
