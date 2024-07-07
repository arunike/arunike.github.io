import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from 'react-tooltip';

import linux from "../../../assets/imgs/techstack/linux.png";
import android from "../../../assets/imgs/techstack/android.png";

const other = [
    { src: linux, alt: "Linux", tooltipContent: "Linux" },
    { src: android, alt: "Android", tooltipContent: "Android" }
];

function OtherStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
            {other.map((os) => (
                <Col key={os.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={os.src}
                        length={150}
                        width={150}
                        alt={os.alt}
                        data-tooltip-id="tech-tooltip"
                        data-tooltip-content={os.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="tech-tooltip"/>
        </Row>
    );
}

export default OtherStack;
