const ProjectsFilters = ({
    tagOptions,
    selectedTag,
    onTagChange,
    searchTerm,
    onSearchChange,
}) => {
    return (
        <div className="projects-filters">
            <div className="filter-select">
                <label className="filter-label" htmlFor="projects-tag-filter">
                    Filter by tech
                </label>
                <div className="projects-select-wrapper">
                    <select
                        id="projects-tag-filter"
                        className="projects-tag-select"
                        value={selectedTag}
                        onChange={(event) => onTagChange(event.target.value)}
                        aria-label="Filter projects by technology"
                    >
                        {tagOptions.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="filter-search">
                <label className="filter-label" htmlFor="projects-search">
                    Search projects
                </label>
                <input
                    id="projects-search"
                    type="search"
                    className="projects-search"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    aria-label="Search projects"
                />
            </div>
        </div>
    );
};

export default ProjectsFilters;
