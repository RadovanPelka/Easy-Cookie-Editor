import React from 'react';

// Material UI
import { Grid, Typography, Button } from '@material-ui/core';

// Images
import CookieImg from 'img/cookie.svg';

type NoCookiesProps = {
  newCookie: () => void;
};

const NoCookies: React.FC<NoCookiesProps> = ({ newCookie }) => {
  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <div className="img-wrapper">
        <img src={CookieImg} className="no-cookies-img" alt="No Cookies" />
      </div>
      <div className="no-cookies-typo">
        <Typography variant="h5" color="textSecondary">
          No Cookies
        </Typography>
      </div>
      <Button size="small" onClick={newCookie}>
        ADD
      </Button>
    </Grid>
  );
};

export default NoCookies;
