import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faWindowRestore } from "@fortawesome/free-solid-svg-icons"; 

import { truncateAddressString } from "../../utils/utils";
import { UserTypeEnum } from "../../types/user.types";
import {
  selectCheckLogin,
  selectCurrentUser,
} from "../../store/user/user.selector";
import Logo from "../../assets/imgs/DJ3N Logo.png";

import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [showWallet, setShowWallet] = useState(false);
  const [walletClass, setWalletClass] = useState(
    "header__wallet header__wallet-public"
  );

  const currentUser = useSelector(selectCurrentUser);
  const checkLogin = useSelector(selectCheckLogin);

  useEffect(() => {
    if (!checkLogin.checkedLogin) {
      return; // don't get until we have checked our login
    }

    const getClassName = () => {
      const baseClass = "header__wallet";

      if (currentUser) {
        if (currentUser.userType === UserTypeEnum.CREATOR) {
          setWalletClass(`${baseClass} header__wallet-creator`);
        } else {
          setWalletClass(`${baseClass} header__wallet-fan` );
        }
      } else {
        setWalletClass(`${baseClass} header__wallet-public`);
      }
    };

    getClassName();
  }, [currentUser, checkLogin]);

  const toggleWallet = () => {
    setShowWallet(!showWallet);
  };

  return (
    <Fragment>
      <div className="header">
        <div className="header__logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className={walletClass}>
          {currentUser ? (
            <h3 onClick={toggleWallet}>
              {showWallet ? (
                <div>
                  <FontAwesomeIcon
                    icon={faWallet}
                    style={{ paddingRight: "12px" }}
                  />
                  {truncateAddressString(currentUser.walletAddress, 6)}
                  <FontAwesomeIcon
                    icon={faWindowRestore}
                    style={{ paddingLeft: "12px" }}
                  />
                </div>
              ) : (
                <FontAwesomeIcon icon={faWallet} />
              )}
            </h3>
          ) : (
            <Link to="/auth/" style={{ color: "white" }}>
              <h3>Login</h3>
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
