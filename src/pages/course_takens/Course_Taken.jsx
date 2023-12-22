import React from "react";
import { Container} from "react-bootstrap";
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
import CS559 from "../../assets/imgs/courses/compsci559.png";
import CS540 from "../../assets/imgs/courses/compsci540.png";
import CS320 from "../../assets/imgs/courses/compsci320.png";
import CS564 from "../../assets/imgs/courses/compsci564.png";
import CS579 from "../../assets/imgs/courses/compsci579.png";
import CS506 from "../../assets/imgs/courses/compsci506.png";
import CS407 from "../../assets/imgs/courses/compsci407.png";
import CS571 from "../../assets/imgs/courses/compsci571.png";
import STAT340 from "../../assets/imgs/courses/stat340.png";
import CS544 from "../../assets/imgs/courses/compsci544.png";

function Course_Taken() {
  return (
    <Container fluid className="project-section">
      <h1 className="project-heading">
        COURSE TAKEN
      </h1> 
      <h2>
        University of Wisconsin - Madison (Undergraduate)
      </h2> <br /> <br />
      
      <div className="container mt-5">
        <div className="d-flex mt-4 ms-5">
          <img src={CS252} alt="cs252" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 252 - Introduction to Computer Engineering </strong> <br />
              <strong className="purple">Professor: Karu Sankaralingam </strong> <br />
              <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
              <strong className="purple">When: Fall 2020 </strong> <br />
              <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
              <strong className="purple">Description: </strong> In this course, you'll explore the construction of logic components using transistors and grasp foundational concepts of Boolean algebra. Dive into the essentials of combination logic design and synchronous sequential logic design. Understand the fundamentals of computer organization and get acquainted with introductory machine and <strong>assembly language</strong>.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS300} className="me-3" alt="cs300" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 300 - Programming II </strong> <br />
            <strong className="purple">Professor: Hobbes Legault </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2020 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll learn about Object-Oriented Programming in <strong>Java</strong>, leveraging classes and objects to address complex problems. Delve into array-based and linked data structures like lists, stacks, and queues. Craft multi-className programs employing interfaces, generics, and exception handling through hands-on assignments. Master reading/writing data to/from files, navigating command line arguments, and handling exceptions. Dive into essential topics like object-oriented design, the difference between classes and objects, effective searching and sorting techniques, an introduction to abstract data types such as Lists, Stacks, and Queues, and the basics of complexity analysis and recursion.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS220} className="me-3" alt="cs220" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 220 - Data Science Programming I </strong> <br />
            <strong className="purple">Professor: Meenakshi Syamkumar </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2021 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll explore the fundamentals of <strong>Python</strong> programming, encompassing data types, control mechanisms, functions, and input/output operations. Dive deeper into the essentials of data science, focusing on data visualization and analysis techniques. Through interactive assignments, you'll harness Python to address practical challenges. Master the art of reading/writing data to/from files, efficiently utilize command line inputs, and adeptly manage exceptions.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS400} className="me-3" alt="cs400" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 400 - Programming III </strong> <br />
            <strong className="purple">Professor: Gary Dahl </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2021 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this third <strong>Java</strong> programming sequence, you'll dive into complex algorithms and data structures such as balanced search trees, graphs, and hash tables. Build on your foundational knowledge with inheritance, polymorphism, and lambda functions. Collaborating in a team of four, each working on different roles (frontend, backend, data wrangler, or integration manager) to design a medium-scale program showcasing the data structure of hashmap, red-black tree, and Dijkstra's algorithms. Further, create sophisticated web or mobile applications with event-driven architectures while mastering version-control software usage.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS240} className="me-3" alt="stat240" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 240 - Introduction to Discrete Mathematics </strong> <br />
            <strong className="purple">Professor: Jun Le Goh </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2021 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll navigate the foundational principles of logic, sets, and relations, emphasizing discrete structures like integers, bits, strings, trees, and graphs. Explore the intricacies of propositional and predicate logic, Boolean algebra, and mathematical induction. Deepen your understanding with recursion, invariants, and algorithmic validation. Unravel the core concepts of counting and the analysis of recurrence and asymptotic growth. Through interactive learning, gain proficiency in the pivotal areas of mathematical proofs and their application in computing.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS354} className="me-3" alt="cs354" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 354 - Machine Organization and Programming </strong> <br />
            <strong className="purple">Professor: Michael Doescher </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2021 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll dive deep into the core structures of computer systems, emphasizing their intricate relationships and impacts on performance using <strong>C</strong>. Unpack the complexities of virtual address spaces, dynamic memory management, memory hierarchies, and the nuances of assembly language. Explore the mechanics of communication via interrupts and signals and the transformation journey of code from compilation to linkage. Through hands-on exercises, gain a comprehensive understanding of the foundational layers of computing and their seamless orchestration.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS577} className="me-3" alt="cs577" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 577 - Introduction to Algorithms </strong> <br />
            <strong className="purple">Professor: Marc Renault </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2022 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll navigate the fundamental strategies for crafting and analyzing proficient algorithms. Dive into crucial paradigms such as graphs, greedy, divide and conquer, dynamic programming, network flow, intractability, and randomization. Encounter computational challenges, gaining insights into NP-complete problems and the tactics to address their complexities. Through interactive lessons, acquire a holistic understanding of algorithmic design and the intricacies of computational problem-solving in proofs.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={STAT240} className="me-3" alt="stat240" width={250} height={250}/> <br />
          <ul className="course_taken_right_text list">
            <strong className="purple">STAT 240 - Data Science Modeling I </strong> <br />
            <strong className="purple">Professor: Bi Cheng Wu </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2022 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll immerse yourself in reproducible data modeling and statistical analysis. Explore the integrated statistical computing environment, the intricacies of data wrangling, and the versatility of the <strong>R</strong>. Dive into captivating data visuals and foundational probability concepts such as the binomial and normal distributions, and delve into data modeling. Master statistical inferences across various sample settings, simple linear regression, and seamlessly craft comprehensive reports using R Markdown. You'll apply these skills to a broad spectrum of data through practical exercises, addressing multifaceted analytical challenges.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS537} className="me-3" alt="cs537" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 537 - Introduction to Operating Systems </strong> <br />
            <strong className="purple">Professor: Remzi Arpaci-Dusseau </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2022 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll navigate the intricate landscape of computer system structures and their functionalities. Dive into the essentials of input-output hardware, the nuances of interrupt handling, and the characteristics of magnetic storage mediums like tapes, discs, and drums. Explore the realms of associative memories and virtual address translation methods building using <strong>C</strong>. Deepen your understanding of diverse computing environments, from batch processing to real-time systems, while mastering scheduling and resource allocation techniques. You'll gain proficiency in modular software designs, performance metrics, and comprehensive system evaluations through interactive modules.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS540} className="me-3" alt="cs540" width={250} height={250}/> <br />
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 540 - Introduction to Artificial Intelligence </strong> <br />
            <strong className="purple">Professor: Fred Sala </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2022 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll journey into artificial intelligence and its foundational principles. Explore knowledge-driven search methodologies, automated deduction techniques, and robust knowledge representation via predicate logic. Dive deep into machine learning and probabilistic reasoning paradigms. Through hands-on modules, you'll tackle applications spanning problem-solving, data mining, game strategies, natural language processing, computer vision, speech interpretation, and robotics using <strong>Python</strong>, offering a comprehensive insight into the vast world of intelligent systems.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS559} className="me-3" alt="cs559" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 559 - Computer Graphics </strong> <br />
            <strong className="purple">Professor: Eftychios Sifakis </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2022 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll traverse the captivating world of computer graphics using <strong>JavaScript</strong>. Delve into the intricacies of image formation, representation, composition, and manipulation. Explore the modeling, transformation, and projection of 2D and 3D geometric entities using JavaScript's powerful rendering capabilities. Unravel the detailed representation of curves and surfaces. Engage in modules on rendering techniques, dynamic animation, multimedia integrations, and advanced visualization. You'll gain a comprehensive understanding of visual computing and its myriad applications through interactive sessions and hands-on JavaScript exercises.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS320} className="me-3" alt="cs320" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 320 - Data Science Programming II </strong> <br />
            <strong className="purple">Professor: Meenakshi Syamkumar </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll dive deeper into Data Science methodologies using <strong>Python</strong>, building on your foundational knowledge of tabular analysis. Grasp the art of implementing data structures like graphs for efficient data representation. Become adept at utilizing tools such as version control and Python virtual environments, honing a strong emphasis on ensuring reproducibility in analysis. Discover the world of tracing and A/B testing as avenues to curate insightful datasets. Engage with foundational techniques in classification, clustering, optimization, and simulation. Throughout the course, the significance of visual representation, ensuring you master the art of plotting and effective data communication.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS506} className="me-3" alt="cs506" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 506 - Software Engineering </strong> <br />
            <strong className="purple">Professor: Scott Swanson </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll embark on a journey through the realm of software development, focusing on creating and refining expansive software systems. Dive into the intricacies of software engineering processes, from requirement gathering to specification drafting. Familiarize yourself with the dynamics of agile methodology, software architectures, prevalent design patterns, <strong>Docker, and MySQL</strong>. Sharpen your skills in testing, debugging, and understanding cost and quality metrics. Engage in hands-on team projects, collaborating in a group of six to bring theoretical knowledge into practical application, ensuring a comprehensive grasp of software engineering principles and practices.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS564} className="me-3" alt="cs564" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 564 - Database Management Systems: Design and Implementation </strong> <br />
            <strong className="purple">Professor: Xiaoyao Yu </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> Immerse yourself in the intricate world of database management systems in this course. Dive deep into the design principles behind relational databases and unravel the mysteries of efficient schema design and application integration. Get hands-on with practical implementations using <strong>C++ and SQL</strong>, understanding the core mechanisms like query processing, concurrency control, and integrity maintenance. Collaborating in a team of three to develop a robust database management system project that showcases your newfound expertise.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS579} className="me-3" alt="cs579" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 579 - Virtual Reality </strong> <br />
            <strong className="purple">Professor: Kevin Ponto </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Spring 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong> In this course, you'll dive into the captivating realm of virtual reality, exploring the intricacies of <strong>Unity, C#</strong>, and advanced 3D modeling techniques. Trace the journey of virtual reality from its historical origins to its modern-day innovations and ponder its potential for the future. As part of a dynamic team of four, you will craft a compelling 3D virtual reality experience, showcasing the fusion of art, design, engineering, and technology. Collaborating in a team of four, you'll develop a comprehensive 3D virtual reality project.
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS407} className="me-3" alt="cs407" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 407 - Foundation of Mobile Systems and Applications </strong> <br />
            <strong className="purple">Professor: Suman Banerjee </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/></strong> <br />
            <strong className="purple">When: Fall 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong>
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS544} className="me-3" alt="cs544" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 544: Intro to Big Data </strong> <br />
            <strong className="purple">Professor: Tyler Caraza-Harter </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong>
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={CS571} className="me-3" alt="cs571" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">COMP SCI 571 - Building User Interfaces </strong> <br />
            <strong className="purple">Professor: Yuhang Zhao </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/></strong> <br />
            <strong className="purple">When: Fall 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/></strong> <br />
            <strong className="purple">Description: </strong>
            </ul>
        </div>
      </div>

      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={STAT340} className="me-3" alt="stat340" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple">STAT 340 - Data Science Modeling II </strong> <br />
            <strong className="purple">Professor: Bi Cheng Wu </strong> <br />
            <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">When: Fall 2023 </strong> <br />
            <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
            <strong className="purple">Description: </strong>
            </ul>
        </div>
      </div>

      {/* <h2>
        (Graduate)
      </h2> <br /> <br />
      <Particle />
      <div className="container mt-5 ">
        <div className="d-flex mt-4 ms-5">
          <img src={xxx} alt="xxx" width={250} height={250}/>
          <ul className="course_taken_right_text list">
            <strong className="purple"> xxx </strong> <br />
              <strong className="purple"> xxx </strong> <br />
              <strong className="purple">Rating: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong> <br />
              <strong className="purple">When: Fall 2024 </strong> <br />
              <strong className="purple">Workload: <AiFillStar color="#FFDB58"/> <AiFillStar color="#FFDB58"/> </strong>
            </ul>
        </div>
      </div> */}
      <br /> <br /> <br />
    </Container>
  );
}

export default Course_Taken;
