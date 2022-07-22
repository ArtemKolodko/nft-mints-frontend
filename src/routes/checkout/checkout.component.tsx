import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { CollectionType } from "../../types";
import {
  getCollection,
  checkoutCollectionV2,
} from "../../utils/mint-interface/mint-inteface.utils";
import { BasicInput } from "../../components/mint-input/mint-input.component";
import NftDetail from "../../components/nft-detail/nft-detail.component";
import Logo from "../../assets/imgs/dj3n_logo.svg";

import "./checkout.styles.scss";

const defaultFormFields = {
  phoneNumber: "",
  verifyPhoneNumber: "",
};

const Checkout = () => {
  const [nft, setNft] = useState<CollectionType>({} as CollectionType);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { phoneNumber, verifyPhoneNumber } = formFields;
  const { collectionUuid } = useParams();

  useEffect(() => {
    const getNft = async () => {
      const collection = await getCollection(collectionUuid!);
      setNft(collection);
      getCollection(collectionUuid!);
    };

    collectionUuid && getNft();
  }, [collectionUuid]);

  const handleButton = async () => {
    const OTP = "05270";
    const response = await checkoutCollectionV2(
      OTP,
      phoneNumber,
      Array(nft),
      collectionUuid
    );

    console.log("handleButton", { response });
    if (response) {
      window.location.href = (await response.json()).url;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  //include regex and flag input
  const verifyPhone = (): boolean | undefined => {
    return phoneNumber.length < 10 || phoneNumber !== verifyPhoneNumber; //
  };

  return (
    <div className="checkout-container">
      <div className="checkout-logo">
        <img src={Logo} alt="dj3n logo" />
      </div>
      {Object.entries(nft).length !== 0 ? (
        <NftDetail {...nft} />
      ) : (
        <div style={{ verticalAlign: "middle" }}>
          <CircularProgress />
        </div>
      )}

      <div className="checkout-form-container">
        <h4 style={{ marginLeft: "1.5em", marginRight: "1.5em" }}>
          If you would like to purchase this NFT, please enter your mobile phone
          number and press the BUY button.
        </h4>
        <BasicInput
          label="Phone number *"
          name="phoneNumber"
          placeholder="+1 (###) ### ####"
          required={true}
          type="text"
          onChange={handleChange}
        />
        <BasicInput
          label="Verify Phone number *"
          name="verifyPhoneNumber"
          placeholder="+1 (###) ### ####"
          required={true}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div className="checkout-button-container">
        <button
          onClick={handleButton}
          className="checkout-button"
          disabled={verifyPhone()}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Checkout;

// import { ChangeEvent } from "react";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Stack from "@mui/material/Stack";
// import { CircularProgress } from "@mui/material";
// import Divider from '@mui/material/Divider';

// import { CollectionType } from "../../types";
// import {
//   getCollection,
//   checkoutCollectionV2,
// } from "../../utils/mint-interface/mint-inteface.utils";
// import { BasicInput } from "../../components/mint-input/mint-input.component";
// import NftDetail from "../../components/nft-detail/nft-detail.component";
// import Logo from '../../assets/imgs/dj3n_logo.svg'

// import "./checkout.styles.scss";

// const defaultFormFields = {
//   phoneNumber: "",
//   verifyPhoneNumber: "",
// };

// const Checkout = () => {
//   const [nft, setNft] = useState<CollectionType>({} as CollectionType);
//   const [ formFields, setFormFields ] = useState(defaultFormFields);
//   const { phoneNumber, verifyPhoneNumber } = formFields;
//   const { collectionUuid } = useParams();

//   useEffect(() => {
//     const getNft = async () => {
//       const collection = await getCollection(collectionUuid!);
//       setNft(collection);
//       getCollection(collectionUuid!);
//     };

//     collectionUuid && getNft();
//   }, [collectionUuid]);

//   const handleButton = async () => {
//     const OTP = "05270";
//     const response = await checkoutCollectionV2(
//       OTP,
//       phoneNumber,
//       Array(nft),
//       collectionUuid
//     );

//     console.log("handleButton", { response });
//     if (response) {
//       window.location.href = (await response.json()).url;
//     }
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setFormFields({ ...formFields, [name]: value });
//   };

//   //include regex and flag input
//   const verifyPhone = (): boolean | undefined => {
//     return phoneNumber.length < 10 || phoneNumber !== verifyPhoneNumber; //
//   };

//   return (
//     <div className="checkout-container">
//       <Stack
//         direction="column"
//         justifyContent="space-between"
//         alignItems="center"
//         spacing={2}
//       >
//         <img src={Logo} alt='dj3n logo' className='checkout-logo'/>
//         <div className="checkout-image-container">
//           {Object.entries(nft).length !== 0 ? (
//             <NftDetail {...nft} />
//           ) : (
//             <div style={{ verticalAlign: "middle" }}>
//               <CircularProgress />
//             </div>
//           )}
//         </div>
//         <div className="checkout-form-container">
//         <h4 style={{ marginLeft: "1.5em", marginRight: "1.5em" }}>
//           If you would like to purchase this NFT,
//           please enter your mobile phone number and press the BUY button.</h4>
//           <BasicInput
//             label="Phone number *"
//             name="phoneNumber"
//             placeholder="+1 (###) ### ####"
//             required={true}
//             type="text"
//             onChange={handleChange}
//           />
//           <BasicInput
//             label="Verify Phone number *"
//             name="verifyPhoneNumber"
//             placeholder="+1 (###) ### ####"
//             required={true}
//             type="text"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="checkout-button-container">
//           <button
//             onClick={handleButton}
//             className="checkout-button"
//             disabled={verifyPhone()}
//           >
//             Buy
//           </button>
//         </div>
//       </Stack>
//     </div>
//   );
// };

// export default Checkout;
