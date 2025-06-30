import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

function Pre(props) {
  return (
    <div
      className="preload"
      style={{
        opacity: props.load ? 1 : 0,
        visibility: props.load ? "visible" : "hidden",
      }}
    >
      <h1>
        <strong>Richie</strong>
      </h1>
      <p>─────</p>
      <Spinner animation="grow" />
    </div>
  );
}

Pre.propTypes = {
  load: PropTypes.bool.isRequired,
};

export default Pre;
