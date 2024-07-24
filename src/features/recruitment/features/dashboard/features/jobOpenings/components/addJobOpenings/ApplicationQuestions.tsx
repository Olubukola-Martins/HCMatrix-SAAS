import { Checkbox, DatePicker, Form, FormInstance, Select, Skeleton, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { benefitsData, dataForSwitches } from "../../utils/mockData";

const { Option } = Select;

interface ChildProps {
  updateCount: (newCount: number) => void;
  form: FormInstance<any>;
  isHidden: string;
  stepperCurrentState:number;
}

const ApplicationQuestions = ({ updateCount, form,isHidden,stepperCurrentState }: ChildProps) => {
  const [IsActive, setIsActive] = React.useState<boolean>(true);

  const handleSwitchChange = (checked: boolean) => {
    setIsActive(!checked);
  };

  const handleBackButton = () => {
    updateCount(0);
  };

  const handleNextButton = () => {
    updateCount(2);
  };

  return (
    <>
      <div id={`${isHidden} sub-heading`} className="p-0 bg-mainBg text-xl">
        Application Questions
      </div>
      {dataForSwitches?.map((result) => (
        <Skeleton active loading={false} className={isHidden}>
          <div className={`app-quest-div ${isHidden}`} id="switch">
            {result.label}
            <Form.Item name={result.name} valuePropName="checked" initialValue={true}>
              <Switch className="float-right" defaultChecked={IsActive} onChange={handleSwitchChange} />
            </Form.Item>
          </div>
        </Skeleton>
      ))}
      <div id="addBenefit" className={isHidden}>
        <div>Add benefit</div>
        <Form.Item name="addBenefit" valuePropName="checked">
          <Select className="mt-2" allowClear mode="multiple" style={{ width: "100%" }} placeholder="Please select">
            {benefitsData?.map((item) => (
              <Option value={item.name}>{item.label}</Option>
            ))}
          </Select>
        </Form.Item>
      </div>

      <div className={isHidden}>
        <Form.Item label="Enter expiry date" name="expiryDate" valuePropName="checked">
          <DatePicker format="YYYY-MM-DD" allowClear={true} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label=' ' name="expiryDateNotSpecified" valuePropName="checked">
          <Checkbox>Not Specified</Checkbox>
        </Form.Item>
      </div>

      <div id="buttons" className={` flex flex-row justify-between items-center ${isHidden}`}>
        <AppButton type="button" label="Back" variant="style-with-class" additionalClassNames={["bg-none text-lg max-sm:text-base hover:text-caramel"]} handleClick={() => handleBackButton()} />

        <AppButton type="button" label="Next" handleClick={() => handleNextButton()} />
      </div>
    </>
  );
};

export default ApplicationQuestions;
