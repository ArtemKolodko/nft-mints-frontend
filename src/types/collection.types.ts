export type CollectionType = {
  title : string;
  description : string;
  link: string;
  collectionAddress: "",
  rate: 10,
  maxMint: 100,
  uuid: string;
  priceId: string;
  userUuid: any;
  productId: string;
  collectionImage: string; 
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
