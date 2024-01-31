import { Formik, Form } from 'formik'

import loginSchema from '@renderer/util/validation/loginSchema'
import FormFields from '@renderer/features/login/SubComponents/FormFields'
import { OnSubmitFunction } from '@renderer/env.d'

export default function LoginForm({ onSubmit }: { onSubmit: OnSubmitFunction }): React.JSX.Element {
  return (
    <div className={`h-[calc(70%)] w-full flex-col items-center justify-center`}>
      <Formik
        initialValues={loginSchema.initialValues}
        validationSchema={loginSchema.schema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        <Form className={`flex justify-center`}>
          <FormFields />
        </Form>
      </Formik>
    </div>
  )
}
