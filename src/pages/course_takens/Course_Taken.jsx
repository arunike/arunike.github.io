import React from "react";
import { Container } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import CS252 from "../../assets/imgs/courses/compsci252.png";
import CS300 from "../../assets/imgs/courses/compsci300.png";
import CS220 from "../../assets/imgs/courses/compsci220.png";
import CS400 from "../../assets/imgs/courses/compsci400.png";
import CS240 from "../../assets/imgs/courses/compsci240.png";
import CS354 from "../../assets/imgs/courses/compsci354.png";
import CS577 from "../../assets/imgs/courses/compsci577.png";
import STAT240 from "../../assets/imgs/courses/stat240.png";
import CS537 from "../../assets/imgs/courses/compsci537.png";
import CS559 from "../../assets/imgs/courses/compsci559.gif";
import CS540 from "../../assets/imgs/courses/compsci540.png";
import CS320 from "../../assets/imgs/courses/compsci320.png";
import CS564 from "../../assets/imgs/courses/compsci564.png";
import CS579 from "../../assets/imgs/courses/compsci579.gif";
import CS506 from "../../assets/imgs/courses/compsci506.png";
import CS407 from "../../assets/imgs/courses/compsci407.png";
import CS571 from "../../assets/imgs/courses/compsci571.gif";
import STAT340 from "../../assets/imgs/courses/stat340.png";
import CS544 from "../../assets/imgs/courses/compsci544.png";
import UWMadison_CS from "../../assets/imgs/uw-madison_cs.png";

