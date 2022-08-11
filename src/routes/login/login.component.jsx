import { useState, useRef } from "react";
import {Buffer} from 'buffer';
import { useParams, useNavigate } from "react-router-dom";
import { PinField } from "react-pin-field";

import {
  //initLogin as commInitLogin,
  initLogin,
  // logout as commLogout,
  // whoami as commWhoAmI,
} from '../../utils/sms-wallet/comunicator';

import AuthInput from "../../components/auth-input/auth-input.component";

import "./login.styles.scss";

const GATEWAY = 'https://smsnftgateway2.herokuapp.com'
const baseUrl = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('+573232378976');
  const [connecting, setConnecting] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log('click',mobileNumber);
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

    const sign = await initLogin({phone: mobileNumber, redirect: `${baseUrl}/verify` })

    setConnecting(false);
    console.log('sign', sign)

    window.localStorage.setItem('phone', mobileNumber);
    // const fco = `${baseUrl}/verify`;
    

    // let data = 'stackabuse.com';
    // let buff = await Buffer.from(data).toString('base64');
    // //let base64data = buff.toString('base64');

    // console.log(fco);
    // console.log(buff);
    // console.log(encodeURIComponent(buff));
    // const params = `callback=${fco.toString('base64')}&message=${sign.message}&caller=${sign.caller}`
    // console.log(params);
    // console.log(`callback=${sign.callback}&message=${sign.message}&caller=${sign.caller}`);
    const params = `callback=${sign.callback}&message=${sign.message}&caller=${sign.caller}`
    window.location.href = `https://smswallet.xyz/sign?${params}`

    
  }
    

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setMobileNumber(value);
  }
  return (
    <div className="authentication-container">
        <div className="auth-form-container">
          <AuthInput
            name="mobileNumber"
            label="Enter Phone number"
            value={mobileNumber}
            type="text"
            required={true}
            placeholder="123456789"
            onChange={onChangeHandler}
          />
          <button className="send-code-button" onClick={handleLogin}>
            Login
          </button>
        </div>

    </div>
  );
};

export default Login;
