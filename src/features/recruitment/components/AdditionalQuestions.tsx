import { Form, Input, Switch } from "antd";

export const AdditionalQuestions = () => {
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
          <Switch className="float-right" size="small" defaultChecked={false} />
        </Form.Item>
      </div>
    </>
  );
};
