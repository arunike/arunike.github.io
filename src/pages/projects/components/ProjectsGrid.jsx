import ProjectCard from "../../../components/ProjectCard";
import ErrorBoundary from "../../../components/ErrorBoundary";

const ProjectsGrid = ({ projects }) => {
    if (!projects.length) {
        return (
            <div className="projects-empty">
                <p>No projects match that filter yet.</p>
            </div>
        );
    }

    return (
        <div className="projects-grid">
            {projects.map((project) => (
                <ErrorBoundary key={project.id}>
                    <ProjectCard
                        imgPath={project.image}
                        title={project.title}
                        description={project.description}
                        ghLink={project.ghLink}
                        demoLink={project.demoLink}
                        demoLinks={project.demoLinks}
                        tags={project.tags}
                    />
                </ErrorBoundary>
            ))}
        </div>
    );
};

export default ProjectsGrid;
