import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../components/button/button.component";
import { CheckoutKey } from "../../components/checkout/checkout.component";
import { loadLocalState } from "../../utils/storage/local-storage.utils";

import Logo from "../../assets/imgs/DJ3N Logo.png";
import "./checkout.styles.scss";

//add purchased nft image
const CheckoutSuccess = () => {
  const [tokenImage, setTokenImage] = useState();
  const [isMinted, setIsMinted] = useState(false);
  const { tokenUuid, userUuid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setTokenImage(loadLocalState(CheckoutKey.NFT_IMAGE));
  }, []);

  useEffect(() => {
    setInterval(() => {
      setIsMinted(true);
    }, 5000);
  }, []);



  const handleButton = () => {
    navigate(`/nfts/gallery/${userUuid}`);
    //navigate(`/nfts/collectible/${tokenUuid}`);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-container__header">
        <div className="checkout-container__logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="checkout-container__title">DJ3N</h1>
      </div>
      <div className="checkout-container__sucess">
        <h3>Congratulations!</h3>
      </div>
      <div className="checkout-container__body">
        <div className="checkout-container__body__image">
          {tokenImage && <img src={tokenImage} alt="New Collectible" />}
        </div>
        <p>
          You have successfully <br />
          purchased this collectible.
        </p>
        <Button
          label={!isMinted ? "Enabling Collectible" : "View Collectible"}
          onClick={handleButton}
          className="button checkout-button"
          disabled={!isMinted}
        />
      </div>
    </div>
  );
};

export default CheckoutSuccess;
