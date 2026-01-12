import BlackGoldPoker from "../../../assets/images/projects/black_gold_poker.gif";
import PortfolioOld from "../../../assets/images/projects/portfolio_old.gif";
import MiasPortfolio from "../../../assets/images/projects/mias_portfolio.gif";
import Pacman from "../../../assets/images/projects/pacman.gif";
import GoGame from "../../../assets/images/projects/go_game.gif";
import SnakeGame from "../../../assets/images/projects/snake_game.gif";
import PianoTiles from "../../../assets/images/projects/piano_tiles.gif";
import Game2048 from "../../../assets/images/projects/2048_game.gif";
import BlinnPhong from "../../../assets/images/projects/blinn_phong.gif";
import LoginPage from "../../../assets/images/projects/login_page.png";
import HTMLPortfolio from "../../../assets/images/projects/html_portfolio.png";
import SongOfTheWind from "../../../assets/images/projects/song_of_the_wind_piano.png";
import ACMAlgorithms from "../../../assets/images/projects/acm_algorithms.png";
import WorkOps from "../../../assets/images/projects/workops.png";
import ResumeStack from "../../../assets/images/projects/resume_stack.png";
import RealTimeFraudDetection from "../../../assets/images/projects/real_time_fraud_detection.png";

import CS407 from "../../../assets/images/courses/compsci407.png";
import CS571 from "../../../assets/images/courses/compsci571.gif";
import CS506 from "../../../assets/images/courses/compsci506.png";
import CS579 from "../../../assets/images/courses/compsci579.gif";
import CS559 from "../../../assets/images/courses/compsci559.gif";

