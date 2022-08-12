import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/DJ3N Logo.png";
import { saveLocalState } from "../../utils/storage/local-storage.utils";

import {
  //initLogin as commInitLogin,
  initLogin,
  // logout as commLogout,
  // whoami as commWhoAmI,
} from "../../utils/sms-wallet/comunicator";

import "./login.styles.scss";
import { PhoneNumberInput } from "../../components/input/input.component";

//const SMS_GATEWAY = process.env.REACT_APP_SMS_WALLET_GATEWAY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const SMS_URL = process.env.REACT_APP_SMS_WALLET_URL;

const Login = () => {
  const [ mobileNumber, setMobileNumber ] = useState("+573232378976");
  const [ connecting, setConnecting ] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    console.log("click", mobileNumber);
    
    const sign = await initLogin({
      phone: mobileNumber,
      redirect: `${BASE_URL}/verify`,
    });

    setConnecting(true);
    console.log("sign", sign);

    saveLocalState(mobileNumber);
   
    const params = `callback=${sign.callback}&message=${sign.message}&caller=${sign.caller}`;
    window.location.href = `${SMS_URL}/sign?${params}`;
  };

  const onChangeHandler = (event : any) => {
    const { value } = event.target;
    setMobileNumber(value);
  };

  const verifyPhone = (): boolean | undefined => {
    if (mobileNumber)
      return mobileNumber!.length < 10 || connecting;
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

        <button onClick={loginHandler} disabled={verifyPhone()}>Login</button>
      </div>
    </div>
  );
};

export default Login;
