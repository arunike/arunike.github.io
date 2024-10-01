import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import Docker from "../../../assets/imgs/techstack/docker.png";
import Kubernetes from "../../../assets/imgs/techstack/kubernetes.png";
import JQuery from "../../../assets/imgs/techstack/jquery.png";
import Spark from "../../../assets/imgs/techstack/spark.png";
import Cassandra from "../../../assets/imgs/techstack/cassandra.png";
import Kafka from "../../../assets/imgs/techstack/kafka.png";
import HDFS from "../../../assets/imgs/techstack/hdfs.png";
import Redux from "../../../assets/imgs/techstack/redux.png";
import Threejs from "../../../assets/imgs/techstack/threejs.png";
import Latex from "../../../assets/imgs/techstack/latex.png";

const tools = [
    { src: Latex, alt: "LaTeX", tooltipContent: "LaTeX" },
    { src: Docker, alt: "Docker", tooltipContent: "Docker" },
    { src: Kubernetes, alt: "Kubernetes", tooltipContent: "Kubernetes" },
    { src: JQuery, alt: "jQuery", tooltipContent: "jQuery" },
    { src: Cassandra, alt: "Cassandra", tooltipContent: "Cassandra" },
    { src: HDFS, alt: "HDFS", tooltipContent: "HDFS" },
    { src: Kafka, alt: "Kafka", tooltipContent: "Kafka" },
    { src: Spark, alt: "Spark", tooltipContent: "Spark" },
    { src: Redux, alt: "Redux", tooltipContent: "Redux" },
    { src: Threejs, alt: "Three.js", tooltipContent: "Three.js" },
];

function ToolStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {tools.map((ts) => (
                <Col key={ts.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={ts.src}
                        length={150}
                        width={150}
                        alt={ts.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={ts.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default ToolStack;
