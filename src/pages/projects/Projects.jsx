import { useEffect, useRef } from "react";
import Nav from "../../components/Nav";
import ProjectCard from "../../components/ProjectCard";
import Footer from "../../components/sections/Footer";

// Import project images
import PortfolioOld from "../../assets/images/projects/portfolio_old.gif";
import MiasPortfolio from "../../assets/images/projects/mias_portfolio.gif";
import ResumeBuilder from "../../assets/images/projects/resume_builder.png";
import VHR from "../../assets/images/projects/vhr.png";
import Pacman from "../../assets/images/projects/pacman.gif";
import GoGame from "../../assets/images/projects/go_game.gif";
import SnakeGame from "../../assets/images/projects/snake_game.gif";
import PianoTiles from "../../assets/images/projects/piano_tiles.gif";
import Game2048 from "../../assets/images/projects/2048_game.gif";
import BlinnPhong from "../../assets/images/projects/blinn_phong.gif";
import LaTeXResume from "../../assets/images/projects/latex_resume.png";
import W2PDF from "../../assets/images/projects/w2pdf.png";
import LoginPage from "../../assets/images/projects/login_page.png";
import HTMLPortfolio from "../../assets/images/projects/html_portfolio.png";
import SongOfTheWind from "../../assets/images/projects/song_of_the_wind_piano.png";
import CS407 from "../../assets/images/courses/compsci407.png";
import CS571 from "../../assets/images/courses/compsci571.gif";
import CS506 from "../../assets/images/courses/compsci506.png";
import CS579 from "../../assets/images/courses/compsci579.gif";
import CS559 from "../../assets/images/courses/compsci559.gif";

