import React from "react";
import { Col, Row } from "react-bootstrap";
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
            <img src={java} length={150} width={150}title="Java" alt="java"/>
        </Col>

        <Col xs={4} md={2} className="tech-icons">
            <img src={python} length={150} width={150} title="Python" alt="python"/>
        </Col>

        <Col xs={4} md={2} className="tech-icons">
            <img src={clang} length={150} width={150} title="C" alt="c"/>
        </Col>

        <Col xs={4} md={2} className="tech-icons">
            <img src={cpp} length={150} width={150} title="C++" alt="cpp"/>
        </Col>
        
        <Col xs={4} md={2} className="tech-icons">
            <img src={rlang} length={150} width={150} title="R" alt="r"/>
        </Col>

        <Col xs={4} md={2} className="tech-icons">
            <img src={sql} length={150} width={150} title="SQL" alt="sql"/>
        </Col>
    </Row>
  );
}

export default ProgrammingLangStack;
