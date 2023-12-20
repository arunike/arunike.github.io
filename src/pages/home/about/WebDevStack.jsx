import React from "react";
import { Col, Row } from "react-bootstrap";
import javascript from "../../../assets/imgs/techstack/javascript.png";
import typescript from "../../../assets/imgs/techstack/typescript.png";
import html from "../../../assets/imgs/techstack/html.png";
import css from "../../../assets/imgs/techstack/css.png";

function WebDevStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={html} length={150} width={150} title="HTML" alt="html"/>
            </Col>
    
            <Col xs={4} md={2} className="tech-icons">
                <img src={css} length={150} width={150} title="CSS" alt="css"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={javascript} length={150} width={150} title="JavaScript" alt="javascript"/>
            </Col>
    
            <Col xs={4} md={2} className="tech-icons">
                <img src={typescript} length={150} width={150} title="TypeScript" alt="typescript"/>
            </Col>
        </Row>
    );
}

export default WebDevStack;
