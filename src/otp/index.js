import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const getBorderColor = ({active, activeBorderColor, value, hasValueBorderColor}) => {
  if (!!value.trim() && hasValueBorderColor) return hasValueBorderColor;
  if (active) return activeBorderColor;

  return "#e6e8ec";
};

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SingleOTPInput = styled.input`
  border: 0;
  border-bottom: solid 2px #e6e8ec;
  border-color: ${getBorderColor};
  border-radius: 0;
  background-color: transparent;
  width: 32px;
  margin: 0px 4px;
  text-align: center;
  padding: 1px 2px;
  outline: none;
  color: transparent;
  text-shadow: 0 0 0 #000;
`;

const ContentEditableBox = styled.input.attrs({
  contentEditable: true,
  suppressContentEditableWarning: true,
  type: "tel",
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

const isNumber = (char) => {
  return !isNaN(char);
};

const OtpInput = ({
  numberOfInputs,
  onChange,
  onComplete,
  otp,
  activeBorderColor = "#2b2b2b",
  hasValueBorderColor,
  disabled = false,
}) => {
  const otpValue = otp.padEnd(numberOfInputs);

  const inputs = Array(numberOfInputs).fill(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentEditableBoxRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      e.preventDefault();
      if (disabled) return;
      handleTextInput(new Event("backSpaceKey"));
    }
  };

  const handleTextInput = (e) => {
    e.preventDefault();
    const key = e.data || e.type;
    if (disabled) return;

    // Backspace, prevent set active when is on the first input
    if (key === "backSpaceKey" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      onChange(otp.slice(0, otp.length - 1));
    }

    if (isNumber(key)) {
      const newOtp = otp + key;
      setActiveIndex(activeIndex + 1);
      onChange(newOtp);

      if (newOtp.length === numberOfInputs) {
        onComplete(newOtp);
      }
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
      <Flex id="inputWrapper" data-testid="inputWrapper">
        {inputs.map((v, i) => (
          <SingleOTPInput
            key={i}
            id={`otp_${i}`}
            value={otpValue[i]}
            hasValueBorderColor={hasValueBorderColor}
            active={i === activeIndex}
            activeBorderColor={activeBorderColor}
            onChange={() => {}}
          />
        ))}
      </Flex>
    </>
  );
};

export default OtpInput;
