import React from 'react';
import { checkoutSteps } from 'variables';

interface CheckoutWizardProps {
  activeStep?: 1 | 2 | 3;
}

export const CheckoutWizard: React.FC<CheckoutWizardProps> = ({
  activeStep = 0,
}) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {checkoutSteps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${
            index <= activeStep
              ? 'border-amber-500 text-amber-500'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};
