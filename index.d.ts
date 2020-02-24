/// <reference types="react" />

declare module "react-otpcode-input" {
  export interface OtpInputProps extends InputAttributes {
    numberOfInputs: number;
  }

  class OtpInput extends React.Component<OtpInputProps, any> {}
  export default OtpInput;
}
