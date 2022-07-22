import { useParams } from "react-router-dom";

import "./checkout.styles.scss";

import Logo from "../../assets/imgs/dj3n_logo.svg";

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
        To see your purchases, please click <u>here</u>
      </p>
    </div>
  );
};

export default CheckoutSuccess;
