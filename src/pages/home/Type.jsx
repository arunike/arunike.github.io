import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          'A Software Engineer',
          'A Full-Stack Developer',
          'A Front-End Developer',
          'A Back-End Developer',
          'A Mobile Developer',
          'A Software Engineer Intern',
          'A Software Developer Intern',
          'A Full-Stack Developer Intern',
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
