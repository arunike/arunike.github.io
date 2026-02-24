import { useState } from "react";

const TimelineItem = ({ exp, expColor, positionClass, addToRefs }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleToggle = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <div
            key={exp.id}
            ref={addToRefs}
            className={`timeline-item ${positionClass}`}
        >
            <div className="timeline-content">
                <div
                    className="timeline-card"
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
                <div
                    className="timeline-dot-inner"
                    style={{ backgroundColor: expColor }}
                ></div>
            </div>
        </div>
    );
};

export default TimelineItem;
