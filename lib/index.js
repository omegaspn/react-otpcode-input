import React, { useState, useEffect, useRef } from "react";
import { Flex } from "rebass";
import styled from "styled-components";

const SingleOTPInput = styled.input`
  border: 0;
  border-bottom: solid 2px #e6e8ec;
  border-color: ${props => (props.active ? "#2b2b2b" : "#e6e8ec")};
  background-color: transparent;
  width: 32px;
  margin: 0px 4px;
  text-align: center;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 #000;
`;

const ContentEditableBox = styled.input.attrs({
  contentEditable: true,
  suppressContentEditableWarning: true,
  type: "number"
})`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
  color: transparent;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

const isNumber = char => {
  return !isNaN(char);
};

const OtpInput = ({ numberOfInputs, onChange, onComplete, value }) => {
  const identifiers = [...new Array(numberOfInputs)];
  const [active, setActive] = useState(0);
  const [otpValues, setOtpValues] = useState(value);
  const contentEditableBoxRef = useRef(null);

  const handleKeyDown = e => {
    if (e.keyCode === 8) {
      e.preventDefault();
      handleTextInput(new Event("backSpaceKey"));
    }
  };

  const handleTextInput = e => {
    e.preventDefault();
    const key = e.data || e.type;

    // Backspace, prevent set active when is on the first input
    if (key === "backSpaceKey" && active > 0) {
      setActive(active - 1);
      setOtpValues(otpValues.slice(0, otpValues.length - 1));
      onChange(otpValues);
    }

    if (!isNumber(key)) return;
    else {
      setActive(active + 1);
      setOtpValues(otpValues + key);
      onChange(otpValues);
    }
  };

  useEffect(() => {
    if (otpValues.length === numberOfInputs) {
      onComplete(otpValues);
    }

    // reset
    if (value === "") {
      setActive(0);
      setOtpValues("");
      contentEditableBoxRef.current.focus();
    }
  }, [value]);

  useEffect(() => {
    const box = document.getElementById("contentEditableBox");
    box.addEventListener("keydown", handleKeyDown);
    box.addEventListener("textInput", handleTextInput);

    return () => {
      box.removeEventListener("keydown", handleKeyDown);
      box.removeEventListener("textInput", handleTextInput);
    };
  }, [handleTextInput]);

  return (
    <>
      <ContentEditableBox id="contentEditableBox" ref={contentEditableBoxRef} />
      <Flex flexDirection="row" justifyContent="center">
        {identifiers.map((val, i) => (
          <SingleOTPInput
            key={i}
            id={`otp_${i}`}
            value={otpValues[i] || ""}
            active={i === active}
            // autoFocus={i === active}
          />
        ))}
      </Flex>
    </>
  );
};

export default OtpInput;
