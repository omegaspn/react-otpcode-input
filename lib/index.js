import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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

const OtpInput = ({ numberOfInputs, onChange, otp }) => {
  const otpValue = otp.padEnd(numberOfInputs);

  const inputs = Array(numberOfInputs).fill(0);
  const [activeIndex, setActiveIndex] = useState(0);
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
    if (key === "backSpaceKey" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onChange(otp.slice(0, otp.length - 1));
    }

    if (isNumber(key)) {
      setActiveIndex(activeIndex + 1);
      onChange(otp + key);
    }
  };

  useEffect(() => {
    // reset
    if (otp === "") {
      setActiveIndex(0);
      contentEditableBoxRef.current.focus();
    }
  }, [otp]);

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
      <Flex>
        {inputs.map((v, i) => (
          <SingleOTPInput
            key={i}
            id={`otp_${i}`}
            value={otpValue[i]}
            active={i === activeIndex}
          />
        ))}
      </Flex>
    </>
  );
};

export default OtpInput;
