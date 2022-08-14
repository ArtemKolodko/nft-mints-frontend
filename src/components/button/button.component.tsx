import { MouseEventHandler } from 'react';

import './button.styles.scss';

type ButtonType = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const Button = (props : ButtonType) => {
  const { label, ...otherProps } = props;
  return (
    <div className='button-container'>
      <button  
        className='button'
        type='submit'
        {...otherProps}>
          {label}
      </button>
    </div>
   
  )
}

export default Button;