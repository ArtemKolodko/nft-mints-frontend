import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from "../../store/user/user.selector";

import { setCurrentUser } from '../../store/user/user.action';
import Logo from '../../assets/imgs/dj3n_logo.svg'

import './landing.styles.scss';


const Landing = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  console.log('jajaja',currentUser);
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(setCurrentUser({
      phone: '3232378976'
    }))
    navigate('hmy/');
  }

  const handleCreate = () => {
    navigate('hmy/');
  }

  return (
    <div className='landing-container'>
      <img src={Logo} alt='dj3n logo' className='landing-logo'/>
      <h1>Welcome to <br /><span className='brand-name'>dj3n</span></h1>
      <button className='create-button' onClick={handleCreate}>Create Account</button>
      <h2>or</h2>
      <button className='login-button' onClick={handleLogin}>Login</button>
      {currentUser ? <h1>{currentUser.phone}</h1> : null}
    </div>
  )
}

export default Landing;