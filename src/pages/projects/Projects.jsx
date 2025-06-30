import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../../components/Particle";

import VHR from "../../assets/imgs/projects/vhr.png";
import SOTW from "../../assets/imgs/projects/song_of_the_wind_piano.png";
import Game2048 from "../../assets/imgs/projects/2048_game.gif";
import SnakeGame from "../../assets/imgs/projects/snake_game.gif";
import GoGame from "../../assets/imgs/projects/go_game.gif";
import PACMAN from "../../assets/imgs/projects/pacman.gif";
import PianoTiles from "../../assets/imgs/projects/piano_tiles.gif";
import LoginPage from "../../assets/imgs/projects/login_page.png";
import BlinnPhong from "../../assets/imgs/projects/blinn_phong.gif";
import W2PDF from "../../assets/imgs/projects/w2pdf.png";
import MiasPortfolio from "../../assets/imgs/projects/mias_portfolio.gif";
import ResumeBuilder from "../../assets/imgs/projects/resume_builder.png";
import HTMLPortfolio from "../../assets/imgs/projects/html_portfolio.png";
import LaTexResume from "../../assets/imgs/projects/latex_resume.png";

import CS559 from "../../assets/imgs/courses/compsci559.gif";
import CS506 from "../../assets/imgs/courses/compsci506.png";
import CS407 from "../../assets/imgs/courses/compsci407.png";
import CS571 from "../../assets/imgs/courses/compsci571.gif";
import CS579 from "../../assets/imgs/courses/compsci579.gif";

import BadgerBakeryDemo from "../../assets/video/cs571/badger_bakery_ios_demo.mp4";
import BadgerNewsDemo from "../../assets/video/cs571/badger_news_ios_demo.mp4";
import BadgerChatDemo from "../../assets/video/cs571/badger_chat_ios_demo.mp4";
import CyberpunkVRRacingGame from "../../assets/video/cs579/cyberpunk_vr_racing_game_demo.mp4";
import BadgerChatDialogflowDemo from "../../assets/video/cs571/badger_chat_dialogflow_demo.mp4";
import SongOfTheWind from "../../assets/video/projects/song_of_the_wind_demo.mov";

