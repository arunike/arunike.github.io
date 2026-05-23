import { useRef, useEffect, useState } from "react";
import ProjectDetails from "./project/ProjectDetails";
import ProjectMedia from "./project/ProjectMedia";

const ProjectCard = ({
    imgPath,
    title,
    description,
    ghLink,
    demoLink,
    demoLinks,
    tags,
    index = 0,
}) => {
    const cardRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const buttonRef = useRef(null);
    const [dropdownPosition, setDropdownPosition] = useState({
        top: 0,
        left: 0,
    });
    const closeTimeoutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("project-card-animated");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const currentCard = cardRef.current;
        if (currentCard) {
            observer.observe(currentCard);
        }

        return () => {
            if (currentCard) {
                observer.unobserve(currentCard);
            }
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isDropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
            });
        }
    }, [isDropdownOpen]);

    const handleMouseEnter = () => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setIsDropdownOpen(false);
        }, 200);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handlePointerMove = (event) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = x / rect.width - 0.5;
        const centerY = y / rect.height - 0.5;

        card.style.setProperty("--tilt-x", `${centerY * -5}deg`);
        card.style.setProperty("--tilt-y", `${centerX * 6}deg`);
        card.style.setProperty("--media-shift-x", `${centerX * 10}px`);
        card.style.setProperty("--media-shift-y", `${centerY * 10}px`);
    };

    const handlePointerLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--media-shift-x", "0px");
        card.style.setProperty("--media-shift-y", "0px");
    };

    return (
        <div
            className="project-card"
            ref={cardRef}
            style={{ "--stagger-delay": `${Math.min(index * 70, 490)}ms` }}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <div
                className={`project-card-inner ${
                    isDropdownOpen ? "dropdown-open" : ""
                }`}
            >
                <ProjectMedia
                    imgPath={imgPath}
                    title={title}
                    ghLink={ghLink}
                    demoLink={demoLink}
                    demoLinks={demoLinks}
                    isDropdownOpen={isDropdownOpen}
                    dropdownPosition={dropdownPosition}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onToggleDropdown={handleToggleDropdown}
                    buttonRef={buttonRef}
                />
                <ProjectDetails
                    title={title}
                    description={description}
                    tags={tags}
                    isExpanded={isExpanded}
                    onToggle={() => setIsExpanded((prev) => !prev)}
                />
            </div>
        </div>
    );
};

export default ProjectCard;
