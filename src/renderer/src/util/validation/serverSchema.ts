import { object, string } from 'yup'

/**
 * Server schema for Yup validation.
 * @type {object}
 * @property {object} schema - Yup validation schema.
 * @property {object} initialValues - Initial values for the server addition form.
 */
const serverSchema = {
  /**
   * Yup validation schema for the server addition form.
   * @type {object}
   */
  schema: object({
    name: string().trim().required('Server name is required'),
    description: string().trim().required('Description is required'),
    photo: string()
      .url('Invalid URL')
      .matches(/\.(jpg|jpeg|png|gif|bmp)$/i, 'Invalid image URL'),
    owner_id: string().trim()
  }),

  /**
   * Initial values for the server addition form.
   * @type {object}
   */
  initialValues: {
    name: '',
    description: '',
    photo: '',
    owner_id: ''
  }
}

export default serverSchema
