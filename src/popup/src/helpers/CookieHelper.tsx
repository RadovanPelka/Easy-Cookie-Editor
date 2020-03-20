// Polyfill
import { browser } from 'webextension-polyfill-ts';

// Types
import {
  TypeCookie,
  TypeExtendedCookie,
  TypeCookieState,
  TypeBadge,
  TypeCookiesState,
  TypeSetDetailsTypeCookie,
} from 'types/GlobalTypes';

// Helpers
import { sum, groupBy, sortBy } from 'ramda';
import {
  formatDistanceToNow,
  fromUnixTime,
  format,
  addHours,
  getUnixTime,
  parse,
} from 'date-fns';
import * as R from 'ramda';

import parseDomain, { ParsedDomain } from 'parse-domain';

// Ramda Functions
export const groupCookiesByDomain = groupBy(
  (cookie: TypeCookie) => cookie.domain
);
export const sortCookiesByDomain = sortBy(
  (mappedCookies: TypeCookieState) => mappedCookies.domain.length
);

export const DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm";

export const perfTracker = async (name: string, fnc: () => void) => {
  console.time(name);
  await fnc();
  console.timeEnd(name);
};

export const getCookiesSize = (
  cookies: Array<TypeCookie>,
  returnNumber: boolean = false
) => {
  const sizes = cookies.map(cookie => calculateOneCookieSize(cookie) as number);
  const size = sum(sizes);
  if (returnNumber) return size;
  return humanReadableSize(size);
};

export const humanReadableSize = (size: number) =>
  size > 1000 ? `${(size / 1000).toFixed(2)} kb` : `${size} bytes`;

export const getSizeOfValues = (...args: string[]) =>
  Buffer.byteLength(args.join(''));

export const calculateOneCookieSize = (
  cookie: TypeCookie,
  humanReadable: boolean = false
) => {
  const size = getSizeOfValues(cookie.name, cookie.value);
  if (humanReadable) return humanReadableSize(size);
  return size;
};

export const getCurrentDomainFromUrl = (url: string | null | undefined) => {
  if (!url) return '';

  const parsedDomainUrl = parseDomain(url);
  if (!parsedDomainUrl) return '';

  return [parsedDomainUrl.domain, parsedDomainUrl.tld].join('.');
};

export const getCurrentUrlFromTab = (fullUrl: string | undefined | null) => {
  if (R.isEmpty(fullUrl) || R.isNil(fullUrl)) {
    return null;
  }

  const parsedDomainUrl = parseDomain(fullUrl as string);
  if (!parsedDomainUrl) {
    return null;
  }

  const currentUrl =
    parsedDomainUrl?.subdomain === '' || parsedDomainUrl?.subdomain === 'www'
      ? [parsedDomainUrl.domain, parsedDomainUrl.tld].join('.')
      : [
          parsedDomainUrl?.subdomain,
          parsedDomainUrl?.domain,
          parsedDomainUrl?.tld,
        ].join('.');
  return currentUrl;
};

export const formatNewCookie = (
  cookie: TypeExtendedCookie,
  currentUrl: string
): TypeSetDetailsTypeCookie => {
  const PICK_FIELDS: Array<keyof TypeExtendedCookie> = [
    'name',
    'storeId',
    'value',
    'expirationDate',
    'path',
    'httpOnly',
    'secure',
  ];

  const secure = currentUrl.indexOf('https://') === 0;
  const hostOnlyDomain =
    cookie.domain.substr(0, 1) === '.'
      ? cookie.domain.substring(1)
      : cookie.domain;
  // @ts-ignore
  return {
    ...R.pick(PICK_FIELDS, {
      ...cookie,
      expirationDate: getUnixTime(
        parse(cookie.expirationDateString, DATE_TIME_FORMAT, new Date())
      ),
    }),
    ...(!cookie.hostOnly && Boolean(cookie.domain.substr(0, 1) === '.')
      ? { domain: hostOnlyDomain }
      : {}),
    url: `http${secure ? 's' : ''}://${hostOnlyDomain}${cookie.path}`,
  };
};

export const getURL = (url: string | null) => {
  if (!url) return '';
  try {
    const domain = new URL(url).hostname;
    return domain === 'newtab' ? '' : domain.replace('www.', '');
  } catch (error) {
    return '';
  }
};

export const currentTab = async () => {
  const tab = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab[0];
};

export const getAllCookies = async () => {
  const tab = await currentTab();
  const parsedDomain = parseDomain(tab.url as string) as ParsedDomain;

  const cookies = await browser.cookies.getAll(
    parsedDomain
      ? {
          domain: `${parsedDomain.domain}.${parsedDomain.tld}`,
        }
      : { url: tab.url }
  );

  const mappedCookies = Object.entries(groupCookiesByDomain(cookies)).map(
    ([key, value]) => {
      const size = getCookiesSize(value, true) as number;
      return {
        domain: key,
        size,
        formatedSize: humanReadableSize(size),
        cookies: value.map((cookie: TypeCookie) => {
          const cookieSize = calculateOneCookieSize(cookie) as number;
          const newCookie: TypeExtendedCookie = {
            ...cookie,
            size: cookieSize,
            formatedSize: humanReadableSize(cookieSize),
            expirationMessage: getExpirationDate(cookie),
            expirationDateString: getExpirationDateString(
              cookie.expirationDate
            ),
            badges: generateBadges(cookie),
          };
          return newCookie;
        }),
      };
    },
    []
  );
  return sortCookiesByDomain(mappedCookies) as TypeCookiesState;
};

export const compareCookies = (
  newCookies: TypeCookiesState,
  oldCookies: TypeCookiesState
) => JSON.stringify(newCookies) === JSON.stringify(oldCookies);

export const getExpirationDate = (cookie: TypeCookie) => {
  if (cookie.session) return 'Session';
  if (!cookie.expirationDate) return null;

  return formatDistanceToNow(fromUnixTime(cookie.expirationDate));
};

export const getExpirationDateString = (
  time: number | null | undefined = null
) => {
  return format(
    time ? fromUnixTime(time) : addHours(new Date(), 1),
    DATE_TIME_FORMAT
  );
};

export const generateBadges = (cookie: TypeCookie) => {
  let badges: Array<TypeBadge> = [];

  if (cookie.httpOnly)
    badges.push({
      badgeName: 'HttpOnly',
    });
  if (cookie.secure)
    badges.push({
      badgeName: 'Secure',
    });

  return badges;
};
