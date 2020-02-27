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

### API
<table>
  <tr>
    <th>Name<br/></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>numberOfInputs</td>
    <td>number</td>
    <td>true</td>
    <td>4</td>
    <td>Number of OTP inputs to be rendered.</td>
  </tr>
  <tr>
    <td>onChange</td>
    <td>function</td>
    <td>true</td>
    <td>none</td>
    <td>Returns OTP code typed in inputs.</td>
  </tr>
  <tr>
    <td>onComplete</td>
    <td>function</td>
    <td>true</td>
    <td>none</td>
    <td>Callback when OTP is completely filled.</td>
  </tr>
  <tr>
    <td>otp</td>
    <td>string</td>
    <td>true</td>
    <td>none</td>
    <td>The value of the OTP passed into the component.</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Disables all the inputs.</td>
  </tr>
  <tr>
    <td>autoFocus</td>
    <td>boolean</td>
    <td>false</td>
    <td>false</td>
    <td>Auto focuses input on initial page load.</td>
  </tr>
</table>

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
![NPM](https://img.shields.io/npm/l/react-otpcode-input)

MIT
