import React, { useEffect, useRef, useState } from "react";
import "./otp.css";

const isNumber = (char) => {
  return !isNaN(char);
};

const OtpInput = ({
  numberOfInputs,
  onChange,
  onComplete,
  otp,
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
      <input
        className="react-otp__content-editable-box"
        id="contentEditableBox"
        ref={contentEditableBoxRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        type="tel"
      />
      <div
        className="react-otp__input-wrapper"
        id="inputWrapper"
        data-testid="inputWrapper"
      >
        {inputs.map((v, i) => (
          <input
            key={i}
            id={`otp_${i}`}
            value={otpValue[i]}
            onChange={() => {}}
            active={i === activeIndex}
            className={`react-otp__single-otp-input ${
              otpValue[i].trim() ? "active" : i === activeIndex ? "focus" : ""
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default OtpInput;
