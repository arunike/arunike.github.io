import React from "react";
import Nav from "../components/Nav";
import "../css/courses.css";

const courses = [
    {
        id: "CS252",
        title: "COMP SCI 252 - Introduction to Computer Engineering",
        professor: "Karu Sankaralingam",
        rating: 2,
        workload: 2,
        semester: "Fall 2020",
        image: "/src/assets/images/courses/compsci252.png",
        description:
            "Logic components built with transistors, rudimentary Boolean algebra, basic combinational logic design, basic synchronous sequential logic design, basic computer organization and design, introductory machine- and assembly-language programming.",
    },
    {
        id: "CS300",
        title: "COMP SCI 300 - Programming II",
        professor: "Hobbes Legault",
        rating: 3,
        workload: 2,
        semester: "Fall 2020",
        image: "/src/assets/images/courses/compsci300.png",
        description:
            "The second course in a three-course sequence studying program design, algorithms, and data structures. Develop programs with multiple compilation units and manage them in Linux environments. Introduce abstract data types, design and efficiency of algorithms, lists, stacks, queues, priority queues, and dictionaries.",
    },
    {
        id: "CS220",
        title: "COMP SCI 220 - Data Science Programming I",
        professor: "Various",
        rating: 3,
        workload: 2,
        semester: "Spring 2021",
        image: "/src/assets/images/courses/compsci220.png",
        description:
            "Data science programming using Python. Experience with several packages for data analysis and visualization. Principles underlying tools, including data structures and algorithms.",
    },
    {
        id: "CS400",
        title: "COMP SCI 400 - Programming III",
        professor: "Gary Dahl",
        rating: 4,
        workload: 3,
        semester: "Spring 2021",
        image: "/src/assets/images/courses/compsci400.png",
        description:
            "The third installment of the CS sequence. Explores abstract data types and their implementations, including trees, heaps, balanced trees, and graphs. Analyze time and space complexity of these structures and the algorithms that operate on them.",
    },
    {
        id: "CS240",
        title: "COMP SCI 240 - Intro to Discrete Mathematics",
        professor: "Various",
        rating: 4,
        workload: 3,
        semester: "Fall 2021",
        image: "/src/assets/images/courses/compsci240.png",
        description:
            "Propositional logic, set theory, functions, relations, sequences, induction, and counting. Applications to computer science including Boolean algebra, automata, and proving properties of programs.",
    },
    {
        id: "CS354",
        title: "COMP SCI 354 - Machine Organization and Programming",
        professor: "Jim Skrentny",
        rating: 5,
        workload: 5,
        semester: "Fall 2021",
        image: "/src/assets/images/courses/compsci354.png",
        description:
            "Introduction to fundamental structures of computer systems and the C programming language. Topics include memory management, pointers, data representation, assembly programming, and performance optimization.",
    },
    {
        id: "STAT240",
        title: "STAT 240 - Data Science Modeling I",
        professor: "Bret Larget",
        rating: 3,
        workload: 4,
        semester: "Spring 2022",
        image: "/src/assets/images/courses/stat240.png",
        description:
            "Statistical models and methods for data science. Topics include data visualization, simple and multiple regression, analysis of variance, and logistic regression using R programming.",
    },
    {
        id: "CS537",
        title: "COMP SCI 537 - Introduction to Operating Systems",
        professor: "Andrea Arpaci-Dusseau",
        rating: 5,
        workload: 5,
        semester: "Spring 2022",
        image: "/src/assets/images/courses/compsci537.png",
        description:
            "Operating system concepts including process scheduling, memory management, file systems, and concurrency. Extensive C programming projects implementing key OS components.",
    },
    {
        id: "CS559",
        title: "COMP SCI 559 - Computer Graphics",
        professor: "Michael Gleicher",
        rating: 5,
        workload: 4,
        semester: "Fall 2022",
        image: "/src/assets/images/courses/compsci559.gif",
        description:
            "Fundamental concepts in computer graphics including 2D/3D transformations, viewing, shading, and texture mapping. Programming with WebGL and modern graphics APIs.",
    },
    {
        id: "CS320",
        title: "COMP SCI 320 - Data Science Programming II",
        professor: "Tyler Caraza-Harter",
        rating: 4,
        workload: 4,
        semester: "Fall 2022",
        image: "/src/assets/images/courses/compsci320.png",
        description:
            "Big data systems, relational databases, SQL, cloud computing, and distributed systems. Building scalable data science applications using Docker and Kubernetes.",
    },
    {
        id: "CS506",
        title: "COMP SCI 506 - Software Engineering",
        professor: "Beck Hasti",
        rating: 4,
        workload: 4,
        semester: "Spring 2023",
        image: "/src/assets/images/courses/compsci506.png",
        description:
            "Software development lifecycle including requirements, design, implementation, testing, and maintenance. Team-based projects using modern development methodologies and tools.",
    },
    {
        id: "CS564",
        title: "COMP SCI 564 - Database Management Systems",
        professor: "Paris Koutris",
        rating: 4,
        workload: 4,
        semester: "Spring 2023",
        image: "/src/assets/images/courses/compsci564.png",
        description:
            "Database design including entity-relationship models, relational models, relational algebra, Structured Query Language (SQL), query execution, and query optimization. Advanced topics like transactions, concurrency control, recovery, and NoSQL databases.",
    },
    {
        id: "CS579",
        title: "COMP SCI 579 - Computational Photography",
        professor: "Mohit Gupta",
        rating: 5,
        workload: 3,
        semester: "Fall 2023",
        image: "/src/assets/images/courses/compsci579.gif",
        description:
            "Image processing, computer vision, and graphics techniques for computational photography. Topics include HDR imaging, panoramas, image denoising, and neural rendering.",
    },
    {
        id: "CS407",
        title: "COMP SCI 407 - Foundations of Mobile Systems and Applications",
        professor: "Aws Albarghouthi",
        rating: 4,
        workload: 3,
        semester: "Fall 2023",
        image: "/src/assets/images/courses/compsci407.png",
        description:
            "Mobile application development for iOS and Android platforms. Topics include UI design, sensor integration, location services, and cloud backend integration.",
    },
    {
        id: "CS544",
        title: "COMP SCI 544 - Introduction to Big Data Systems",
        professor: "Shivaram Venkataraman",
        rating: 4,
        workload: 4,
        semester: "Spring 2024",
        image: "/src/assets/images/courses/compsci544.png",
        description:
            "Distributed computing systems for big data processing including MapReduce, Spark, and stream processing. Performance optimization and system design for large-scale data analysis.",
    },
    {
        id: "CS571",
        title: "COMP SCI 571 - Building User Interfaces",
        professor: "Cole Nelson",
        rating: 5,
        workload: 5,
        semester: "Spring 2024",
        image: "/src/assets/images/courses/compsci571.gif",
        description:
            "Survey of technologies for building rich, interactive user interfaces. Topics include HTML/CSS, JavaScript, web frameworks (React), mobile app development, responsive design, accessibility, and user experience principles.",
    },
    {
        id: "STAT340",
        title: "STAT 340 - Data Science Modeling II",
        professor: "Keith Levin",
        rating: 4,
        workload: 4,
        semester: "Fall 2024",
        image: "/src/assets/images/courses/stat340.png",
        description:
            "Advanced statistical modeling and machine learning techniques. Topics include classification, clustering, regularization, cross-validation, and deep learning using Python.",
    },
    {
        id: "CS540",
        title: "COMP SCI 540 - Introduction to Artificial Intelligence",
        professor: "Charles Dyer",
        rating: 5,
        workload: 4,
        semester: "Fall 2024",
        image: "/src/assets/images/courses/compsci540.png",
        description:
            "Principles of knowledge-based search techniques, automatic deduction, knowledge representation using predicate logic, machine learning, probabilistic reasoning. Applications in tasks such as problem solving, data mining, game playing, natural language understanding, and robotics.",
    },
    {
        id: "CS577",
        title: "COMP SCI 577 - Introduction to Algorithms",
        professor: "Dieter van Melkebeek",
        rating: 5,
        workload: 5,
        semester: "Fall 2024",
        image: "/src/assets/images/courses/compsci577.png",
        description:
            "Basic paradigms for the design and analysis of efficient algorithms: greed, divide-and-conquer, dynamic programming, reductions, and the use of randomness. Computational intractability including typical NP-complete problems and ways to deal with them.",
    },
];

