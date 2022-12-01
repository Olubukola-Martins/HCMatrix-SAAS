import { Form, Input, Modal, Select } from "antd";
import { useQuery } from "react-query";
import { getIndustries } from "../../../ApiRequesHelpers/Utility/industry";
import { IModalProps } from "../../../AppTypes/Component";
import { TIndustry } from "../../../AppTypes/DataEntitities";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../FormHelpers/validation";
import { phoneCodeList } from "../../../Helpers/phoneCodeList";
import { openNotification } from "../../../NotificationHelpers";
export const AddCompanyForm = ({ open, handleClose }: IModalProps) => {
  const {
    data: industries,
    isSuccess: isISuccess,
  } = useQuery("industries", () => getIndustries(), {
    ...{
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
    onError: (err: any) => {
      openNotification({
        state: "error",
        title: "Error Occurred",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },
    select: (res: any) => {
      const result = res.data.data;
      const data: TIndustry[] = result.map(
        (item: any): TIndustry => ({
          id: item.id,
          name: item.name,
        })
      );

      return data;
    },
  });

  const handleSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Modal
      title="Add Sister Company"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
        size="middle"
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Enter Company Name" />
        </Form.Item>
        <Form.Item
          label="Organization"
          name="organization"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Enter Organization" />
        </Form.Item>
        <Form.Item
          name="industry"
          label="Industry"
          rules={generalValidationRules}
          hasFeedback
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="authSelectTag"
            style={{ width: "100%" }}
            placeholder="Select Industry"
          >
            {isISuccess &&
              industries.map(({ id, name }) => (
                <Select.Option
                  key={id}
                  value={name}
                  className="py-2"
                  label={name}
                >
                  {name}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Business Email" />
        </Form.Item>

        <Form.Item name="phone" hasFeedback label="Business Phone">
          <Input.Group compact>
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={["phone", "code"]}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                disabled={false}
                className="rounded border-slate-400 authSelectTag"
                style={{ width: "25%" }}
                placeholder="+234"
              >
                {phoneCodeList.map(({ code }) => (
                  <Select.Option key={code} value={code} label={code}>
                    {code}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              rules={textInputValidationRules}
              name={["phone", "number"]}
            >
              <Input
                style={{ width: "75%" }}
                placeholder="Business Phone"
                autoComplete="phone"
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <div className="flex justify-between items-center">
          <button className="transparentButton">Save And add another</button>
          <button className="button">Add Company</button>
        </div>
      </Form>
    </Modal>
  );
};
