import { Select, Form, Input } from "antd";
import { FormInstance } from "antd/es/form";
import { TIME_ZONES } from "constants/timeZones";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { useFetchStates } from "hooks/useFetchStates";
import { useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

export const FormAddressInput: React.FC<{
  Form: typeof Form;
  form: FormInstance;
  control?: { label: string; name: string };
  className?: string;
}> = ({ Form, form, control, className = "md:col-span-2 lg:col-span-3" }) => {
  const [countryId, setCountryId] = useState<number>();
  const [stateId, setStateId] = useState<number>();
  const { data: countries, isFetching: isFetchingCountries } =
    useFetchCountries();
  const { data: states, isFetching: isFetchingStates } = useFetchStates({
    countryId,
  });
  const { data: lgas, isFetching: isFetchingLgas } = useFetchLgas({ stateId });
  // TODO: Refactor all forms that submit address to use this component
  const name = control?.name ?? "address";
  const label = control?.label ?? "Address";
  return (
    <>
      <Form.Item name={name} label={label} className={className}>
        <Input.Group className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Form.Item
              noStyle
              rules={textInputValidationRules}
              name={[name, "streetAddress"]}
            >
              <Input.TextArea placeholder="Street Address" />
            </Form.Item>
          </div>
          <Form.Item
            noStyle
            name={[name, "countryId"]}
            rules={generalValidationRules}
          >
            {/* TODO: Implement search */}
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              loading={isFetchingCountries}
              options={countries?.map((c) => ({ label: c.name, value: c.id }))}
              placeholder="Select Country"
              onSelect={(e: number) => {
                setCountryId(e);
                form.setFieldValue([name, "stateId"], undefined);
                form.setFieldValue([name, "lgaId"], undefined);
              }}
            />
          </Form.Item>
          <Form.Item noStyle name={[name, "stateId"]}>
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              loading={isFetchingStates}
              options={states?.map((s) => ({ label: s.name, value: s.id }))}
              placeholder="Select State"
              onSelect={(e: number) => {
                setStateId(e);
                form.setFieldValue([name, "lgaId"], undefined);
              }}
            />
          </Form.Item>
          <Form.Item noStyle name={[name, "lgaId"]}>
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              loading={isFetchingLgas}
              options={lgas?.map((l) => ({ label: l.name, value: l.id }))}
              placeholder="Select LGA"
            />
          </Form.Item>
          <Form.Item
            noStyle
            name={[name, "timezone"]}
            rules={generalValidationRules}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              options={TIME_ZONES}
              placeholder="Select Timezone"
            />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </>
  );
};
