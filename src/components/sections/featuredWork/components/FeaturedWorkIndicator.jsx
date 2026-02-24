const FeaturedWorkIndicator = ({ total, progress }) => {
    return (
        <div className="featured-work-indicator">
            {Array.from({ length: total }).map((_, index) => {
                const totalScrollDistance = total - 1 || 1;
                const threshold = (index / totalScrollDistance) * 100;
                const isNumActive = progress >= threshold;

                return (
                    <div key={index} className="indicator-group-vertical">
                        <span
                            className={`indicator-num ${
                                isNumActive ? "active" : ""
                            }`}
                        >
                            {`0${index + 1}`}
                        </span>
                        {index < total - 1 &&
                            [...Array(6)].map((__, i) => {
                                const totalLinesPerSection = 6;
                                const sectionStart =
                                    (index / totalScrollDistance) * 100;
                                const sectionEnd =
                                    ((index + 1) / totalScrollDistance) * 100;
                                const lineStep =
                                    (sectionEnd - sectionStart) /
                                    totalLinesPerSection;
                                const lineThreshold =
                                    sectionStart + i * lineStep;

                                const isActive = progress > lineThreshold;

                                return (
                                    <div
                                        key={i}
                                        className="i-line"
                                        style={{
                                            opacity: isActive ? 1 : 0.2,
                                        }}
                                    ></div>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
};

export default FeaturedWorkIndicator;
