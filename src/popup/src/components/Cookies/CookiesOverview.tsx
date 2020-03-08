import React from 'react';
import { TypeCookiesState } from 'types/GlobalTypes';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import sum from 'ramda/es/sum';
import { humanReadableSize } from 'helpers/CookieHelper';
import { useCookieStyles } from 'components/Styles';

const getHeaderCol = (
  num: number | string,
  one: string,
  more: string,
  className: any
) => (
  <span>
    {num} <span className={className}>{num === 1 ? one : more}</span>
  </span>
);

type OverviewProps = {
  cookies: TypeCookiesState;
  clearAllCookies: () => void;
  newCookie: () => void;
};

const Overview: React.FC<OverviewProps> = ({
  cookies,
  clearAllCookies,
  newCookie,
}) => {
  const classes = useCookieStyles({});

  const totalCookiesSize = humanReadableSize(
    sum(cookies.map(c => c.size))
  ).split(' ');
  const totalCookies = sum(cookies.map(c => c.cookies.length));
  const totalDomains = cookies.length;

  return (
    <Paper className="overview panel-padding">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Typography className={classes.cookiesSize}>
                {getHeaderCol(
                  totalDomains,
                  'domain',
                  'domains',
                  classes.cookiesSecondaryColor
                )}
              </Typography>
            </Grid>
            ~
            <Grid item>
              <Typography className={classes.cookiesSize}>
                {getHeaderCol(
                  totalCookies,
                  'cookie',
                  'cookies',
                  classes.cookiesSecondaryColor
                )}
              </Typography>
            </Grid>
            ~
            <Grid item>
              <Typography className={classes.cookiesSize}>
                {getHeaderCol(
                  totalCookiesSize[0],
                  '',
                  totalCookiesSize[1],
                  classes.cookiesSecondaryColor
                )}
              </Typography>
            </Grid>
          </Grid>
        </div>
        <div>
          <Button size="small" onClick={newCookie}>
            ADD
          </Button>
          <Button size="small" onClick={clearAllCookies}>
            Clear All
          </Button>
        </div>
      </Grid>
    </Paper>
  );
};

export default Overview;
