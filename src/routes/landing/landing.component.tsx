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
import GalleryTab from '../../components/gallery/gallery-tab.component';
import { Fragment, useState } from 'react';
import NavigationBar from '../../components/navigation/navigation-bar';




const Landing = () => {

  const currentUser = useSelector(selectCurrentUser);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

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

  const handleChangeTab = (e: React.SyntheticEvent, value: number) => setActiveTabIndex(value)


  return (
    <Fragment>
      <Header />
      <div className='landing-container'>
        <UserProfile name={mockUser.name}
          publicLink={mockUser.publicLink}
          profileImage={MascotAvatar}
          profileImageBg={MascotBanner}
          editable={false}
          description={mockUser.profileDescription} />
        <GalleryTab activeTabIndex={activeTabIndex} handleChangeTab={handleChangeTab} />
        <div className='landing-get-started-container'>
          <Link className="navigation__link" to='started/' >
            <FontAwesomeIcon icon={faPlus} className='landing-get-started' />
          </Link>
        </div>
        <button className="get-started-button">Tap the plus sign to get started</button>
      </div>
      <NavigationBar />
    </Fragment>
  )
}

export default Landing;