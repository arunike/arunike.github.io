import TimelineItem from "./TimelineItem";

const TimelineTrack = ({
    experiences,
    experienceColors,
    addToRefs,
    mostRecentExperienceId,
}) => {
    return (
        <div className="timeline-track">
            <div className="timeline-line"></div>

            {experiences.map((exp, index) => {
                const expColor = experienceColors[exp.id] || "#000000";

                const positionClass = exp.position
                    ? `timeline-${exp.position}`
                    : index % 2 === 0
                      ? "timeline-top"
                      : "timeline-bottom";

                return (
                    <TimelineItem
                        key={exp.id}
                        exp={exp}
                        expColor={expColor}
                        positionClass={positionClass}
                        addToRefs={addToRefs}
                        isMostRecent={exp.id === mostRecentExperienceId}
                    />
                );
            })}
        </div>
    );
};

export default TimelineTrack;
