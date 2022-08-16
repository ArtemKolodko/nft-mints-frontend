import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserProfile } from '../../components/user-profile/user-profile.component';
import MascotAvatar from '../../assets/imgs/mascot/DJ3N_Mascot.png';
import MascotBanner from '../../assets/imgs/mascot/Banner.png';
import Header from '../../components/header/header.component';
import { selectCurrentUser } from '../../store/user/user.selector';


import './landing.styles.scss';




const Landing = () => {

  const currentUser = useSelector(selectCurrentUser);

  const mockUser = {
    name: 'DJ3N',
    publicLink: '@yourname',
    profileDescription: 'DJ3N allows any creator to host their own storefront in Web3.\nConnect with fans and build your Web3 street team.\nClick around to get started.'
  }
  
  // if (process.env.NODE_ENV === 'production') {
  //   if (currentUser) {
  //     return <Navigate to={`nfts/gallery/${currentUser.uuid}`} />
  //   }
  // }

  if (currentUser) {
    return <Navigate to={`nfts/gallery/${currentUser.uuid}`} />
  }

  return (
    <div className='landing-container'>
      <Header />
      <UserProfile name={mockUser.name} 
        publicLink={mockUser.publicLink} 
        profileImage={MascotAvatar} 
        profileImageBg={MascotBanner} 
        profileDescription={mockUser.profileDescription}/>
      <div className='landing-get-started-container'>
        <Link className="navigation__link" to='started/' >
          <FontAwesomeIcon icon={faPlus} className='landing-get-started'/>
        </Link>
      </div>
    </div>
  )
}

export default Landing;