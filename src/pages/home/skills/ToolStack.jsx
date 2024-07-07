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

function ToolStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={docker} length={150} width={150} alt="docker" data-tooltip-id="docker" data-tooltip-content="Docker"/>
            </Col>
            <Tooltip id="docker"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kubernetes} length={150} width={150} alt="kubernetes" data-tooltip-id="k8s" data-tooltip-content="Kubernetes"/>
            </Col>
            <Tooltip id="k8s"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={jquery} length={150} width={150} alt="jquery" data-tooltip-id="jquery" data-tooltip-content="JQuery"/>
            </Col>
            <Tooltip id="jquery"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={redux} length={150} width={150} alt="redux" data-tooltip-id="redux" data-tooltip-content="Redux"/>
            </Col>
            <Tooltip id="redux"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={threejs} length={150} width={150} alt="threejs" data-tooltip-id="threejs" data-tooltip-content="ThreeJS"/>
            </Col>
            <Tooltip id="threejs"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={spark} length={150} width={150} alt="spark" data-tooltip-id="spark" data-tooltip-content="Spark"/>
            </Col>
            <Tooltip id="spark"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={hdfs} length={150} width={150} alt="hdfs" data-tooltip-id="hdfs" data-tooltip-content="HDFS"/>
            </Col>
            <Tooltip id="hdfs"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={cassandra} length={150} width={150} alt="cassandra" data-tooltip-id="cassandra" data-tooltip-content="Cassandra"/>
            </Col>
            <Tooltip id="cassandra"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kafka} length={150} width={150} alt="kafka" data-tooltip-id="kafka" data-tooltip-content="Kafka"/>
            </Col>
            <Tooltip id="kafka"/>

            <Col xs={4} md={2} className="tech-icons">
                <img src={latex} length={150} width={150} alt="latex" data-tooltip-id="latex" data-tooltip-content="LaTex"/>
            </Col>
            <Tooltip id="latex"/>
        </Row>
    );
}

export default ToolStack;
