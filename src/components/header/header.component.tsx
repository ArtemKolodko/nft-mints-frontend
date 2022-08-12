import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import Logo from "../../assets/imgs/DJ3N Logo.png"
import Grid from "@mui/material/Grid";

import "./header.styles.scss";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log("header", currentUser);
  return (
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="header__wallet">
          {currentUser ? <h3>{currentUser.phone}</h3> : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
