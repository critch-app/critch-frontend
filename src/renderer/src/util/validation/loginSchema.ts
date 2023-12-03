import { object, string } from 'yup'

/**
 * Login schema for Yup validation.
 * @type {object}
 * @property {object} schema - Yup validation schema.
 * @property {object} initialValues - Initial values for the login form.
 */
const loginSchema = {
  /**
   * Yup validation schema for the login form.
   * @type {object}
   */
  schema: object({
    email: string().trim().email('Invalid email').required('Email is required'),
    password: string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required')
  }),

  /**
   * Initial values for the login form.
   * @type {object}
   */
  initialValues: {
    email: '',
    password: ''
  }
}

export default loginSchema
