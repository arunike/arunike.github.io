import "../../css/pages/projects.css";

import { useEffect, useMemo, useRef, useState } from "react";
import Footer from "../../components/sections/footer/Footer";

import { projects } from "./components/projectsData";
import { FaGithubAlt } from "react-icons/fa";
import ProjectsFilters from "./components/ProjectsFilters";
import ProjectsGrid from "./components/ProjectsGrid";

const Projects = () => {
    const headerRef = useRef(null);
    const [selectedTag, setSelectedTag] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const tagOptions = useMemo(() => {
        const tags = new Set(projects.flatMap((project) => project.tags));
        return ["All", ...Array.from(tags).sort()];
    }, []);

    const totalTechnologies = useMemo(() => {
        return new Set(projects.flatMap((project) => project.tags)).size;
    }, []);

    const filteredProjects = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const normalizedTag = selectedTag.trim() || "All";
        return projects.filter((project) => {
            const tagMatch =
                normalizedTag === "All" || project.tags.includes(normalizedTag);
            if (!tagMatch) {
                return false;
            }

            if (!normalizedSearch) {
                return true;
            }

            const searchableText = [
                project.title,
                project.description,
                project.category,
                project.tags.join(" "),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(normalizedSearch);
        });
    }, [selectedTag, searchTerm]);

    const handleClearFilters = () => {
        setSelectedTag("All");
        setSearchTerm("");
    };

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.add("projects-header-animated");
        }
    }, []);

    return (
        <div className="page projects-page">
            <section className="projects-section">
                <div className="projects-container">
                    <div className="projects-header" ref={headerRef}>
                        <h1 className="projects-heading">My Projects</h1>
                        <p className="projects-subtitle">
                            A collection of my work spanning apps, websites,
                            mobile, games, and computer graphics developments.
                        </p>
                        <div className="projects-stats">
                            <div className="stat-item">
                                <span className="stat-number">
                                    {filteredProjects.length}
                                </span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {totalTechnologies}
                                </span>
                                <span className="stat-label">Technologies</span>
                            </div>
                        </div>
                    </div>

                    <ProjectsFilters
                        tagOptions={tagOptions}
                        selectedTag={selectedTag}
                        onTagChange={setSelectedTag}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onClear={handleClearFilters}
                        isClearDisabled={
                            selectedTag === "All" && !searchTerm.trim()
                        }
                    />

                    <ProjectsGrid projects={filteredProjects} />

                    <div className="github-cta">
                        <p>Check out my GitHub for more projects</p>
                        <a
                            href="https://github.com/arunike?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-button"
                        >
                            <FaGithubAlt size={20} />
                            <span>Visit GitHub</span>
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Projects;
