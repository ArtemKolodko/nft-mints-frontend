import { ChangeEvent } from 'react';

type AreaInputProps = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

export const BasicAreaInput = (props : AreaInputProps) => {
  const { name, ...otherProps } = props;
  return (
    <textarea className='area-input' 
      id={name} name={name} 
      {...otherProps} 
    />
  )
}
