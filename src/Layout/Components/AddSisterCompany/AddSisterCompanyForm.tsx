import { Form, Input, Modal, Select } from "antd";
import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { getIndustries } from "../../../ApiRequesHelpers/Utility/industry";
import {
  createSisterCompany,
  ICreateSisterCompProps,
} from "../../../ApiRequesHelpers/Utility/sisterCompany";
import { IModalProps } from "../../../AppTypes/Component";
import { TIndustry } from "../../../AppTypes/DataEntitities";
import { GlobalContext } from "../../../Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../FormHelpers/validation";
import { phoneCodeList } from "../../../Helpers/phoneCodeList";
import { openNotification } from "../../../NotificationHelpers";
export const AddSisterCompanyForm = ({ open, handleClose }: IModalProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const parentCompanyName = globalState.currentCompany?.name;
  const companyId = globalState.currentCompany?.id;
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(createSisterCompany);

  const { data: industries, isSuccess: isISuccess } = useQuery(
    "industries",
    () => getIndustries(),
    {
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
    }
  );

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateSisterCompProps = {
        companyId,
        name: data.name,
        email: data.email,
        phoneNumber: `${data.phone.code}-${data.phone.number}`,
        industryId: data.industry,
      };

      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },

        onSuccess: (res) => {
          const result = res.data.data;
          openNotification({
            state: "success",
            title: "Success",
            description: "Sister company created successfully",
            duration: 0.4,
          });
          form.resetFields();
          handleClose(false);
        },
      });
    }
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
        form={form}
      >
        <Form.Item name="fullName" label="Parent Company">
          <Input disabled defaultValue={parentCompanyName} />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="name"
          rules={textInputValidationRules}
          hasFeedback
        >
          <Input placeholder="Enter Company Name" />
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
                  value={id}
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
          <button className="button">
            {isLoading ? <BeatLoader color="#fff" /> : "Add Company"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};
