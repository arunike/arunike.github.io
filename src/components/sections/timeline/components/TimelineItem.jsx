import { useState } from "react";
import { getMonthsWorkedLabel } from "./timelineData";

const FlipHint = ({ label }) => (
    <div className="timeline-flip-hint" aria-hidden="true">
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
        {label}
    </div>
);

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
            data-experience-key={exp.timelineKey}
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
                        "--exp-color": expColor,
                        "--exp-bg-gradient": `linear-gradient(135deg, ${expColor}08 0%, ${expColor}18 100%)`,
                    }}
                >
                    <div
                        role="button"
                        tabIndex={0}
                        className={`timeline-card-flip ${isFlipped ? "flipped" : ""}`}
                        onClick={handleToggle}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                handleToggle();
                            }
                        }}
                        aria-expanded={isFlipped}
                        aria-label={`${isFlipped ? "Hide" : "Show"} ${exp.company} summary`}
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
                                    <h3 className="timeline-role">
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

                            <div className="timeline-department">
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
                                <span
                                    className={`hint-text hint-front ${isFlipped ? "hidden" : ""}`}
                                >
                                    Tap for summary{" "}
                                    <span className="arrow">→</span>
                                </span>
                                <span
                                    className={`hint-text hint-back ${isFlipped ? "active" : ""}`}
                                >
                                    <span className="arrow">↑</span> Collapse
                                </span>
                            </div>
                            <FlipHint label="Click to see summary" />
                        </div>

                        <div className="timeline-card-face timeline-card-back">
                            <div className="timeline-card-back-inner">
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
                                        <h3 className="timeline-role">
                                            {exp.role}
                                        </h3>
                                        <h4 className="timeline-company">
                                            {exp.company}
                                        </h4>
                                    </div>
                                </div>

                                <div className="timeline-summary">
                                    <span className="timeline-summary-label">
                                        Summary
                                    </span>
                                    <p>{exp.summary}</p>
                                </div>

                                <div className="timeline-tech-stack">
                                    {exp.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="timeline-tech-tag"
                                            style={{
                                                backgroundColor: `${expColor}20`,
                                                borderColor: `${expColor}40`,
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <FlipHint label="Click to flip back" />
                            </div>
                        </div>
                    </div>
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
