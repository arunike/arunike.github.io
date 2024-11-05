import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import React_Image from "../../../assets/imgs/techstack/react.png";
import Vue from "../../../assets/imgs/techstack/vue.png";
import Spring_Boot from "../../../assets/imgs/techstack/spring_boot.png";
import Nodejs from "../../../assets/imgs/techstack/nodejs.png";
import React_Native from "../../../assets/imgs/techstack/react_native.png";
import Django from "../../../assets/imgs/techstack/django.png";

const frameworks = [
    { src: React_Image, alt: "React", tooltipContent: "React" },
    { src: React_Native, alt: "React Native", tooltipContent: "React Native" },
    { src: Nodejs, alt: "Node.js", tooltipContent: "Node.js" },
    { src: Spring_Boot, alt: "Spring Boot", tooltipContent: "Spring Boot" },
    { src: Vue, alt: "Vue", tooltipContent: "Vue" },
    { src: Django, alt: "Django", tooltipContent: "Django" },
];

function FrameworkStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {frameworks.map((fw) => (
                <Col key={fw.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={fw.src}
                        width={100}
                        alt={fw.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={fw.tooltipContent}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default FrameworkStack;
