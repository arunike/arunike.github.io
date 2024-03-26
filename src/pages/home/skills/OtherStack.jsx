import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import linux from "../../../assets/imgs/techstack/linux.png";
import android from "../../../assets/imgs/techstack/android.png";

function OtherStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={linux} length={150} width={150} alt="linux" data-tooltip-id="linux" data-tooltip-content="Linux"/>
            </Col>
            <Tooltip id="linux"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={android} length={150} width={150} alt="android" data-tooltip-id="android" data-tooltip-content="Android"/>
            </Col>
            <Tooltip id="android"/>
        </Row>
    );
}

export default OtherStack;
