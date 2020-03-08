import React, { useContext } from 'react';
import { StoreContext } from 'store/GlobalStore';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { useEditCookieStyles } from 'components/Styles';
import { TypeExtendedCookie } from 'types/GlobalTypes';
import CookieForm from 'components/Formik/CookieForm';

type HeaderProps = { cookie: TypeExtendedCookie; clearCookie: () => void };

const Header: React.FC<HeaderProps> = React.memo(({ cookie, clearCookie }) => {
  const classes = useEditCookieStyles({});

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={1}
        >
          {cookie ? (
            <Grid item>
              <Typography className={classes.cookiesSize}>
                Cookie ( "{cookie.name}" ){' '}
                <span className={classes.cookiesSecondaryColor}>
                  {' '}
                  - Domain ( "{cookie.domain}" )
                </span>
              </Typography>
            </Grid>
          ) : (
            <Grid item>
              <Typography className={classes.cookiesSecondaryColor}>
                New Cookie
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
      <div>
        <Button size="small" onClick={clearCookie}>
          Cancel
        </Button>
      </div>
    </Grid>
  );
});

const Overview: React.FC = () => {
  const { state, setState } = useContext(StoreContext);

  if (!state.cookie && !state.newCookie) return null;

  return (
    <div>
      <Paper className="panel-padding">
        <Header cookie={state.cookie!} clearCookie={setState.clearCookie} />
      </Paper>
      <CookieForm
        cookie={state.cookie}
        // @ts-ignore
        url={state.currentTab.url as string}
        clearCookie={setState.clearCookie}
      />
    </div>
  );
};

export default Overview;
