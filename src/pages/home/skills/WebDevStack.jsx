import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import Javascript from "../../../assets/imgs/techstack/javascript.png";
import Typescript from "../../../assets/imgs/techstack/typescript.png";
import HTML from "../../../assets/imgs/techstack/html.png";
import CSS from "../../../assets/imgs/techstack/css.png";

const web = [
    { src: Javascript, alt: "JavaScript", tooltipContent: "JavaScript" },
    { src: Typescript, alt: "TypeScript", tooltipContent: "TypeScript" },
    { src: HTML, alt: "HTML", tooltipContent: "HTML" },
    { src: CSS, alt: "CSS", tooltipContent: "CSS" }
];

function WebDevStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {web.map((wd) => (
                <Col key={wd.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={wd.src}
                        width={100}
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
