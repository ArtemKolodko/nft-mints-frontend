import { ChangeEvent, MouseEventHandler } from 'react';

import './mint-input.styles.scss';

type BasicInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type AreaInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

type MintButtonType = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const BasicInput = (props : BasicInputProps) => {
  //const { name, type, placeholder, required } = props;
  const { name, label, ...otherProps } = props;
  return (
    <div className='basic-input-container'>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...otherProps} className='basic-input'></input>
    </div>
  )
}

export const AreaInput = (props : AreaInputProps) => {
  const { name, label, ...otherProps } = props;
  return (
    <div className='basic-input-container'>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...otherProps} rows={4} className='area-input'/>
    </div>
  )
}

export const SpecialInput = (props : BasicInputProps) => {
  const { name, label, ...otherProps } = props;
  return (
    <div className='special-input-container'>
      <input id={name} name={name} {...otherProps} className='special-input'/>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export const MintButton = (props : MintButtonType) => {
  const { label, ...otherProps } = props;
  return (
    <div className='mint-button'>
      <button  
        type='submit'
        {...otherProps}>
          {label}
      </button>
    </div>
   
  )
}



