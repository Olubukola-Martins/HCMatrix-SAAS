import { Switch, Select, DatePicker, Checkbox, Form } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";

const { Option } = Select;

interface ChildProps {
  stepperCurrentState: number;
  updateCount: (newCount: number) => void;
}

export const ApplicationQuestions: React.FC<ChildProps> = ({
  stepperCurrentState,
  updateCount,
}) => {
  // handle next button
  const handleNextButton = () => {
    if (stepperCurrentState <= 2 && stepperCurrentState >= 0)
      updateCount(stepperCurrentState + 1);
  };
  // handle back button
  const handleBackButton = () => {
    if (stepperCurrentState <= 2 && stepperCurrentState >= 0)
      updateCount(stepperCurrentState - 1);
  };

  // handling datepicker
  const [selectedOption, setSelectedOption] = useState("Not Specified");

  const handleSelectChange = (value: any) => {
    // Update the selected option
    setSelectedOption(value);
  };

  const [switchState, setSwitchState] = useState<boolean>(true);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
  };
  return (
    <>
      <div id="sub-heading" className="p-0 bg-mainBg text-xl">
        Application Questions
      </div>
      <div className="app-quest-div" id="switch">
        Upload Resume
        <Form.Item name="uploadResume">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Address
        <Form.Item name="address">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        LinkedIn URL
        <Form.Item name="linkedInURL">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Date Available
        <Form.Item name="dateAvailable">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Desired Salary
        <Form.Item name="desiredSalary">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Cover Letter
        <Form.Item name="coverLetter">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Referred By
        <Form.Item name="referredBy">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Link to Website, Blog or Portfolio
        <Form.Item name="linkToWebsiteBlogOrPortfolio">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Twitter Username
        <Form.Item name="twitterUsername">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Education
        <Form.Item name="education">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        Experience
        <Form.Item name="experience">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div className="app-quest-div" id="switch">
        References
        <Form.Item name="references">
          <Switch
            className="float-right"
            checked={switchState}
            onChange={handleSwitchChange}
          />
        </Form.Item>
      </div>

      <div id="addBenefit">
        <div>Add benefit</div>
        <Form.Item name="addBenefit" valuePropName="checked">
          <Select
            className="mt-2"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            <Option value="Dental Insurance">Dental Insurance</Option>
            <Option value="Flexibility Schedule">Flexibility Schedule</Option>
            <Option value="Paid Time Off">Paid Time Off</Option>
            <Option value="Health Insurance">Health Insurance</Option>
            <Option value="Vision Insurance">Vision Insurance</Option>
          </Select>
        </Form.Item>
      </div>

      <div>
        <Form.Item label="Expiry Date">
          <Select
            onChange={handleSelectChange}
            placeholder="Select expiry"
            options={[
              {
                value: "Not Specified",
                label: "Not Specified",
              },
              {
                value: "Enter expiry date",
                label: "Enter expiry date",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Enter expiry date"
          name="expiryDate"
          valuePropName="checked"
          style={{
            display: selectedOption === "Enter expiry date" ? "block" : "none",
          }}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>

      <div
        id="buttons"
        className=" flex flex-row justify-between items-center "
      >
        <AppButton
          type="button"
          label="Back"
          variant="style-with-class"
          additionalClassNames={[
            "bg-none text-lg max-sm:text-base hover:text-caramel",
          ]}
          handleClick={() => handleBackButton()}
        />

        <AppButton
          type="button"
          label="Next"
          handleClick={() => handleNextButton()}
        />
      </div>
    </>
  );
};
