import React, { useState } from "react";
import { Segmented, Steps } from "antd";
import ModuleContainer from "./modules/ModuleContainer";
import AddOnContainer from "./addOns/AddOnContainer";
import { AppButton } from "components/button/AppButton";
import PaymentsContainer from "./payment/PaymentsContainer";
import UserSelectionContainer from "./userSelection/UserSelectionContainer";

const STEPS = ["Select Module", "Add Ons", "Payments", "Select Users"];
const SubscriptionContainer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handlePrev = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  return (
    <div className="w-full flex flex-col  gap-12">
      <div className="self-center">
        <Steps progressDot current={activeStep}>
          {STEPS.map((item) => (
            <Steps.Step
              key={item}
              title={<span className="text-sm">{item}</span>}
            />
          ))}
        </Steps>
      </div>
      <div className="flex justify-between items-center">
        <Segmented options={["USD", "NGN"]} />
        <div className="flex gap-4">
          {activeStep !== 0 && (
            <AppButton
              label="Back"
              handleClick={handlePrev}
              variant="transparent"
            />
          )}
          {STEPS.length - 1 !== activeStep && (
            <AppButton label="Next" handleClick={handleNext} />
          )}
        </div>
      </div>
      <div className={activeStep === 0 ? "block" : "hidden"}>
        <ModuleContainer />
      </div>
      <div className={activeStep === 1 ? "block" : "hidden"}>
        <AddOnContainer />
      </div>
      <div className={activeStep === 2 ? "block" : "hidden"}>
        <PaymentsContainer />
      </div>
      <div className={activeStep === 3 ? "block" : "hidden"}>
        <UserSelectionContainer />
      </div>
    </div>
  );
};

export default SubscriptionContainer;
