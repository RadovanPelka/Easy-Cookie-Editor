import * as Yup from 'yup';
import { FormikHelpers } from 'formik';

export const SAME_SITE_STATUS = [
  'no_restriction',
  'lax',
  'strict',
  'unspecified',
];

const CookieSchema = Yup.object().shape({
  domain: Yup.string()
    .required()
    .default('')
    .notOneOf(['newtab']),
  name: Yup.string().required(),
  value: Yup.string(),
  hostOnly: Yup.boolean().default(false),
  path: Yup.string().default('/'),
  secure: Yup.boolean().default(false),
  sameSite: Yup.string()
    .oneOf(SAME_SITE_STATUS)
    .default(SAME_SITE_STATUS[0]),
  session: Yup.boolean().default(false),
  expirationDate: Yup.number(),
  expirationDateString: Yup.string(),
  storeId: Yup.string(),
  firstPartyDomain: Yup.string(),
  httpOnly: Yup.boolean().default(false),
});

export type ICookieSchema = Yup.InferType<typeof CookieSchema>;

export type ICookieOnClick = (
  values: ICookieSchema,
  actions: FormikHelpers<ICookieSchema>
) => void;

export default CookieSchema;
