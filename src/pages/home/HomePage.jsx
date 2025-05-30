import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../../components/Particle";

import Header from "./components/Header";
import AboutMe from "./components/sections/AboutMe";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Timeline from "./components/sections/Timeline";
import Contact from "./components/sections/Contact";

function Home() {
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