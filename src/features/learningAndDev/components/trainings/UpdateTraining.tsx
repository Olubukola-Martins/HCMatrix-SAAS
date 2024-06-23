import React, { useState } from "react";
import { DatePicker, Form, Input, InputNumber, Select, Switch } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Link } from "react-router-dom";
import { AppButton } from "components/button/AppButton";
import { appRoutes } from "config/router/paths";
import {
  validateUrl,
  textInputValidationRules,
} from "utils/formHelpers/validation";
const { RangePicker } = DatePicker;

export const UpdateTraining = () => {
  const formWrapStyle =
    "bg-card px-4 pt-4 rounded grid grid-cols-1 md:grid-cols-2 gap-x-10 mb-5 shadow-sm";
  const [trainingLocation, setTrainingLocation] = useState<number>(1);
  return (
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
                trainingLocation === 1 ? validateUrl : textInputValidationRules
              }
              name="trainingLocation"
              label={
                trainingLocation === 1 ? "Training URL" : "Training location"
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

            <AppButton label="Update" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
};
