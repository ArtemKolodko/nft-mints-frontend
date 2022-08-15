import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css'
import './input.styles.scss';

type PhoneNumberProps = {
  name: string;
  placeholder?: string;
  required?: boolean;
  value: any
  onChange: (event: any) => void;
  defaultCountry: any;
}

const PhoneNumberInput = (props: PhoneNumberProps) => {
  const { name, defaultCountry, value, ...otherProps } = props;
  return (
    <PhoneInput name={name} id={name} defaultCountry={defaultCountry} value={value} {...otherProps} />
  )
}

export default PhoneNumberInput;