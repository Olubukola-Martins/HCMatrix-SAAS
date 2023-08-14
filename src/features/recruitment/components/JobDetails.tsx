import { Form, Input, Select, Button, Checkbox, FormInstance } from "antd";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useState } from "react";
import { EMPLOYMENT_TYPES, WORK_MODELS } from "constants/general";
import { AppButton } from "components/button/AppButton";

interface ChildProps {
  stepperCurrentState: number;
  updateCount: (newCount: number) => void;
  form: FormInstance;
}

export const JobDetails: React.FC<ChildProps> = ({
  stepperCurrentState,
  updateCount,
  form,
}) => {
  const { TextArea } = Input;
  // type SetterFunction = React.Dispatch<React.SetStateAction<boolean>>;

  // handleNextButton
  const handleNextButton = () => {
    const values = form.getFieldsValue();
    const emptyFieldKeys = Object.keys(values).filter((key) => !values[key]);

    const keysToCheck = [
      "jobTitle",
      "department",
      "hiringLead",
      "employmentType",
      "minimumExperience",
      "jobLocation",
      "location",
      "jobDescription",
    ];

    const hasEmptyFieldsToCheck = emptyFieldKeys.some((key) =>
      keysToCheck.includes(key)
    );

    if (!hasEmptyFieldsToCheck) {
      if (stepperCurrentState <= 2 && stepperCurrentState >= 0)
        updateCount(stepperCurrentState + 1);
    } else {
      console.log("Failed.");
    }
  };

  return (
    <>
      <div>
        <Form.Item
          label="Job Title"
          name="jobTitle"
          rules={textInputValidationRules}
        >
          <Input placeholder="e.g Mobile Developer"></Input>
        </Form.Item>
      </div>

      <div>
        <Form.Item
          label="Department"
          name="department"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g(App Development)"
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
        <Form.Item
          label="Hiring Lead"
          name="hiringLead"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g(Basil Ikpe)"
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
        <Form.Item
          label="Employment Type"
          name="employmentType"
          rules={textInputValidationRules}
        >
          <Select placeholder="e.g (full-time)" options={EMPLOYMENT_TYPES} />
        </Form.Item>
        <Form.Item
          label="Minimum Experience"
          name="minimumExperience"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g (Entry Level)"
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
        <Form.Item
          label="Job Location"
          name="jobLocation"
          rules={textInputValidationRules}
        >
          <Select placeholder="Select e.g(Onsite)" options={WORK_MODELS} />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={textInputValidationRules}
        >
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
            placeholder="Search job template"
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
        <Form.Item
          label="Job Description"
          name="jobDescription"
          rules={textInputValidationRules}
        >
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
        <AppButton
          label="Cancel"
          variant="style-with-class"
          additionalClassNames={["bg-none text-2xl max-sm:text-xl "]}
        />
        <AppButton
          label="Next"
          variant="style-with-class"
          additionalClassNames={[
            "bg-caramel py-3 px-[69px] max-sm:px-12 max-sm:py-2 rounded text-white text-sm",
          ]}
          handleClick={() => handleNextButton()}
        />
      </div>
    </>
  );
};
