const ExpertiseCard = ({ card, isActive, onActivate, style }) => {
    return (
        <div
            className={`expertise-card ${isActive ? "active" : ""}`}
            id={card.id}
            onClick={onActivate}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onActivate();
                }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            style={style}
        >
            <div className="expertise-card-inner">
                <div className="expertise-card-header">
                    <h2 className="expertise-card-title">{card.title}</h2>
                </div>

                <div className="expertise-card-body">
                    <div className="expertise-card-content">
                        <ul>
                            {card.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="expertise-card-img">
                        <img
                            src={card.image}
                            alt={card.imageAlt}
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertiseCard;
