import React, { useCallback, useContext } from 'react';

// Polyfill
import { browser } from 'webextension-polyfill-ts';

// Types
import {
  TypeCookieState,
  TypeExtendedCookie,
  TypeCookiesState,
} from 'types/GlobalTypes';

// Helpers
import { isEmpty, groupBy } from 'ramda';
import {
  getAllCookies,
  getCurrentUrlFromTab,
  getCurrentDomainFromUrl,
} from 'helpers/CookieHelper';

// Components
import NoCookies from 'components/Cookies/NoCookies';
import Overview from 'components/Cookies/CookiesOverview';
import EditCookie from 'components/Cookies/EditCookie';
import { StoreContext } from 'store/GlobalStore';
import Domains from './Domains';
import Divider from 'components/Divider';
import { useDomainGroupsStyles } from 'components/Styles';

const MainScreen = () => {
  const classes = useDomainGroupsStyles({});
  const { state: globalStore, setState: setGlobalStore } = useContext(
    StoreContext
  );

  const clearAllDomainCookies = useCallback(
    async (domainCookie: TypeCookieState) => {
      for (let cookie of domainCookie.cookies) {
        await browser.cookies.remove({
          url: 'https://' + cookie.domain + cookie.path,
          name: cookie.name,
        });
      }
    },
    []
  );

  const clearAllCookies = useCallback(async () => {
    const allCookies = (await getAllCookies())
      .map(c => c.cookies)
      .reduce((prev, next) => [...prev, ...next], []);

    for (let cookie of allCookies) {
      await browser.cookies.remove({
        url: 'https://' + cookie.domain + cookie.path,
        name: cookie.name,
      });
    }
  }, []);

  const deleteCookie = useCallback(async (cookie: TypeExtendedCookie) => {
    browser.cookies.remove({
      url: 'https://' + cookie.domain + cookie.path,
      name: cookie.name,
    });
  }, []);

  if (globalStore.loading) return null;

  const currentUrl = getCurrentUrlFromTab(globalStore.currentTab?.url);
  const currentDomain = getCurrentDomainFromUrl(globalStore.currentTab?.url);

  // @ts-ignore
  const groupedDomains: {
    current: TypeCookiesState;
    main: TypeCookiesState;
    others: TypeCookiesState;
  } = groupBy((domainCookie: TypeCookieState):
    | 'current'
    | 'main'
    | 'others' => {
    if (
      domainCookie.domain === currentDomain ||
      domainCookie.domain === `.${currentDomain}` ||
      domainCookie.domain === `www.${currentDomain}` ||
      domainCookie.domain === `.www.${currentDomain}`
    )
      return 'main';
    else if (
      domainCookie.domain === currentUrl ||
      domainCookie.domain === `.${currentUrl}`
    )
      return 'current';
    return 'others';
  }, globalStore.domainCookies);

  const showGroups =
    currentUrl &&
    globalStore.domainCookies.length > 1 &&
    (groupedDomains?.others || []).length >= 1;

  const itemsOrEmptyArray = (list: TypeCookiesState | null | undefined) =>
    list || [];

  return (
    <div>
      {globalStore.cookie || globalStore.newCookie ? (
        <EditCookie />
      ) : isEmpty(globalStore.domainCookies) && !globalStore.loading ? (
        <NoCookies newCookie={setGlobalStore.newCookie} />
      ) : (
        <div>
          <Overview
            cookies={globalStore.domainCookies}
            clearAllCookies={clearAllCookies}
            newCookie={setGlobalStore.newCookie}
          />
          {!showGroups ? (
            <Domains
              domains={globalStore.domainCookies}
              deleteCookie={deleteCookie}
              clearAllDomainCookies={clearAllDomainCookies}
            />
          ) : (
            <div>
              {itemsOrEmptyArray(groupedDomains?.current).length >= 1 && (
                <>
                  <div className={classes.heading}>
                    Current{' '}
                    {(currentUrl || '')?.split('.').length === 2
                      ? 'domain'
                      : 'sub-domain'}
                  </div>
                  <Domains
                    domains={groupedDomains?.current || []}
                    deleteCookie={deleteCookie}
                    clearAllDomainCookies={clearAllDomainCookies}
                  />
                </>
              )}
              {itemsOrEmptyArray(groupedDomains?.main).length >= 1 && (
                <>
                  {itemsOrEmptyArray(groupedDomains?.current).length >= 1 && (
                    <Divider />
                  )}
                  <div className={classes.heading}>
                    Domain ( {groupedDomains.main.length} )
                  </div>
                  <Domains
                    domains={groupedDomains.main}
                    deleteCookie={deleteCookie}
                    clearAllDomainCookies={clearAllDomainCookies}
                  />
                </>
              )}
              {itemsOrEmptyArray(groupedDomains?.others).length >= 1 && (
                <>
                  <Divider />
                  <div className={classes.heading}>
                    Others ( {groupedDomains.others.length} )
                  </div>
                  <Domains
                    domains={groupedDomains.others}
                    deleteCookie={deleteCookie}
                    clearAllDomainCookies={clearAllDomainCookies}
                  />
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainScreen;
