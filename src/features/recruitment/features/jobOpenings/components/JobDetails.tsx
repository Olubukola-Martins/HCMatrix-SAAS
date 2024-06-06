import { Form, Input, Select, FormInstance } from "antd";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useState } from "react";
import { WORK_MODELS } from "constants/general";
import { AppButton } from "components/button/AppButton";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { openNotification } from "utils/notifications";
import { useGetEmploymentTypes } from "features/recruitment/settings/hooks/useGetEmploymentTypes";
import { useGetExperienceType } from "features/recruitment/settings/hooks/useGetExperienceType";
import { useFetchDepartments as useFetchAllDepartments } from "features/core/departments/hooks/useFetchDepartments";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

const { TextArea } = Input;

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
  const { data: employTypData } = useGetEmploymentTypes();
  const { data: experncTypData } = useGetExperienceType();

  const { data: departmentsData } = useFetchAllDepartments({});

  const navigator = useNavigate();

  // on cancel, handle fields reset
  const handleResetClick = () => {
    form.resetFields();
    navigator(appRoutes.recruitmentDashboard);
  };

  const [selectedOption, setSelectedOption] = useState("Not Specified");

  const handleSelectChange = (value: any) => {
    // Update the selected option
    setSelectedOption(value);
  };

  const [selectJobDesType, setSelectJobDesType] = useState("");

  const handleJobDescType = (value: string) => {
    setSelectJobDesType(value);
  };

  // handle required fields check for Next button

  const handleNextButton = () => {
    const values = form.getFieldsValue();
    const emptyFieldKeys = Object.keys(values).filter((key) => !values[key]);

    const keysToCheck = [
      "jobTitle",
      "department",
      "teamLead",
      "employmentType",
      "minimumExperience",
      "jobLocation",
      "location",
    ];

    const hasEmptyFieldsToCheck = emptyFieldKeys.some((key) =>
      keysToCheck.includes(key)
    );
    if (!hasEmptyFieldsToCheck) {
      if (stepperCurrentState <= 2 && stepperCurrentState >= 0)
        updateCount(stepperCurrentState + 1);
    } else {
      openNotification({
        title: "Submit failed",
        description: "Please fill all required field.",
        state: "error",
        duration: 8.0,
      });
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
        <Form.Item
          label="Department"
          name="department"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g(App Development)"
            options={
              // [
              // {
              //   value: "Application Development",
              //   label: "Application Development",
              // },
              // {
              //   value: "CSI",
              //   label: "CSI",
              // },
              // {
              //   value: "Sales",
              //   label: "Sales",
              // },
              // {
              //   value: "Marketing",
              //   label: "Marketing",
              // },
              // ]

              departmentsData?.data?.map((department) => ({
                value: department.name,
                label: department.name.replace(/\s/g, ""),
              }))
            }
          />
        </Form.Item>
      </div>

      <div>
        <Form.Item
          label="Employment Type"
          name="employmentType"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g (full-time)"
            options={employTypData?.map((item) => ({
              value: item.label,
              label: item.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Minimum Experience"
          name="minimumExperience"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g (Entry Level)"
            options={experncTypData?.map((item) => ({
              value: item.label,
              label: item.name,
            }))}
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
        {/* <Form.Item
          label="Team lead"
          name="teamLead"
          rules={textInputValidationRules}
        >
          <Select
            placeholder="e.g(Basil Ikpe)"
            options={
              employeeData?.data.map((item) => ({
                value: `${item.firstName} ${item.lastName}`,
                label: `${item.firstName} ${item.lastName}`
              }))
            }
          />
        </Form.Item> */}
        <FormEmployeeInput
          Form={Form}
          control={{ name: "teamLead", label: "Team Lead" }}
        />

        <Form.Item label="Compensation" requiredMark="optional">
          <Select
            onChange={handleSelectChange}
            placeholder="Select compensation"
            options={[
              {
                value: "Not Specified",
                label: "Not Specified",
              },
              {
                value: "Enter an Amount",
                label: "Enter an Amount",
              },
            ]}
          />
        </Form.Item>
      </div>

      <div
        style={{
          display: selectedOption === "Enter an Amount" ? "block" : "none",
        }}
      >
        <Form.Item label="Enter Compensation" name="compensation">
          <Input placeholder="200 000 " style={{ width: "100%" }} />
        </Form.Item>
      </div>

      <div>
        <Form.Item label="Job Description" requiredMark="optional">
          <Select
            onChange={handleJobDescType}
            placeholder="Choose job description"
            options={[
              {
                value: "Use job template",
                label: "Use job template",
              },
              {
                value: "Input job description",
                label: "Input job description",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Job Template"
          name="jobDescription"
          style={{
            display: selectJobDesType === "Use job template" ? "block" : "none",
          }}
          // requiredMark="optional"
        >
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

      <div
        id="job-Description"
        style={{
          display:
            selectJobDesType === "Input job description" ? "block" : "none",
        }}
      >
        <Form.Item label="Enter Job Description" name="jobDescription">
          <TextArea placeholder="Input Description" autoSize={{ minRows: 5 }} />
        </Form.Item>
      </div>

      <div
        id="buttons"
        className=" flex flex-row justify-between items-center "
      >
        <AppButton
          label="Cancel"
          variant="style-with-class"
          additionalClassNames={[
            "bg-none text-lg max-sm:text-base hover:text-caramel",
          ]}
          handleClick={() => handleResetClick()}
        />
        <AppButton label="Next" handleClick={() => handleNextButton()} />
      </div>
    </>
  );
};
