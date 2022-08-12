import { useNavigate } from 'react-router-dom';

import { UserProfile } from '../../components/user-profile/user-profile.component';

import MascotAvatar from '../../assets/imgs/mascot/DJ3N_Mascot.png';
import MascotBanner from '../../assets/imgs/mascot/Banner.png';


import './landing.styles.scss';


const Landing = () => {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('auth/');
  }

  return (
    <div className='landing-container'>
      <UserProfile name='DJ3N' publicLink='@yourname' profileImage={MascotAvatar} profileImageBg={MascotBanner}/>
      <button className='create-button' onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Landing;