export const projects = [
    {
        id: "real-time-fraud-detection",
        image: RealTimeFraudDetection,
        title: "Real-Time Fraud Detection",
        category: "Machine Learning Web Platform",
        description:
            "An enterprise-grade streaming analytics platform designed to detect payment fraud in real-time using Machine Learning, Geo-Velocity Analysis, and a Data Lakehouse Architecture.",
        ghLink: "https://github.com/arunike/Resume-Stack",
        tags: [
            "Kafka",
            "Spark",
            "Delta Lake",
            "Redis",
            "Python",
            "Airflow",
            "Kubernetes",
            "PostgreSQL",
        ],
        isFeatured: true,
        dateAdded: "2026-01-11",
    },
    {
        id: "resume-stack",
        image: ResumeStack,
        title: "Resume Stack",
        category: "Resume Builder Web Platform",
        description:
            "A client-side resume builder application built with modern web technologies. It empowers users to design, customize, and export their resumes without compromising their data privacy. Unlike other platforms, Resume Stack runs entirely in your browser—your data stays with you.",
        ghLink: "https://github.com/arunike/Resume-Stack",
        tags: ["React", "TypeScript", "Tailwind CSS"],
        demoLink: "https://richiez28.github.io/projects/resume-stack/",
        isFeatured: true,
        dateAdded: "2026-01-10",
    },
    {
        id: "workops",
        image: WorkOps,
        title: "WorkOps",
        category: "HR Management Web Platform",
        description:
            "A modern web application that transforms standard HR tasks into an interactive and data-driven experience. It combines traditional employee management with social recognition features and powerful analytics.",
        ghLink: "https://github.com/arunike/WorkOps-Frontend",
        tags: ["React", "JavaScript", "Go", "MySQL"],
        isFeatured: true,
        dateAdded: "2026-01-04",
    },
    {
        id: "black-gold-poker",
        image: BlackGoldPoker,
        title: "Black Gold Poker",
        category: "Computer Vision Web Experience",
        description:
            "An immersive 3D tarot card experience controlled by hand gestures through your webcam. Experience mystical card readings with intuitive gesture controls and stunning visual effects.",
        ghLink: "https://github.com/arunike/Black-Gold-Poker",
        demoLink: "https://richiez28.github.io/projects/poker",
        tags: ["React", "Typescript", "Three.js", "MediaPipe", "WebGL", "GLSL"],
        isFeatured: false,
        dateAdded: "2025-12-14",
    },
    {
        id: "blue-drop",
        image: CS407,
        title: "BlueDrop",
        category: "Android File Sharing Mobile App",
        description:
            "BlueDrop was a project built in my COMP SCI 407 course. Using the power of WIFI, BlueDrop makes file sharing as simple as a tap. We want to bring this essential to Android users to let them share a comparable experience, like using AirDrop seamlessly and easily. This tool is revolutionary useful if people are tired of using the internet to transfer files, which would cost a lot of effort and time. In our app, you can share your file just a tap away.",
        ghLink: "https://github.com/arunike/BlueDrop",
        tags: ["Android", "Kotlin"],
        isFeatured: true,
    },
    {
        id: "acm-algorithms",
        image: ACMAlgorithms,
        title: "ACM Algorithms",
        category: "Algorithm Visualization Web Platform",
        description:
            "ACM Algorithms is an interactive problem solving and visualization platform that makes algorithmic thinking visible while you code. As you work through algorithm challenges, it dynamically visualizes control flow, data structures, and state changes in real time, turning abstract logic into clear, intuitive visuals and bridging the gap between writing code and understanding how the solution works step by step.",
        ghLink: "https://github.com/arunike/ACM-Algorithm",
        tags: ["React", "JavaScript", "Django", "Python"],
        isFeatured: false,
    },
    {
        id: "portfolio-react",
        image: PortfolioOld,
        title: "Portfolio React",
        category: "Portfolio Website",
        description:
            "A old version of my portfolio website built with React.js.",
        ghLink: "https://github.com/arunike/Portfolio-React",
        demoLink: "https://cqawesome.github.io",
        tags: ["React", "JavaScript", "CSS", "HTML"],
        isFeatured: false,
    },
    {
        id: "comp-sci-571",
        image: CS571,
        title: "COMP SCI 571",
        category: "Coursework",
        description:
            "Building User Interfaces - A comprehensive course covering web, mobile, and voice interfaces. Projects include React web apps, React Native mobile apps, and Dialogflow chatbots.",
        ghLink: "https://github.com/arunike/CS571",
        demoLinks: [
            "http://arunike.github.io/compsci571/homework01/index.html",
            "https://github.com/arunike/CS571/tree/main/Homework%2002",
            "https://github.com/arunike/CS571/tree/main/Homework%2003",
            "https://github.com/arunike/CS571/tree/main/Homework%2004",
            "https://github.com/arunike/CS571/tree/main/Homework%2005",
            "https://github.com/arunike/CS571/tree/main/Homework%2006",
            "https://github.com/arunike/CS571/tree/main/Homework%2007",
            "https://github.com/arunike/CS571/tree/main/Homework%2008",
            "https://github.com/arunike/CS571/tree/main/Homework%2009",
            "https://github.com/arunike/CS571/tree/main/Homework%2011",
            "https://github.com/arunike/CS571/tree/main/Homework%2012",
        ],
        tags: ["React", "React Native", "JavaScript", "Dialogflow"],
        isFeatured: false,
    },
    {
        id: "cyberpunk-vr",
        image: CS579,
        title: "Cyberpunk VR",
        category: "VR Racing Game",
        description:
            "Cyberpunk VR Racing Game was a project built in my COMP SCI 579 course, it is VR racing game, that focuses on the details of the futuristic city and track design. As a team, we created a city that has a distinct cyberpunk aesthetic, with towering skyscrapers, neon lights, and gritty, industrial elements. The track is challenging, with twists, turns, and obstacles that require skillful driving to navigate. The game appeal to fans of both cyberpunk and racing games.",
        demoLink: "https://youtu.be/K6kVYzrBCss",
        tags: ["Unity", "C#", "VR"],
        isFeatured: true,
    },
    {
        id: "five-course-bird-feeder",
        image: CS506,
        title: "Five Course Bird Feeder",
        category: "AI Computer Vision Web App",
        description:
            "Five Course Bird Feeder was a project built in my COMP SCI 506 course and is a modern web application that transforms backyard bird watching into an intelligent, data-driven experience. Using computer vision and machine learning, the system automatically detects, identifies, and tracks bird species visiting your feeder in real-time.",
        ghLink: "https://github.com/arunike/Five-Course-Bird-Feeder-Frontend",
        tags: [
            "React",
            "TypeScript",
            "Spring Boot",
            "Java",
            "TensorFlow",
            "MobileNet",
        ],
        isFeatured: true,
    },
    {
        id: "comp-sci-559",
        image: CS559,
        title: "COMP SCI 559",
        category: "Coursework",
        description:
            "Computer Graphics course covering image representation, 3D modeling, transformation, curves and surfaces, rendering, animation, and visualization using WebGL and Three.js.",
        ghLink: "https://github.com/arunike/CS559",
        demoLinks: [
            "http://arunike.github.io/compsci559/project01/index.html",
            "http://arunike.github.io/compsci559/project02/index.html",
            "http://arunike.github.io/compsci559/project03/index.html",
            "http://arunike.github.io/compsci559/project04/index.html",
            "http://arunike.github.io/compsci559/project05/index.html",
            "https://tinyurl.com/258vrbwn",
            "http://arunike.github.io/compsci559/project07/index.html",
            "http://arunike.github.io/compsci559/project08/index.html",
        ],
        tags: ["JavaScript", "WebGL", "Three.js"],
        isFeatured: false,
    },
    {
        id: "mias-portfolio",
        image: MiasPortfolio,
        title: "Mia's Portfolio",
        category: "Portfolio Website",
        description:
            "A beautiful and responsive portfolio website built with modern web technologies.",
        ghLink: "https://github.com/miaaamao/miaaamao.github.io",
        demoLink: "https://miaaamao.github.io",
        tags: ["React", "JavaScript", "CSS", "HTML"],
        isFeatured: false,
    },
    {
        id: "piano-tiles",
        image: PianoTiles,
        title: "Piano Tiles Game",
        category: "Browser Rhythm Game",
        description:
            "Rhythm game replica where the player's objective is to tap on the black tiles as they appear from the top of the screen while avoiding the white tiles.",
        ghLink: "https://github.com/arunike/Piano-Tiles",
        demoLink: "http://arunike.github.io/project/piano_tiles/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "pacman",
        image: Pacman,
        title: "Pacman Game",
        category: "Browser Arcade Game",
        description:
            "Classic arcade game replica built with JavaScript. Navigate Pacman through a maze, eat all pellets while avoiding ghosts. If a ghost catches Pacman, the game is over.",
        ghLink: "https://github.com/arunike/Pacman",
        demoLink: "http://arunike.github.io/project/pacman/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "login-page",
        image: LoginPage,
        title: "Login Page",
        category: "UI Component Demo",
        description:
            "Simple login page with register functionality built with HTML and CSS. Clean and elegant design with smooth transitions.",
        ghLink: "https://github.com/arunike/Login-Page",
        demoLink: "http://arunike.github.io/project/login_page/index.html",
        tags: ["HTML", "CSS", "UI Design"],
        isFeatured: false,
    },
    {
        id: "go-game",
        image: GoGame,
        title: "Go Game AI",
        category: "Game AI Game",
        description:
            "Ancient board game Go designed with competitive AI opponent. Go is an abstract strategy board game where the aim is to surround more territory than the opponent.",
        ghLink: "https://github.com/arunike/Go",
        tags: ["Python", "AI", "Game Theory"],
        isFeatured: false,
    },
    {
        id: "snake-game",
        image: SnakeGame,
        title: "Snake Game",
        category: "Python Gui Game",
        description:
            "Classic snake game where player maneuvers a growing line. The player must keep the snake from colliding with obstacles and itself, which gets harder as the snake lengthens.",
        ghLink: "https://github.com/arunike/Snake",
        tags: ["Python", "Pygame", "Game Dev"],
        isFeatured: false,
    },
    {
        id: "blinn-phong",
        image: BlinnPhong,
        title: "Blinn-Phong Shading",
        category: "WebGL Graphics Demo",
        description:
            "WebGL program showing Blinn-Phong reflection animation. Uses halfway vector between view and light direction for specular highlights, overcoming limitations of basic Phong shading.",
        ghLink: "https://github.com/arunike/Blinn-Phong",
        demoLink: "http://arunike.github.io/project/blinn_phong/index.html",
        tags: ["JavaScript", "WebGL", "GLSL"],
        isFeatured: false,
    },
    {
        id: "game-2048",
        image: Game2048,
        title: "2048 Game",
        category: "Browser Puzzle Game",
        description:
            "Replicated 2048 game - slide numbered tiles on a grid to combine them and create a tile with the number 2048. Can continue playing after reaching the goal to create larger numbers.",
        ghLink: "https://github.com/arunike/2048",
        demoLink: "http://arunike.github.io/project/2048/index.html",
        tags: ["JavaScript", "HTML", "CSS"],
        isFeatured: false,
    },
    {
        id: "song-of-the-wind",
        image: SongOfTheWind,
        title: "Song of the Wind Piano",
        category: "Java Music Program",
        description:
            "Java implementation of a piano that plays 'Song of the Wind'. The wind symbolizes freedom in this musical piece.",
        ghLink: "https://github.com/arunike/Song-of-the-Wind-Piano",
        tags: ["Java"],
        isFeatured: false,
        dateAdded: "",
    },
    {
        id: "html-portfolio",
        image: HTMLPortfolio,
        title: "HTML Portfolio Website",
        category: "Portfolio Website",
        description:
            "Portfolio website using HTML, CSS, and JavaScript. Features about me, skills, projects, experience timeline, contact sections, and a dedicated projects page.",
        ghLink: "https://github.com/arunike/Portfolio-HTML",
        demoLink: "https://richiez28.github.io/legacy/index.html",
        tags: ["HTML", "CSS", "JavaScript"],
        isFeatured: false,
        dateAdded: "2023-04-22",
    },
];
