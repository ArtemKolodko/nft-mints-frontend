import AuthInput from '../../components/auth-input/auth-input.component';

import './authentication.styles.scss';

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <div className='auth-form-container'>
        <AuthInput 
          name='auth-email' 
          label='Enter Email address' 
          type='text' 
          required={true} 
          placeholder='example@omw.com'/>
        <button className='create-button'>Send Code</button>
      </div>
     
    </div>
  )  
}

export default Authentication;