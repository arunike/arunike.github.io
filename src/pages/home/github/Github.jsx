import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px", color: "black" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        <strong className="purple">Day I Code</strong>
      </h1>
      <GitHubCalendar
        username="arunike"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
        theme={{
          light: ['#EBDEF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
          dark: ['#EBDEF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'],
        }}
        showWeekdayLabels={true}
      />
    </Row>
  );
}

export default Github;
