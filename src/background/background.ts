import { browser } from 'webextension-polyfill-ts';
import { debouncedCookieHandler } from './cookieActions';

browser.tabs.onActivated.addListener(debouncedCookieHandler);
browser.cookies.onChanged.addListener(debouncedCookieHandler);