function Course_Taken() {
  const courses = [
    {
      id: "CS252",
      image: CS252,
      title: "COMP SCI 252 - Introduction to Computer Engineering",
      professor: "Karu Sankaralingam",
      rating: 2,
      semester: "Fall 2020",
      workload: 2,
      description:
        "In this course, you'll explore the construction of logic components using transistors and grasp foundational concepts of Boolean algebra. Dive into the essentials of combination logic design and synchronous sequential logic design. Understand the fundamentals of computer organization and get acquainted with introductory machine and assembly language.",
    },
    {
      id: "CS300",
      image: CS300,
      title: "COMP SCI 300 - Programming II",
      professor: "Hobbes Legault",
      rating: 3,
      semester: "Fall 2020",
      workload: 2,
      description:
        "In this course, you'll learn about Object-Oriented Programming in Java, leveraging classes and objects to address complex problems. Delve into array-based and linked data structures like lists, stacks, and queues. Craft multi-className programs employing interfaces, generics, and exception handling through hands-on assignments.",
    },
    {
      id: "CS220",
      image: CS220,
      title: "COMP SCI 220 - Data Science Programming I",
      professor: "Meenakshi Syamkumar",
      rating: 3,
      semester: "Spring 2021",
      workload: 1,
      description:
        "In this course, you'll explore the fundamentals of Python programming, encompassing data types, control mechanisms, functions, and input/output operations. Dive deeper into the essentials of data science, focusing on data visualization and analysis techniques.",
    },
    {
      id: "CS400",
      image: CS400,
      title: "COMP SCI 400 - Programming III",
      professor: "Gary Dahl",
      rating: 3,
      semester: "Spring 2021",
      workload: 2,
      description:
        "In this third Java programming sequence, you'll dive into complex algorithms and data structures such as balanced search trees, graphs, and hash tables. Build on your foundational knowledge with inheritance, polymorphism, and lambda functions.",
    },
    {
      id: "CS240",
      image: CS240,
      title: "COMP SCI 240 - Introduction to Discrete Mathematics",
      professor: "Jun Le Goh",
      rating: 2,
      semester: "Fall 2021",
      workload: 3,
      description:
        "In this course, you'll dive deep into the core structures of computer systems, emphasizing their intricate relationships and impacts on performance using C. Unpack the complexities of virtual address spaces, dynamic memory management, memory hierarchies, and the nuances of assembly language.",
    },
    {
      id: "CS354",
      image: CS354,
      title: "COMP SCI 354 - Machine Organization and Programming",
      professor: "Michael Doescher",
      rating: 1,
      semester: "Fall 2021",
      workload: 4,
      description:
        "In this course, you'll dive deep into the core structures of computer systems, emphasizing their intricate relationships and impacts on performance using C. Unpack the complexities of virtual address spaces, dynamic memory management, memory hierarchies, and the nuances of assembly language.",
    },
    {
      id: "CS577",
      image: CS577,
      title: "COMP SCI 577 - Introduction to Algorithms",
      professor: "Marc Renault",
      rating: 2,
      semester: "Spring 2022",
      workload: 5,
      description:
        "In this course, you'll navigate the fundamental strategies for crafting and analyzing proficient algorithms. Dive into crucial paradigms such as graphs, greedy, divide and conquer, dynamic programming, network flow, intractability, and randomization.",
    },
    {
      id: "STAT240",
      image: STAT240,
      title: "STAT 240 - Data Science Modeling I",
      professor: "Bi Cheng Wu",
      rating: 3,
      semester: "Spring 2022",
      workload: 2,
      description:
        "In this course, you'll immerse yourself in reproducible data modeling and statistical analysis. Explore the integrated statistical computing environment, the intricacies of data wrangling, and the versatility of R. Dive into captivating data visuals and foundational probability concepts.",
    },
    {
      id: "CS537",
      image: CS537,
      title: "COMP SCI 537 - Introduction to Operating Systems",
      professor: "Remzi Arpaci-Dusseau",
      rating: 5,
      semester: "Fall 2022",
      workload: 5,
      description:
        "In this course, you'll navigate the intricate landscape of computer system structures and their functionalities. Dive into the essentials of input-output hardware, the nuances of interrupt handling, and the characteristics of magnetic storage mediums using C.",
    },
    {
      id: "CS540",
      image: CS540,
      title: "COMP SCI 540 - Introduction to Artificial Intelligence",
      professor: "Fred Sala",
      rating: 4,
      semester: "Fall 2022",
      workload: 3,
      description:
        "In this course, you'll explore artificial intelligence and its foundational principles. Delve into knowledge-driven search methodologies, automated deduction techniques, and robust knowledge representation through predicate logic using Python.",
    },
    {
      id: "CS559",
      image: CS559,
      title: "COMP SCI 559 - Computer Graphics",
      professor: "Eftychios Sifakis",
      rating: 4,
      semester: "Fall 2022",
      workload: 3,
      description:
        "In this course, you will traverse an immersive exploration of computer graphics, utilizing the power of JavaScript. You will delve into the complexities of image formation, representation, composition, and manipulation.",
    },
    {
      id: "CS320",
      image: CS320,
      title: "COMP SCI 320 - Data Science Programming II",
      professor: "Meenakshi Syamkumar",
      rating: 4,
      semester: "Spring 2023",
      workload: 3,
      description:
        "In this course, you'll deepen your understanding of Data Science methodologies, focusing on Python. Building on your knowledge of tabular analysis, you will learn to skillfully implement data structures like graphs for more efficient data representation.",
    },
    {
      id: "CS506",
      image: CS506,
      title: "COMP SCI 506 - Software Engineering",
      professor: "Scott Swanson",
      rating: 2,
      semester: "Spring 2023",
      workload: 2,
      description:
        "In this course, you'll embark on a journey through the realm of software development, focusing on creating and refining expansive software systems. Familiarize yourself with the dynamics of agile methodology, software architectures, prevalent design patterns, Docker, and MySQL.",
    },
    {
      id: "CS564",
      image: CS564,
      title: "COMP SCI 564 - Database Management Systems",
      professor: "Xiaoyao Yu",
      rating: 5,
      semester: "Spring 2023",
      workload: 3,
      description:
        "In this course, you'll immerse yourself in the intricate world of database management systems. Dive deep into the design principles behind relational databases and unravel the mysteries of efficient schema design using C++ and SQL.",
    },
    {
      id: "CS579",
      image: CS579,
      title: "COMP SCI 579 - Virtual Reality",
      professor: "Kevin Ponto",
      rating: 4,
      semester: "Spring 2023",
      workload: 2,
      description:
        "In this course, you'll dive into the captivating realm of virtual reality, exploring the intricacies of Unity, C#, and advanced 3D modeling techniques. Trace the journey of virtual reality from its historical origins to its modern-day innovations.",
    },
    {
      id: "CS407",
      image: CS407,
      title: "COMP SCI 407 - Foundation of Mobile Systems",
      professor: "Suman Banerjee & Mouna Ayari Ben Hadj Kacem",
      rating: 5,
      semester: "Fall 2023",
      workload: 2,
      description:
        "In this course, you'll delve into the unique challenges and opportunities mobile platforms present. Through nine lab sessions, you'll gain hands-on experience with various Android mobile application development aspects using Kotlin.",
    },
    {
      id: "CS544",
      image: CS544,
      title: "COMP SCI 544 - Intro to Big Data",
      professor: "Tyler Caraza-Harter",
      rating: 4,
      semester: "Fall 2023",
      workload: 3,
      description:
        "In this course, you'll master distributed systems for storing and analyzing vast datasets. Engage with cutting-edge technologies like Docker, PyTorch, HDFS, Spark, Cassandra, Kafka, and BigQuery, predominantly with Python.",
    },
    {
      id: "CS571",
      image: CS571,
      title: "COMP SCI 571 - Building User Interfaces",
      professor: "Yuhang Zhao & Cole Nelson",
      rating: 5,
      semester: "Fall 2023",
      workload: 3,
      description:
        "In this course, you'll embark on an enlightening journey into UX development. Covering web, mobile, and voice interfaces, you'll develop skills in JavaScript, React, React Native, and Dialogflow, advancing to full-stack development.",
    },
    {
      id: "STAT340",
      image: STAT340,
      title: "STAT 340 - Data Science Modeling II",
      professor: "Bi Cheng Wu",
      rating: 2,
      semester: "Fall 2023",
      workload: 4,
      description:
        "In this course, it will equip you with the skills to explain and predict real-world phenomena using data using R. You'll learn the comprehensive process of data science, from collecting and cleaning data to modeling and analyzing it.",
    },
  ];

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <AiFillStar key={i} className="star" />
    ));
  };

  return (
    <Container fluid className="course-section">
      <div className="course-header">
        <h1 className="project-heading">COURSES TAKEN</h1>
      </div>

      <div className="university-section">
        <h2 className="university-title">University of Wisconsin - Madison</h2>
        <div className="university-logo-container">
          <a
            href="https://cdis.wisc.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="university-badge">Undergraduate</div>
            <img
              src={UWMadison_CS}
              alt="University of Wisconsin Madison CS"
              className="university-logo"
              width={500}
              height={80}
            />
          </a>
        </div>

        <div className="courses-grid">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="course-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="semester-badge">{course.semester}</div>
              <div className="course-content">
                <div className="course-image-container">
                  <img
                    src={course.image}
                    alt={course.id}
                    className="course-image"
                  />
                </div>
                <div className="course-details">
                  <h3 className="course-title">{course.title}</h3>

                  <div className="course-meta">
                    <div className="meta-item">
                      <span className="meta-label">Professor:</span>
                      <span>{course.professor}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Rating:</span>
                      <div className="rating-stars">
                        {renderStars(course.rating)}
                      </div>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Workload:</span>
                      <div className="workload-stars">
                        {renderStars(course.workload)}
                      </div>
                    </div>
                  </div>

                  <div className="course-description">
                    {course.description
                      .split(/(\*\*[^*]+\*\*)/g)
                      .map((part) => {
                        return part;
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Course_Taken;
