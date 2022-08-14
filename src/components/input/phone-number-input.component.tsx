import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css'
import './input.styles.scss';

type PhoneNumberProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: any
  onChange: (event: any) => void;
  defaultCountry: any 
  //value={verifyPhoneNumber}
}

const PhoneNumberInput = (props: PhoneNumberProps) => {
  const { name, label, defaultCountry, value, ...otherProps } = props;
  return (
    <PhoneInput name={name} id={name} defaultCountry={defaultCountry} value={value} {...otherProps} />
  )
}

export default PhoneNumberInput;