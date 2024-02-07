import { object, string, ref } from 'yup'
import { isValidPhoneNumber } from 'react-phone-number-input'

/**
 * Yup validation schema for user registration.
 * @type {object}
 * @property {object} schema - Yup validation schema.
 * @property {object} initialValues - Initial values for the registration form.
 */
const registerSchema = {
  /**
   * Yup validation schema for the registration form.
   * @type {object}
   */
  schema: object({
    first_name: string().trim().required('First name is required'),
    last_name: string().trim().required('Last name is required'),
    email: string().trim().email('Invalid email').required('Email is required'),
    password: string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
    confirm_password: string()
      .oneOf([ref('password')], 'Passwords must match')
      .required('Confirm Password Is Required'),
    phone: string().test('isValidPhoneNumber', 'Invalid phone number', (val) => {
      if (!val) return false
      return isValidPhoneNumber(val)
    }),
    status: string(),
    photo: string().url('Invalid URL').required('Image is required'),
    timezone: string().default(() => Intl.DateTimeFormat().resolvedOptions().timeZone)
  }),

  /**
   * Initial values for the registration form.
   * @type {object}
   */
  initialValues: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: null,
    status: '',
    photo: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  }
}

export default registerSchema
