import { DatePicker, Form, Input, Modal, Skeleton, Switch } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect } from "react";
import { boxStyle } from "styles/reused";
import { IModalProps } from "types";
import { Rule } from "antd/lib/form";
import { FileUpload } from "components/FileUpload";
import { TFileType } from "types/files";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import dayjs, {Dayjs} from "dayjs";

type FormStrInputType = "text" | "text-area";
type FormArrInputType = "date-range-picker";
type FormDateInputType = "date";
type FormNumberInputType = "number";
type FormFileInputType = "file";
type FormBoolInputType = "switch";
type FormEmployeeInputType = "employee-form-input";
type FormItemRender =
  | {
      value?: boolean;
      component: FormBoolInputType;
    }
  | {
      value?: string;
      component: FormStrInputType;
    }
  | {
      value?: string;
      component: FormDateInputType;
    }
  | {
      value?: number;
      component: FormNumberInputType;
    }
  | {
      value?: [string, string];
      component: FormArrInputType;
    }
  | {
      value?: number | number[];
      mode?: "tags" | "multiple";
      component: FormEmployeeInputType;
    }
  // | {
  //     value?: string;
  //     component: FormFileInputType;
  //     allowedFileTypes: TFileType[];
  //     required?: boolean;
  //   }
  | { value?: string[] | string | Dayjs; component: JSX.Element };
interface TFormField {
  label: string;
  name: string;
  render: FormItemRender;
  validationRules?: Rule[];
}

interface IProps extends IModalProps {
  title: string;
  loading?: boolean;
  formFields: TFormField[];
  handleSubmit: (data: any) => void;
  resetForm?: boolean;
}

const EntityFormModal: React.FC<IProps> = ({
  handleClose,
  open,
  title,
  loading,
  formFields,
  handleSubmit,
  resetForm = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    const fieldValues = formFields.reduce((values: any, field) => {
      // For custom jsx elements
      values[field.name] = field.render.value;
      // for types defined
      if (field.render.component === "date") {
        values[field.name] = dayjs(field.render.value);
      }
      if (field.render.component === "date-range-picker") {
        values[field.name] = [
          dayjs(field.render.value ? field.render.value[0] : null),
          dayjs(field.render.value ? field.render.value[1] : null),
        ];
      }
      if (
        field.render.component === "text" ||
        field.render.component === "text-area"
      ) {
        values[field.name] = field.render.value;
      }

      // return values
      return values;
    }, {});
    form.setFieldsValue(fieldValues);
  }, [form]); // formFields is not included so as to prevent the component from being rendered when submit is clicked

  useEffect(() => {
    if (resetForm) {
      form.resetFields();
    }
  }, [form, resetForm]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={title}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        {formFields.map((field, i) => {
          if (field.render.component === "switch") {
            return (
              <Form.Item key={i} label={field.label} name={field.name}>
                <Switch checkedChildren="Yes" unCheckedChildren="No" />
              </Form.Item>
            );
          }
          if (field.render.component === "text-area") {
            return (
              <Form.Item
                key={i}
                label={field.label}
                name={field.name}
                rules={field.validationRules}
              >
                <Input.TextArea />
              </Form.Item>
            );
          }
          if (field.render.component === "text") {
            return (
              <Form.Item
                key={i}
                label={field.label}
                name={field.name}
                rules={field.validationRules}
              >
                <Input />
              </Form.Item>
            );
          }
          if (field.render.component === "date") {
            return (
              <Form.Item
                key={i}
                label={field.label}
                name={field.name}
                rules={field.validationRules}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            );
          }
          if (field.render.component === "date-range-picker") {
            return (
              <Form.Item
                key={i}
                label={field.label}
                name={field.name}
                rules={field.validationRules}
              >
                <DatePicker.RangePicker className="w-full" />
              </Form.Item>
            );
          }
          if (field.render.component === "employee-form-input") {
            return (
              <FormEmployeeInput
                key={i}
                Form={Form}
                control={{ label: field.label, name: field.name }}
                mode={field.render.mode}
              />
            );
          }
          // if (field.render.component === "file") {
          //   return (
          //     <Form.Item
          //       key={i}
          //       label={field.label}
          //       name={field.name}
          //     >
          //       <div className={boxStyle}>
          //         <FileUpload
          //           allowedFileTypes={field.render.allowedFileTypes}
          //           fileKey={i}
          //           textToDisplay="Upload File"
          //           displayType="form-space-between"
          //         />
          //       </div>
          //     </Form.Item>
          //   );
          // }
          return (
            <Form.Item
              key={i}
              label={field.label}
              name={field.name}
              rules={field.validationRules}
            >
              {field.render.component}
            </Form.Item>
          );
        })}
        <Form.Item className="flex justify-end">
          <AppButton label="Save" type="submit" isLoading={loading} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default EntityFormModal;
