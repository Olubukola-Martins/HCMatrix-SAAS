import { PageIntro } from "components/layout/PageIntro";
import { LeaningNavbar } from "../components/LeaningNavbar";
import { DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";
import { useState } from "react";
import {
  textInputValidationRules,
  validateUrl,
} from "utils/formHelpers/validation";
import TextArea from "antd/lib/input/TextArea";
import { appRoutes } from "config/router/paths";
import { AppButton } from "components/button/AppButton";
import { Link } from "react-router-dom";
const { RangePicker } = DatePicker;

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
            <Form layout="vertical">
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
                  required={false}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className={formWrapStyle}>
                <Form.Item name="department" label="Department">
                  <Select
                    allowClear
                    placeholder="Select"
                    options={[
                      { value: 1, label: "App dev" },
                      { value: 2, label: "CSI" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="costPerHead" label="Training cost per head">
                  <InputNumber className="w-full" />
                </Form.Item>
              </div>
              <div className={formWrapStyle}>
                <Form.Item
                  name="classSize"
                  label="Class size"
                  requiredMark="optional"
                >
                  <InputNumber className="w-full" placeholder="0" />
                </Form.Item>
                <Form.Item name="certificate" label="Certificate">
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
                <Form.Item name="mode" label="Select mode of training">
                  <Select
                    allowClear
                    placeholder="Select"
                    options={[
                      { value: 1, label: "Mandatory" },
                      { value: 2, label: "Optional" },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="date&time" label="Date and Time">
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    className="w-full"
                  />
                </Form.Item>
              </div>
              <div className={formWrapStyle}>
                <Form.Item name="description" label="Training Description">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item name="active" label="Active">
                  <Switch checked />
                </Form.Item>
              </div>

              <div className="flex justify-between mt-3">
                <Link
                  to={appRoutes.training}
                  className="font-medium text-base hover:text-caramel"
                >
                  Cancel
                </Link>
                <div className="flex items-center gap-3">
                  <AppButton
                    label="Save & Add another"
                    type="submit"
                    variant="transparent"
                  />
                  <AppButton label="Add" type="submit" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
