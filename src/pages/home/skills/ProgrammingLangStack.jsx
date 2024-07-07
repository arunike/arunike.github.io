import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import java from "../../../assets/imgs/techstack/java.png";
import python from "../../../assets/imgs/techstack/python.png";
import clang from "../../../assets/imgs/techstack/clang.png";
import cpp from "../../../assets/imgs/techstack/cpp.png";
import rlang from "../../../assets/imgs/techstack/rlang.png";
import sql from "../../../assets/imgs/techstack/sql.png";

const programmingLang = [
    { src: java, alt: "Java", tooltipContent: "Java" },
    { src: python, alt: "Python", tooltipContent: "Python" },
    { src: clang, alt: "C", tooltipContent: "C" },
    { src: cpp, alt: "C++", tooltipContent: "C++" },
    { src: rlang, alt: "R", tooltipContent: "R" },
    { src: sql, alt: "SQL", tooltipContent: "SQL" }
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
