import { Form, Select, Switch } from "antd";
import { formWrapStyle } from "../style";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { AppButton } from "components/button/AppButton";

export const AbsenteeismPolicy = () => {
  const [form] = Form.useForm();

  const onSubmit = (val: any) => {
    console.log(val);
  };
  return (
    <>
      <div className="bg-mainBg py-4 px-4 rounded">
        <h3 className="font-medium text-base pb-3 pt-1">Absenteeism Policy</h3>

        <Form
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ isSoftClockInEnabled: true }}
          form={form}
          requiredMark={false}
        >
          <div className={`${formWrapStyle} flex justify-between items-center`}>
            <h3>
              Mark an employee as absent if they fail to clock in for the day
            </h3>
            <Form.Item
              name="failToClockIn"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className={`${formWrapStyle} flex justify-between items-center`}>
            <h3>
              Notify employees and their managers when an instance of absence is
              recorded
            </h3>
            <Form.Item
              name="notifyEmployee"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className={formWrapStyle}>
            <h3>Email absenteeism report.</h3>
            <Form.Item
              name="emailAbsenteeismReport"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>

          <div className={formWrapStyle}>
            <Form.Item name="" label="Select Frequency">
              <Select
                options={[
                  {
                    value: "daily",
                    label: "Daily",
                  },
                  {
                    value: "weekly",
                    label: "Weekly",
                  },
                  {
                    value: "monthly",
                    label: "Monthly",
                  },
                ]}
                placeholder="Select"
                allowClear
              />
            </Form.Item>
            <FormGroupInput
              Form={Form}
              control={{
                label: "Select who should receive absenteeism report ",
                name: "",
              }}
            />
          </div>
          <div className="flex justify-end my-2">
            <AppButton label="Save" type="submit" />
          </div>
        </Form>
      </div>
    </>
  );
};
