import React, { useState } from 'react';
import { TypeCookieState, TypeExtendedCookie } from 'types/GlobalTypes';
import { Grid, TextField } from '@material-ui/core';
import CookieItem from 'components/Cookies/List/CookieItem';
import { toLower, isEmpty } from 'ramda';
import Divider from 'components/Divider';

type DomainDetailsProps = {
  cookie: TypeCookieState;
  deleteCookie: (cookie: TypeExtendedCookie) => Promise<void>;
};

const DomainDetails = ({
  cookie: { cookies },
  deleteCookie,
}: DomainDetailsProps) => {
  const [search, setSearch] = useState('');

  const filteredCookies = isEmpty(search)
    ? cookies
    : cookies.filter(c => toLower(c.name).includes(search));

  const mappedCookies = filteredCookies.map(domainCookie => (
    <CookieItem
      key={domainCookie.name}
      cookie={domainCookie}
      deleteCookie={deleteCookie}
    />
  ));

  return (
    <Grid container spacing={0}>
      {!(cookies.length === 1) && (
        <div className="search-bar">
          <Grid item>
            <TextField
              label="Search"
              margin="dense"
              fullWidth
              onChange={e => setSearch(toLower(e.target.value))}
            />
            <div className="search-res">
              {filteredCookies.length === 0 ? (
                <span>No Cookies</span>
              ) : (
                <span>
                  <span>{filteredCookies.length}</span>
                  <span className="opacity-50">
                    {' '}
                    {filteredCookies.length === 1 ? 'cookie' : 'cookies'}
                  </span>
                </span>
              )}
            </div>
          </Grid>
        </div>
      )}
      {!isEmpty(mappedCookies) && !(cookies.length === 1) && <Divider />}
      {mappedCookies}
    </Grid>
  );
};

export default DomainDetails;
