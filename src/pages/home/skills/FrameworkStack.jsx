import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import react from "../../../assets/imgs/techstack/react.png";
import vue from "../../../assets/imgs/techstack/vue.png";
import springBoot from "../../../assets/imgs/techstack/spring-boot.png";
import kotlin from "../../../assets/imgs/techstack/kotlin.png";
import nodejs from "../../../assets/imgs/techstack/nodejs.png";
import reactNative from "../../../assets/imgs/techstack/react-native.png";

function FrameworkStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={react} length={150} width={150} alt="react" data-tooltip-id="react" data-tooltip-content="React"/>
            </Col>
            <Tooltip id="react"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={reactNative} length={150} width={150} alt="react native" data-tooltip-id="react_native" data-tooltip-content="React Native"/>
            </Col>
            <Tooltip id="react_native"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={springBoot} length={150} width={150} alt="spring boot" data-tooltip-id="spring_boot" data-tooltip-content="Spring Boot"/>
            </Col>
            <Tooltip id="spring_boot"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={vue} length={150} width={150} alt="vue" data-tooltip-id="vue" data-tooltip-content="Vue"/>
            </Col>
            <Tooltip id="vue"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kotlin} length={150} width={150} alt="kotlin" data-tooltip-id="kotlin" data-tooltip-content="Kotlin"/>
            </Col>
            <Tooltip id="kotlin"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={nodejs} length={150} width={150} alt="nodejs" data-tooltip-id="nodejs" data-tooltip-content="NodeJS"/>
            </Col>
            <Tooltip id="nodejs"/>
        </Row>
    );
}

export default FrameworkStack;
