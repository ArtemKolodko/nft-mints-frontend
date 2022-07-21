import { CollectionType, ApiResponse } from "../../types/index";

import axios, { AxiosResponse } from "axios";

const GATEWAY = process.env.REACT_APP_GATEWAY;

export const getNfts = (tokenId: string) => {};

/**
 * Sends an OTP code to the given mobileNumber
 * @param mobileNumber {string}
 * @returns Promise with the status code
 */
export const sendSMSCode = async (
  mobileNumber: string
): Promise<AxiosResponse<any, any> | null> => {
  if (mobileNumber.length <= 0) {
    return null;
  }
  const body = JSON.stringify({
    phone: mobileNumber,
  });
  const response = await axios.post(`${GATEWAY}/v0/sms/verify`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

/**
 * Calls Stripe's checkout page
 * @param otp {string} One time code received in users mobile phone
 * @param phoneNumber {string} User's mobile phone
 * @param collections {Array<CollectionType>} The collection array to be purchase
 * @param collectionUuid {string} Collection Uid
 * @returns API Response redirection to Stripe checkout
 */
export const checkoutCollectionV2 = async (
  otp: string,
  phoneNumber: string,
  collections: CollectionType[],
  collectionUuid: string | undefined
): Promise<Response | null> => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const REDIRECT_URL_SUCCESS = `${BASE_URL}/success/${collectionUuid}`;
  const REDIRECT_URL_FAILURE = `${BASE_URL}/cancel/${collectionUuid}`;

  try {
    const body = {
      nfts: collections.map((collection) => {
        return { collectionUuid: collection.uuid, quantity: 1 };
      }),
      mobileNumber: phoneNumber,
      smsCode: otp,
      successUrl: REDIRECT_URL_SUCCESS,
      cancelUrl: REDIRECT_URL_FAILURE,
    };
    console.log(body);
    console.log(JSON.stringify(body));
    const res = await fetch(`${GATEWAY}/v0/payment/checkoutv2`, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Retrieves the Collection of a given Collection uid
 * @param collectionUuid {string} Collection uid 
 * @returns Collection {CollectionType}
 */
export const getCollection = async (
  collectionUuid: string
): Promise<CollectionType> => {
  const url = `${GATEWAY}/v0/collections/${collectionUuid}`;

  const collection = await axios
    .get(url)
    .then((response) => {
      //    console.log(response);//
      return response.data;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
  return collection;
};


export const createCollection = async (collectionImage: string, title: string, 
  description: string, link: string, rate: number, 
  supply: number, userId: string) : Promise<ApiResponse | null>=> {
  const URL = `${GATEWAY}/v0/collections/create`;
  const body = JSON.stringify({
    collectionImage: collectionImage,
    title,
    description,
    link,
    rate,
    maxMint: supply,
    userId,
  });
  const response = await axios.post(URL,body,{
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    data : response.data,
    status : response.status
  };
}
/**
 * Returns all the collections
 * @returns Promise with an array of collections
 */
// export const getCollections = async () : Promise<Array<CollectionType> | null>=> {
//   const collections = await axios
//     .get(`${GATEWAY}/v0/tokens`)
//     .then((response) => {
//       console.log(response.data.collections);
//       return response.data.collections;
//     })
//     .catch((e) => {
//       console.error(e);
//       return null;
//     });
//   return collections;
// }




/**
 * Retrieves the NFTs of a given Wallet Address.
 * @param ownerAddress {string} Wallet address
 * @param setApiCallResult {Dispatch<SetStateAction<number>} Call back that saves API response code
 * @returns {Promise<NftItemType[]>} Array of NFT items
 */
//  export const getNftItems = async (ownerAddress: string, setApiCallResult: Dispatch<SetStateAction<number>>) : Promise<NftItemType[]> => {
//   const url = `${process.env.REACT_APP_OPENSEA_API}&owner=${ownerAddress}`;
//   const items = await axios.get(url!)
//     .then((res) => {
//       console.log({res});
//       setApiCallResult(res.status);
//       return res.data.assets;
//     })
//     .catch((e) => {
//       setApiCallResult(500);
//       console.error(e);
//       console.error("Could not talk to OpenSea");
//       return null;
//     });
//   return items;
// };
