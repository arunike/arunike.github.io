const ExpertiseCard = ({ card, index, isActive, style }) => {
    return (
        <div
            className={`expertise-card-3d ${isActive ? "active" : ""}`}
            id={card.id}
            style={style}
        >
            <div className="expertise-card-topbar">
                <span className="expertise-card-kicker">{card.title}</span>
                <span className="expertise-card-index">
                    ({String(index + 1).padStart(2, "0")})
                </span>
            </div>

            <div className="expertise-card-body">
                <div className="expertise-card-left">
                    <h2 className="expertise-card-headline">{card.headline}</h2>
                    <p className="expertise-card-para">{card.para}</p>

                    <ul className="expertise-card-bullets">
                        {card.items &&
                            card.items.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                    </ul>

                    <div className="expertise-card-testimonial">
                        <p className="expertise-card-quote">"{card.quote}"</p>
                    </div>
                </div>

                <div className="expertise-card-right">
                    <div className="expertise-card-illustration-container">
                        <img
                            src={card.image}
                            alt={card.imageAlt}
                            className="expertise-card-illustration"
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
