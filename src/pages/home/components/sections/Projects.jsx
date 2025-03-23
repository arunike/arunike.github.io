import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoLogoGithub } from "react-icons/io";
import Particle from "../../../../components/Particle";
import ProjectCard from "../../../projects/ProjectCards";

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
    return (
        <Container>
        <h1 className="project-heading">
            PROJECT
        </h1> <br /> <br />
        <Particle />
        <Container>
            <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={MiasPortfolio}
                isBlog={false}
                title="Mia's Portfolio"
                ghLink="https://github.com/miaaamao/miaaamao.github.io"
                demoLinks={[ "https://miaaamao.github.io/" ]}
                demoName="Demo"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={CS407}
                isBlog={false}
                title="BlueDrop"
                ghLink="https://github.com/arunike/BlueDrop"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={ResumeBuilder}
                isBlog={false}
                title="Resume Builder"
                ghLink="https://github.com/arunike/resume-builder"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={CS571}
                isBlog={false}
                title="COMP SCI 571"
                ghLink="https://github.com/arunike/CS571"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={VHR}
                isBlog={false}
                title="VHR"
                ghLink="https://github.com/arunike/vhr"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={CS506}
                isBlog={false}
                title="Five Course Bird Feeder"
                ghLink="https://github.com/arunike/Five-Course-Bird-Feeder-Frontend"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={CS579}
                isBlog={false}
                title="Cyberpunk VR Racing Game"
                demoLinks={[ CyberpunkVRRacingGame ]}
                demoName="Demo"
                demoLinkIsVideo={{ CyberpunkVRRacingGame: true }}
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={CS559}
                isBlog={false}
                title="COMP SCI 559"
                ghLink="https://github.com/arunike/CS559"
                />
            </Col>

            <Col md={4} className="project-card">
                <ProjectCard
                imgPath={PACMAN}
                isBlog={false}
                title="Pacman Game"
                ghLink="https://github.com/arunike/Pacman"
                demoLinks={[ "http://arunike.github.io/project/pacman/index.html" ]}
                demoName="Demo"
                />
            </Col>
            </Row>
            <div className="container text-center mt-5">
            <h2>To visit more of my projects</h2> 
            <a href="https://github.com/arunike" className="btn btn-xl btn-dark" target="blank">Visit My GitHub &nbsp; <IoLogoGithub />  </a>
            </div>
        </Container>
        </Container>
    );
}

export default Projects;