import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import react from "../../../assets/imgs/techstack/react.png";
import vue from "../../../assets/imgs/techstack/vue.png";
import springBoot from "../../../assets/imgs/techstack/spring-boot.png";
import kotlin from "../../../assets/imgs/techstack/kotlin.png";
import nodejs from "../../../assets/imgs/techstack/nodejs.png";
import reactNative from "../../../assets/imgs/techstack/react-native.png";

const frameworks = [
    { src: react, alt: "React", tooltipContent: "React" },
    { src: vue, alt: "Vue", tooltipContent: "Vue" },
    { src: springBoot, alt: "Spring Boot", tooltipContent: "Spring Boot" },
    { src: kotlin, alt: "Kotlin", tooltipContent: "Kotlin" },
    { src: nodejs, alt: "Node.js", tooltipContent: "Node.js" },
    { src: reactNative, alt: "React Native", tooltipContent: "React Native" }
];

function FrameworkStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {frameworks.map((fw) => (
                <Col key={fw.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={fw.src}
                        length={150}
                        width={150}
                        alt={fw.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={fw.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default FrameworkStack;
