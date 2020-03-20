import React from 'react';

// Material UI
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// Types
import {
  TypeCookiesState,
  TypeExtendedCookie,
  TypeCookieState,
} from 'types/GlobalTypes';

// Components
import DomainDetails from 'components/Cookies/List/DomainDetails';
import { useDomainStyles } from 'components/Styles';

type DomainsProps = {
  domains: TypeCookiesState;
  deleteCookie: (cookie: TypeExtendedCookie) => Promise<void>;
  clearAllDomainCookies: (domainCookie: TypeCookieState) => void;
};
const Domains: React.FC<DomainsProps> = ({
  domains,
  deleteCookie,
  clearAllDomainCookies,
}) => {
  const classes = useDomainStyles({});

  return (
    <>
      {domains.map(cookie => {
        const totalCookies = cookie.cookies.length;
        return (
          <ExpansionPanel
            key={cookie.domain}
            TransitionProps={{ unmountOnExit: true }}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.columnPrimary}>
                <Typography className={classes.heading}>
                  {cookie.domain}
                </Typography>
              </div>
              {totalCookies !== 0 && (
                <>
                  <div className={classes.columnSecondary}>
                    <Typography className={classes.secondaryHeading}>
                      {totalCookies === 1
                        ? `${totalCookies} cookie`
                        : `${totalCookies} cookies`}{' '}
                    </Typography>
                  </div>
                  <div className={classes.columnSecondary}>
                    <Typography className={classes.secondaryHeading}>
                      <span className={classes.secondaryHeadingSize}>
                        ( {cookie.formatedSize} )
                      </span>
                    </Typography>
                  </div>
                </>
              )}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <DomainDetails cookie={cookie} deleteCookie={deleteCookie} />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button
                size="small"
                onClick={() => clearAllDomainCookies(cookie)}
              >
                Clear All
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        );
      })}
    </>
  );
};

export default Domains;
