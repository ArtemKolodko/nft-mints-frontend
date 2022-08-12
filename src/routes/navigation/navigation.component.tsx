import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";

import { selectCurrentUser } from "../../store/user/user.selector";
import Header from "../../components/header/header.component";
import Logo from "../../assets/imgs/DJ3N Logo.png"

import "./navigation.styles.scss";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to='/' />
  }
  
  return (
    <Fragment>
    <Header />
    <Outlet />
    <div className="navigation">
      <div className="navigation__actions">
        <Link className="navigation__link" to="mint">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        <Link className="navigation__link" to="gallery">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link className="navigation__link" to="gallery">
          <FontAwesomeIcon icon={faFolder} />
        </Link>
      </div>
    </div>
  </Fragment>
  );
};

export default Navigation;
