import registerSchema from '@renderer/util/validation/registerSchema'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { Formik, Form } from 'formik'

import { OnSubmitFunction, SetStepFunction } from '@renderer/env.d'
import StepOne from './SubComponents/StepOne'
import StepTwo from './SubComponents/StepTwo'
import StepThree from './SubComponents/StepThree'
import { useState } from 'react'

export default function RegisterForm({
  onSubmit,
  currentStep,
  setStep
}: {
  onSubmit: OnSubmitFunction
  currentStep: number
  setStep: SetStepFunction
}): React.JSX.Element {
  const [isStepContainError, setIsStepContainError] = useState(true)
  return (
    <div className={`h-[calc(70%)] w-full flex-col items-center justify-center`}>
      <Formik
        initialValues={registerSchema.initialValues}
        validationSchema={registerSchema.schema}
        onSubmit={onSubmit}
        validateOnBlur={true}
      >
        <Form className={`flex justify-center`}>
          {currentStep === 1 && <StepOne setIsStepContainError={setIsStepContainError} />}
          {currentStep === 2 && <StepTwo setIsStepContainError={setIsStepContainError} />}
          {currentStep === 3 && <StepThree setIsStepContainError={setIsStepContainError} />}
        </Form>
      </Formik>
      <div className={`my-2 flex w-full items-center justify-center`}>
        <button
          onClick={(): void => setStep(currentStep - 1)}
          disabled={currentStep == 1}
          className={`m-2 h-6 w-10 rounded-md bg-soft-purble text-sm text-soft-white 
          hover:bg-soft-purble/80 disabled:bg-soft-purble/60 disabled:text-extra-gray`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={(): void => setStep(currentStep + 1)}
          disabled={currentStep == 3 || isStepContainError}
          className={`m-2 h-6 w-10 rounded-md bg-soft-purble text-sm text-soft-white 
          hover:bg-soft-purble/80 disabled:bg-soft-purble/60 disabled:text-extra-gray`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  )
}
