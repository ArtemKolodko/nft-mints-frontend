import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faFolder } from "@fortawesome/free-solid-svg-icons";

import { selectCurrentUser } from "../../store/user/user.selector";
import Header from "../../components/header/header.component";

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
        <Link className="navigation__link" to="/nfts/">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        <Link className="navigation__link" to={`gallery/${currentUser.uuid}`}>
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link className="navigation__link" to={`gallery/${currentUser.uuid}`}>
          <FontAwesomeIcon icon={faFolder} />
        </Link>
      </div>
    </div>
  </Fragment>
  );
};

export default Navigation;
