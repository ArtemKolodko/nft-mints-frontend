import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectCheckLogin, selectCurrentUser } from "../../store/user/user.selector";
import Header from "../../components/header/header.component";

import "./navigation.styles.scss";
import { checkingLogin, setLoginChecked } from "../../store/user/user.action";
import { checkLogin } from "../../utils/mint-interface/mint-inteface.utils";
import NavigationBar from "../../components/navigation/navigation-bar.component";

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
      <NavigationBar uuid={currentUser.uuid}/>
  </Fragment>
  );
};

export default Navigation;
