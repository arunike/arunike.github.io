import TimelineItem from "./TimelineItem";

const TimelineTrack = ({
    experiences,
    experienceColors,
    addToRefs,
    latestExperienceKey,
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
                        key={exp.timelineKey}
                        exp={exp}
                        expColor={expColor}
                        positionClass={positionClass}
                        addToRefs={addToRefs}
                        isMostRecent={exp.timelineKey === latestExperienceKey}
                    />
                );
            })}
        </div>
    );
};

export default TimelineTrack;
