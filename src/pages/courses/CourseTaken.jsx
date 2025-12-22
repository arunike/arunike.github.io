import React, { useRef, useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/sections/footer/Footer";

import UWMadison from "../../assets/images/uw-madison_cs.png";
import { courses } from "./components/coursesData";

const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="star" style={{ opacity: i < count ? 1 : 0.3 }}>
            ★
        </span>
    ));
};

const CourseTaken = () => {
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.add("courses-header-animated");
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("course-card-animated");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        cardsRef.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Nav />
            <div className="courses-page">
                {/* Header */}
                <div className="courses-header" ref={headerRef}>
                    <h1>Courses Taken</h1>

                    <div className="university-badge-container">
                        <span className="undergraduate-badge">
                            Undergraduate
                        </span>
                        <div className="university-info">
                            <img
                                src={UWMadison}
                                alt="University of Wisconsin-Madison Computer Sciences"
                                className="university-logo"
                            />
                        </div>
                    </div>
                </div>

                <div className="courses-container">
                    <div className="courses-list">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="course-card"
                                ref={(el) => (cardsRef.current[index] = el)}
                            >
                                <span className="courses-semester-tag">
                                    {course.semester}
                                </span>
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
                                        />
                                    </div>

                                    <div className="course-details-section">
                                        <h2 className="course-title">
                                            {course.title}
                                        </h2>

                                        <div className="course-meta">
                                            <div className="meta-item">
                                                <span className="meta-label">
                                                    Major:
                                                </span>
                                                <span className="meta-value">
                                                    {course.major}
                                                </span>
                                            </div>

                                            <div className="meta-item">
                                                <span className="meta-label">
                                                    Professor:
                                                </span>
                                                <span className="meta-value">
                                                    {course.professor}
                                                </span>
                                            </div>

                                            <div className="meta-item">
                                                <span className="meta-label">
                                                    Rating:
                                                </span>
                                                <div className="rating-stars">
                                                    {renderStars(course.rating)}
                                                </div>
                                            </div>

                                            <div className="meta-item">
                                                <span className="meta-label">
                                                    Workload:
                                                </span>
                                                <div className="workload-stars">
                                                    {renderStars(
                                                        course.workload
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="course-description">
                                            {course.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="courses-footer">
                        <div className="courses-stats">
                            <p>
                                Total Courses Taken:{" "}
                                <span className="courses-count">
                                    {courses.length}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CourseTaken;
