import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import docker from "../../../assets/imgs/techstack/docker.png";
import kubernetes from "../../../assets/imgs/techstack/kubernetes.png";
import jquery from "../../../assets/imgs/techstack/jquery.png";
import spark from "../../../assets/imgs/techstack/spark.png";
import cassandra from "../../../assets/imgs/techstack/cassandra.png";
import kafka from "../../../assets/imgs/techstack/kafka.png";
import hdfs from "../../../assets/imgs/techstack/hdfs.png";
import redux from "../../../assets/imgs/techstack/redux.png";
import threejs from "../../../assets/imgs/techstack/threejs.png";
import latex from "../../../assets/imgs/techstack/latex.png";

const tools = [
    { src: latex, alt: "LaTeX", tooltipContent: "LaTeX" },
    { src: docker, alt: "Docker", tooltipContent: "Docker" },
    { src: kubernetes, alt: "Kubernetes", tooltipContent: "Kubernetes" },
    { src: jquery, alt: "jQuery", tooltipContent: "jQuery" },
    { src: cassandra, alt: "Cassandra", tooltipContent: "Cassandra" },
    { src: hdfs, alt: "HDFS", tooltipContent: "HDFS" },
    { src: kafka, alt: "Kafka", tooltipContent: "Kafka" },
    { src: spark, alt: "Spark", tooltipContent: "Spark" },
    { src: redux, alt: "Redux", tooltipContent: "Redux" },
    { src: threejs, alt: "Three.js", tooltipContent: "Three.js" },
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
