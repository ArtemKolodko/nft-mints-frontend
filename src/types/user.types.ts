type UserType = {
  uuid? : string;
  phone? : string;
  pendingCode? : string;
  codeHash? : string;
  lastSentCode? : number;
  userType? : UserTypeEnum;
  stripeConnected? : boolean;
  id? : string;
  name? : string;
  publicLink? : string;
  profileImage? : any;
  profileImageBg? : any;
}

export enum UserTypeEnum {
  CREATOR = 1,
  USER = 2
}

export default UserType;