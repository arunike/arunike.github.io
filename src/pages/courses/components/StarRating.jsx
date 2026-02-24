const StarRating = ({ value, className }) => {
    return (
        <div className={className}>
            {Array.from({ length: 5 }, (_, i) => (
                <span
                    key={i}
                    className="star"
                    style={{ opacity: i < value ? 1 : 0.3 }}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

export default StarRating;
