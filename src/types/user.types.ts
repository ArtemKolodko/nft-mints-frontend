type UserType = {
  uuid? : string;
  phone? : string;
  pendingCode? : string;
  codeHash? : string;
  lastSentCode? : number;
  userType? : UserTypeEnum;
  stripeConnected? : boolean;
  id? : string;
}

export enum UserTypeEnum {
  CREATOR = 1,
  USER = 2
}

export default UserType;