import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header.component";
import { checkingLogin, setLoginChecked } from "../../store/user/user.action";
import { selectCheckLogin } from "../../store/user/user.selector";
import { checkLogin } from "../../utils/mint-interface/mint-inteface.utils";

const GetStarted = () => {
  const [checked, setChecked] = useState(false)

  const dispatch = useDispatch();
  // getting started can verify that a user is logged in or not (same as navigation)
  useEffect(() => {
    if (checked) {
      return;
    }
    dispatch(checkingLogin())
    checkLogin().then(user=>dispatch(setLoginChecked(user))).catch(err=>dispatch(setLoginChecked(null)))
    
    setChecked(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default GetStarted;