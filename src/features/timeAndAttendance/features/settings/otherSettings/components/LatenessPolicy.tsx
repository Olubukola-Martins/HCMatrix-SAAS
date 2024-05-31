import { Form, Select, Switch } from "antd";
import { formWrapStyle } from "../style";
import { FormGroupInput } from "features/core/groups/components/FormGroupInput";
import { AppButton } from "components/button/AppButton";

export const LatenessPolicy = () => {
  const [form] = Form.useForm();

  const onSubmit = (val: any) => {
    console.log(val);
  };

  return (
    <>
      <div className="bg-mainBg py-4 px-4 rounded">
        <h3 className="font-medium text-base pb-3 pt-1">Lateness settings</h3>

        <Form
          layout="vertical"
          onFinish={onSubmit}
          initialValues={{ isSoftClockInEnabled: true }}
          form={form}
          requiredMark={false}
        >
          <div className={formWrapStyle}>
            <Form.Item
              name="period"
              label="Specify grace period after resumption time"
            >
              <Select
                options={[
                  {
                    value: 10,
                    label: "10 Minutes",
                  },
                  {
                    value: 20,
                    label: "20 Minutes",
                  },
                  {
                    value: 30,
                    label: "30 Minutes",
                  },
                ]}
                placeholder="Select"
                allowClear
              />
            </Form.Item>
          </div>
          <div className={`${formWrapStyle} flex justify-between items-center`}>
            <h3>
              Notify employees and their managers when an instance of lateness
              is recorded
            </h3>
            <Form.Item
              name="latenessRecord"
              className="flex justify-end items-end"
              valuePropName="checked"
              initialValue={false}
            >
              <Switch />
            </Form.Item>
          </div>
          <div className={formWrapStyle}>
            <h3>Email lateness report</h3>
            <Form.Item
              name="emailLatenessReport"
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
                label: "Select who should receive lateness report ",
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
