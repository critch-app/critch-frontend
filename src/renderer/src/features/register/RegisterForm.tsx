import registerSchema from '@renderer/util/validation/registerSchema'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'

import { OnSubmitFunction, SetStepFunction } from './RegisterForm.d'
import StepOne from './SubComponents/StepOne'
import StepTwo from './SubComponents/StepTwo'
import StepThree from './SubComponents/StepThree'

/**
 * Functional component representing the registration form.
 * @component
 * @param {Object} props - Component props.
 * @param {OnSubmitFunction} props.onSubmit - Function to handle form submission.
 * @param {number} props.currentStep - Current step in the registration process.
 * @param {SetStepFunction} props.setStep - Function to set the current step.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function RegisterForm({
  onSubmit,
  currentStep,
  setStep
}: {
  onSubmit: OnSubmitFunction
  currentStep: number
  setStep: SetStepFunction
}): React.JSX.Element {
  return (
    <div className="h-[calc(70%)] w-full flex-col items-center justify-center">
      <Formik
        initialValues={registerSchema.initialValues}
        validationSchema={registerSchema.schema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        <Form className="flex justify-center">
          {currentStep === 1 && <StepOne />}
          {currentStep == 2 && <StepTwo />}
          {currentStep == 3 && <StepThree />}
        </Form>
      </Formik>
      <div className="my-2 flex w-full items-center justify-center">
        <button
          className="m-2 h-6 w-10 rounded-md bg-soft-purble text-sm text-soft-white hover:bg-soft-purble/80 disabled:bg-soft-purble/60 disabled:text-extra-gray"
          onClick={(): void => setStep(currentStep - 1)}
          disabled={currentStep == 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="m-2 h-6 w-10 rounded-md bg-soft-purble text-sm text-soft-white hover:bg-soft-purble/80 disabled:bg-soft-purble/60 disabled:text-extra-gray"
          onClick={(): void => setStep(currentStep + 1)}
          disabled={currentStep == 3}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}
