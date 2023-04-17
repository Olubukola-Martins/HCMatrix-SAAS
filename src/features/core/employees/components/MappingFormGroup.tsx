import { Select } from "antd";

export type TFormMappingInput = {
  name: string;
  label: string;
  optional?: boolean;
};

interface IProps {
  Form: any;
  columns: string[];
  formInputs: TFormMappingInput[];
}

const MappingFormGroup = ({ Form, columns, formInputs }: IProps) => {
  return (
    <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
      {formInputs?.map((item) => (
        <Form.Item
          name={item.name}
          label={item.label}
          rules={[
            { required: item.optional ?? true, message: "Field is required!" },
          ]}
          key={item.name}
        >
          <Select
            className="text-capitalize"
            options={columns.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder="Select matching column"
          />
        </Form.Item>
      ))}
    </div>
  );
};

export default MappingFormGroup;
