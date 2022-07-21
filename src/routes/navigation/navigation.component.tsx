import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logo from "../../assets/imgs/dj3n_logo.svg";
import Grid from "@mui/material/Grid";

import "./navigation.styles.scss";

const Navigation = () => {

  return (
    <Fragment>
      <div className="navigation-container">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          marginLeft={'10px'}
          marginRight={'15px'}
        >
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          {/* <Link className='nav-link' to='mint'>
            Mint
          </Link>
          <Link className='nav-link' to='gallery'>
            Gallery
          </Link>
          <Link className='nav-link' to='gallery'>
            Explore
          </Link> */}
          <div className="wallet-address nav-wallet">
            0x3123....23232
          </div>
        </Grid>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
