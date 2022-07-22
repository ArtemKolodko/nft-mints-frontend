import { CollectionType } from "../../types/index";
import { ApiResponseType } from "../../types/index";
import { ApiOwnerTokenResponseType } from "../../types/index";

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
  console.log('checkout collectionv2');
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
    const res = fetch(`${GATEWAY}/v0/payment/checkoutv2`, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      console.log('then',response);
      return response;
    }).catch((e) => {
      console.log('CATCH, ',e);
      return null;
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

/**
 * Creates a new Collection
 * @param collectionImage {string} Collection's Image
 * @param title {String} Collection's title
 * @param description {String} Collection's description
 * @param link {String} Collection's external link
 * @param rate {number} Collection's price
 * @param supply {number} Collection's allowed quantity
 * @param userId {string} Onwer ID
 * @returns {ApiResponseType} The new Collection + response code status
 */
export const createCollection = async (
  collectionImage: string,
  title: string,
  description: string,
  link: string,
  rate: number,
  supply: number,
  userId: string
): Promise<ApiResponseType | null> => {
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
  console.log(collectionImage, title, description, userId);
  console.log('Create Collection', {body});
  const response = await axios.post(URL, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    data: response.data,
    status: response.status,
  };
};

/**
 * Returns an array of tokens owned by the given Owner ID
 * @param ownerUuid {string} Onwer ID
 * @returns 
 */
export const getTokensByOwner = async (ownerUuid: string) : Promise<Array<ApiOwnerTokenResponseType> | null>=> {
  const URL = `${GATEWAY}/v0/tokens/${ownerUuid}`;
  const response = await axios
    .get(URL)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
  return response;
};

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
