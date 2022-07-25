import { useParams, Link } from "react-router-dom";
import Logo from "../../assets/imgs/dj3n_logo.svg";

import "./checkout.styles.scss";

//add purchased nft image
const CheckoutSuccess = () => {
  const { userUuid } = useParams();
  console.log("user", userUuid);

  return (
    <div className="checkout-response-container">
      <div className="checkout-response-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      <h1>Congratulations!</h1>
      <h2>You have successfully purchased <br />this collectible</h2>
      {userUuid && (
        <p>
          View <Link to={`/gallery/${userUuid}`}>collection</Link>
        </p>
      )}
    </div>
  );
};

export default CheckoutSuccess;
