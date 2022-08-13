import PhoneInput from 'react-phone-number-input';

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

export const PhoneNumberInput = (props: PhoneNumberProps) => {
  const { name, label, defaultCountry, value, ...otherProps } = props;
  return (
    <div className='basic-input-container'>
      <PhoneInput name={name} id={name} defaultCountry={defaultCountry} value={value} {...otherProps} />
    </div>
  )
}