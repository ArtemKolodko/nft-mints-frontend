import { useState, ChangeEvent, useEffect } from "react";

import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

import { ethers } from "ethers";

import "./fiat-onramp.styles.scss";

const { isBech32Address } = require('@harmony-js/utils');

const defaultFormFields = {
  oneAmount: "",
  address: "",
  email: ""
};

const FiatOnramp = (props: any) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "oneAmount") {
      setFormFields({...formFields, [name]: ethers.utils.parseEther(value).toString()});
    }
    if(name == "address"){
      setErrorMessage("")
      setFormFields({...formFields, [name]: value});
    }
    else{
      setFormFields({...formFields, [name]: value});
    }
  };

  const startRamp = () => {
    if(!isBech32Address(formFields.address)){
      setErrorMessage("Invalid Address, Please use ONE format address")
      return
    }
    const rampSDK = new RampInstantSDK({
      hostAppName: 'D3jn',
      hostLogoUrl: 'https://collectible-creator.netlify.app/static/media/DJ3N%20Logo.36cec0b22275a29a1c30.png',
      swapAsset: 'HARMONY_ONE',
      swapAmount: formFields.oneAmount,
      userAddress: formFields.address,
      userEmailAddress: formFields.email
    });
    rampSDK.show();
  }
  
  return (
    <div className="create-collective">
      <h2 className="form__title">Get ONE</h2>
      <form className="form"
            //onSubmit={startRamp}
      >
        <div className="basic">
          <div className="basic">
            <input
              className="basic-input"
              name="oneAmount"
              placeholder="One Amount"
              required={false}
              type="text"
              onChange={handleInputChange}
            />
            <input
              className="basic-input"
              name="address"
              placeholder="One Address"
              required={false}
              onChange={handleInputChange}
            />
            <input
              className="basic-input"
              name="email"
              placeholder="Email Address"
              required={false}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      <div className="create-collective">
      <button
        className="form__button"
        onClick={startRamp}
        disabled={
        formFields.oneAmount === "" ||
        formFields.address === ""
        }
      >
        Continue
      </button>
      {errorMessage && (
          <p className="error"> {errorMessage} </p>
      )}
      </div>
    </div>
  );
};

export default FiatOnramp;
