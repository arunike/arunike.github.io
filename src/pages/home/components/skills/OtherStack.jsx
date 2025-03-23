import React from "react";
import { Col, Row } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

import Linux from "../../../../assets/imgs/techstack/linux.png";
import Android from "../../../../assets/imgs/techstack/android.png";

const other = [
    { src: Linux, alt: "Linux", tooltipContent: "Linux" },
    { src: Android, alt: "Android", tooltipContent: "Android" }
];

function OtherStack() {
    return (
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }} className="stagger-children">
            {other.map((os) => (
                <Col key={os.alt} xs={4} md={2} className="tech-icons">
                    <img
                        src={os.src}
                        width={100}
                        alt={os.alt}
                        className="tech-icon-images"
                        data-tooltip-id="other-tech-tooltip"
                        data-tooltip-content={os.tooltipContent}
                    />
                </Col>
            ))}
            <Tooltip id="other-tech-tooltip" />
        </Row>
    );
}

export default OtherStack;
