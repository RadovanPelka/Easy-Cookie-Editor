import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useDomainGroupsStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(13),
      color: 'white',
      marginBottom: '8px',
    },
  })
);

export const useDomainStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: 'null',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      marginRight: '25px',
    },
    secondaryHeading: {
      marginTop: 2,
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.text.secondary,
    },
    secondaryHeadingSize: {
      fontSize: theme.typography.pxToRem(11),
      color: theme.palette.text.secondary,
      marginTop: 2,
      marginLeft: 5,
      position: 'absolute',
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
      backgroundColor: 'rgba(43, 47, 50, 0.55)',
    },
    columnPrimary: {
      flexBasis: '50%',
    },
    columnSecondary: {
      flexBasis: '16%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
);

export const useDomainDetails = makeStyles((theme: Theme) =>
  createStyles({
    showMore: {
      cursor: 'pointer',
      marginTop: '10px',
      marginBottom: '-5px',
      fontSize: theme.typography.pxToRem(14),
    },
  })
);

export const useCookieStyles = makeStyles((theme: Theme) =>
  createStyles({
    cookiesSize: {
      fontSize: theme.typography.pxToRem(16),
    },
    cookiesSecondaryColor: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(14),
    },
  })
);

export const useCookieItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      height: 25,
      marginTop: 16,
      marginLeft: 10,
    },
    itemMenu: {
      fontSize: theme.typography.pxToRem(14),
      minHeight: 40,
    },
    menuTitle: {
      fontSize: theme.typography.pxToRem(12),
      margin: '0 0 0 10px',
    },
  })
);

export const useEditCookieStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cookiesSize: {
      fontSize: theme.typography.pxToRem(16),
    },
    cookiesSecondaryColor: {
      color: theme.palette.text.secondary,
      fontSize: theme.typography.pxToRem(14),
    },
  })
);

export const cookieFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
