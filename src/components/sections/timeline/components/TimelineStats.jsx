import useCountUp from "../../../../hooks/useCountUp";

const StatNumber = ({ value }) => {
    const [count, ref] = useCountUp(value, 1200);
    return (
        <span className="timeline-stat-number" ref={ref}>
            {count}
        </span>
    );
};

const TimelineStats = ({ stats }) => {
    return (
        <div className="timeline-stats">
            <div className="timeline-stat-item">
                <StatNumber value={stats.activeCount} />
                <span className="timeline-stat-label">Experiences</span>
            </div>
            <div className="timeline-stat-item">
                <StatNumber value={stats.techCount} />
                <span className="timeline-stat-label">Technologies</span>
            </div>
            <div className="timeline-stat-item">
                <StatNumber value={stats.locationCount} />
                <span className="timeline-stat-label">Cities</span>
            </div>
        </div>
    );
};

export default TimelineStats;
