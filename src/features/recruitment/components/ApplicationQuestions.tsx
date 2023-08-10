import {
  List,
  Switch,
  Select,
  SelectProps,
  DatePicker,
  Checkbox,
  Form,
  Button,
  Input,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";

const { Option } = Select;
export const ApplicationQuestions = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  // handling datepicker check
  const [disableDatePicker, setDisableDatePicker] = useState(false);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setDisableDatePicker(e.target.checked);
  };
  return (
    <>
      <Form name="applicationQuestions" onFinish={onFinish}>

        {/* ############### */}
        <div>
          Upload Resume
          <Form.Item name="uploadResume" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Address
          <Form.Item name="address" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          LinkedIn URL
          <Form.Item name="linkedInURL" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Date Available
          <Form.Item name="dateAvailable" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Desired Salary
          <Form.Item name="desiredSalary" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Cover Letter
          <Form.Item name="coverLetter" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Referred By
          <Form.Item name="referredBy" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Link to Website, Blog or Portfolio
          <Form.Item
            name="linkToWebsiteBlogOrPortfolio"
            valuePropName="checked"
          >
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Twitter Username
          <Form.Item name="twitterUsername" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Education
          <Form.Item name="education" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Experience
          <Form.Item name="experience" valuePropName="checked">
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item name="references" valuePropName="checked">
            References
            <Switch
              className="float-right"
              size="small"
              defaultChecked={false}
            />
          </Form.Item>
        </div>

        <div>
          Add benefit
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
          Expiry Date
          <Form.Item name="expiryDate" valuePropName="checked">
            {/* <div className="mt-2 gap-[22px] flex flex-row sm-flex-col sm-gap-5 items-center"> */}
            <DatePicker
              format="YYYY-MM-DD"
              disabled={disableDatePicker}
              className="h-[53px] rounded-lg border-[0.3px] border-[#686868] py-4 px-6 sm-w-[60%] md-w-80 w-[31.25vw] "
            />
            {/* </div> */}
          </Form.Item>
          <Form.Item>
            <Checkbox onChange={handleCheckboxChange}>Not Specified</Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="lg-py-2 py-3 md-px-10 lg-px-16 px-[69px]  flex flex-col justify-center bg-[var(--caramel)]  transition duration-300 ease-in-out hover:border-[var(--caramel)] hover:bg-[var(--caramel)] hover:opacity-70"
          >
            Next
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
