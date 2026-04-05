const ProjectsFilters = ({
    tagOptions,
    selectedTag,
    onTagChange,
    searchTerm,
    onSearchChange,
    sortBy,
    onSortChange,
    onClear,
    isClearDisabled,
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
            <div className="filter-select">
                <label className="filter-label" htmlFor="projects-sort">
                    Sort by
                </label>
                <div className="projects-select-wrapper">
                    <select
                        id="projects-sort"
                        className="projects-tag-select"
                        value={sortBy}
                        onChange={(event) => onSortChange(event.target.value)}
                        aria-label="Sort projects"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="az">A → Z</option>
                        <option value="za">Z → A</option>
                    </select>
                </div>
            </div>
            <div className="filter-search">
                <label className="filter-label" htmlFor="projects-search">
                    Search projects
                </label>
                <div className="projects-search-row">
                    <input
                        id="projects-search"
                        type="search"
                        className="projects-search"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(event) => onSearchChange(event.target.value)}
                        aria-label="Search projects"
                    />
                    {!isClearDisabled && (
                        <button
                            className="projects-clear-btn"
                            onClick={onClear}
                            aria-label="Clear filters"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectsFilters;
