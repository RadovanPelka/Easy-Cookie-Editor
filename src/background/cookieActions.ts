import { browser } from 'webextension-polyfill-ts';
const debounce = require('lodash.debounce');

export const debouncedCookieHandler = debounce(async () => {
  try {
    const currentTab = await browser.tabs.query({
      active: true,
      lastFocusedWindow: true,
    });
    const cookies = await browser.cookies.getAll({
      url: currentTab[0].url,
    });

    if (cookies.length === 0)
      return browser.browserAction.setBadgeText({
        text: '',
      });

    browser.browserAction.setBadgeBackgroundColor({
      color: getColor(cookies.length),
    });

    browser.browserAction.setBadgeText({
      text: cookies.length.toString(),
    });
  } catch (error) {}
}, 250);

const getColor = (count: number) => {
  if (count >= 20) return '#a62850';
  else if (count >= 7) return '#9e4524';
  // else if (count <= 6) return '#257f5a';
  return '#34363A'; // DARK
};
