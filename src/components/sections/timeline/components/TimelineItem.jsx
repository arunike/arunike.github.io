import { useState } from "react";

const MONTHS = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

const parseMonthYear = (value) => {
    const match = value.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
    if (!match) return null;

    const month = MONTHS[match[1].toLowerCase()];
    const year = Number(match[2]);

    if (month === undefined || Number.isNaN(year)) return null;

    return { month, year };
};

const getMonthsWorkedLabel = (duration) => {
    const [startValue, endValue] = duration.split(/\s+-\s+/);
    const start = parseMonthYear(startValue || "");
    const end =
        endValue?.toLowerCase() === "present"
            ? {
                  month: new Date().getMonth(),
                  year: new Date().getFullYear(),
              }
            : parseMonthYear(endValue || "");

    if (!start || !end) return null;

    const months = (end.year - start.year) * 12 + end.month - start.month + 1;
    if (months <= 0) return null;

    return months === 1 ? "1 month" : `${months} months`;
};

const TimelineItem = ({
    exp,
    expColor,
    positionClass,
    addToRefs,
    isMostRecent,
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const monthsWorkedLabel = getMonthsWorkedLabel(exp.duration);

    const handleToggle = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <div
            key={exp.id}
            ref={addToRefs}
            data-experience-id={exp.id}
            className={`timeline-item ${positionClass} ${
                isMostRecent ? "timeline-item-most-recent" : ""
            }`}
        >
            <div className="timeline-content">
                <div
                    className={`timeline-card ${
                        isMostRecent ? "timeline-card-most-recent" : ""
                    }`}
                    style={{
                        borderLeft: `4px solid ${expColor}`,
                        background: `linear-gradient(135deg, ${expColor}08 0%, ${expColor}18 100%)`,
                    }}
                >
                    <button
                        type="button"
                        className={`timeline-card-flip ${isFlipped ? "flipped" : ""}`}
                        onClick={handleToggle}
                        aria-expanded={isFlipped}
                        aria-label="Toggle experience details"
                    >
                        <div className="timeline-card-face timeline-card-front">
                            <div className="timeline-company-header">
                                <div className="timeline-company-logo">
                                    <img
                                        src={exp.logo}
                                        alt={exp.company}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="timeline-company-info">
                                    <h3
                                        className="timeline-role"
                                        style={{ color: expColor }}
                                    >
                                        {exp.role}
                                    </h3>
                                    <h4 className="timeline-company">
                                        {exp.company}
                                    </h4>
                                </div>
                                {exp.duration
                                    .toLowerCase()
                                    .includes("present") && (
                                    <span className="timeline-active-badge">
                                        Current
                                    </span>
                                )}
                            </div>

                            <div
                                className="timeline-department"
                                style={{ borderLeftColor: expColor }}
                            >
                                {exp.department}
                            </div>

                            <div className="timeline-meta">
                                <span className="timeline-location">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {exp.location}
                                </span>
                                <span className="timeline-duration">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    {exp.duration}
                                </span>
                                {monthsWorkedLabel && (
                                    <span className="timeline-months-worked">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <circle cx="12" cy="12" r="9" />
                                            <path d="M12 7v5l3 2" />
                                        </svg>
                                        {monthsWorkedLabel}
                                    </span>
                                )}
                            </div>
                            <div className="timeline-tap-hint">
                                {isFlipped ? "↑ Collapse" : "Tap for details →"}
                            </div>
                        </div>

                        <div className="timeline-card-face timeline-card-back">
                            <div className="timeline-company-header">
                                <div className="timeline-company-logo">
                                    <img
                                        src={exp.logo}
                                        alt={exp.company}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="timeline-company-info">
                                    <h3
                                        className="timeline-role"
                                        style={{ color: expColor }}
                                    >
                                        {exp.role}
                                    </h3>
                                    <h4 className="timeline-company">
                                        {exp.company}
                                    </h4>
                                </div>
                            </div>

                            <div className="timeline-achievements">
                                {exp.achievements.map((achievement, idx) => (
                                    <p key={idx}>{achievement}</p>
                                ))}
                            </div>

                            <div className="timeline-tech-stack">
                                {exp.technologies.map((tech, idx) => (
                                    <span
                                        key={idx}
                                        className="timeline-tech-tag"
                                        style={{
                                            backgroundColor: `${expColor}20`,
                                            color: expColor,
                                            borderColor: `${expColor}40`,
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="timeline-dot" style={{ borderColor: expColor }}>
                {isMostRecent && (
                    <span className="timeline-dot-label">Latest</span>
                )}
                <div
                    className="timeline-dot-inner"
                    style={{ backgroundColor: expColor }}
                ></div>
            </div>
        </div>
    );
};

export default TimelineItem;
