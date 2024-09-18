import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip as Tooltip } from 'react-tooltip';

import snowflake from "../../../assets/imgs/techstack/snowflake.png";
import mysql from "../../../assets/imgs/techstack/mysql.png";
import redis from "../../../assets/imgs/techstack/redis.png";
import firebase from "../../../assets/imgs/techstack/firebase.png";
import sqlserver from "../../../assets/imgs/techstack/sqlserver.png";

const databases = [
    { src: mysql, alt: "MySQL", tooltipContent: "MySQL" },
    { src: firebase, alt: "Firebase", tooltipContent: "Firebase" },
    { src: sqlserver, alt: "SQL Server", tooltipContent: "SQL Server" },
    { src: snowflake, alt: "Snowflake", tooltipContent: "Snowflake" },
    { src: redis, alt: "Redis", tooltipContent: "Redis" },
];

function DatabaseStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {databases.map((db) => (
                <Col key={db.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={db.src}
                        length={150}
                        width={150}
                        alt={db.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={db.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default DatabaseStack;