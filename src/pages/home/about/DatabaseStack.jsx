import React from "react";
import { Col, Row } from "react-bootstrap";
import snowflake from "../../../assets/imgs/techstack/snowflake.png";
import mysql from "../../../assets/imgs/techstack/mysql.png";
import redis from "../../../assets/imgs/techstack/redis.png";
import firebase from "../../../assets/imgs/techstack/firebase.png";
import sqlserver from "../../../assets/imgs/techstack/sqlserver.png";

function DatabaseStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={mysql} length={150} width={150} title="MySQL" alt="mysql"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={redis} length={150} width={150} title="Redis" alt="redis"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={firebase} length={150} width={150} title="Firebase" alt="firebase"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={sqlserver} length={150} width={150} title="SQL Sever" alt="sql server"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={snowflake} length={150} width={150} title="Snowflake" alt="snowflake"/>
            </Col>
        </Row>
    );
}

export default DatabaseStack;
