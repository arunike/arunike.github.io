import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import java from "../../../assets/imgs/techstack/java.png";
import python from "../../../assets/imgs/techstack/python.png";
import clang from "../../../assets/imgs/techstack/clang.png";
import cpp from "../../../assets/imgs/techstack/cpp.png";
import rlang from "../../../assets/imgs/techstack/rlang.png";
import sql from "../../../assets/imgs/techstack/sql.png";

function ProgrammingLangStack() {
    return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
        <Col xs={4} md={2} className="tech-icons">
            <img src={java} length={150} width={150} alt="java" data-tooltip-id="java" data-tooltip-content="Java"/>
        </Col>
        <Tooltip id="java"/>

        <Col xs={4} md={2} className="tech-icons">
            <img src={python} length={150} width={150} alt="python" data-tooltip-id="python" data-tooltip-content="Python"/>
        </Col>
        <Tooltip id="python"/>

        <Col xs={4} md={2} className="tech-icons">
            <img src={clang} length={150} width={150} alt="c" data-tooltip-id="c" data-tooltip-content="C"/>
        </Col>
        <Tooltip id="c"/>

        <Col xs={4} md={2} className="tech-icons">
            <img src={cpp} length={150} width={150} alt="cpp" data-tooltip-id="cpp" data-tooltip-content="C++"/>
        </Col>
        <Tooltip id="cpp"/>
        
        <Col xs={4} md={2} className="tech-icons">
            <img src={rlang} length={150} width={150} alt="r" data-tooltip-id="r" data-tooltip-content="R"/>
        </Col>
        <Tooltip id="r"/>

        <Col xs={4} md={2} className="tech-icons">
            <img src={sql} length={150} width={150} alt="sql" data-tooltip-id="sql" data-tooltip-content="SQL"/>
        </Col>
        <Tooltip id="sql"/>
    </Row>
    );
}

export default ProgrammingLangStack;