const renderStars = (count) => {
    return Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="star" style={{ opacity: i < count ? 1 : 0.3 }}>
            ★
        </span>
    ));
};

const CourseTaken = () => {
    return (
        <>
            <Nav />
            <div className="courses-page">
                {/* Header */}
                <div className="courses-header">
                    <h1>Courses Taken</h1>

                    <div className="university-badge-container">
                        <span className="undergraduate-badge">
                            Undergraduate
                        </span>
                        <div className="university-info">
                            <div className="title">
                                University of Wisconsin-Madison
                            </div>
                            <p className="subtitle">Computer Sciences</p>
                        </div>
                    </div>
                </div>

                {/* Courses List */}
                <div className="courses-container">
                    <div className="courses-list">
                        {courses.map((course) => (
                            <div key={course.id} className="course-card">
                                <div className="course-card-inner">
                                    {/* Left: Image Area */}
                                    <div className="course-image-section">
                                        <span className="semester-badge">
                                            {course.semester}
                                        </span>
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="course-image"
                                        />
                                    </div>

                                    {/* Right: Course Details */}
                                    <div className="course-details-section">
                                        <h2 className="course-title">
                                            {course.title}
                                        </h2>

                                        <div className="course-meta">
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

                    {/* Footer Stats */}
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
        </>
    );
};

export default CourseTaken;
