import { useParams, Link } from "react-router-dom";
import Logo from "../../assets/imgs/dj3n_logo.svg";

import "./checkout.styles.scss";

//add purchased nft image
const CheckoutSuccess = () => {
  const { collectionUuid } = useParams();

  console.log(collectionUuid);
  
  return (
    <div className="checkout-response-container">
      <div className="checkout-response-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      <h1>Congratulations!</h1>
      <h2>You succesfully purchase the NFT</h2>
      <p>
        To see your purchases, please click <Link to='/gallery/6aa6ff52-6676-4dc0-aa4f-db8bae367c65'>here</Link>
      </p>
    </div>
  );
};

export default CheckoutSuccess;
