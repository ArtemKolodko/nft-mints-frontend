import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import PhoneNumberInput from "../input/phone-number-input.component";
import { smsLoginHandler } from "../../utils/sms-wallet/sms-wallet.utils";

import './new-user-alert.styles.scss';
import Button from "../button/button.component";

export type NewUSerAlertProps = {
  openAlert: boolean;
  redirect: string;
};
const NewUserAlert = ({ openAlert, redirect }: NewUSerAlertProps) => {
  const [ open, setOpen ] = useState(openAlert);
  const [ phoneNumber, setPhoneNumber ] = useState('');

  // const handleClose = () => {
  //   setOpen(false);
  // };


  
  const loginHandler = async () => {
    setOpen(false);    
    smsLoginHandler(phoneNumber,'Create Collectiblre', redirect);

    
  };

  const verifyPhone = (): boolean | undefined => {
    if (phoneNumber && phoneNumber.length >= 10)
      return false;
    return true;
  };
  
  const handleChange = (event: any) => {
    const { value } = event;
    setPhoneNumber(value);
  }
  
  
  
  return (
    <Backdrop
      sx={{ color: "#fff" }}
      open={open}
    >
      <div className='backdrop-container'>
        <h3>To continue, you need to<br /> sign in/sign up</h3>
        <PhoneNumberInput 
          name='newUserPhone' 
          value={phoneNumber} 
          placeholder='Enter phone number*' 
          onChange={(value) =>
            handleChange({
              target: {
                name: "phoneNumber",
                value,
              },
            })} 
          defaultCountry='US'
        />
        <Button label='Sign up/Sign in' onClick={loginHandler}  style={{ marginTop: '2em'}}/> 
      </div>
      
    </Backdrop>
  );
};

export default NewUserAlert;
//