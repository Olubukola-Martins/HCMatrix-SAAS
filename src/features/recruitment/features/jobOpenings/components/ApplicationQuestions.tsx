import { Switch, Select, DatePicker, Checkbox, Form, Skeleton } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { AppButton } from "components/button/AppButton";
import { useGetAppplicationQuestions } from "features/recruitment/features/jobOpenings/hooks/useGetAppplicationQuestions";
import { useGetBenefits } from "features/recruitment/settings/hooks/useGetBenefits";
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
  const {
    data: dataForSwitches,
    isLoading,
    error,
  } = useGetAppplicationQuestions();
  const { data: benefitsData } = useGetBenefits();

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

  const [IsActive, setIsActive] = useState<boolean>(true);

  const handleSwitchChange = (checked: boolean) => {
    setIsActive(!checked);
  };
  return (
    <>
      <div id="sub-heading" className="p-0 bg-mainBg text-xl">
        Application Questions
      </div>

      {error ? (
        <p className="text-red-600 text-xl">ERROR</p>
      ) : (
        dataForSwitches?.map((result) => (
          <Skeleton active loading={isLoading}>
            <div className="app-quest-div" id="switch">
              {result.name}
              <Form.Item
                name={result.label}
                valuePropName="checked"
                initialValue={true}
              >
                <Switch
                  className="float-right"
                  defaultChecked={IsActive}
                  onChange={handleSwitchChange}
                />
              </Form.Item>
            </div>
          </Skeleton>
        ))
      )}

      <div id="addBenefit">
        <div>Add benefit</div>
        <Form.Item name="addBenefit" valuePropName="checked">
          <Select
            className="mt-2"
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
          >
            {benefitsData?.map((item) => (
              <Option value={item.label}>{item.name}</Option>
            ))}
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
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
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
