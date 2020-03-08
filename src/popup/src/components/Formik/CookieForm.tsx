import React, { useRef, useEffect, useState } from 'react';
import { TypeExtendedCookie } from 'types/GlobalTypes';
import { Formik } from 'formik';
import CookieSchema, {
  ICookieOnClick,
  ICookieSchema,
  SAME_SITE_STATUS,
} from 'components/Formik/Schema';
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  getURL,
  getExpirationDateString,
  formatNewCookie,
  currentTab,
} from 'helpers/CookieHelper';
import { browser } from 'webextension-polyfill-ts';

type CookieFormProps = {
  cookie: TypeExtendedCookie | null;
  url: string | null;
  clearCookie: () => void;
};

const CookieForm: React.FC<CookieFormProps> = ({
  cookie,
  url,
  clearCookie,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isSession, setSessionCookie] = useState(false);
  const [isHostOnly, setHostOnlyCookie] = useState(false);

  const focusInput = () => {
    const node = firstInputRef.current;
    if (node) node.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  const cookieOnClick: ICookieOnClick = async (values, actions) => {
    actions.setSubmitting(false);
    const currentURL = await currentTab();
    // @ts-ignore
    const newCookie = formatNewCookie(values, currentURL.url);
    console.log('FINAL COOKIE', newCookie);
    if (!cookie || cookie.name !== newCookie.name) {
      browser.cookies.set(newCookie).then(e => {
        console.log('FIN', e);
        clearCookie();
      });
    } else {
      browser.cookies
        .remove({
          url: currentURL.url!,
          name: cookie.name,
          storeId: cookie.storeId,
        })
        .then(() => {
          browser.cookies.set(newCookie).then(e => {
            console.log('FIN', e);
            clearCookie();
          });
        });
    }
  };

  const handleSessionChange = (
    callback: (ev: React.ChangeEvent<any>) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionCookie(prev => !prev);
    callback(e);
  };

  const handleHostOnlyChange = (
    callback: (ev: React.ChangeEvent<any>) => void
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setHostOnlyCookie(prev => !prev);
    callback(e);
  };

  return (
    <div>
      <Formik
        initialValues={
          cookie
            ? (cookie! as ICookieSchema)
            : {
                ...CookieSchema.default(),
                domain: getURL(url),
                expirationDateString: getExpirationDateString(),
              }
        }
        onSubmit={cookieOnClick}
        validationSchema={CookieSchema}
      >
        {formikProps => {
          const {
            values,
            touched,
            errors,
            //dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            // setFieldValue,
            // handleReset
          } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <div className="cookie-form">
                <TextField
                  ref={firstInputRef}
                  id="domain"
                  disabled={isHostOnly}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Domain"
                  defaultValue={values.domain}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.domain && touched.domain)}
                  helperText={
                    errors.domain &&
                    touched.domain && <span>Required field</span>
                  }
                />
                <TextField
                  id="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Key"
                  defaultValue={values.name}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.name && touched.name)}
                  helperText={
                    errors.name && touched.name && <span>Required field</span>
                  }
                />
                <TextField
                  id="value"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Value"
                  defaultValue={values.value}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.value && touched.value)}
                  helperText={
                    errors.value && touched.value && <span>Required field</span>
                  }
                />
                <TextField
                  id="path"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Path"
                  defaultValue={values.path}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.path && touched.path)}
                  helperText={
                    errors.path && touched.path && <span>Required field</span>
                  }
                />
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="secure"
                        checked={values.secure}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.secure}
                        color="primary"
                      />
                    }
                    label={<span className="checkbox-color">Secure</span>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="httpOnly"
                        checked={values.httpOnly}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.httpOnly}
                        color="primary"
                      />
                    }
                    label={<span className="checkbox-color">HttpOnly</span>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="hostOnly"
                        checked={values.hostOnly}
                        onChange={handleHostOnlyChange(handleChange)}
                        onBlur={handleBlur}
                        value={values.hostOnly}
                        color="primary"
                      />
                    }
                    label={<span className="checkbox-color">HostOnly</span>}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        id="session"
                        checked={values.session}
                        onChange={handleSessionChange(handleChange)}
                        onBlur={handleBlur}
                        value={values.session}
                        color="primary"
                      />
                    }
                    label={<span className="checkbox-color">Session</span>}
                  />
                </Grid>
                {!isSession && (
                  <TextField
                    fullWidth
                    id="expirationDateString"
                    label="Expiration Date"
                    type="datetime-local"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.expirationDateString}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
                <FormControl margin="dense" className="full-width">
                  <InputLabel id="sameSite-label">SameSite</InputLabel>
                  <Select
                    labelId="sameSite-label"
                    id="sameSite"
                    value={values.sameSite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {SAME_SITE_STATUS.map((name, index) => (
                      <MenuItem key={index} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Paper className="panel-padding">
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button type="submit" size="small" disabled={isSubmitting}>
                    {cookie ? 'SAVE' : 'ADD'}
                  </Button>
                </Grid>
              </Paper>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CookieForm;
