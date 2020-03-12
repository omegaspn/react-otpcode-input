# react-otpcode-input
An OTP input component using React

### Install
```
npm install react-otpcode-input --save
```

### Usage
ES6
```js
import OtpInput from 'react-otpcode-input';
```

Typescript
```js
import OtpInput from 'react-otpcode-input';
```

### Props
| Props        | Options           | Default  | Description |
| ------------- |-------------| -----| -------- |
| numberOfInputs | Number      |    none | Number of OTP inputs to be rendered. |
| onChange | (code) => void      |    none | Returns OTP code typed in inputs. |
| onComplete | (code) => void      |    none | Callback when OTP is completely filled. |
| otp | String      |    none | The value of the OTP passed into the component. |
| disabled | boolean      |    none | Disables all the inputs. |
| autoFocus | boolean      |    none | Auto focuses input on initial page load. |

### Examples
```jsx
import OtpInput from 'react-otpcode-input';

<OtpInput
  numberOfInputs={6}
  onChange={(code) => console.log(code)}
  onComplete={(code) => console.log(code)}
  otp={""}
  autoFocus={true}
/>
```

### License
MIT
