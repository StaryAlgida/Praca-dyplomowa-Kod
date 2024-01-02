interface Errors {
  error: string;
  id: number[];
}

interface JwtPayload {
  user_id: number;
  username: string;
}

interface LoggedUserInfo {
  company_name: string;
  first_name: string;
  last_name: string;
  contact_email: string;
  phone_number: string;
  profile_picture: string;
}

interface PrivateInfo {
  email: string;
  username: string;
}

interface SellHistory {
  title: string;
  price: number;
  quantity: number;
  date: string;
  shipping_id: number;
  buyer_id: number;
  buyer_name: string;
  item_id: number;
}

interface BuyHistory {
  title: string;
  price: number;
  quantity: number;
  date: string;
  shipping_id: number;
  seller_id: number;
  seller_name: string;
  item_id: number;
}

interface UserProfileContextData {
  mainUserInfo: LoggedUserInfo;
  soldInfo: unknown;
  boughtInfo: unknown;
  username: string;
  userPrivateIfno: unknown;
  error: Errors;
  sellHistory: History;
  buyHistory: History;
  getPublicInfoForm: () => void;
  publickInfoUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getPrivateInfo: () => void;
  updatePrivateInfo: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  changePassword: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  getPublicInfo: () => void;
  resetError: () => void;
  getSellHistory: () => void;
  getBuyHistory: () => void;
}

interface History {
  count: number;
  next: string;
  previous: string;
  results: (SellHistory | BuyHistory)[];
}

export type {
  Errors,
  JwtPayload,
  LoggedUserInfo,
  PrivateInfo,
  History,
  UserProfileContextData,
};
