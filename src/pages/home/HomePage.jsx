import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { IoLogoGithub } from "react-icons/io";

import Particle from "../../components/Particle";
import Type from "./Type";
import Github from "./about/Github";
import ProgrammingLangStack from "./about/ProgrammingLangStack";
import FrameworkStack from "./about/FrameworkStack";
import DatabaseStack from "./about/DatabaseStack";
import WebDevStack from "./about/WebDevStack";
import ToolStack from "./about/ToolStack";
import OtherStack from "./about/OtherStack";
import ProjectCard from "../projects/ProjectCards";
import ProjectCardEffect from "../../components/ProjectCardEffect";

import Resume from "../../assets/resume/Richies_Resume.pdf";
import homeLogo from "../../assets/imgs/purple-profile.png";
import myImg from "./../../assets/imgs/about-me.png";
import UNFCU from "../../assets/imgs/timeline/UNFCU.png";
import Rockitcoin from "../../assets/imgs/timeline/Rockitcoin.png";
import NorthernTrust from "../../assets/imgs/timeline/NorthernTrust.png";

import ResumeBuilder from "../../assets/imgs/projects/resume-builder.png";
import VHR from "../../assets/imgs/projects/vhr.png";
import CS571 from "../../assets/imgs/courses/compsci571.png";
import CS407 from "../../assets/imgs/courses/compsci407.png";
import CS506 from "../../assets/imgs/courses/compsci506.png";
import CS559 from "../../assets/imgs/courses/compsci559.png";
import CS579 from "../../assets/imgs/courses/compsci579.png";
import PACMANG from "../../assets/imgs/projects/pac-man.png";
import QIANS from "../../assets/imgs/projects/qians-portfolio.png";

import CyberpunkVRRacingGame from "../../assets/video/cs579/cyberpunk vr racing game demo.mp4";

