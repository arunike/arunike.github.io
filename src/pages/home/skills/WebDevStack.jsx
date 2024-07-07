import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import javascript from "../../../assets/imgs/techstack/javascript.png";
import typescript from "../../../assets/imgs/techstack/typescript.png";
import html from "../../../assets/imgs/techstack/html.png";
import css from "../../../assets/imgs/techstack/css.png";

const web = [
    { src: javascript, alt: "JavaScript", tooltipContent: "JavaScript" },
    { src: typescript, alt: "TypeScript", tooltipContent: "TypeScript" },
    { src: html, alt: "HTML", tooltipContent: "HTML" },
    { src: css, alt: "CSS", tooltipContent: "CSS" }
];

function WebDevStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {web.map((wd) => (
                <Col key={wd.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={wd.src}
                        length={150}
                        width={150}
                        alt={wd.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={wd.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default WebDevStack;
