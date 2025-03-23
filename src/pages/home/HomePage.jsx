import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../../components/Particle";
import ProjectCardEffect from "../../components/ProjectCardEffect";

import Header from "./components/Header";
import AboutMe from "./components/sections/AboutMe";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import Contact from "./components/sections/Contact";

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

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Header />
      </Container>

      <AboutMe />

      <Skills />

      <Projects />

      <Timeline />

      <Contact />
    </section>
  );
}

export default Home;