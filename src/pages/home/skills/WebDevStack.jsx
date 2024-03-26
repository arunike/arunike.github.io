import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import javascript from "../../../assets/imgs/techstack/javascript.png";
import typescript from "../../../assets/imgs/techstack/typescript.png";
import html from "../../../assets/imgs/techstack/html.png";
import css from "../../../assets/imgs/techstack/css.png";

function WebDevStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={html} length={150} width={150} alt="html" data-tooltip-id="html" data-tooltip-content="HTML"/>
            </Col>
            <Tooltip id="html"/>
    
            <Col xs={4} md={2} className="tech-icons">
                <img src={css} length={150} width={150} alt="css" data-tooltip-id="css" data-tooltip-content="CSS"/>
            </Col>
            <Tooltip id="css"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={javascript} length={150} width={150} alt="javascript" data-tooltip-id="javascript" data-tooltip-content="JavaScript"/>
            </Col>
            <Tooltip id="javascript"/>
    
            <Col xs={4} md={2} className="tech-icons">
                <img src={typescript} length={150} width={150} alt="typescript" data-tooltip-id="typescript" data-tooltip-content="TypeScript"/>
            </Col>
            <Tooltip id="typescript"/>
        </Row>
    );
}

export default WebDevStack;
