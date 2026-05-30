const CARD_THEMES = [
    { bg: "#ed6a5a", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
    { bg: "#f3b61f", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
    { bg: "#8ac4d0", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
    { bg: "#a1cda8", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
    { bg: "#f4a77a", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
    { bg: "#9bc1bc", ink: "#141414", muted: "rgba(20, 20, 20, 0.68)" },
];

const getProjectLink = (project) =>
    project.demoLink ||
    project.ghLink ||
    project.demoLinks?.[0] ||
    "#/projects";

const FeaturedProjectsSlider = ({ projects, stackRef, activeIndex }) => {
    return (
        <div className="featured-projects-stage">
            <div className="featured-copy-rail" aria-live="polite">
                {projects.map((project, index) => {
                    const projectLink = getProjectLink(project);

                    return (
                        <article
                            className={`featured-copy-card ${
                                index === activeIndex
                                    ? "featured-copy-card-active"
                                    : ""
                            }`}
                            key={`${project.id || index}-copy`}
                        >
                            <span className="featured-copy-index">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <p className="project-cat">{project.category}</p>
                            <h2 className="project-title">{project.title}</h2>
                            <p className="project-desc">
                                {project.description}
                            </p>
                            <div className="project-tags">
                                {project.tags.slice(0, 5).map((tag) => (
                                    <span key={tag} className="p-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="project-actions">
                                <a
                                    className="featured-project-link"
                                    href={projectLink}
                                    target={
                                        projectLink.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        projectLink.startsWith("http")
                                            ? "noreferrer"
                                            : undefined
                                    }
                                >
                                    Open Project
                                </a>
                                <a
                                    className="featured-all-projects-link"
                                    href="#/projects"
                                >
                                    View All Projects
                                </a>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div
                className="featured-projects-slider"
                ref={stackRef}
                aria-label="Featured project card stack"
            >
                {projects.map((project, index) => (
                    <article
                        className={`project-slide fan-project-card ${
                            index === activeIndex
                                ? "fan-project-card-active"
                                : ""
                        }`}
                        key={project.id || index}
                        style={{
                            "--card-color":
                                CARD_THEMES[index % CARD_THEMES.length].bg,
                            "--card-ink":
                                CARD_THEMES[index % CARD_THEMES.length].ink,
                            "--card-muted":
                                CARD_THEMES[index % CARD_THEMES.length].muted,
                            "--card-index": index,
                        }}
                    >
                        <div className="fan-card-topline">
                            <span>{String(index + 1).padStart(2, "0")}</span>
                            <span>{project.category}</span>
                        </div>
                        <div className="fan-card-media">
                            <img
                                src={project.image}
                                alt={`${project.title} preview`}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding="async"
                            />
                        </div>
                        <div className="fan-card-body">
                            <h3>{project.title}</h3>
                            <p>{project.tags.slice(0, 3).join(" / ")}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProjectsSlider;