function Home() {
  useEffect(() => {
      const timer = setTimeout(() => {
        ProjectCardEffect('.home-header');
        ProjectCardEffect('.home-logo');
        ProjectCardEffect('.home-about-description');
        ProjectCardEffect('.myAvatar');
        ProjectCardEffect('.project-card');
        ProjectCardEffect('.tech-icons');
      }, 1200);

      return () => clearTimeout(timer);  // Cleanup on component unmount
  }, []);

  return (
      <section>
        <Container fluid className="home-section" id="home">
          <Particle />
          <Container className="home-content">
            <Row>
              <Col md={7} className="home-header">
                <h1 style={{ paddingBottom: 15 }} className="heading">
                  Hell0{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1>

                <h1 className="heading-name">
                  I'M
                  <strong className="main-name"> Richie Zhou</strong>
                </h1>

                <div style={{ padding: 50, textAlign: "left" }}>
                  <Type />
                </div>
              </Col>

              <Col md={5} className="home-logo" style={{ paddingBottom: 20 }}>
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="img-fluid"
                  style={{ maxHeight: "450px" }}
                />
              </Col>
            </Row>
          </Container>
        </Container>

        <Container fluid className="home-about-section" id="about_me">
          <Container>
            <Row>
              <Col md={8} className="home-about-description">
                <h1 style={{ fontSize: "2.6em" }}>ABOUT ME</h1>
                <p className="home-about-body">
                  Currently, I'm pursuing my master's in Computer Science at <a href="" target="blank">University</a>. Previously, I earned my bachelor's degree in Computer Science & Data Science from the <a href="https://cdis.wisc.edu/" target="blank">University of Wisconsin-Madison</a>.
                  <br /> <br />
                  Ever since I was young, programming have been something that I am passionate doing.
                  I have been trying to code various of applications and platforms, including web development, application development, and data analyst.
                  I would like to utilize my skills as a Software Developer to create applications that can help the people in need.
                  <br />
                </p>
                <Col md={4}>
                  <a className="primary_btn" href={Resume}> <span>Download resume</span> </a>
                </Col>
              </Col>

              <Col md={4} className="myAvatar">
                <Tilt>
                  <img src={myImg} className="img-fluid" alt="avatar" />
                </Tilt>
              </Col>
            </Row>
          </Container>
      </Container>

        <Container fluid className="about-section" id="skills">
          <Particle />
          <Container>
            <h1 className="project-heading">
              SKILLS
            </h1> <br /> <br />
              <h1 className="project-heading">
              <strong className="purple">Programming Languages</strong>
              </h1>
              <ProgrammingLangStack />

              <h1 className="project-heading">
              <strong className="purple">Web Development</strong>
              </h1>
              <WebDevStack />

              <h1 className="project-heading">
                <strong className="purple">Frameworks</strong>
              </h1>
              <FrameworkStack />

              <h1 className="project-heading">
              <strong className="purple">Database & Tools</strong>
              </h1>
              <DatabaseStack />

              <h1 className="project-heading">
              <strong className="purple">Tools</strong>
              </h1>
              <ToolStack />

              <h1 className="project-heading">
              <strong className="purple">Others</strong>
              </h1>
              <OtherStack />

              <Github />
          </Container>
        </Container> <br /> <br /> <br />

        <Container>
          <h1 className="project-heading">
            PROJECT
          </h1> <br /> <br />
            <Particle />
            <Container>
              <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
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
                    imgPath={QIANS}
                    isBlog={false}
                    title="Qian's Portfolio"
                    ghLink="https://github.com/arunike/Portfolio-Qian"
                    demoLinks={[ "https://chenqian0403.github.io/" ]}
                    demoName="Demo"
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
                    imgPath={PACMANG}
                    isBlog={false}
                    title="Pac-Man Game"
                    ghLink="https://github.com/arunike/Pac-Man"
                    demoLinks={[ "http://arunike.github.io/project/pac_man/index.html" ]}
                    demoName="Demo"
                  />
                </Col>
              </Row>
              <div class="container text-center mt-5">
                <h2>To visit more of my projects</h2> 
                <a href="https://github.com/arunike" class="btn btn-xl btn-dark" target="blank">Visit My GitHub &nbsp; <IoLogoGithub />  </a>
              </div>
          </Container>
        </Container> <br /> <br /> <br />

        <Container id="timeline">
          <h1 className="project-heading">
              TIMELINE
          </h1> <br /> <br />
          <VerticalTimeline lineColor="#F5F5F5">
          
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              dateClassName="purple"
              date="June 2023 - August 2023"
              contentStyle={{ border: '1px outset #623686' }}
              contentArrowStyle={{ borderRight: '7px solid  #c770f0' }}
              iconStyle={{ background: '#c770f0', color: '#fff' }}
              icon={<MdWorkOutline />}
            >
              <h3 className="vertical-timeline-element-title">Software Engineer Intern</h3>
              <a href="https://www.northerntrust.com/united-states/home" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Northern Trust</h4> </a>
              <a href="https://www.northerntrust.com/united-states/home"> <img className="vertical-timeline-element-image" src={NorthernTrust} width={140} height={140} alt="NorthernTrust" /> </a>
              <h4 className="vertical-timeline-element-subtitle">Chicago, Illinois</h4>
              <p>
                Developed and optimized algorithms in Java and C++ to enhance the computational efficiency of NT's Goals Driven Wealth Management platform, leading to an 8% increase in transaction processing speed.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              dateClassName="purple"
              date="August 2022 - March 2023"
              contentStyle={{ border: '1px outset #623686' }}
              contentArrowStyle={{ borderRight: '7px solid  #c770f0' }}
              iconStyle={{ background: '#c770f0', color: '#fff' }}
              icon={<MdWorkOutline />}
            >
              <h3 className="vertical-timeline-element-title">Software Developer Intern</h3>
              <a href="https://www.rockitcoin.com/" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Rockitcoin</h4> </a>
              <a href="https://www.rockitcoin.com/"> <img className="vertical-timeline-element-image" src={Rockitcoin} width={140} height={140} alt="Rockitcoin" /> </a>
              <h4 className="vertical-timeline-element-subtitle">Chicago, Illinois</h4>
              <p>
                Revamped Rockitcoin’s user authorization interface for mobile and web platforms using React, elevating security and usability, resulting in a 20% increase in user retention rate.
              </p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              dateClassName="purple"
              date="May 2022 - August 2022"
              contentStyle={{ border: '1px outset #623686' }}
              contentArrowStyle={{ borderRight: '7px solid  #c770f0' }}
              iconStyle={{ background: '#c770f0', color: '#fff' }}
              icon={<MdWorkOutline />}
            >
              <h3 className="vertical-timeline-element-title">Full Stack Developer Intern</h3>
              <a href="https://www.rockitcoin.com/" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">UNFCU</h4> </a>
              <a href="https://www.unfcu.org/home/"> <img className="vertical-timeline-element-image" src={UNFCU} width={140} height={140} alt="UNFCU" /> </a>
              <h4 className="vertical-timeline-element-subtitle">New York, New York</h4>
              <p>
                Utilized the Next.js framework to architect and deploy intuitive entry pages, streamline navigation, and cohesively convey company culture, culminating in a measurable 30% uplift in customer satisfaction rate.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </Container>  <br /> <br /> <br />

        <Container className="contact_info" id="contact">
          <h1 className="project-heading">
            CONTACT
          </h1> <br /> <br />
          <Row className="info_item">
            <h4>
              <AiOutlineMail style={{color: "#c770f0"}}/>
                <a href="mailto:richiezhouyjz@gmail.com">zhou469@wisc.edu || richiezhouyjz@gmail.com</a>
            </h4>

            <h4>
              <AiFillLinkedin style={{color: "#c770f0"}}/>
              <a href="https://www.linkedin.com/in/richiezhou/">linkedin.com/in/richiezhou/</a>
            </h4>

            <h4>
              <AiFillGithub style={{color: "#c770f0"}}/>
              <a href="https://github.com/arunike">github.com/arunike</a>
            </h4> <br /> <br />
          </Row>
        </Container> <br /> <br /> <br />
    </section>
  );
}

export default Home;
