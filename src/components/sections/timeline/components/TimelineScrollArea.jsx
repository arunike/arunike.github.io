const TimelineScrollArea = ({
    showLeftFade,
    showRightFade,
    onScrollBy,
    scrollContainerRef,
    onScroll,
    children,
}) => {
    return (
        <div className="timeline-scroll-wrapper">
            <button
                className={`timeline-fade-left ${showLeftFade ? "visible" : ""}`}
                onClick={() => onScrollBy(-300)}
                type="button"
                aria-label="Scroll timeline left"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button
                className={`timeline-fade-right ${showRightFade ? "visible" : ""}`}
                onClick={() => onScrollBy(300)}
                type="button"
                aria-label="Scroll timeline right"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            <div
                className="timeline-line-wrapper"
                ref={scrollContainerRef}
                onScroll={onScroll}
            >
                {children}
            </div>
        </div>
    );
};

export default TimelineScrollArea;
