import { forwardRef } from "react";
import StarRating from "./StarRating";

const CourseCard = forwardRef(({ course }, ref) => {
    return (
        <div className="course-card" ref={ref}>
            <span className="courses-semester-tag">{course.semester}</span>
            <div className="course-card-inner">
                <div className="course-image-section">
                    <span
                        className={`course-type-badge ${(course.type || "").toLowerCase()}`}
                    >
                        {course.type}
                    </span>
                    <img
                        src={course.image}
                        alt={course.title}
                        className="course-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div className="course-details-section">
                    <h2 className="course-title">{course.title}</h2>

                    <div className="course-meta">
                        <div className="meta-item">
                            <span className="meta-label">Major:</span>
                            <span className="meta-value">{course.major}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Professor:</span>
                            <span className="meta-value">
                                {course.professor}
                            </span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Rating:</span>
                            <StarRating
                                value={course.rating}
                                className="rating-stars"
                            />
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Workload:</span>
                            <StarRating
                                value={course.workload}
                                className="workload-stars"
                            />
                        </div>
                    </div>

                    <p className="course-description">{course.description}</p>
                </div>
            </div>
        </div>
    );
});

CourseCard.displayName = "CourseCard";

export default CourseCard;
