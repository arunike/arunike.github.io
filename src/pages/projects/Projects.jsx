import { useEffect, useRef } from "react";
import ProjectCard from "../../components/ProjectCard";
import Footer from "../../components/sections/footer/Footer";

import { projects } from "./components/projectsData";
import { FaGithubAlt } from "react-icons/fa";

const Projects = () => {
    const headerRef = useRef(null);

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
                                    {projects.length}
                                </span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {
                                        new Set(projects.flatMap((p) => p.tags))
                                            .size
                                    }
                                </span>
                                <span className="stat-label">Technologies</span>
                            </div>
                        </div>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                imgPath={project.image}
                                title={project.title}
                                description={project.description}
                                ghLink={project.ghLink}
                                demoLink={project.demoLink}
                                demoLinks={project.demoLinks}
                                tags={project.tags}
                            />
                        ))}
                    </div>

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
