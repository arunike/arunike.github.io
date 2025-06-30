import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io";
import Particle from "../../../../components/Particle";
import ProjectCard from "../../../projects/ProjectCards";

// Import project images and assets
import MiasPortfolio from "../../../../assets/imgs/projects/mias_portfolio.gif";
import CS407 from "../../../../assets/imgs/courses/compsci407.png";
import ResumeBuilder from "../../../../assets/imgs/projects/resume_builder.png";
import CS571 from "../../../../assets/imgs/courses/compsci571.gif";
import VHR from "../../../../assets/imgs/projects/vhr.png";
import CS506 from "../../../../assets/imgs/courses/compsci506.png";
import CS579 from "../../../../assets/imgs/courses/compsci579.gif";
import CS559 from "../../../../assets/imgs/courses/compsci559.gif";
import PACMAN from "../../../../assets/imgs/projects/pacman.gif";
import CyberpunkVRRacingGame from "../../../../assets/video/cs579/cyberpunk_vr_racing_game_demo.mp4";

function Projects() {
  const projectsData = [
    {
      id: "mias-portfolio",
      imgPath: MiasPortfolio,
      title: "Mia's Portfolio",
      ghLink: "https://github.com/miaaamao/miaaamao.github.io",
      demoLinks: ["https://miaaamao.github.io/"],
      demoName: "Demo",
    },
    {
      id: "bluedrop",
      imgPath: CS407,
      title: "BlueDrop",
      ghLink: "https://github.com/arunike/BlueDrop",
    },
    {
      id: "resume-builder",
      imgPath: ResumeBuilder,
      title: "Resume Builder",
      ghLink: "https://github.com/arunike/resume-builder",
    },
    {
      id: "cs571-projects",
      imgPath: CS571,
      title: "COMP SCI 571",
      ghLink: "https://github.com/arunike/CS571",
    },
    {
      id: "vhr-system",
      imgPath: VHR,
      title: "VHR",
      ghLink: "https://github.com/arunike/vhr",
    },
    {
      id: "bird-feeder",
      imgPath: CS506,
      title: "Five Course Bird Feeder",
      ghLink: "https://github.com/arunike/Five-Course-Bird-Feeder-Frontend",
    },
    {
      id: "vr-racing-game",
      imgPath: CS579,
      title: "Cyberpunk VR Racing Game",
      demoLinks: [CyberpunkVRRacingGame],
      demoName: "Demo",
      demoLinkIsVideo: { [CyberpunkVRRacingGame]: true },
    },
    {
      id: "cs559-graphics",
      imgPath: CS559,
      title: "COMP SCI 559",
      ghLink: "https://github.com/arunike/CS559",
    },
    {
      id: "pacman-game",
      imgPath: PACMAN,
      title: "Pacman Game",
      ghLink: "https://github.com/arunike/Pacman",
      demoLinks: ["http://arunike.github.io/project/pacman/index.html"],
      demoName: "Demo",
    },
  ];

  const githubSection = {
    title: "To visit more of my projects",
    buttonText: "Visit My GitHub",
    url: "https://github.com/arunike",
  };

  const renderProjectCard = (project, index) => (
    <Col md={4} className="project-card" key={project.id}>
      <ProjectCard
        imgPath={project.imgPath}
        isBlog={false}
        title={project.title}
        ghLink={project.ghLink}
        demoLinks={project.demoLinks}
        demoName={project.demoName}
        demoLinkIsVideo={project.demoLinkIsVideo}
        animationDelay={`${index * 0.1}s`}
      />
    </Col>
  );

  const renderGitHubSection = () => (
    <div className="github-section text-center mt-5">
      <h2 className="github-title">{githubSection.title}</h2>
      <a
        href={githubSection.url}
        className="btn btn-xl btn-dark github-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        {githubSection.buttonText} &nbsp; <IoLogoGithub />
      </a>
    </div>
  );

  return (
    <Container fluid className="project-section">
      <Container>
        <div className="project-header">
          <h1 className="project-heading">
            MY PROJECTS
            <span className="project-count">({projectsData.length})</span>
          </h1>
          <p className="project-subtitle">
            A showcase of my technical projects and creative solutions
          </p>
        </div>

        <Particle />

        <Row className="project-grid">
          {projectsData.map((project, index) =>
            renderProjectCard(project, index),
          )}
        </Row>

        {renderGitHubSection()}
      </Container>
    </Container>
  );
}

export default Projects;
