import { object, string } from 'yup'

/**
 * Channel schema for Yup validation.
 * @type {object}
 * @property {object} schema - Yup validation schema.
 * @property {object} initialValues - Initial values for the channel addition form.
 */
const channelSchema = {
  /**
   * Yup validation schema for the login form.
   * @type {object}
   */
  schema: object({
    name: string().trim().required('Channel name is required'),
    description: string().trim().required('Description is required'),
    server_id: string().trim()
  }),

  /**
   * Initial values for the channel addition form.
   * @type {object}
   */
  initialValues: {
    name: '',
    description: '',
    server_id: ''
  }
}

export default channelSchema
