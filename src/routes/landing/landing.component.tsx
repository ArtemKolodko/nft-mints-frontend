import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/imgs/dj3n_logo.svg'

import './landing.styles.scss';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('login');
  }

  return (
    <div className='landing-container'>
      <img src={Logo} alt='dj3n logo' className='landing-logo'/>
      <h1>Welcome to <br /><span className='brand-name'>dj3n</span></h1>
      <button className='create-button'>Create Account</button>
      <h2>or</h2>
      <button className='login-button' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Landing;