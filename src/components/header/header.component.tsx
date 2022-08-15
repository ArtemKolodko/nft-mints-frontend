import { Fragment } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons"; //faUser, faFolder, f

import { UserTypeEnum } from "../../types/user.types";
import { selectCurrentUser } from "../../store/user/user.selector";
import Logo from "../../assets/imgs/DJ3N Logo.png"

import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  
  const getClassName = () => {
    const className = "header__wallet";
    if (currentUser) {
      if (currentUser.userType === UserTypeEnum.CREATOR) {
        return `${className} header__wallet-creator`
      }
    }
   
    return `${className} header__wallet-public`
  }

  return (
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className={getClassName()}>
          { currentUser ? <h3><FontAwesomeIcon icon={faWallet} /></h3> : //<h3>{currentUser.phone}</h3> : 
            <Link to='/auth/' style={{color: 'white'}}><h3>Login</h3></Link>
          }
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
