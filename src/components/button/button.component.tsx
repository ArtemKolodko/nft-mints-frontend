import { CSSProperties } from 'react';
import { MouseEventHandler } from 'react';

import './button.styles.scss';

type ButtonType = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const Button = (props : ButtonType) => {
  const { label, className, style, ...otherProps } = props;
  let cl = ''
  if (className) {
    if (className === 'info') {
      cl = 'button-container__info'
    } else {
      cl = className
    }
  }
  return (
    <div className='button-container' style={style ? style : undefined}>
      <button className={cl}
        type='submit'
        {...otherProps}>
          {label}
      </button>
    </div>
   
  )
}

export default Button;