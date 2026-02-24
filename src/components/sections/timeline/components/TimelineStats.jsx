const TimelineStats = ({ stats }) => {
    return (
        <div className="timeline-stats">
            <div className="timeline-stat-item">
                <span className="timeline-stat-number">
                    {stats.activeCount}
                </span>
                <span className="timeline-stat-label">Experiences</span>
            </div>
            <div className="timeline-stat-item">
                <span className="timeline-stat-number">{stats.techCount}</span>
                <span className="timeline-stat-label">Technologies</span>
            </div>
            <div className="timeline-stat-item">
                <span className="timeline-stat-number">
                    {stats.locationCount}
                </span>
                <span className="timeline-stat-label">Cities</span>
            </div>
        </div>
    );
};

export default TimelineStats;
