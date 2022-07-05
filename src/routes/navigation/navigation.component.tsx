import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/logo.svg';

import './navigation.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
       <div className='navigation'>
        <div className='logo'>
          <img src={logo} style={{ height: '30px'}} alt='logo'/>
        </div>
       </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;