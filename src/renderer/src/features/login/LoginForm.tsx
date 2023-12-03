import { Formik, Form } from 'formik'

import loginSchema from '@renderer/util/validation/loginSchema'
import FormFields from './SubComponents/FormFields'
import { OnSubmitFunction } from './LoginForm.d'

/**
 * Component representing the login form.
 * @component
 * @param {Object} props - The component props.
 * @param {OnSubmitFunction} props.onSubmit - The function to handle form submission.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function LoginForm({ onSubmit }: { onSubmit: OnSubmitFunction }): React.JSX.Element {
  return (
    <div className="h-[calc(70%)] w-full flex-col items-center justify-center">
      <Formik
        initialValues={loginSchema.initialValues}
        validationSchema={loginSchema.schema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        <Form className="flex justify-center">
          <FormFields />
        </Form>
      </Formik>
    </div>
  )
}
