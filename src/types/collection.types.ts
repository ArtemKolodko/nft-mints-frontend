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

export type TokenType = {
  metadata: MetadataType;
  nftAddress: string;
  priceUSD: number; 
  stripePriceId: string; 
  stripeProductId: string; 
  tokenId: number;
}

export type MetadataType = {
  image: 'string';
  attributes: Array<AttributeType>
}

export type AttributeType = {
  traitType: string; //to camelCase
  value: string; 
}
