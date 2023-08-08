import {  Form, Input, Select, Button, Checkbox } from "antd";
import { textInputValidationRules } from "utils/formHelpers/validation";

export const JobDetails = () => {
  const { TextArea } = Input;

    return (
        <>
        {/* FORM */ }
      <section className="w-[83.3vw] bg-card pt-7 pb-16 mx-auto lg-ml-auto lg-mr-1 ">
        <Form
          onFinishFailed={(val) => {
            console.log("Error");
          }}
          className="w-11/12 bg-[var(--background)]  mx-auto px-3 py-8 md-px-6 rounded-lg flex flex-col gap-6"
 
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
              name="Department"
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
            <Form.Item label="Hiring Lead" name="Hiring Lead">
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
            <Form.Item label="Employment Type" name="Employment Type">
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
            <Form.Item label="Minimum Experience" name="Minimum Experience">
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
            <Form.Item label="Job Location" name="Job Location">
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
            <Form.Item label="Location" name="Location">
              <Input placeholder="e.g Charles Okorocha Lekki Phase 1"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Compensation" name="Compensation">
              <Input placeholder="e.g  NGN 200,000 Monthly"></Input>
              <Form.Item name="Not Specified">
                <Checkbox>Not Specified</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item label="" name="">
              <Input placeholder="Add pay range e.g NGN 200,000 to NGN 500,0000"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Job Template" name="Job Template">
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
            <Form.Item label="Job Description" name="Job Description">
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
                className="py-2 lg-py-3 px-10 md-px-16 lg-px-[69px]  flex flex-col justify-center bg-[var(--caramel)]  transition duration-300 ease-in-out hover:border-[var(--caramel)] hover:bg-[var(--caramel)] hover:opacity-70"
              >
                Next
              </Button>
            </Form.Item>

            {/* <AppButton
              additionalClassNames={["bg-slate-800"]}
              variant="style-with-class"
            /> */}
          </div>
        </Form>
        </section>
        </>
)
}
