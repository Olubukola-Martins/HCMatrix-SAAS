import React, { useState } from "react";
import { Segmented, Steps } from "antd";
import ModuleContainer from "./modules/ModuleContainer";
import AddOnContainer from "./addOns/AddOnContainer";
import { AppButton } from "components/button/AppButton";

const STEPS = ["Select Module", "Add Ons", "Payments", "Select Users"];
const SubscriptionContainer = () => {
  const [activeStep, setActiveStep] = useState(0);

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
              handleClick={() => setActiveStep((prev) => prev - 1)}
              variant="transparent"
            />
          )}
          {STEPS.length - 1 !== activeStep && (
            <AppButton
              label="Next"
              handleClick={() => setActiveStep((prev) => prev + 1)}
            />
          )}
        </div>
      </div>
      <div className={activeStep === 0 ? "block" : "hidden"}>
        <ModuleContainer />
      </div>
      <div className={activeStep === 1 ? "block" : "hidden"}>
        <AddOnContainer />
      </div>
    </div>
  );
};

export default SubscriptionContainer;
