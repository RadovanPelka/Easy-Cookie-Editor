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
import { getAllCookies, getCurrentUrlFromTab } from 'helpers/CookieHelper';

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

  // @ts-ignore
  const groupedDomains: {
    current: TypeCookiesState;
    others: TypeCookiesState;
  } = groupBy((domainCookie: TypeCookieState): 'current' | 'others' => {
    if (
      domainCookie.domain === currentUrl ||
      domainCookie.domain === `.${currentUrl}` ||
      domainCookie.domain === `www.${currentUrl}` ||
      domainCookie.domain === `.www.${currentUrl}`
    )
      return 'current';
    return 'others';
  }, globalStore.domainCookies);

  const showGroups =
    currentUrl &&
    globalStore.domainCookies.length > 1 &&
    (groupedDomains?.others || []).length >= 1;

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
              {(groupedDomains?.others || []).length >= 1 && (
                <div>
                  <Divider />
                  <div className={classes.heading}>
                    Others ( {groupedDomains.others.length} )
                  </div>
                  <Domains
                    domains={groupedDomains.others}
                    deleteCookie={deleteCookie}
                    clearAllDomainCookies={clearAllDomainCookies}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainScreen;
