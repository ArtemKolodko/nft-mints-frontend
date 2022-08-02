import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/DJ3N Logo.png"
import { Button } from "../../components/input/input.component";

import "./checkout.styles.scss";

//add purchased nft image
const CheckoutSuccess = () => {
  const { userUuid, tokenUuid } = useParams();
  const navigate = useNavigate();
  console.log('checkout :userUuid/:tokenUuid');
  console.log("user", userUuid, "token", tokenUuid);

  const handleButton = () => {
    navigate(`/collectionable/${tokenUuid}`);
  }

  return (
    <div className="checkout-response-container">
      <div className="checkout-response-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      <h1>Congratulations!</h1>
      <h2>You have successfully purchased <br />this collectible</h2>
      {tokenUuid && (
         <Button label="View Collectible" onClick={handleButton} className='button checkout-button'/>
      )}
    </div>
  );
};

export default CheckoutSuccess;
