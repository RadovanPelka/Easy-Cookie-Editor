import { Cookies } from 'webextension-polyfill-ts';

export type TypeCookie = Cookies.Cookie;
export type TypeSetDetailsTypeCookie = Cookies.SetDetailsType;

export type TypeBadge = {
  badgeName: string;
  warning?: boolean;
};

export type TypeExtendedCookie = TypeCookie & {
  size: number;
  formatedSize: string;
  expirationMessage: string | null;
  expirationDateString: string;
  badges: Array<TypeBadge>;
};

export type TypeCookieState = {
  domain: string;
  size: number;
  formatedSize: string;
  cookies: Array<TypeExtendedCookie>;
};

export type TypeCookiesState = Array<TypeCookieState>;
