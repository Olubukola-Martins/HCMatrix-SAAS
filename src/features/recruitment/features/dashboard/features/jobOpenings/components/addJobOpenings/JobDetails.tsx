import { Checkbox, Form, FormInstance, Input, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import { WORK_MODELS } from "constants/general";
import { useNavigate } from "react-router-dom";
import { textInputValidationRules } from "utils/formHelpers/validation";
// import { openNotification } from "utils/notifications";

interface ChildProps {
  updateCount: (newCount: number) => void;
  form: FormInstance;
  isHidden: string;
  stepperCurrentState:number;
}

const JobDetails = ({  updateCount, form,isHidden,stepperCurrentState }: ChildProps) => {
  const { TextArea } = Input;
  const navigator = useNavigate();

  // on cancel, handle fields reset
  const handleResetClick = () => {
    form.resetFields();
    navigator(appRoutes.recruitmentDashboard);
  };


  

  const handleNextButton = () => {
    // const values = form.getFieldsValue();
    // const emptyFieldKeys = Object.keys(values).filter((key) => !values[key]);

    // const keysToCheck = ["jobTitle", "department", "hiringLead", "employmentType", "minimumExperience", "jobLocation", "location"];

    // const hasEmptyFieldsToCheck = emptyFieldKeys.some((key) => keysToCheck.includes(key));
    // if (!hasEmptyFieldsToCheck) {
    //   if (stepperCurrentState <= 2 && stepperCurrentState >= 0) updateCount(1);
    // } else {
    //   openNotification({
    //     title: "Submit failed",
    //     description: "Please fill all required field.",
    //     state: "error",
    //     duration: 8.0,
    //   });
    // }
    updateCount(1)
  };

  return (
    <>
      <div className={stepperCurrentState === 0 ? "" : "hidden"}>
        <Form.Item label="Job Title" name="jobTitle" rules={textInputValidationRules}>
          <Input placeholder="e.g Mobile Developer" allowClear></Input>
        </Form.Item>
      </div>

      <div className={isHidden}>
        <Form.Item label="Department" name="department" rules={textInputValidationRules}>
          <Select placeholder="e.g(App Development)" allowClear options={[]} />
        </Form.Item>
        <Form.Item label="Hiring lead" name="hiringLead" rules={textInputValidationRules}>
          <Select placeholder="e.g(Basil Ikpe)" showSearch optionFilterProp="children" allowClear options={[]} />
        </Form.Item>
      </div>

      <div className={isHidden}>
        <Form.Item label="Employment Type" name="employmentType" rules={textInputValidationRules}>
          <Select placeholder="e.g (full-time)" allowClear options={[]} />
        </Form.Item>
        <Form.Item label="Minimum Experience" name="minimumExperience" rules={textInputValidationRules}>
          <Select placeholder="e.g (Entry Level)" allowClear options={[]} />
        </Form.Item>
      </div>

      <div className={isHidden}>
        <Form.Item label="Job Location" name="jobLocation" rules={textInputValidationRules}>
          <Select placeholder="Select e.g(Onsite)" allowClear options={WORK_MODELS} />
        </Form.Item>
        <Form.Item label="Location" name="location" rules={textInputValidationRules}>
          <Input placeholder="e.g Charles Okorocha Lekki Phase 1" allowClear></Input>
        </Form.Item>
      </div>

      <div className={isHidden}>
        <span>
          <Form.Item label=" Compensation" name="compensation">
            <Input placeholder="200 000 " allowClear />
          </Form.Item>
          <Form.Item name="compensationNotSpecified" valuePropName="checked">
            <Checkbox>Not Specified</Checkbox>
          </Form.Item>
        </span>
        <Form.Item label="" name="compensation">
          <Input placeholder="Enter pay range e.g NGN 200,000 TO NGN 500,000 " allowClear />
        </Form.Item>
      </div>

      <div className={isHidden}>
        <Form.Item
          label="Job Template"
          name="jobDescription"
          initialValue="No job description provided ..."
          // requiredMark="optional"
        >
          <Select
            placeholder="Search job template"
            allowClear
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

      <div id="job-Description" className={isHidden}>
        <Form.Item label="Enter Job Description" name="jobDescription">
          <TextArea placeholder="Input Description" allowClear autoSize={{ minRows: 5 }} />
        </Form.Item>
      </div>

      <div id="buttons" className={`flex flex-row justify-between items-center ${isHidden}`}>
        <AppButton label="Cancel" variant="style-with-class" additionalClassNames={["bg-none text-lg max-sm:text-base hover:text-caramel"]} handleClick={() => handleResetClick()} />
        <AppButton label="Next" handleClick={() => handleNextButton()} />
      </div>
    </>
  );
};

export default JobDetails;
