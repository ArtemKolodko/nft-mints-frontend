export enum TokenTypeEnum {
  ACCESS_PASS = 1,
  COLLECTION = 2
}

export interface AccessPassProperties {
  age: string
  city: string
  state: string
  venue: string
}

export type CollectionType = {
  title: string;
  description: string;
  link: string;
  collectionAddress: string,
  rate: number,
  maxMint: number,
  uuid: string;
  priceId: string;
  ownerUUID: string;
  productId: string;
  collectionImage: string;
  collectionImages: string[];
  tokenType: TokenTypeEnum;
  creatorRoyalties?: number;
  perks?: string;
  additionalDetails?: string;
  properties?: AccessPassProperties;
}

export type TokenType = {
  contractAddress: string,
  collectionUUID: string,
  sequence: string,
  ownerUUID: string,
  isClaimed: boolean,
  uuid: string,
  id: string
}

export type CreatorType = {
  name: string;
  id: string;
  profileImage: string;
  social: SocialType;
}

export type SocialType = {
  discord:string;
  email: string;
  instagram: string;
  twitter: string;
  website: string;
}
