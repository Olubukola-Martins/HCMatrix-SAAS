import { Input, Form } from "antd";
import { textInputValidationRulesOpt } from "utils/formHelpers/validation";
import { ICriteriaField } from "../../types";

export const RatingFormList: React.FC<{
    fields: ICriteriaField[];
    add: () => void;
    remove: (name: number) => void;
    placeholderPrefix: string;
  }> = ({ fields, add, remove, placeholderPrefix }) => (
    <>
      {fields.map((field, index) => (
        <Form.Item
          key={field.key}
          label={index === 0 ? "Criteria" : ""}
          name={[field.name]}
          rules={textInputValidationRulesOpt}
        >
          <div className="flex items-center gap-2">
            <Input placeholder={`${placeholderPrefix} ${index + 1}`} />
            {fields.length > 1 && (
              <button type="button" onClick={() => remove(field.name)}>
                <i className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"></i>
              </button>
            )}
          </div>
        </Form.Item>
      ))}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => add()}>
          <i className="ri-add-circle-line text-xl cursor-pointer hover:text-caramel"></i>
        </button>
      </div>
    </>
  );

