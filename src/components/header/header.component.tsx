import { Fragment } from "react";
import { useSelector } from "react-redux";

import { UserTypeEnum } from "../../types/user.types";
import { selectCurrentUser } from "../../store/user/user.selector";
import Logo from "../../assets/imgs/DJ3N Logo.png"

import "./header.styles.scss";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  
  const { phone, userType } = currentUser;

  const getClassName = () => {
    const className = "header__wallet";
    if (userType === UserTypeEnum.CREATOR) {
      return `${className} header__wallet-creator`
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
          {currentUser ? <h3>{phone}</h3> : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
