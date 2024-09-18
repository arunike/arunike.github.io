import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import java from "../../../assets/imgs/techstack/java.png";
import python from "../../../assets/imgs/techstack/python.png";
import clang from "../../../assets/imgs/techstack/clang.png";
import cpp from "../../../assets/imgs/techstack/cpp.png";
import rlang from "../../../assets/imgs/techstack/rlang.png";
import sql from "../../../assets/imgs/techstack/sql.png";
import groovy from "../../../assets/imgs/techstack/groovy.png";
import csharp from "../../../assets/imgs/techstack/csharp.png";
import Kotlin from "../../../assets/imgs/techstack/kotlin.png";

const programmingLang = [
    { src: python, alt: "Python", tooltipContent: "Python" },
    { src: java, alt: "Java", tooltipContent: "Java" },
    { src: sql, alt: "SQL", tooltipContent: "SQL" },
    { src: Kotlin, alt: "Kotlin", tooltipContent: "Kotlin" },
    { src: groovy, alt: "Groovy", tooltipContent: "Groovy" },
    { src: rlang, alt: "R", tooltipContent: "R" },
    { src: clang, alt: "C", tooltipContent: "C" },
    { src: cpp, alt: "C++", tooltipContent: "C++" },
    { src: csharp, alt: "C Sharp", tooltipContent: "C#" },
];

function ProgrammingLangStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {programmingLang.map((pl) => (
                <Col key={pl.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={pl.src}
                        length={150}
                        width={150}
                        alt={pl.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={pl.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default ProgrammingLangStack;
