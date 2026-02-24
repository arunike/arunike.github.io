import { useRef, useEffect } from "react";
import Footer from "../../components/sections/footer/Footer";

import UWMadison from "../../assets/images/uw-madison_cs.png";
import CourseCard from "./components/CourseCard";
import { courses } from "./components/coursesData";

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
                            <CourseCard
                                key={course.id}
                                course={course}
                                ref={(el) => (cardsRef.current[index] = el)}
                            />
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
