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

import "@geoapify/geocoder-autocomplete/styles/minimal.css";

import { SelectAddressGeoDetails } from "components/selectEntity/SelectAddressGeoDetails";

export const FormAddressInput: React.FC<{
  Form: typeof Form;
  form: FormInstance;
  control?: { label: string; name: string };
  className?: string;
  disabled?: boolean;
}> = ({
  Form,
  form,
  control,
  className = "md:col-span-2 lg:col-span-3",
  disabled,
}) => {
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
  const [search, setSearch] = useState({
    country: "",
    state: "",
    lga: "",
    timezone: "",
  });

  return (
    <>
      <Form.Item name={name} label={label} className={className}>
        <Input.Group className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Form.Item
              noStyle
              rules={generalValidationRules}
              name={[name, "streetAddress"]}
            >
              {disabled ? (
                <Input.TextArea placeholder="Street Address" />
              ) : (
                <SelectAddressGeoDetails
                  handleClear={() => {
                    form.setFieldValue([name, "streetAddress"], undefined);
                    form.setFieldValue([name, "longitude"], undefined);
                    form.setFieldValue([name, "latitude"], undefined);
                  }}
                  handleSelect={(_, detail) => {
                    form.setFieldValue(
                      [name, "streetAddress"],
                      detail?.formatted_address
                    );
                    form.setFieldValue(
                      [name, "longitude"],
                      `${detail?.geometry.location.lng}`
                    );
                    form.setFieldValue(
                      [name, "latitude"],
                      `${detail?.geometry.location.lat}`
                    );
                  }}
                />
              )}
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
              options={countries
                ?.filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .indexOf(search.country.toLowerCase()) !== -1
                )
                .map((c) => ({ label: c.name, value: c.id }))}
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
                form.setFieldValue([name, "stateId"], undefined);
                form.setFieldValue([name, "lgaId"], undefined);
              }}
            />
          </Form.Item>
          <Form.Item noStyle name={[name, "stateId"]}>
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              loading={isFetchingStates}
              options={states
                ?.filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .indexOf(search.state.toLowerCase()) !== -1
                )
                .map((c) => ({ label: c.name, value: c.id }))}
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
          <Form.Item noStyle name={[name, "lgaId"]}>
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              loading={isFetchingLgas}
              options={lgas
                ?.filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .indexOf(search.lga.toLowerCase()) !== -1
                )
                .map((c) => ({ label: c.name, value: c.id }))}
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
          <Form.Item
            noStyle
            name={[name, "timezone"]}
            rules={generalValidationRules}
          >
            <Select
              getPopupContainer={(triggerNode) => triggerNode.parentElement}
              options={TIME_ZONES?.filter(
                (item) =>
                  item.label
                    .toLowerCase()
                    .indexOf(search??.timezone.toLowerCase()) !== -1
              ).map((c) => ({ label: c.label, value: c.value }))}
              defaultActiveFirstOption={false}
              showSearch
              allowClear
              onClear={() => {
                setSearch((prev) => ({ ...prev, timezone: "" }));
              }}
              filterOption={false}
              searchValue={search??.timezone}
              onSearch={(value) => {
                setSearch((prev) => ({ ...prev, timezone: value }));
              }}
              placeholder="Select Timezone"
            />
          </Form.Item>
          <Form.Item noStyle name={[name, "longitude"]}>
            <Input disabled placeholder="Longitude" />
          </Form.Item>
          <Form.Item noStyle name={[name, "latitude"]}>
            <Input disabled placeholder="Latitude" />
          </Form.Item>
        </Input.Group>
      </Form.Item>
    </>
  );
};
