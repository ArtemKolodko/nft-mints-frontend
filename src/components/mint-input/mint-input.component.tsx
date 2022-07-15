
import './mint-input.styles.scss';

type MintInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
}

export const BasicInput = (props : MintInputProps) => {
  //const { name, type, placeholder, required } = props;
  const { name, label } = props;
  return (
    <div className='basic-input-container'>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...props} className='basic-input'></input>
    </div>
  )
}

export const AreaInput = (props : MintInputProps) => {
  const { name, label } = props;
  return (
    <div className='basic-input-container'>
      <label htmlFor={name}>{label}</label>
      <textarea id={name} {...props} rows={4} className='area-input'/>
    </div>
  )
}

export const SpecialInput = (props : MintInputProps) => {
  //const { name, type, placeholder, required } = props;
  const { name, label } = props;
  return (
    <div className='special-input-container'>
      <input id={name} {...props} className='special-input'/>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

type MintButtonType = {
  label: string
}

export const MintButton = (props : MintButtonType) => {
  const { label } = props;
  return (
    <button className='mint-button' type='submit'>{label}</button>
  )
}



