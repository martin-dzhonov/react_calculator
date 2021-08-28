import React from "react";
import "./CalculatorButton.css";

function CalculatorButton(props) {
  return (
    <button
      className={`${props.className}`}
      onClick={() => props.onClick(props.keyValue)}>
      {props.keyValue}{" "}
    </button>
  );
}

export default CalculatorButton;
