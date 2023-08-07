import React from "react";
import "../../style/addJobOpening.css";
import { Steps, Form, Input, Select, Button, Checkbox } from "antd";
import "antd/dist/antd.min.css";

export const AddJobOpeningContainer = () => {
  const { Step } = Steps;
  const { TextArea } = Input;

  return (
    <>
      {/* <br />
      <br />
      <div className="text-slate-500">
        This task can be broken down to components; Job Details, Application
        Questions, & Additional Questions
      </div> */}

      {/* ADD JOB OPENING */}
      <div className="w-[82.1vw] flex gap-2 mx-auto">
        <a href="" className="flex flex-col items-center">
          <svg
            className="my-auto"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.63599L15.778 7.04999L10.828 12Z"
              fill="#3A3A3A"
            />
          </svg>
        </a>
        <a href="">
          <h2 className="text-gray-700 text-[28px] font-bold">
            Add Job Opening
          </h2>
        </a>
      </div>

      {/* STEPPER */}
      <div className="w-[82.1vw] h-36 mx-auto my-6 rounded-2xl shadow shadow-[rgba(0, 0, 0, 0.08)] add-job-opening">
        <Steps current={1} labelPlacement="vertical" className="py-6 h-auto ">
          <Step description="Job details" />
          <Step description="Application Questions" />
          <Step description="Additional Questions" />
        </Steps>
      </div>

      {/* FORM */}
      <section className="w-[83.3vw] bg-[var(--greyBg)] pt-7 pb-16 ml-auto mr-1 ">
        <Form
          className="w-11/12 bg-[var(--background)]  mx-auto py-8 px-6 rounded-lg flex flex-col gap-6"
          layout="vertical"
          initialValues={{ remember: true }}
        >
          <div>
            <Form.Item label="Job Title" name="Job Title">
              <Input placeholder="Mobile Developer"></Input>
            </Form.Item>
          </div>

          <div>
            <Form.Item label="Department" name="Department">
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
            className=" flex flex-row justify-between items-center"
          >
            <Form.Item>
              <Button type="text" className="pl-0 ">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="py-3 px-[69px] flex flex-col justify-center bg-[var(--caramel)]"
              >
                Next
              </Button>
            </Form.Item>
          </div>
        </Form>
      </section>
    </>
  );
};
