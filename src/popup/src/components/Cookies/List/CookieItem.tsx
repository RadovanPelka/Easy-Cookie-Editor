import React, { useState, useContext, useCallback } from 'react';
import copy from 'copy-to-clipboard';

// Material UI
import {
  TextField,
  MenuItem,
  IconButton,
  Grid,
  Menu,
  Divider,
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Helpers
import { isEmpty } from 'ramda';

// Types
import { TypeExtendedCookie } from 'types/GlobalTypes';
import { StoreContext } from 'store/GlobalStore';
import { useCookieItemStyles } from 'components/Styles';

type CookieItemProps = {
  cookie: TypeExtendedCookie;
  deleteCookie: (cookie: TypeExtendedCookie) => Promise<void>;
};

const CookieItem = ({ cookie, deleteCookie }: CookieItemProps) => {
  const { setState: setGlobalState } = useContext(StoreContext);
  const classes = useCookieItemStyles({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteCookie = () => {
    deleteCookie(cookie);
    setAnchorEl(null);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleCopy = useCallback(
    (value: string) => {
      copy(value);
      handleClose();
    },
    [handleClose]
  );

  const handleEditCookie = useCallback(() => {
    setGlobalState.editCookie(cookie);
    handleClose();
  }, [cookie, handleClose, setGlobalState]);

  const withValue = Boolean(cookie.value);

  return (
    <div className="cookie-list-item">
      <Grid container spacing={1}>
        <Grid item xs={withValue ? 4 : 11}>
          <TextField
            label="Key"
            defaultValue={cookie.name}
            helperText={
              cookie.expirationMessage && (
                <span>
                  <span className="opacity-50">Age: </span>
                  <span
                    className={`${cookie.session &&
                      'badge cookie-item-session'}`}
                  >
                    {cookie.expirationMessage}
                  </span>
                </span>
              )
            }
            margin="dense"
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        {withValue && (
          <Grid item xs={7}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-end"
              spacing={0}
            >
              <TextField
                label={cookie.value ? 'Value' : 'No value'}
                defaultValue={cookie.value}
                margin="dense"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                helperText={
                  <span>
                    <span className="opacity-50">Size: </span>
                    <span>{cookie.formatedSize}</span>
                  </span>
                }
              />
              {!isEmpty(cookie.badges) && (
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-start"
                  className="badge-wrapper"
                >
                  {cookie.badges.map(badge => (
                    <div
                      key={badge.badgeName}
                      className={`badge ${badge.warning && 'badge-warning'}`}
                    >
                      {badge.badgeName}
                    </div>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
        <IconButton
          aria-label="Edit Cookie"
          aria-controls={cookie.name}
          aria-haspopup="true"
          component="span"
          size="small"
          className={classes.iconButton}
          onClick={handleClick}
        >
          <NavigateNextIcon />
        </IconButton>
        <Menu
          id={cookie.name}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem className={classes.itemMenu} onClick={handleEditCookie}>
            Edit
          </MenuItem>
          <Divider />
          <MenuItem
            className={classes.itemMenu}
            onClick={() => handleCopy(cookie.name)}
          >
            Copy "name"
          </MenuItem>
          {cookie.value && (
            <MenuItem
              className={classes.itemMenu}
              onClick={() => handleCopy(cookie.value)}
            >
              Copy "value"
            </MenuItem>
          )}
          <Divider />
          <MenuItem className={classes.itemMenu} onClick={handleDeleteCookie}>
            Delete
          </MenuItem>
        </Menu>
      </Grid>
    </div>
  );
};

export default CookieItem;