function Projects() {
  const personalProjects = [
    {
      id: "mias-portfolio",
      imgPath: MiasPortfolio,
      title: "Mia's Portfolio",
      description:
        "This is a portfolio website built for my girlfriend Mia. It is built with JavaScript with React and deployed using Github Pages. The main purpose of this website is to showcase Mia's work experiences and skills. The structure of the website is as follows: Home, About Me, Experience, Project, Course Taken, Skills, Resume and Contact section",
      ghLink: "https://github.com/miaaamao/miaaamao.github.io",
      demoLinks: ["https://miaaamao.github.io"],
      demoName: "Demo",
      technologies: ["React", "JavaScript", "GitHub Pages"],
    },
    {
      id: "latex-resume",
      imgPath: LaTexResume,
      title: "LaTex Resume",
      description:
        "A LaTeX resume template designed to showcase your education, experience, projects, and technical skills. It provides a professional and visually appealing layout for creating a comprehensive resume.",
      ghLink: "https://github.com/arunike/LaTex-Resume",
      technologies: ["LaTeX"],
    },
    {
      id: "resume-builder",
      imgPath: ResumeBuilder,
      title: "Resume Builder",
      description:
        "A simple resume builder application built with Next.js and Tailwind CSS. The application allows users to create a resume by filling out a form. The resume can be downloaded as a PDF file.",
      ghLink: "https://github.com/arunike/resume-builder",
      technologies: ["Next.js", "Tailwind CSS"],
    },
    {
      id: "word-to-pdf",
      imgPath: W2PDF,
      title: "Word to PDF Converter",
      description:
        "A simple GUI built with Python that allows user to convert .DOCX into .PDF",
      ghLink: "https://github.com/arunike/Word2Pdf",
      technologies: ["Python"],
    },
    {
      id: "piano-tiles",
      imgPath: PianoTiles,
      title: "Piano Tiles Game",
      description:
        "A simple replica of Piano Tiles built with JavaScript. Piano Tiles is a game where the player's objective is to tap on the black tiles as they appear from the top of the screen while avoiding the white.",
      ghLink: "https://github.com/arunike/Piano-Tiles",
      demoLinks: ["http://arunike.github.io/project/piano_tiles/index.html"],
      demoName: "Demo",
      technologies: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: "pacman-game",
      imgPath: PACMAN,
      title: "Pacman Game",
      description:
        "A Simple replicate of Pacman built using JavaScript. Pacman is the classic arcade game. The game involves navigating Pacman through a maze. The objective is that Pacman eat all of the pellets (white circles), while avoiding the ghosts that pursue him. If a ghost ever catches Pacman then Pacman is defeated.",
      ghLink: "https://github.com/arunike/Pacman",
      demoLinks: ["http://arunike.github.io/project/pacman/index.html"],
      demoName: "Demo",
      technologies: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: "login-page",
      imgPath: LoginPage,
      title: "Login Page",
      description:
        "A simple login page with register functionality built with HTML and CSS.",
      ghLink: "https://github.com/arunike/Login-Page",
      demoLinks: ["http://arunike.github.io/project/login_page/index.html"],
      demoName: "Demo",
      technologies: ["HTML", "CSS"],
    },
    {
      id: "go-game",
      imgPath: GoGame,
      title: "Go Game",
      description:
        "A Go game designed using Python with competitive AI to compete against you. Go is an abstract strategy board game for two players in which the aim is to surround more territory than the opponent. The game was invented in China more than 2,500 years ago and is believed to be the oldest board game continuously played to the present day.",
      ghLink: "https://github.com/arunike/Go",
      technologies: ["Python"],
    },
    {
      id: "snake-game",
      imgPath: SnakeGame,
      title: "Snake Game",
      description:
        "A simple Snake Eating game built with python. Snake is when player maneuvers the end of a growing line. The player must keep the snake from colliding with both other obstacles and itself, which gets harder as the snake lengthens.",
      ghLink: "https://github.com/arunike/Snake",
      technologies: ["Python"],
    },
    {
      id: "blinn-phong",
      imgPath: BlinnPhong,
      title: "Blinn-Phong Shading",
      description:
        "A simple JavaScript Program to show the animation of Blinn-Phong reflection animation using WebGL library. Blinn-Phong reflection shading model was introduced by James F. Blinn as an extension to the Phong shading we've used so far. The Blinn-Phong model is largely similar, but approaches the specular model slightly different which as a result overcomes our problem. Instead of relying on a reflection vector we're using a so called halfway vector that is a unit vector exactly halfway between the view direction and the light direction. The closer this halfway vector aligns with the surface's normal vector, the higher the specular contribution.",
      ghLink: "https://github.com/arunike/Blinn-Phong",
      demoLinks: ["http://arunike.github.io/project/BlinnPhong/index.html"],
      demoName: "Demo",
      technologies: ["JavaScript", "WebGL"],
    },
    {
      id: "2048-game",
      imgPath: Game2048,
      title: "2048 Game",
      description:
        "Replicated 2048 game using JavaScript. The objective of the game is to slide numbered tiles on a grid to combine them to create a tile with the number 2048; however, one can continue to play the game after reaching the goal, creating tiles with larger numbers.",
      ghLink: "https://github.com/arunike/2048",
      demoLinks: ["http://arunike.github.io/project/2048/index.html"],
      demoName: "Demo",
      technologies: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: "song-of-the-wind",
      imgPath: SOTW,
      title: "Song of the Wind Piano",
      description:
        "Used Java to implement a piano play. It is a song about the wind. The wind is a symbol of freedom.",
      ghLink: "https://github.com/arunike/Song-of-the-Wind-Piano",
      demoLinks: [SongOfTheWind],
      demoName: "Demo",
      demoLinkIsVideo: { [SongOfTheWind]: true },
      technologies: ["Java"],
    },
    {
      id: "vhr-system",
      imgPath: VHR,
      title: "VHR",
      description:
        "VHR is a human resources management system that separates front and back end services. Implemented job management and title management, employee basic information management, advance search, generate excel sheet, send emails, payroll management, employee account setup, online chat, & system notifications.",
      ghLink: "https://github.com/arunike/vhr",
      technologies: ["Java", "Spring Boot", "Vue.js", "MySQL"],
    },
    {
      id: "html-portfolio",
      imgPath: HTMLPortfolio,
      title: "HTML Portfolio Website",
      description:
        "This is a portfolio website using HTML, CSS, and JavaScript. It features various of sections such as about me, skills, projects, experience timeline and contact. It also have a project page to demonstrate my projects and skills.",
      ghLink: "https://github.com/arunike/Portfolio-HTML",
      demoLinks: ["https://richiez28.github.io"],
      demoName: "Demo",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ];

  // UW-Madison Course Projects Data
  const uwMadisonProjects = [
    {
      id: "cs571",
      imgPath: CS571,
      title: "COMP SCI 571",
      description:
        "Introduces software development of user interfaces (UIs). Build competence in implementing UIs using state-of-the-art (1) UI paradigms, such as event-driven interfaces, direct-manipulation interfaces, and dialogue-based interaction; (2) methods for capturing, interpreting, and responding to different forms of user input and states, including pointing, text entry, speech, touch, gestures, user activity, context, and physiological states; and (3) platform-specific UI development APIs, frameworks, and tool kits for multiple platforms including web/mobile/desktop interfaces, natural user interfaces, and voice user interfaces. Learn about the fundamental concepts, technologies, algorithms, and methods in building user interfaces, implement UIs using of state-of-the-art UI development tools, and build a UI development projects.",
      ghLink: "https://github.com/arunike/CS571",
      demoLinks: [
        "http://arunike.github.io/compsci571/homework01/index.html",
        "https://github.com/arunike/CS571/tree/main/Homework%2002",
        "https://github.com/arunike/CS571/tree/main/Homework%2003",
        "https://github.com/arunike/CS571/tree/main/Homework%2004",
        "https://github.com/arunike/CS571/tree/main/Homework%2005",
        "https://github.com/arunike/CS571/tree/main/Homework%2006",
        BadgerBakeryDemo,
        BadgerNewsDemo,
        BadgerChatDemo,
        BadgerChatDialogflowDemo,
        "https://github.com/arunike/CS571/tree/main/Homework%2012",
      ],
      demoName: "Homework",
      demoLinkLabels: {
        [BadgerChatDialogflowDemo]: "Homework 11",
        "Homework%2012": "Homework 12",
      },
      demoLinkIsVideo: {
        [BadgerBakeryDemo]: true,
        [BadgerNewsDemo]: true,
        [BadgerChatDemo]: true,
        [BadgerChatDialogflowDemo]: true,
      },
      technologies: ["React", "React Native", "JavaScript", "Dialogflow"],
    },
    {
      id: "bluedrop",
      imgPath: CS407,
      title: "BlueDrop",
      description:
        "BlueDrop was a project built in my COMP SCI 407 course. Using the power of WIFI, BlueDrop makes file sharing as simple as a tap. We want to bring this essential to Android users to let them share a comparable experience, like using AirDrop seamlessly and easily. This tool is revolutionary useful if people are tired of using the internet to transfer files, which would cost a lot of effort and time. In our app, you can share your file just a tap away.",
      ghLink: "https://github.com/arunike/BlueDrop",
      technologies: ["Android", "Kotlin", "WiFi Direct"],
    },
    {
      id: "bird-feeder",
      imgPath: CS506,
      title: "Five Course Bird Feeder",
      description:
        "Five Course Bird Feeder was a project built in my COMP SCI 506 course and is designed to directly combat all of the issues that come with a normal bird feeder. It uses machine learning to detect and track what types of creatures visit the feeder and allows the user to control food types and availability based on that information. This allows the user to feed certain birds at certain times, keep pests from stealing birdseed, and can rotate between different bird seeds for different species of birds. This feeder will also record each bird, so even if you miss it live, you can still check out what birds visited. There will be an associated webpage that you will be able to log into and link to your feeder. This website will allow the user to view a livestream of their feeder from anywhere, display recent bird appearances that the user may have missed, and present interesting statistics about the user's feeder (when birds are visiting, which species) to allow the user to customize their feeder's settings.",
      ghLink: "https://github.com/arunike/Five-Course-Bird-Feeder-Frontend",
      technologies: ["React", "Machine Learning", "Computer Vision", "YOLO"],
    },
    {
      id: "vr-racing-game",
      imgPath: CS579,
      title: "Cyberpunk VR Racing Game",
      description:
        "Cyberpunk VR Racing Game was a project built in my COMP SCI 579 course, it is VR racing game, that focuses on the details of the futuristic city and track design. As a team, we created a city that has a distinct cyberpunk aesthetic, with towering skyscrapers, neon lights, and gritty, industrial elements. The track is challenging, with twists, turns, and obstacles that require skillful driving to navigate. The game appeal to fans of both cyberpunk and racing games.",
      demoLinks: [CyberpunkVRRacingGame],
      demoName: "Demo",
      demoLinkIsVideo: { [CyberpunkVRRacingGame]: true },
      technologies: ["Unity", "C#", "VR"],
    },
    {
      id: "cs559-graphics",
      imgPath: CS559,
      title: "COMP SCI 559",
      description:
        "Computer Graphic course that introduce: Image representation, formation, presentation, composition and manipulation. Modeling, transformation, and display of geometric objects in two and three dimensions. Representation of curves and surfaces. Rendering, animation, multi-media and visualization.",
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
      demoName: "Project",
      technologies: ["JavaScript", "WebGL", "Three.js"],
    },
  ];

  const renderProjectCards = (projects) => {
    return projects.map((project, index) => (
      <Col md={4} className="project-card" key={project.id}>
        <ProjectCard
          imgPath={project.imgPath}
          isBlog={false}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          ghLink={project.ghLink}
          demoLinks={project.demoLinks}
          demoName={project.demoName}
          demoLinkLabels={project.demoLinkLabels}
          demoLinkIsVideo={project.demoLinkIsVideo}
          animationDelay={`${index * 0.1}s`}
        />
      </Col>
    ));
  };

  const sections = {
    header: {
      title: "PROJECTS",
      subtitle: "A showcase of my technical projects and creative solutions",
    },
    personalProjects: {
      title: "Personal Projects",
      color: "#2c3e50",
    },
    uwMadisonProjects: {
      title: "UW-Madison Courses",
      color: "#C5050C",
    },
  };

  return (
    <Container fluid className="project-section">
      <div className="project-header">
        <h1 className="project-heading">{sections.header.title}</h1>
        <p className="project-subtitle">{sections.header.subtitle}</p>
      </div>

      <Particle />

      <Container>
        <section className="projects-category">
          <h2 style={{ color: sections.personalProjects.color }}>
            {sections.personalProjects.title}
          </h2>
          <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
            {renderProjectCards(personalProjects)}
          </Row>
        </section>

        <section className="projects-category">
          <h2 style={{ color: sections.uwMadisonProjects.color }}>
            {sections.uwMadisonProjects.title}
          </h2>
          <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
            {renderProjectCards(uwMadisonProjects)}
          </Row>
        </section>

        {/* Future sections can be added here */}
        {/* <section className="projects-category">
          <h2 style={{ color: "#348EDE" }}>Columbia University Courses</h2>
          <Row style={{ justifyContent: "center", paddingBottom: "40px" }}>
            {renderProjectCards(columbiaProjects)}
          </Row>
        </section> */}
      </Container>
    </Container>
  );
}

export default Projects;
