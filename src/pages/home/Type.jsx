import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          'Software Engineer',
          'Full-Stack Developer',
          'Front-End Developer',
          'Back-End Developer',
          'Mobile Developer',
          'Software Engineer Intern',
          'Software Developer Intern',
          'Full-Stack Developer Intern',
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