const Projects = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.add("projects-header-animated");
        }
    }, []);

    const projectsData = [
        {
            imgPath: PortfolioOld,
            title: "Portfolio React",
            description:
                "A old version of my portfolio website built with React.js.",
            ghLink: "https://github.com/arunike/Portfolio-React",
            demoLink: "https://cqawesome.github.io",
            tags: ["React", "JavaScript", "CSS", "HTML"],
        },
        {
            imgPath: MiasPortfolio,
            title: "Mia's Portfolio",
            description:
                "A beautiful and responsive portfolio website built with modern web technologies.",
            ghLink: "https://github.com/miaaamao/miaaamao.github.io",
            demoLink: "https://miaaamao.github.io",
            tags: ["React", "JavaScript", "CSS", "HTML"],
        },
        {
            imgPath: CS407,
            title: "BlueDrop",
            description:
                "Mobile application for water quality monitoring and community engagement.",
            ghLink: "https://github.com/arunike/BlueDrop",
            tags: ["Android", "Kotlin", "Firebase"],
        },
        {
            imgPath: ResumeBuilder,
            title: "Resume Builder",
            description:
                "Interactive resume builder with real-time preview and PDF export.",
            ghLink: "https://github.com/arunike/resume-builder",
            tags: ["React", "Node.js", "PDF.js"],
        },
        {
            imgPath: CS571,
            title: "COMP SCI 571",
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
                "https://github.com/arunike/CS571/tree/main/Homework%2010",
                "https://github.com/arunike/CS571/tree/main/Homework%2011",
                "https://github.com/arunike/CS571/tree/main/Homework%2012",
            ],
            tags: ["React", "React Native", "JavaScript", "Dialogflow"],
        },
        {
            imgPath: VHR,
            title: "VHR",
            description:
                "Human resources management system that separates front and back end services. Implemented job management, employee information, payroll management, and system notifications.",
            ghLink: "https://github.com/arunike/vhr",
            tags: ["Java", "Spring Boot", "Vue.js", "MySQL"],
        },
        {
            imgPath: CS506,
            title: "Five Course Bird Feeder",
            description:
                "Smart bird feeder using machine learning to detect and track bird species. Features livestream, statistics, and customizable feeding schedules based on detected species.",
            ghLink: "https://github.com/arunike/Five-Course-Bird-Feeder-Frontend",
            tags: ["React", "Machine Learning", "Computer Vision", "YOLO"],
        },
        {
            imgPath: CS579,
            title: "Cyberpunk VR Racing Game",
            description:
                "VR racing game focused on futuristic city and track design. Features towering skyscrapers, neon lights, and challenging tracks with twists, turns, and obstacles requiring skillful driving.",
            demoLink: "https://youtu.be/K6kVYzrBCss",
            tags: ["Unity", "C#", "VR"],
        },
        {
            imgPath: CS559,
            title: "COMP SCI 559",
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
        },
        {
            imgPath: Pacman,
            title: "Pacman Game",
            description:
                "Classic arcade game replica built with JavaScript. Navigate Pacman through a maze, eat all pellets while avoiding ghosts. If a ghost catches Pacman, the game is over.",
            ghLink: "https://github.com/arunike/Pacman",
            demoLink: "http://arunike.github.io/project/pacman/index.html",
            tags: ["JavaScript", "HTML", "CSS"],
        },
        {
            imgPath: GoGame,
            title: "Go Game AI",
            description:
                "Ancient board game Go designed with competitive AI opponent. Go is an abstract strategy board game where the aim is to surround more territory than the opponent, invented in China over 2,500 years ago.",
            ghLink: "https://github.com/arunike/Go",
            tags: ["Python", "AI", "Game Theory"],
        },
        {
            imgPath: SnakeGame,
            title: "Snake Game",
            description:
                "Classic snake game where player maneuvers a growing line. The player must keep the snake from colliding with obstacles and itself, which gets harder as the snake lengthens.",
            ghLink: "https://github.com/arunike/Snake",
            tags: ["Python", "Pygame", "Game Dev"],
        },
        {
            imgPath: PianoTiles,
            title: "Piano Tiles Game",
            description:
                "Rhythm game replica where the player's objective is to tap on the black tiles as they appear from the top of the screen while avoiding the white tiles.",
            ghLink: "https://github.com/arunike/Piano-Tiles",
            demoLink: "http://arunike.github.io/project/piano_tiles/index.html",
            tags: ["JavaScript", "HTML", "CSS"],
        },
        {
            imgPath: Game2048,
            title: "2048 Game",
            description:
                "Replicated 2048 game - slide numbered tiles on a grid to combine them and create a tile with the number 2048. Can continue playing after reaching the goal to create larger numbers.",
            ghLink: "https://github.com/arunike/2048",
            demoLink: "http://arunike.github.io/project/2048/index.html",
            tags: ["JavaScript", "HTML", "CSS"],
        },
        {
            imgPath: BlinnPhong,
            title: "Blinn-Phong Shading",
            description:
                "WebGL program showing Blinn-Phong reflection animation. Uses halfway vector between view and light direction for specular highlights, overcoming limitations of basic Phong shading.",
            ghLink: "https://github.com/arunike/Blinn-Phong",
            demoLink: "http://arunike.github.io/project/blinn_phong/index.html",
            tags: ["JavaScript", "WebGL", "GLSL"],
        },
        {
            imgPath: LaTeXResume,
            title: "LaTeX Resume Template",
            description:
                "Professional LaTeX resume template designed to showcase education, experience, projects, and technical skills with a visually appealing layout.",
            ghLink: "https://github.com/arunike/LaTex-Resume",
            tags: ["LaTeX", "Document Design"],
        },
        {
            imgPath: W2PDF,
            title: "Word to PDF Converter",
            description:
                "Simple GUI application built with Python that allows users to convert DOCX files into PDF format with ease.",
            ghLink: "https://github.com/arunike/Word2Pdf",
            tags: ["Python", "Tkinter", "GUI"],
        },
        {
            imgPath: LoginPage,
            title: "Login Page",
            description:
                "Simple login page with register functionality built with HTML and CSS. Clean and elegant design with smooth transitions.",
            ghLink: "https://github.com/arunike/Login-Page",
            demoLink: "http://arunike.github.io/project/login_page/index.html",
            tags: ["HTML", "CSS", "UI Design"],
        },
        {
            imgPath: HTMLPortfolio,
            title: "HTML Portfolio Website",
            description:
                "Portfolio website using HTML, CSS, and JavaScript. Features about me, skills, projects, experience timeline, contact sections, and a dedicated projects page.",
            ghLink: "https://github.com/arunike/Portfolio-HTML",
            demoLink: "https://richiez28.github.io",
            tags: ["HTML", "CSS", "JavaScript"],
        },
        {
            imgPath: SongOfTheWind,
            title: "Song of the Wind Piano",
            description:
                "Java implementation of a piano that plays 'Song of the Wind'. The wind symbolizes freedom in this musical piece.",
            ghLink: "https://github.com/arunike/Song-of-the-Wind-Piano",
            tags: ["Java", "Music", "GUI"],
        },
    ];

    return (
        <div className="page projects-page">
            <Nav />
            <section className="projects-section">
                <div className="projects-container">
                    <div className="projects-header" ref={headerRef}>
                        <h1 className="projects-heading">My Projects</h1>
                        <p className="projects-subtitle">
                            A collection of my work spanning apps, websites,
                            mobile, games, and computer graphics developments.
                        </p>
                        <div className="projects-stats">
                            <div className="stat-item">
                                <span className="stat-number">
                                    {projectsData.length}
                                </span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">
                                    {
                                        new Set(
                                            projectsData.flatMap((p) => p.tags)
                                        ).size
                                    }
                                </span>
                                <span className="stat-label">Technologies</span>
                            </div>
                        </div>
                    </div>

                    <div className="projects-grid">
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={index}
                                imgPath={project.imgPath}
                                title={project.title}
                                description={project.description}
                                ghLink={project.ghLink}
                                demoLink={project.demoLink}
                                demoLinks={project.demoLinks}
                                tags={project.tags}
                            />
                        ))}
                    </div>

                    <div className="github-cta">
                        <h2>Want to see more?</h2>
                        <p>
                            Check out my GitHub for more projects and
                            contributions
                        </p>
                        <a
                            href="https://github.com/arunike"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-button"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            Visit My GitHub
                        </a>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Projects;
