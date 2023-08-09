import { List, Switch, Select, SelectProps, DatePicker, Checkbox } from "antd";
import { useState } from "react";

const { Option } = Select;
type OptionType = {
  key: string;
  value: string;
};
export const ApplicationQuestions = () => {
  type MixedArray = (number | string | undefined | null)[];
  const [selectedQuestions, setSelectedQuestions] = useState<MixedArray>([]);

  const handleQuestionSelection = (
    item: string | number | null | undefined
  ) => {
    setSelectedQuestions((prevSelectedQuestions: MixedArray) => {
      if (prevSelectedQuestions.includes(item)) {
        return prevSelectedQuestions.filter((Question) => Question !== item);
      } else {
        prevSelectedQuestions = [...prevSelectedQuestions, item];
        console.log(prevSelectedQuestions);
        return prevSelectedQuestions;
      }
    });
  };
  const data = [
    "Upload Resume",
    "Address",
    "LinkedIn URL",
    "Date Available",
    "Desired Salary",
    "Cover Letter",
    "Referred By",
    "Link to Website, Blog or Portfolio",
    "Twitter Username",
    "Education",
    "Experience",
    "References",
    "Add benefit",
    "Expiry date",
  ];
  const handleOptionSelect = (value: string | number | null | undefined) => {
    setSelectedQuestions((prevSelectedQuestions) => {
      if (prevSelectedQuestions.includes(value)) {
        prevSelectedQuestions.filter((Question) => Question !== value);
        return prevSelectedQuestions;
      } else {
        prevSelectedQuestions = [...prevSelectedQuestions, value];
        // console.log(prevSelectedQuestions);
        return prevSelectedQuestions;
      }
    });
  };

  const handleOptionDeselect = (value: string | number | null | undefined) => {
    let NewArray: MixedArray;
    setSelectedQuestions((prevSelectedQuestions) => {
      if (prevSelectedQuestions.includes(value))
        NewArray = prevSelectedQuestions.filter(
          (Question) => Question !== value
        );
      prevSelectedQuestions = NewArray;
      //   console.log(prevSelectedQuestions);
      return prevSelectedQuestions;
    });
  };
  return (
    <>
      <List
        className="w-11/12 bg-mainBg  mx-auto md-px-3 py-8 px-6 rounded-lg flex flex-col gap-6"
        size="small"
        header={<div>Application Questions</div>}
        dataSource={data}
        renderItem={(item) => (
          <List.Item className="pl-5 pt-6 bg-card border-none mb-6">
            {item}
            {item === "Add benefit" ? (
              <Select
                className="mt-2"
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                onSelect={handleOptionSelect}
                onDeselect={handleOptionDeselect}
              >
                <Option value="Dental Insurance">Dental Insurance</Option>
                <Option value="Flexibility Schedule">
                  Flexibility Schedule
                </Option>
                <Option value="Paid Time Off">Paid Time Off</Option>
                <Option value="Health Insurance">Health Insurance</Option>
                <Option value="Vision Insurance">Vision Insurance</Option>
              </Select>
            ) : item === "Expiry date" ? (
              <div className="mt-2 gap-[22px] flex flex-row sm-flex-col sm-gap-5 items-center">
                <DatePicker className="h-[53px] rounded-lg border-[0.3px] border-[#686868] py-4 px-6 sm-w-[60%] md-w-80 w-[31.25vw] " />
                <Checkbox>Not Specified</Checkbox>
              </div>
            ) : (
              <Switch
                className="float-right"
                size="small"
                checked={selectedQuestions.includes(item)}
                onChange={() => {
                  handleQuestionSelection(item);
                }}
              />
            )}
          </List.Item>
        )}
      />
    </>
  );
};
