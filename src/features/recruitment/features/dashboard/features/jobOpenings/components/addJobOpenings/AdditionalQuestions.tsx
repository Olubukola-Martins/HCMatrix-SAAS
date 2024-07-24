import { Form, FormInstance, Input, Switch } from "antd";
import React from "react";
import { IjobOpeningForm } from "../../types";
import PreviewJob from "./PreviewJob";
import { AppButton } from "components/button/AppButton";

interface ChildProps {
  updateCount: (newCount: number) => void;
  form: FormInstance<any>;
  isHidden: string;
  stepperCurrentState:number;
}

const AdditionalQuestions = ({ updateCount, form,isHidden,stepperCurrentState }: ChildProps) => {
  const [formValues, setFormValues] = React.useState<IjobOpeningForm>();

  // drawer state and click handles
  const [open, setOpen] = React.useState(false);
  const showDrawer = () => {
    const values = form.getFieldsValue();
    setFormValues(values);
    console.log("Field values:", values);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Update switchState changes
  const [IsActive, setIsActive] = React.useState<boolean>(true);

  const handleSwitchChange = (checked: boolean) => {
    setIsActive(!checked);
  };

  // handle back button
  const handleBackButton = () => {
    updateCount(1);
  };
  return (
    <>
      <PreviewJob onClose={onClose} open={open} formValues={formValues} />
      {/* <div className={`addit-ques-div ${isHidden}`}>
        <h2 className="float-left w-full text-xl ">Additional Questions</h2>
        <p className="float-left w-full text-base">Select the answer mode to your question.</p>
      </div> */}

      <div className={`addit-ques-div ${isHidden}`} id="ask-quest">
        <Form.Item label="Ask Your Questions" name="additionalQuestion">
          <Input placeholder="Type in Your Question...." allowClear />
        </Form.Item>
      </div>

      <div id="integration-text" className={`addit-ques-div ${isHidden}`}>
        <h2 className="float-left w-full text-[28px] font-bold">Integration</h2>
      </div>

      <div className={`addit-ques-div ${isHidden}`} id="switch">
        LinkedIn
        <Form.Item name="linkedIn" valuePropName="checked" initialValue={true}>
          <Switch className="float-right" defaultChecked={IsActive} onChange={handleSwitchChange} />
        </Form.Item>
      </div>
      <div className={`addit-ques-div ${isHidden}`} id="switch">
        Enable Application Tracking System (ATS)
        <Form.Item name="enableATS" valuePropName="checked" initialValue={true}>
          <Switch className="float-right" defaultChecked={IsActive} onChange={handleSwitchChange} />
        </Form.Item>
      </div>

      {/* buttons */}
      <div id="buttons " className={`last-pg-btns flex flex-row justify-between items-center ${isHidden} `}>
        <AppButton type="button" label="Back" variant="style-with-class" additionalClassNames={["bg-none text-lg max-sm:text-base hover:text-caramel"]} handleClick={() => handleBackButton()} />

        <div className="flex flex-row gap-x-6">
          <AppButton type="button" label="Preview Job" variant="transparent" handleClick={() => showDrawer()} additionalClassNames={["border-caramel "]} />

          <AppButton type="submit" label="Save For Later" variant="style-with-class" />

          <AppButton type="submit" label="Publish Job Opening" />
        </div>
      </div>
    </>
  );
};

export default AdditionalQuestions;
