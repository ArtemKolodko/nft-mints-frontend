import { useState } from "react";

import PhoneNumberInput from "../../components/input/phone-number-input.component";
import { smsLoginHandler } from "../../utils/sms-wallet/sms-wallet.utils";

import Logo from "../../assets/imgs/DJ3N Logo.png";

import "./login.styles.scss";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("+573232378976");
  const [connecting, setConnecting] = useState(false);

  const loginHandler = async () => {
    try {
      setConnecting(true);
      await smsLoginHandler(mobileNumber);
    } catch (e) {
      console.log('Cannot login:', e)
    } finally {
      setConnecting(false)
    }
  };

  const onChangeHandler = (event: any) => {
    const { value } = event.target;
    setMobileNumber(value);
  };

  const verifyPhone = (): boolean | undefined => {
    if (mobileNumber) return mobileNumber!.length < 10 || connecting;
    return true;
  };

  return (
    <div className="login">
      <div className="login__header">
        <div className="login__logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="login__title">DJ3N</h1>
      </div>

      <div className="login__body">
        <div className="login__phone_input">
          <PhoneNumberInput
            placeholder="Enter phone number*"
            name="phoneNumber"
            required={true}
            defaultCountry="US"
            value={mobileNumber}
            onChange={(value) =>
              onChangeHandler({
                target: {
                  name: "phoneNumber",
                  value,
                },
              })
            }
          />
        </div>

        <button onClick={loginHandler} disabled={verifyPhone()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
