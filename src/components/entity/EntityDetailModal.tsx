import { DatePicker, Form, Input, Modal, Skeleton, Switch } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { boxStyle } from "styles/reused";
import { IModalProps } from "types";

type FormStrInputType = "text";
type FormArrInputType = "date-range-picker";
type FormUrlInputType = "url";
type FormBoolInputType = "switch";
type FormItemRender =
  | {
      value: boolean;
      component: FormBoolInputType;
    }
  | {
      value: string;
      component: FormStrInputType;
    }
  | {
      value: [string, string];
      component: FormArrInputType;
    }
  | { value: { url: string; name: string }[]; component: FormUrlInputType }
  | { value: string[]; component: JSX.Element };
interface TFormField {
  label: string;
  name: string;
  render: FormItemRender;
}

interface IProps extends IModalProps {
  title: string;
  loading?: boolean;
  formFields: TFormField[];
}

export const EntityDetailModal: React.FC<IProps> = ({
  handleClose,
  open,
  title,
  loading,
  formFields,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    const fieldValues = formFields.reduce((values: any, field) => {
      if (field.render.component === "date-range-picker") {
        values[field.name] = [
          moment(field.render.value[0]),
          moment(field.render.value[1]),
        ];
      }
      if (field.render.component === "text") {
        values[field.name] = field.render.value;
      }
      return values;
    }, {});
    form.setFieldsValue(fieldValues);
  }, [form, formFields]);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <Skeleton loading={loading} active paragraph={{ rows: 16 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
          {formFields.map((field) => {
            if (field.render.component === "switch") {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                >
                  <Switch
                    defaultChecked={field.render.value}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                  />
                </Form.Item>
              );
            }
            if (field.render.component === "text") {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                >
                  <Input value={field.render.value} />
                </Form.Item>
              );
            }
            if (field.render.component === "date-range-picker") {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                >
                  <DatePicker.RangePicker className="w-full" />
                </Form.Item>
              );
            }
            if (
              field.render.component === "url" &&
              field.render.value.length > 0
            ) {
              return (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                >
                  <div className={boxStyle}>
                    {field.render.value.map((item, i) => (
                      <a
                        key={i}
                        href={item.url}
                        className="mb-2 block text-sm underline text-caramel hover:no-underline"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </Form.Item>
              );
            }
            return (
              <Form.Item key={field.name} label={field.label} name={field.name}>
                {field.render.component}
              </Form.Item>
            );
          })}
        </Form>
      </Skeleton>
    </Modal>
  );
};
