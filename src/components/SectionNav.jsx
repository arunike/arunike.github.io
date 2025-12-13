import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

const SectionNav = () => {
    const [activeSection, setActiveSection] = useState("");
    const location = useLocation();

    const sections = useMemo(
        () => [
            { id: "hero", label: "Home" },
            { id: "about-hero", label: "About" },
            { id: "featured-work", label: "Projects" },
            { id: "services-header", label: "Services" },
            { id: "skills", label: "Skills" },
            { id: "timeline", label: "Timeline" },
            { id: "contact", label: "Contact" },
        ],
        []
    );

    useEffect(() => {
        if (location.pathname !== "/") {
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
            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [sections, location.pathname]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    if (location.pathname !== "/") {
        return null;
    }

    return (
        <nav className="section-nav">
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
