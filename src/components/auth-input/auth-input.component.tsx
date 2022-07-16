import { ChangeEventHandler } from 'react';

import './auth-input.styles.scss';

type AuthInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const AuthInput = (props : AuthInputProps) => {
  //const { name, type, placeholder, required } = props;
  const { name, label, ...otherProps } = props;
  return (
    <div className='auth-input-container'>
      <input id={name} {...otherProps} className='auth-input'></input>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default AuthInput;