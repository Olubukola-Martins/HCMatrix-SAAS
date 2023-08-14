import {
  Switch,
  Select,
  DatePicker,
  Checkbox,
  Form,
  Button,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AppButton } from "components/button/AppButton";
import { useState } from "react";

const { Option } = Select;
export const ApplicationQuestions = () => {
 

  // handling datepicker check
  const [disableDatePicker, setDisableDatePicker] = useState(false);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setDisableDatePicker(e.target.checked);
  };
  return (
    <>
      <div id="sub-heading" className="p-0 bg-mainBg text-xl">
        Application Questions
      </div>
      <div className="app-quest-div">
        Upload Resume
        <Form.Item name="uploadResume" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Address
        <Form.Item name="address" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        LinkedIn URL
        <Form.Item name="linkedInURL" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Date Available
        <Form.Item name="dateAvailable" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Desired Salary
        <Form.Item name="desiredSalary" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Cover Letter
        <Form.Item name="coverLetter" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Referred By
        <Form.Item name="referredBy" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Link to Website, Blog or Portfolio
        <Form.Item name="linkToWebsiteBlogOrPortfolio" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Twitter Username
        <Form.Item name="twitterUsername" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Education
        <Form.Item name="education" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        Experience
        <Form.Item name="experience" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>

      <div className="app-quest-div">
        References
        <Form.Item name="references" valuePropName="checked">
          <Switch className="float-right" size="small" defaultChecked={false} />
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

      <div id="expiryDate">
        Expiry Date
        <div className="mt-2 sm:gap-[22px] flex sm:flex-row flex-col gap-2 items-center max-sm:items-start ">
          <Form.Item
            name="expiryDate"
            valuePropName="checked"
            // className="max-sm:w-full"
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabled={disableDatePicker}
              className="h-[53px] rounded-lg border-[0.3px] border-[#686868] py-4 px-6 sm:w-[60%] md:w-80 w-[31.25vw] "
            />
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={handleCheckboxChange}>Not Specified</Checkbox>
          </Form.Item>
        </div>
      </div>

      <div
        id="buttons"
        className=" flex flex-row justify-between items-center "
      >
        <AppButton
          label="Cancel"
          variant="style-with-class"
          additionalClassNames={["bg-none text-2xl max-sm:text-xl "]}
        />
        <AppButton
          label="Next"
          variant="style-with-class"
          additionalClassNames={[
            "bg-caramel py-3 px-[69px] max-sm:px-12 max-sm:py-2 rounded-lg text-white text-sm",
          ]}
          // handleClick={() => handleNextButton()}
        />
      </div>
    </>
  );
};
