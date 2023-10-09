import { Select } from "antd";
import { TEmployeeMappingSectionInput } from "../../types/bulk-import";

interface IProps {
  Form: any;
  columns: string[];
  formInputs: TEmployeeMappingSectionInput[];
}

const MappingFormGroup = ({ Form, columns, formInputs }: IProps) => {
  return (
    <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
      {formInputs?.map((item) => (
        <Form.Item
          name={item.name}
          label={<span className="capitalize">{item.label}</span>}
          rules={[
            {
              required: !item.optional,
              message: "Field is required!",
            },
          ]}
          key={item.name}
        >
          <Select
            allowClear
            className="text-capitalize"
            options={columns.map((item) => ({
              label: <span className="capitalize">{item}</span>,
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
