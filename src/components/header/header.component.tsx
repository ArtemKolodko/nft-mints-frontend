import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import Logo from "../../assets/imgs/DJ3N Logo.png"
import Grid from "@mui/material/Grid";

import "./header.styles.scss";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log('header',currentUser)
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
            <img src={Logo} alt="logo" />
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
          { currentUser ? (<h3>{currentUser.phone}</h3>) : null}
          </div>
        </Grid>
      </div>
    </Fragment>
  );
};

export default Header;
