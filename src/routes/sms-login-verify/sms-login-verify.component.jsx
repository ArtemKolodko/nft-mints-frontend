import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentUser } from "../../store/user/user.action";
import { verifyLogin } from "../../utils/sms-wallet/comunicator";
import { loadLocalState } from "../../utils/storage/local-storage.utils";

import Logo from "../../assets/imgs/DJ3N Logo.png";
import "./sms-login-verify.styles.scss";

const SmsLoginVerify = () => {
  const [, setIsPending] = useState(true);
  const [message, setMessage] = useState("");
  const [redirectUri, setRedirectUri] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Standard params
    const params = new URLSearchParams(window.location.search);
    const signature = params.get("signature");
    const address = params.get("address");
    const messageHash = params.get("messageHash");
    const error = params.get("error");
    const cancelled = params.get("cancelled");
    // We added this one for convenience
    const redirect = params.get("redirect");
    if (redirect) setRedirectUri(redirect);

    const phone = loadLocalState();

    verifyLogin({ signature, messageHash, address, error, cancelled, phone })
      .then((data) => {
        if (!data) {
          setMessage("User not logged in, check the console for details");
          return
        }

        dispatch(
          setCurrentUser(data)
        );

        setMessage(
          `Your information has been verified. Redirecting to ${
            redirect || "gallery"
          } in a few seconds.`
        );
        setTimeout(doRedirect, 5000, redirect);
      })
      .catch((err) => {
        console.error(err);
        setMessage("An error has occurred, check the console for details.");
      })
      .finally(() => setIsPending(false));
  }, [setIsPending, setRedirectUri]);

  function doRedirect(uri) {
    navigate('/nfts/');
  }

  return (
    <div className="login-verify">
      <div className="login-verify__header">
        <div className="login-verify__logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="login-verify__title">DJ3N</h1>
      </div>
      <div className="login-verify__body">
        <h3>Verifying your credentials.<br /> Please wait...</h3>
        <br />
        <p>{message}</p>
        {redirectUri ? <a href={redirectUri}>Continue</a> : null}
      </div>
    </div>
  );
};

export default SmsLoginVerify;
