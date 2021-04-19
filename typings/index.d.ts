/// <reference types="react" />

declare module "react-otpcode-input" {
  export interface OtpInputProps extends InputAttributes {
    numberOfInputs: number;
    onChange: (code: string) => void;
    onComplete: (code: string) => void;
    otp: string;
    autoFocus?: boolean;
    disabled?: boolean;
    activeBorderColor?: string;
    hasValueBorderColor?: string,
  }

  const OtpInput: React.FunctionComponent<OtpInputProps>;
  export default OtpInput;
}
