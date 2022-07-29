import { CollectionType, TokenType } from "./collection.types";

export type ApiResponseType = {
  data : any;
  status : number;
}

export type ApiTokenResponseType = {
  token : TokenType;
  collection : CollectionType
}