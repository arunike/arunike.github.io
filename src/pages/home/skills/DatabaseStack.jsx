import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import snowflake from "../../../assets/imgs/techstack/snowflake.png";
import mysql from "../../../assets/imgs/techstack/mysql.png";
import redis from "../../../assets/imgs/techstack/redis.png";
import firebase from "../../../assets/imgs/techstack/firebase.png";
import sqlserver from "../../../assets/imgs/techstack/sqlserver.png";

function DatabaseStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={mysql} length={150} width={150} alt="MySQL" data-tooltip-id="mysql" data-tooltip-content="MySQL"/>
            </Col>
            <Tooltip id="mysql"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={redis} length={150} width={150} alt="Redis" data-tooltip-id="redis" data-tooltip-content="Redis"/>
            </Col>
            <Tooltip id="redis"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={firebase} length={150} width={150} alt="Firebase" data-tooltip-id="firebase" data-tooltip-content="Firebase"/>
            </Col>
            <Tooltip id="firebase"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={sqlserver} length={150} width={150} alt="SQL Server" data-tooltip-id="sql_server" data-tooltip-content="SQL Server"/>
            </Col>
            <Tooltip id="sql_server"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={snowflake} length={150} width={150} alt="Snowflake" data-tooltip-id="snowflake" data-tooltip-content="Snowflake"/>
            </Col>
            <Tooltip id="snowflake"/>
        </Row>
    );
}

export default DatabaseStack;
