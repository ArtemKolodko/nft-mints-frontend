import { Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";

import { saveLocalState } from "../../utils/storage/local-storage.utils";
import { CollectionType } from "../../types/collection.types";
import { checkoutCollectionV2 } from "../../utils/mint-interface/mint-inteface.utils";
import PhoneNumberInput from "../input/phone-number-input.component";
import { smsLoginHandler } from "../../utils/sms-wallet/sms-wallet.utils";

import "./checkout.styles.scss";
import UserType from "../../types/user.types";

export type CheckoutProps = {
  currentUser: UserType;
  nft: CollectionType;
  setEnableCheckout: Dispatch<SetStateAction<boolean>>;
};

export enum CheckoutKey {
  NFT_IMAGE = 'NFT_IMAGE'
}

const Checkout = ({ nft, setEnableCheckout, currentUser }: CheckoutProps) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleButton = async () => {
    if (currentUser) {
      setButtonDisabled(true);
      saveLocalState(nft.collectionImage,CheckoutKey.NFT_IMAGE);
      const response = await checkoutCollectionV2(Array(nft));
      console.log("handleButton", { response });
      if (response && response.status < 300) {
        setErrorMessage("");
        window.location.href = response.data.url;
      } else {
        setButtonDisabled(false);
        setErrorMessage("Error trying to connect to Stripe");
        console.log("ERROR", { response });
      }
    } else {
      const redirect = `/nfts/collectible/${nft.uuid}`;
      smsLoginHandler(phoneNumber,'Buy Collectible', redirect);
    }
  };

  const onChangeHandler = (event: any) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  return (
    <div className="checkout-area-container">
      {currentUser ? (
        <h4>
          You will be redirected to Stripe to continue with the payment process.
        </h4>
      ) : (
        <>
          <h3>
            To purchase the NFT, <br />
            you need to sign in/sign up.
          </h3>
          <h4>To continue, please enter your mobile phone number</h4>
        </>
      )}

      {!currentUser && (
        <PhoneNumberInput
          placeholder="Please enter your phone number*"
          name="phoneNumber"
          required={true}
          defaultCountry="US"
          value={phoneNumber}
          onChange={(value) =>
            onChangeHandler({
              target: {
                name: "phoneNumber",
                value,
              },
            })
          }
        />
      )}
      <Button
        variant="contained"
        fullWidth={true}
        disabled={buttonDisabled}
        className="collectible-share-button"
        onClick={handleButton}
      >
        {currentUser ? <>Go to stripe</> : <>Sign Up / Sign in</>}
      </Button>

      <Button
        variant="outlined"
        fullWidth={true}
        disabled={buttonDisabled}
        className="collectible-share-button"
        onClick={() => setEnableCheckout(false)}
      >
        Cancel
      </Button>
      <h4 className="checkout-error">{errorMessage}</h4>
    </div>
  );
};

export default Checkout;
