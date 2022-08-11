import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PinField } from "react-pin-field";

import AuthInput from "../../components/auth-input/auth-input.component";

import "./authentication.styles.scss";


const Authentication = () => {
  const [ otp, setOtp ] = useState("");
  const [ otpCompleted, setOtpCompleted ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const otpInputRef = useRef<HTMLInputElement[]>([]);
  //const { type } = useParams();
  const navigate = useNavigate();

  const handleSendCode = () => {
    setOtp("1234");
  };

  const handleOtpComplete = (code: string) => {
    console.log(code);
    setOtpCompleted(true);
    if (code === '12345') {
      navigate('/home/mint')
    } else {
      setErrorMessage('Wrong code');
      setOtpCompleted(false);
      otpInputRef.current.forEach(input => input.value = '');
      otpInputRef.current[0].focus();
    }
  }
  
  const handleOtpChange = () => {
    if (errorMessage) {
      setErrorMessage('');
    }
  }
  
  return (
    <div className="authentication-container">
      {!otp && (
        <div className="auth-form-container">
          <AuthInput
            name="auth-email"
            label="Enter Email address"
            type="text"
            required={true}
            placeholder="example@omw.com"
          />
          <button className="send-code-button" onClick={handleSendCode}>
            Send Code
          </button>
        </div>
      )}
      {otp && (
        <div className="otp-container">
          <div
            className={`pin-field-container ${otpCompleted ? "complete" : ""}`}
          >
            <PinField
              ref={otpInputRef}
              className="pin-field"
              onComplete={handleOtpComplete}
              onChange={handleOtpChange}
              format={(k) => k.toUpperCase()}
              autoFocus
              disabled={otpCompleted}
            />
          </div>
        {errorMessage ? (<p style={{ fontWeight: 100, 
            textAlign: 'center', 
            marginTop: '-30px', 
            fontSize: '1.5rem',
            color: 'red'}}>Wrong code. Please try again</p>) : ( <><p style={{ fontWeight: 100, 
              textAlign: 'center', 
              marginTop: '-30px', 
              fontSize: '1.5rem'}}>Enter code</p>
            <p style={{ fontWeight: 100, 
              textAlign: 'center', 
              marginTop: '-20px', 
              fontSize: '0.8rem'}}>Click to <span><u>Resend</u></span></p></>)
            }
        </div>
      )}
    </div>
  );
};

export default Authentication;
