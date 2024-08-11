import { Select, Form, Input, InputNumber } from "antd";
import { FormInstance } from "antd/es/form";
import { TIME_ZONES } from "constants/timeZones";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useFetchLgas } from "hooks/useFetchLGAs";
import { useFetchStates } from "hooks/useFetchStates";
import { useState } from "react";
import { generalValidationRules } from "utils/formHelpers/validation";

import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import { SelectAddressGeoDetails } from "components/selectEntity/SelectAddressGeoDetails";

export const FormAddressInput: React.FC<{
  Form: typeof Form;
  form: FormInstance;
  control?: { label: string; name: string };
  className?: string;
  disabled?: boolean;
}> = ({ Form, form, control, className, disabled }) => {
  const [countryId, setCountryId] = useState<number>();
  const [stateId, setStateId] = useState<number>();
  const { data: countries, isFetching: isFetchingCountries } = useFetchCountries();
  const { data: states, isFetching: isFetchingStates } = useFetchStates({
    countryId,
  });
  const { data: lgas, isFetching: isFetchingLgas } = useFetchLgas({ stateId });
  // TODO: Refactor all forms that submit address to use this component
  const name = control?.name ?? "address";
  const label = control?.label ?? "Address";
  const [search, setSearch] = useState({
    country: "",
    state: "",
    lga: "",
    timezone: "",
  });

  return (
    <>
      <Form.Item className={`${className} text-sm `} name={"countryId"} label="Country" rules={generalValidationRules}>
        {/* TODO: Implement search */}
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          loading={isFetchingCountries}
          options={countries?.filter((item) => item.name.toLowerCase().indexOf(search.country.toLowerCase()) !== -1).map((c) => ({ label: c.name, value: c.id }))}
          defaultActiveFirstOption={false}
          showSearch
          allowClear
          onClear={() => {
            setSearch((prev) => ({ ...prev, country: "" }));
          }}
          filterOption={false}
          searchValue={search.country}
          onSearch={(value) => {
            setSearch((prev) => ({ ...prev, country: value }));
          }}
          placeholder="Select Country"
          onSelect={(e: number) => {
            setCountryId(e);
            form.setFieldValue("stateId", undefined);
            form.setFieldValue("lgaId", undefined);

            // form.setFieldValue([name, "stateId"], undefined);
            // form.setFieldValue([name, "lgaId"], undefined);
          }}
        />
      </Form.Item>

      <Form.Item className={`${className} text-sm `} rules={generalValidationRules} label="Street Address" name={"streetAddress"}>
        {disabled ? (
          <Input.TextArea placeholder="Street Address" />
        ) : (
          <SelectAddressGeoDetails
            handleClear={() => {
              form.setFieldValue("streetAddress", undefined);
            }}
            handleSelect={(_, detail) => {
              form.setFieldValue("streetAddress", detail?.formatted_address);
            }}
          />
        )}

        {/* {disabled ? (
          <Input.TextArea placeholder="Street Address" />
        ) : (
          <SelectAddressGeoDetails
            handleClear={() => {
              form.setFieldValue([name, "streetAddress"], undefined);
              form.setFieldValue([name, "longitude"], undefined);
              form.setFieldValue([name, "latitude"], undefined);
            }}
            handleSelect={(_, detail) => {
              form.setFieldValue([name, "streetAddress"], detail?.formatted_address);
              form.setFieldValue([name, "longitude"], `${detail?.geometry.location.lng}`);
              form.setFieldValue([name, "latitude"], `${detail?.geometry.location.lat}`);
            }}
          />
        )} */}
      </Form.Item>

      <Form.Item className={`${className} text-sm `} label="State" name={"stateId"}>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          loading={isFetchingStates}
          options={states?.filter((item) => item.name.toLowerCase().indexOf(search.state.toLowerCase()) !== -1).map((c) => ({ label: c.name, value: c.id }))}
          defaultActiveFirstOption={false}
          showSearch
          allowClear
          onClear={() => {
            setSearch((prev) => ({ ...prev, state: "" }));
          }}
          filterOption={false}
          searchValue={search.state}
          onSearch={(value) => {
            setSearch((prev) => ({ ...prev, state: value }));
          }}
          placeholder="Select State"
          onSelect={(e: number) => {
            setStateId(e);
            form.setFieldValue([name, "lgaId"], undefined);
          }}
        />
      </Form.Item>

      <Form.Item className={`${className} text-sm `} label="City" name={"lgaId"}>
        <Select
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          loading={isFetchingLgas}
          options={lgas?.filter((item) => item.name.toLowerCase().indexOf(search.lga.toLowerCase()) !== -1).map((c) => ({ label: c.name, value: c.id }))}
          defaultActiveFirstOption={false}
          showSearch
          allowClear
          onClear={() => {
            setSearch((prev) => ({ ...prev, lga: "" }));
          }}
          filterOption={false}
          searchValue={search.lga}
          onSearch={(value) => {
            setSearch((prev) => ({ ...prev, lga: value }));
          }}
          placeholder="Select LGA"
        />
      </Form.Item>

      <Form.Item className={`${className} text-sm `} label="Zip Code" name={"zipCode"}>
        <InputNumber placeholder="******" className="w-full"/>
      </Form.Item>
    </>
  );
};
