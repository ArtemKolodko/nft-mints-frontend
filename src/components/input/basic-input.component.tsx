import { ChangeEvent } from 'react';

import './input.styles.scss';

type BasicInputProps = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInput = (props : BasicInputProps) => {
  const { name, ...otherProps } = props;
  return (
    <input className='basic-input'
      id={name} 
      name={name} {...otherProps} />
  )
}  