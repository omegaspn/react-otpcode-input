import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import OtpInput from ".";

describe("OtpInput", () => {
  let container;
  let dom;
  let sendKey = null;

  const addEventMock = jest.fn((eventName, callback) => {
    if (eventName === "textInput") {
      sendKey = callback;
    }
  });

  const removeEventMock = jest.fn((eventName, callback) => {
    if (eventName === "textInput") {
      sendKey = null;
    }
  });

  const keyOtp = async otp => {
    if (sendKey) {
      for (const key of otp) {
        await act(async () => {
          await sendKey({ data: key, preventDefault: jest.fn() });
        });
      }
    }
  };

  const renderOtp = (numberOfInputs = 6) => {
    return render(
      <OtpInput
        numberOfInputs={numberOfInputs}
        onChange={jest.fn()}
        onComplete={jest.fn()}
        otp={""}
        disabled={false}
      />
    );
  };

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    container.setAttribute("id", "contentEditableBox");
    document.body.appendChild(container);

    container.addEventListener = addEventMock;
    container.removeEventListener = removeEventMock;
  });

  it("should renders correctly", () => {
    dom = renderOtp();
    expect(dom.asFragment()).toMatchSnapshot();
  });

  it("should renders Token inputs by given length", () => {
    dom = renderOtp(4);
    expect(dom.container.querySelectorAll("#inputWrapper input").length).toBe(
      4
    );
  });

  it("should display token correctly when user inputs", async () => {
    const onChange = jest.fn();
    dom = render(
      <OtpInput
        numberOfInputs={6}
        onChange={onChange}
        onComplete={jest.fn()}
        otp={""}
        disabled={false}
      />
    );
    await keyOtp("123");
    expect(onChange).toHaveBeenCalledWith("1");
    expect(onChange).toHaveBeenCalledWith("2");
    expect(onChange).toHaveBeenCalledWith("3");
  });

  it("should clear value user inputs backspace", async () => {
    const onChange = jest.fn();
    dom = render(
      <OtpInput
        numberOfInputs={6}
        onChange={onChange}
        onComplete={jest.fn()}
        otp={""}
        disabled={false}
      />
    );
    await act(async () => {
      await sendKey({ data: "1", preventDefault: jest.fn() });
    });
    await act(async () => {
      await sendKey({ data: "backSpaceKey", preventDefault: jest.fn() });
    });

    expect(onChange).toHaveBeenCalledWith("");
  });

  it("should call onComplete when user completes otp", async () => {
    const onComplete = jest.fn();
    dom = render(
      <OtpInput
        numberOfInputs={6}
        onChange={jest.fn()}
        onComplete={onComplete}
        otp={"12345"}
        disabled={false}
      />
    );

    await keyOtp("6");
    expect(onComplete).toHaveBeenCalled();
  });

  it("should not accept key when disabled", async () => {
    const onChange = jest.fn();
    dom = render(
      <OtpInput
        numberOfInputs={6}
        onChange={onChange}
        onComplete={jest.fn()}
        otp={""}
        disabled={true}
      />
    );
    await keyOtp("1");

    expect(sendKey).toBeNull();
  });
});
