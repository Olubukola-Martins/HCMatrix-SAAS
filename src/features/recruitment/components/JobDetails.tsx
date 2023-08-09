import {  Form, Input, Select, Button, Checkbox } from "antd";
import { textInputValidationRules } from "utils/formHelpers/validation";

export const JobDetails = () => {
  const { TextArea } = Input;

    return (
      <>
        {/* FORM */}
        <Form
          onFinishFailed={(val) => {
            console.log("Error");
          }}
          className="w-11/12 bg-mainBg mx-auto md-px-3 py-8 px-6 rounded-lg flex flex-col gap-6"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <div>
            <Form.Item
              label="Job Title"
              name="jobTitle"
              rules={textInputValidationRules}
            >
              <Input placeholder="Mobile Developer"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item
              label="Department"
              name="department"
              rules={textInputValidationRules}
            >
              <Select
                defaultValue="Application Development"
                options={[
                  {
                    value: "Application Development",
                    label: "Application Development",
                  },
                  {
                    value: "CSI",
                    label: "CSI",
                  },
                  {
                    value: "Sales",
                    label: "Sales",
                  },
                  {
                    value: "Marketing",
                    label: "Marketing",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Hiring Lead" name="hiringLead">
              <Select
                defaultValue="Basil Ikpe (Product Manager)"
                options={[
                  {
                    value: "Basil Ikpe (Product Manager)",
                    label: "Basil Ikpe (Product Manager)",
                  },
                  {
                    value: "Esther Adiele (HR Manager)",
                    label: "Esther Adiele (HR Manager)",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Employment Type" name="employmentType">
              <Select
                defaultValue="Full-Time"
                options={[
                  {
                    value: "Contract",
                    label: "Contract",
                  },
                  {
                    value: "Full-Time",
                    label: "Full-Time",
                  },
                  {
                    value: "Intern",
                    label: "Intern",
                  },
                  {
                    value: "Part-Time",
                    label: "Part-Time",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Minimum Experience" name="minimumExperience">
              <Select
                defaultValue="Entry Level"
                options={[
                  {
                    value: "Entry Level",
                    label: "Entry Level",
                  },
                  {
                    value: "Mid-Level",
                    label: "Mid-Level",
                  },
                  {
                    value: "Experienced",
                    label: "Experienced",
                  },
                  {
                    value: "Manager/Supervisor",
                    label: "Manager/Supervisor",
                  },
                  {
                    value: "Senior Manager/Supervisor",
                    label: "Senior Manager/Supervisor",
                  },
                  {
                    value: "Executive",
                    label: "Executive",
                  },
                  {
                    value: "Senior Executive",
                    label: "Senior Executive",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Job Location" name="jobLocation">
              <Select
                defaultValue="Onsite"
                options={[
                  {
                    value: "Onsite",
                    label: "Onsite",
                  },
                  {
                    value: "Remote",
                    label: "Remote",
                  },
                  {
                    value: "Hybrid",
                    label: "Hybrid",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input placeholder="e.g Charles Okorocha Lekki Phase 1"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Compensation" name="compensation">
              <Input placeholder="e.g  NGN 200,000 Monthly"></Input>
              <Form.Item name="Not Specified">
                <Checkbox>Not Specified</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item label="" name="payRange">
              <Input placeholder="Add pay range e.g NGN 200,000 to NGN 500,0000"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Job Template" name="jobTemplate">
              <Select
                defaultValue="Search job template"
                options={[
                  {
                    value: "template 1",
                    label: "template 1",
                  },
                  {
                    value: "template 2",
                    label: "template 2",
                  },
                ]}
              />
            </Form.Item>
          </div>

          <div id="job-Description">
            <Form.Item label="Job Description" name="jobDescription">
              <TextArea
                placeholder="Input Description"
                autoSize={{ minRows: 10 }}
              />
            </Form.Item>
          </div>

          <div
            id="buttons"
            className=" flex flex-row justify-between items-center "
          >
            <Form.Item>
              <Button
                type="text"
                className="pl-0 transition duration-300 ease-in-out hover:bg-transparent hover:text-[var(--caramel)] hover:underline"
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="lg-py-2 py-3 md-px-10 lg-px-16 px-[69px]  flex flex-col justify-center bg-[var(--caramel)]  transition duration-300 ease-in-out hover:border-[var(--caramel)] hover:bg-[var(--caramel)] hover:opacity-70"
              >
                Next
              </Button>
            </Form.Item>

            {/* <AppButton
              additionalClassNames={["bg-caramel"]}
              variant="style-with-class"
            /> */}
          </div>
        </Form>
      </>
    );
}
