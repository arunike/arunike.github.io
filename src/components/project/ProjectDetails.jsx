const ProjectDetails = ({ title, description, tags, isExpanded, onToggle }) => {
    return (
        <div className="project-content">
            <h3 className="project-title">{title}</h3>
            {description && (
                <>
                    <div
                        className={`project-description-container ${
                            isExpanded ? "expanded" : "collapsed"
                        }`}
                    >
                        <p className="project-description">{description}</p>
                    </div>
                    {description.length > 100 && (
                        <button className="read-more-btn" onClick={onToggle}>
                            {isExpanded ? "Show Less" : "Read More"}
                        </button>
                    )}
                </>
            )}
            {tags && tags.length > 0 && (
                <div className="project-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="project-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
