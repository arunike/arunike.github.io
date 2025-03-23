import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

import Snowflake from "../../../../assets/imgs/techstack/snowflake.png";
import MySQL from "../../../../assets/imgs/techstack/mysql.png";
import Redis from "../../../../assets/imgs/techstack/redis.png";
import Firebase from "../../../../assets/imgs/techstack/firebase.png";
import SQL_Server from "../../../../assets/imgs/techstack/sql_server.png";

const databases = [
    { src: MySQL, alt: "MySQL", tooltipContent: "MySQL" },
    { src: Firebase, alt: "Firebase", tooltipContent: "Firebase" },
    { src: SQL_Server, alt: "SQL Server", tooltipContent: "SQL Server" },
    { src: Snowflake, alt: "Snowflake", tooltipContent: "Snowflake" },
    { src: Redis, alt: "Redis", tooltipContent: "Redis" },
];

function DatabaseStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }} className="stagger-children">
            {databases.map((db) => (
                <Col key={db.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={db.src}
                        width={100}
                        alt={db.alt}
                        className="tech-icon-images"
                        data-tooltip-id="database-tech-tooltip"
                        data-tooltip-content={db.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="database-tech-tooltip" />
        </Row>
    );
}

export default DatabaseStack;