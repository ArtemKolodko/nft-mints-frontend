import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
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
            <img src={logo}  alt="logo" />
          </div>
          <div className="nav-item">
            Mint
          </div>
          <div className="nav-item">
            Gallery
          </div>
          <div className="nav-item">
            Explore
          </div>
          <div className="wallet-address nav-item">
            0x3123....23232
          </div>
        </Grid>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
