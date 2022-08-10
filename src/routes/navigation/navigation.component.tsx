import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";

import { Link, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Logo from "../../assets/imgs/DJ3N Logo.png"
import Grid from "@mui/material/Grid";

import "./navigation.styles.scss";
import Header from "../../components/header/header.component";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  if (!currentUser) {
    return <Navigate to='/' />
  }
  
  return (
    <Fragment>
      <Header />
      <Outlet />
      <div className="navigation-container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginLeft={'10px'}
          marginRight={'15px'}
        >
          {/* <div className="logo">
            <img src={Logo} alt="logo" />
          </div>
          { currentUser ? (<div>{currentUser.phone}</div>) : null} */}
          <Link className='nav-link' to='mint'>
            Mint
          </Link>
          <Link className='nav-link' to='gallery'>
            Gallery
          </Link>
          <Link className='nav-link' to='gallery'>
            Explore
          </Link>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Navigation;
