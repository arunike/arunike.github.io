import React from "react";
import { Spinner } from "react-bootstrap";

function Pre(props) {
  return (
    <div 
      className="preload" 
      style={{ 
        opacity: props.load ? 1 : 0, 
        visibility: props.load ? 'visible' : 'hidden' 
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

export default Pre;