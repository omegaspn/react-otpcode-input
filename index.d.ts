/// <reference types="react" />

declare module "react-otpcode-input" {
  export interface OtpInputProps extends InputAttributes {
    numberOfInputs: number;
    onChange: Function;
    onComplete: Function;
    value: string;
    autoFocus?: boolean;
  }

  const OtpInput: React.FunctionComponent<OtpInputProps>;
  export default OtpInput;
}
