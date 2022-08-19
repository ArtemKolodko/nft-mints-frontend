import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { CollectionType } from "../../types";
import {
  getCollection,
  checkoutCollectionV2,
} from "../../utils/mint-interface/mint-inteface.utils";
import
  PhoneNumberInput
 from "../../components/input/phone-number-input.component";
import NftDetail from "../../components/nft-detail/nft-detail.component";
import Logo from "../../assets/imgs/DJ3N Logo.png";

import "./checkout.styles.scss";

const defaultFormFields = {
  phoneNumber: "",
  verifyPhoneNumber: "",
};

const Checkout = () => {
  const [nft, setNft] = useState<CollectionType>({} as CollectionType);
  const [errorMessage, setErrorMessage] = useState("");
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [checkingOut, setCheckingOut] = useState(false);
  const { phoneNumber, verifyPhoneNumber } = formFields;
  const { collectionUuid } = useParams();

  useEffect(() => {
    const getNft = async () => {
      const collection = await getCollection(collectionUuid!);
      if (collection) {
        setNft(collection);
      } else {
        setErrorMessage("Error trying to retrieve the Collection");
      }
    };

    collectionUuid && getNft();
  }, [collectionUuid]);

  console.log(phoneNumber, verifyPhoneNumber);
  const handleButton = async () => {
    const OTP = "05270";
    setCheckingOut(true);
    const response = await checkoutCollectionV2(Array(nft));

    console.log("handleButton", { response });

    if (response && response.status < 300) {
      window.location.href = response.data.url;
    } else {
      setCheckingOut(false);
      setErrorMessage("Error. User does not exist");
      console.log("User does not exist");
    }
  };

  const changeHandler = (event: any) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const verifyPhone = (): boolean | undefined => {
    if (phoneNumber && verifyPhoneNumber)
      return phoneNumber!.length < 10 || phoneNumber !== verifyPhoneNumber;
    return true;
  };

  return (
    <div className="checkout-container">
      <div className="checkout-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      {Object.entries(nft).length !== 0 ? (
        <NftDetail collection={nft} />
      ) : (
        <div style={{ verticalAlign: "middle" }}>
          <CircularProgress />
        </div>
      )}

      <div className="checkout-form-container">
        {!errorMessage ? (
          <h4 style={{ marginLeft: "1.5em", marginRight: "1.5em" }}>
            If you would like to purchase this collectible, please enter your
            mobile phone number
          </h4>
        ) : (
          <h4
            style={{
              marginLeft: "1.5em",
              marginRight: "1.5em",
              color: "red",
              fontWeight: "600",
            }}
          >
            {errorMessage}
          </h4>
        )}

        <PhoneNumberInput
          placeholder="Enter phone number*"
          name="phoneNumber"
          required={true}
          defaultCountry="US"
          value={phoneNumber}
          onChange={(value) =>
            changeHandler({
              target: {
                name: "phoneNumber",
                value,
              },
            })
          }
        />
        <PhoneNumberInput
          name="verifyPhoneNumber"
          placeholder="Verify Phone number *"
          required={true}
          defaultCountry="US"
          value={verifyPhoneNumber}
          onChange={(value) =>
            changeHandler({
              target: {
                name: "verifyPhoneNumber",
                value,
              },
            })
          }
        />
      </div>
      <div className="checkout-button-container">
        {checkingOut ? (
          <CircularProgress />
        ) : (
          <button
            onClick={handleButton}
            className="button checkout-button"
            disabled={verifyPhone()}
          >
            Claim
          </button>
        )}
      </div>
    </div>
  );
};

export default Checkout;
