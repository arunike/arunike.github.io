import React from "react";
import { Col, Row } from "react-bootstrap";
import git from "../../../assets/imgs/techstack/git.png";
import docker from "../../../assets/imgs/techstack/docker.png";
import kubernetes from "../../../assets/imgs/techstack/kubernetes.png";
import jquery from "../../../assets/imgs/techstack/jquery.png";
import json from "../../../assets/imgs/techstack/json.png";
import tomcat from "../../../assets/imgs/techstack/tomcat.png";
import spark from "../../../assets/imgs/techstack/spark.png";
import cassandra from "../../../assets/imgs/techstack/cassandra.png";
import kafka from "../../../assets/imgs/techstack/kafka.png";
import hdfs from "../../../assets/imgs/techstack/hdfs.png";
import redux from "../../../assets/imgs/techstack/redux.png";
import threejs from "../../../assets/imgs/techstack/threejs.png";

function ToolStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px"}}>
            <Col xs={4} md={2} className="tech-icons">
                <img src={git} length={150} width={150} title="Git" alt="git"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={docker} length={150} width={150} title="Docker" alt="docker"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kubernetes} length={150} width={150} title="Kubernetes" alt="k8s"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={json} length={150} width={150} title="JSON" alt="json"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={jquery} length={150} width={150} title="jQuery" alt="jquery"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={tomcat} length={150} width={150} title="Tomcat" alt="tomcat"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={redux} length={150} width={150} title="Redux" alt="redux"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={threejs} length={150} width={150} title="ThreeJS" alt="threejs"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={spark} length={150} width={150} title="Spark" alt="spark"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={hdfs} length={150} width={150} title="HDFS" alt="hdfs"/>
            </Col> 

            <Col xs={4} md={2} className="tech-icons">
                <img src={cassandra} length={150} width={150} title="Cassandra" alt="cassandra"/>
            </Col>

            <Col xs={4} md={2} className="tech-icons">
                <img src={kafka} length={150} width={150} title="Kafka" alt="kafka"/>
            </Col>
        </Row>
    );
}

export default ToolStack;
