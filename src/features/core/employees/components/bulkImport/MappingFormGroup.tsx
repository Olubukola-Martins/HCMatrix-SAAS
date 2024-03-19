import { Select, Form } from "antd";
import { TEmployeeMappingSectionInput } from "../../types/bulk-import";
import { useState } from "react";

interface IProps {
  Form: typeof Form;
  columns: string[];
  formInputs: TEmployeeMappingSectionInput[];
}

const MappingFormGroup = ({ Form, columns, formInputs }: IProps) => {
  const [searchVals, setSearchVals] = useState<Array<string>>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const handleSearch = (val: string, index: number) => {
    setSearchVals((prevSearchVals) => {
      const updatedSearchVals = [...prevSearchVals];
      updatedSearchVals[index] = val;
      return updatedSearchVals;
    });
    setSelectedId(index);
  };

  return (
    <div className="bg-card px-3 py-4 rounded-md grid grid-cols-1 md:grid-cols-2 gap-x-5">
      {formInputs?.map((item, i) => (
        <Form.Item
          name={item.name}
          label={<span className="capitalize">{item.label}</span>}
          rules={[
            {
              required: !item.optional,
              message: "Field is required!",
            },
          ]}
          key={item.name + i}
        >
          <Select
            onSearch={(val) => handleSearch(val, i)}
            searchValue={searchVals[i]}
            showSearch
            allowClear
            className="text-capitalize"
            options={columns
              .filter((col) =>
                selectedId === i
                  ? col.toLowerCase().includes(searchVals[i]?.toLowerCase())
                  : true
              )
              .map((col) => ({
                label: <span className="capitalize">{col}</span>,
                value: col,
              }))}
            placeholder="Select matching column"
          />
        </Form.Item>
      ))}
    </div>
  );
};

export default MappingFormGroup;
