import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  inputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  singleOtpInput: {
    border: 0,
    borderBottom: "solid 2px #e6e8ec",
    borderRadius: 0,
    backgroundColor: "transparent",
    width: "32px",
    margin: "0px 4px",
    textAlign: "center",
    padding: "1px 2px",
    outline: "none",
    color: "transparent",
    textShadow: "0 0 0 #000",
    "&.active": {
      borderColor: "#2b2b2b",
    },
  },
  contentEditableBox: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    width: "100%",
    zIndex: 1,
    color: "transparent",
    opacity: 0,
    "&:focus": {
      outline: "none",
    },
  },
});

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
  const classes = useStyles();
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
        className={classes.contentEditableBox}
        id="contentEditableBox"
        ref={contentEditableBoxRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        type="tel"
      />
      <div
        className={classes.inputWrapper}
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
            className={[
              classes.singleOtpInput,
              otpValue[i].trim() ? "active" : i === activeIndex ? "focus" : "",
            ].join(" ")}
          />
        ))}
      </div>
    </>
  );
};

export default OtpInput;
