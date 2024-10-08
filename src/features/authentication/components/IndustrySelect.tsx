import { useState, useEffect } from "react";
import { Select, Form } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { TIndustry } from "types/industry";

interface IndustrySelectProps {
  industries?: TIndustry[];
  isISuccess: boolean;
}

export const IndustrySelect: React.FC<IndustrySelectProps> = ({
  industries,
  isISuccess,
}) => {
  const [filteredIndustries, setFilteredIndustries] = useState(industries);

  // Debounced search handler
  const handleSearchDebounced = debounce((searchValue) => {
    if (searchValue) {
      const filtered = industries?.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredIndustries(filtered);
    } else {
      setFilteredIndustries(industries);
    }
  }, 300); // Debounce by 300ms

  useEffect(() => {
    setFilteredIndustries(industries);
  }, [industries]);

  return (
    <Form.Item
      name="industry"
      rules={[{ required: true, message: "Please select an industry" }]}
    >
      <Select
        showSearch
        allowClear
        optionLabelProp="label"
        className="authSelectTag"
        placeholder={
          <div className="flex justify-start items-center">
            <BankOutlined className="site-form-item-icon pr-1 text-black" />
            &nbsp; Industry
          </div>
        }
        style={{ width: "100%" }}
        filterOption={false}
        onSearch={handleSearchDebounced}
      >
        {isISuccess &&
          filteredIndustries?.map(({ name, id }) => (
            <Select.Option
              key={id}
              value={id}
              className="py-2"
              label={
                <div className="flex justify-start items-center">
                  <BankOutlined className="site-form-item-icon pr-1 text-black" />
                  &nbsp;
                  {name}
                </div>
              }
            >
              {name}
            </Select.Option>
          ))}
      </Select>
    </Form.Item>
  );
};
