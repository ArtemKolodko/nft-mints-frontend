export type CollectionType = {
  title: string;
  description: string;
  link: string;
  collectionAddress: string,
  rate: number,
  maxMint: number,
  uuid: string;
  priceId: string;
  userUuid: any;
  productId: string;
  collectionImage: string;
  tokenType: number;
  creatorRoyalties?: number;
  perks?: string;
  additionalDetails?: string;
  properties?: object;
}

export enum TokenTypeEnum {
  COLLECTION = 2,
  ACCESS_PASS = 1
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
