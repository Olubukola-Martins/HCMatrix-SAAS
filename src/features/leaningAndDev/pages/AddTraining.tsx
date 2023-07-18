import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { Form, Input, Select } from "antd";
import { useState } from "react";
import {
  textInputValidationRules,
  validateUrl,
} from "utils/formHelpers/validation";

export const AddTraining = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [trainingLocation, setTrainingLocation] = useState<number>(1);
  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <PageIntro link="" title="Add Training" />
      </div>

      <div className="Container mt-7">
        <div className="bg-card rounded md:p-5 p-3">
          <div className="bg-mainBg py-4 px-4 rounded">
            <Form layout="vertical" requiredMark={false}>
              <div className={formWrapStyle}>
                <Form.Item name="name" label="Training name">
                  <Input />
                </Form.Item>
                <Form.Item name="name" label="Is it a Paid Training">
                  <Select
                    allowClear
                    placeholder="Select"
                    options={[
                      { value: 1, label: "Yes" },
                      { value: 2, label: "No" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className={formWrapStyle}>
                <Form.Item name="trainingType" label="Training Type">
                  <Select
                    allowClear
                    placeholder="Select"
                    onSelect={(val: number) => setTrainingLocation(val)}
                    options={[
                      { value: 1, label: "Online" },
                      { value: 2, label: "Offline" },
                      { value: 3, label: "Hybrid" },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  rules={
                    trainingLocation === 1
                      ? validateUrl
                      : textInputValidationRules
                  }
                  name="trainingLocation"
                  label={
                    trainingLocation === 1
                      ? "Training URL"
                      : "Training location"
                  }
                >
                  <Input />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
