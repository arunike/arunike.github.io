import React from "react";
import { Col, Row } from "react-bootstrap";
import linux from "../../../assets/imgs/techstack/linux.png";
import android from "../../../assets/imgs/techstack/android.png";

function OtherStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={linux} length={150} width={150} title="Linux" alt="linux"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={android} length={150} width={150} title="Android" alt="android"/>
            </Col>
        </Row>
    );
}

export default OtherStack;
