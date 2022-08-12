import { useState, useRef } from "react";
import { Buffer } from "buffer";
import { useParams, useNavigate } from "react-router-dom";
import { PinField } from "react-pin-field";
import Logo from "../../assets/imgs/DJ3N Logo.png";

import {
  //initLogin as commInitLogin,
  initLogin,
  // logout as commLogout,
  // whoami as commWhoAmI,
} from "../../utils/sms-wallet/comunicator";

import AuthInput from "../../components/auth-input/auth-input.component";

import "./login.styles.scss";
import { PhoneNumberInput } from "../../components/input/input.component";

const GATEWAY = "https://smsnftgateway2.herokuapp.com";
const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("+573232378976");
  const [connecting, setConnecting] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    console.log("click", mobileNumber);
    // const res = await fetch(`${GATEWAY}/v0/users/phone/${mobileNumber}`, {
    //   method: 'GET',
    //   credentials: 'include',
    // })
    // console.log(res);
    // // now we get the stuff to sign!
    // const sign = await initLogin({} as any)

    // setConnecting(false)

    // const params = `callback=${sign.callback}&message=${sign.message}&caller=${sign.caller}`
    // console.log(params);
    // window.location.href = `https://smswallet.xyz/sign?${params}`

    const sign = await initLogin({
      phone: mobileNumber,
      redirect: `${baseUrl}/verify`,
    });

    setConnecting(false);
    console.log("sign", sign);

    window.localStorage.setItem("phone", mobileNumber);
   
    const params = `callback=${sign.callback}&message=${sign.message}&caller=${sign.caller}`;
    window.location.href = `https://smswallet.xyz/sign?${params}`;
  };

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setMobileNumber(value);
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
            placeholder="Enter phone number"
            name="phoneNumber"
            label="Phone number *"
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

        <button onClick={loginHandler}>Login</button>
      </div>
    </div>
  );
};

export default Login;
