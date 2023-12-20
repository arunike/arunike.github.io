import React from "react";
import { Col, Row } from "react-bootstrap";
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
                <img src={react} length={150} width={150} title="React" alt="react"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={reactNative} length={150} width={150} title="React Native" alt="react native"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={springBoot} length={150} width={150} title="Spring Boot" alt="spring boot"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={vue} length={150} width={150} title="Vue" alt="vue"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kotlin} length={150} width={150} title="Kotlin" alt="kotlin"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={nodejs} length={150} width={150} title="NodeJS" alt="nodejs"/>
            </Col>
        </Row>
    );
}

export default FrameworkStack;
