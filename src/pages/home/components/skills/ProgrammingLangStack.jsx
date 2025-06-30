import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

import Java from "../../../../assets/imgs/techstack/java.png";
import Python from "../../../../assets/imgs/techstack/python.png";
import CLanguage from "../../../../assets/imgs/techstack/c_language.png";
import CPP from "../../../../assets/imgs/techstack/cpp.png";
import RLanguage from "../../../../assets/imgs/techstack/r_language.png";
import SQL from "../../../../assets/imgs/techstack/sql.png";
import Groovy from "../../../../assets/imgs/techstack/groovy.png";
import CSharp from "../../../../assets/imgs/techstack/csharp.png";
import Kotlin from "../../../../assets/imgs/techstack/kotlin.png";
import GoLanguage from "../../../../assets/imgs/techstack/go_language.png";

const programmingLang = [
  { src: Python, alt: "Python", tooltipContent: "Python" },
  { src: GoLanguage, alt: "Go", tooltipContent: "Go" },
  { src: Java, alt: "Java", tooltipContent: "Java" },
  { src: Kotlin, alt: "Kotlin", tooltipContent: "Kotlin" },
  { src: SQL, alt: "SQL", tooltipContent: "SQL" },
  { src: Groovy, alt: "Groovy", tooltipContent: "Groovy" },
  { src: RLanguage, alt: "R", tooltipContent: "R" },
  { src: CLanguage, alt: "C", tooltipContent: "C" },
  { src: CPP, alt: "C++", tooltipContent: "C++" },
  { src: CSharp, alt: "C Sharp", tooltipContent: "C#" },
];

function ProgrammingLangStack() {
  return (
    <Row
      style={{ justifyContent: "center", paddingBottom: "50px" }}
      className="stagger-children"
    >
      {programmingLang.map((pl) => (
        <Col key={pl.alt} xs={4} md={2} className="tech-icons">
          <img
            src={pl.src}
            width={100}
            alt={pl.alt}
            className="tech-icon-images"
            data-tooltip-id="programming-language-tech-tooltip"
            data-tooltip-content={pl.tooltipContent}
          />
        </Col>
      ))}
      <Tooltip id="programming-language-tech-tooltip" />
    </Row>
  );
}

export default ProgrammingLangStack;
