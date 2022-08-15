import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleUser, faTicket } from "@fortawesome/free-solid-svg-icons"; //faUser, faFolder, f

import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import Header from "../../components/header/header.component";

import "./navigation.styles.scss";
import { checkingLogin, setLoginChecked } from "../../store/user/user.action";
import { checkLogin } from "../../utils/mint-interface/mint-inteface.utils";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const check = useSelector(selectCheckLogin);
  const [checked, setChecked] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    if (checked) {
      return;
    }
    dispatch(checkingLogin())
    checkLogin().then(user=>dispatch(setLoginChecked(user))).catch(err=>dispatch(setLoginChecked(null)))
    
    setChecked(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  if (!currentUser) {
    return <Navigate to='/' />
  }

  if (!check.checkedLogin) {
    return <div>Checking Login</div> // style this
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
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
        <Link className="navigation__link" to={`gallery/${currentUser.uuid}`}>
          <FontAwesomeIcon icon={faTicket} />
        </Link>
      </div>
    </div>
  </Fragment>
  );
};

export default Navigation;
