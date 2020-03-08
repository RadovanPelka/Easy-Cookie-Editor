import React, {
  ReactChild,
  createContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { TypeExtendedCookie, TypeCookiesState } from 'types/GlobalTypes';
import { Tabs, browser } from 'webextension-polyfill-ts';
import { currentTab, getAllCookies } from 'helpers/CookieHelper';
import useDebounce from 'hooks/useDebounce';

export interface IGlobalState {
  domainCookies: TypeCookiesState;
  loading: boolean;
  newCookie: boolean;
  cookie: TypeExtendedCookie | null;
  currentTab: Tabs.Tab | null;
}

const DEFAULT_GLOBAL_CONTEXT: IGlobalState = {
  domainCookies: [],
  loading: true,
  cookie: null,
  newCookie: false,
  currentTab: null,
};

interface ISetStore {
  newCookie: () => void;
  editCookie: (cookie: TypeExtendedCookie) => void;
  clearCookie: () => void;
  setCurrentTab: () => any;
  loadAllComainCookies: () => any;
}

export const StoreContext = createContext<{
  state: IGlobalState;
  setState: ISetStore;
}>(
  // @ts-ignore
  { state: DEFAULT_GLOBAL_CONTEXT, setState: null }
);

export type IStore = [IGlobalState, ISetStore];

interface Props {
  children: React.ReactNode | ReactChild;
}

function Store(props: Props) {
  const [state, setState] = useState(DEFAULT_GLOBAL_CONTEXT);
  // @ts-ignore
  window.easyCookieEditor = state;

  const memoizedSetState = useMemo(() => {
    const storeActions: ISetStore = {
      newCookie: () => setState(prev => ({ ...prev, newCookie: true })),
      editCookie: cookie => setState(prev => ({ ...prev, cookie })),
      clearCookie: () =>
        setState(prev => ({ ...prev, cookie: null, newCookie: false })),
      setCurrentTab: async () => {
        const _currentTab = await currentTab();
        setState(prev => ({ ...prev, currentTab: _currentTab }));
      },
      loadAllComainCookies: async () => {
        const domainCookies = await getAllCookies();
        if (
          JSON.stringify(domainCookies) !==
            JSON.stringify(state.domainCookies) ||
          !state.domainCookies.length
        ) {
          setState(prev => ({ ...prev, domainCookies, loading: false }));
        }
      },
    };
    return storeActions;
  }, []);

  const debouncedState = useDebounce(state, 50);

  useEffect(() => {
    memoizedSetState.setCurrentTab();
    memoizedSetState.loadAllComainCookies();
    // @ts-ignore
    browser.cookies.onChanged.addListener(
      memoizedSetState.loadAllComainCookies
    );

    return () =>
      // @ts-ignore
      browser.cookies.onChanged.removeListener(
        memoizedSetState.loadAllComainCookies
      );
  }, []);

  const value = useMemo(
    () => ({
      state: debouncedState,
      setState: memoizedSetState,
    }),
    [debouncedState]
  );

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default Store;
