"use client";
import { Alert, AlertTitle, Button, TextField } from "@mui/material";

import React, { useState, ChangeEvent } from "react";
import SimpleDialogDemo from "./SimpleDialog";
import Header from "./header";
import CountdownTimer from "./countdownTimer";

interface NineNineProps {
  expectedInputs: string[];
}

const NineNine: React.FC<NineNineProps> = ({ expectedInputs }) => {
  const [inputValues, setInputValues] = useState<string[]>(
    // Array(expectedInputs.length).fill("")
    Array(99).fill("")
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [score, setscore] = useState<number>(0);
  const [isDisable, setisDisable] = useState<boolean>(false);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const checkInputs = () => {
    const trimmedInputArray = inputValues.map((str) => str.trim());
    const trimmedExceptedArray = expectedInputs.map((str) => str.trim());

    const uniqueInputs = new Set<string>(trimmedInputArray);
    const expectedSet = new Set<string>(trimmedExceptedArray);

    // Check if the number of unique inputs is equal to the total number of inputs
    const areInputsUnique = uniqueInputs.size >= 10;
    if (!areInputsUnique) {
      setShowAlert(true);
      return;
    } else {
      setShowAlert(false);
    }

    // Find the intersection of the two sets
    const intersection = new Set(
      [...uniqueInputs].filter((element) => expectedSet.has(element))
    );
    setscore(intersection.size);
    // Return the size of the intersection set (number of common elements)
    // return intersection.size;
  };

  const handleTimerFinish = () => {
    setisDisable(true);
    checkInputs()
    console.log("Timer finished! Do something...");
    // You can perform any action or state update here
  };

  return (
    <div style={{ flex: 1 }}>
      <Header />
      <CountdownTimer onTimerFinish={handleTimerFinish} />
      {showAlert && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          Please fill all input fields and do not repeat inputs.
        </Alert>
      )}
      <h1>Dynamic Input Fields</h1>
      <form>
        {inputValues.map((value, index) => (
          <TextField
            disabled={isDisable}
            key={index}
            type="text"
            id="outlined-basic"
            label={index + 1}
            variant="outlined"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, e.target.value)
            }
          />
        ))}
      </form>
      <Button  variant="contained"  href="#contained-buttons" onClick={checkInputs}>
      Check Inputs
      </Button>
      {score > 0 && <SimpleDialogDemo score={score} />}
    </div>
  );
};

export default NineNine;
