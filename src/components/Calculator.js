import React, { useState } from "react";
import CalculatorButton from "./CalculatorButton";
import {CalculatorOperations} from "./utils";
import "./Calculator.css";

function Calculator() {
  const [prevValue, setPrevValue] = useState(null);
  const [currValue, setCurrValue] = useState("0");
  const [operator, setOperator] = useState(null);

  const setState = (prevValue, currValue, operator) => {
    setPrevValue(prevValue);
    setCurrValue(currValue);
    setOperator(operator);
  };

  const clearData = () => {
    setState(0, "0", null);
  };

  const changeSign = () => {
    if(currValue){
      setCurrValue(parseFloat(currValue) * -1);
    }
  };
 
  const percentage = () => {
      setCurrValue(parseFloat(currValue) / 100);
  };

  const insertDot = () => {
    if (currValue.indexOf('.') === -1){
      setCurrValue(currValue + ".");
    }
  };

  const concatNum = (value) => {
    return currValue === "0" ? String(value) : currValue + value;
  };

  const performOperation = () => {
    let calculatedValue = CalculatorOperations[operator](parseFloat(prevValue), parseFloat(currValue));
    setState(null, String(calculatedValue), null);
  };

  const handleOperation = (input) => {
    if (input in CalculatorOperations) {
      if (operator === null) {
        setState(currValue, "", input);
      }
      if (operator) {
        setOperator(input);
      }
      if (prevValue && operator && currValue) {
        performOperation();
      }
    } else if (Number.isInteger(input)){
      setCurrValue(concatNum(input));
    }
  };

  return (
    <div className="calculator">
      <div className="calculator-input">
        <div className="result">
          {!currValue && <div>{operator}</div>}
          {currValue} 
        </div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          <CalculatorButton keyValue={"AC"} onClick={clearData} />
          <CalculatorButton keyValue={"\xB1"} onClick={changeSign} />
          <CalculatorButton keyValue={"%"} onClick={percentage} />
        </div>
        <div className="keys-operators">
          <CalculatorButton keyValue={"+"} onClick={handleOperation} />
          <CalculatorButton keyValue={"-"} onClick={handleOperation} />
          <CalculatorButton keyValue={"*"} onClick={handleOperation} />
          <CalculatorButton keyValue={"/"} onClick={handleOperation} />
          <CalculatorButton keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CalculatorButton keyValue={9} onClick={handleOperation} />
          <CalculatorButton keyValue={8} onClick={handleOperation} />
          <CalculatorButton keyValue={7} onClick={handleOperation} />
          <CalculatorButton keyValue={6} onClick={handleOperation} />
          <CalculatorButton keyValue={5} onClick={handleOperation} />
          <CalculatorButton keyValue={4} onClick={handleOperation} />
          <CalculatorButton keyValue={3} onClick={handleOperation} />
          <CalculatorButton keyValue={2} onClick={handleOperation} />
          <CalculatorButton keyValue={1} onClick={handleOperation} />
          <CalculatorButton keyValue={"."} onClick={insertDot} className="key-dot"/>
          <CalculatorButton keyValue={0} onClick={handleOperation} className="key-zero"/>
        </div>
      </div>
    </div>
  );
}

export default Calculator;