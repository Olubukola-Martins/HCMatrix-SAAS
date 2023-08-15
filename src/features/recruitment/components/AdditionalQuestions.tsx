import { Form, Input, Switch } from "antd";
import { AppButton } from "components/button/AppButton";

interface ChildProps {
  stepperCurrentState: number;
  updateCount: (newCount: number) => void;
}

export const AdditionalQuestions: React.FC<ChildProps> = ({
  stepperCurrentState,
  updateCount,
}) => {
  // handle back button
  const handleBackButton = () => {
    if (stepperCurrentState <= 2 && stepperCurrentState >= 0)
      updateCount(stepperCurrentState - 1);
  };

  return (
    <>
      <div className="addit-ques-div">
        <h2 className="float-left w-full text-xl ">Additional Questions</h2>
        <p className="float-left w-full text-base">
          Select the answer mode to your question.
        </p>
      </div>

      <div className="addit-ques-div">
        <Form.Item label="Ask Your Question" name="askYourQuestion">
          <Input placeholder="Type in Your Question...." />
        </Form.Item>
      </div>

      <div className="addit-ques-div">
        <h2 className="float-left w-full text-[28px] font-bold">Integration</h2>
        <p className="float-left w-full text-lg mt-4">
          Get the word out. <br /> You can choose to auto post this job to other
          job site
        </p>
      </div>

      <div className="addit-ques-div">
        LinkedIn
        <Form.Item name="linkedIn" valuePropName="checked">
          <Switch className="float-right" defaultChecked={false} />
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
          additionalClassNames={["bg-none text-2xl max-sm:text-xl "]}
          handleClick={() => handleBackButton()}
        />

        <div className="flex flex-row gap-x-6">
          <AppButton
            type="button"
            label="Application Form"
            variant="transparent"
            additionalClassNames={[
              "border-none underline decoration-inherit underline-offset-4",
            ]}
          />
          <AppButton
            type="button"
            label="Preview Job"
            variant="style-with-class"
            additionalClassNames={[
              "border-caramel border-[1px] py-[11px] px-4 max-sm:px-2.5 max-sm:py-2 rounded  text-sm text-caramel",
            ]}
          />

          <AppButton
            type="submit"
            label="Save Job opening"
            variant="style-with-class"
            additionalClassNames={[
              "bg-caramel py-3 px-4 max-sm:px-2.5 max-sm:py-2 rounded text-white text-sm",
            ]}
          />
        </div>
      </div>
    </>
  );
};
