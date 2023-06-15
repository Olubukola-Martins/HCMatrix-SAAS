import { Form, Input, Skeleton } from "antd";

import {
  generalValidationRules,
  urlValidationRule,
} from "utils/formHelpers/validation";
import {
  QUERY_KEY_FOR_SINGLE_COMPANY,
  useGetCompany,
} from "../hooks/useGetCompany";
import { useUpdateCompany } from "../hooks/useUpdateCompany";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useEffect, useState } from "react";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import { FormLGAInput } from "components/generalFormInputs/FormLGAInput";
import { FormIndustryInput } from "components/generalFormInputs/FormIndustryInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";

const CompanyInformationForm = () => {
  const queryClient = useQueryClient();

  const { data: company, isFetching: isFetchingCompany } = useGetCompany();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateCompany();
  const [countryId, setCountryId] = useState<number>();
  const [stateId, setStateId] = useState<number>();
  const logoUrl = useCurrentFileUploadUrl("logoUrl");

  const handleSubmit = (data: any) => {
    // as per patch
    mutate(
      {
        name: company?.name === data.name ? undefined : data.name,
        phoneNumber:
          company?.phoneNumber === data.phoneNumber
            ? undefined
            : data.phoneNumber,
        industryId:
          company?.industryId === data.industryId ? undefined : data.industryId,
        color: company?.color === data.color ? undefined : data.color,
        address: {
          streetAddress: data.streetAddress,
          countryId,
          stateId,
          lgaId: data.lgaId,
          timezone: "Africa/Lagos", //TO DO: Make this changeable
        },

        logoUrl: company?.logoUrl === logoUrl ? undefined : logoUrl,
        website: company?.website === data.website ? undefined : data.website,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_COMPANY],
            // exact: true,
          });
        },
      }
    );
  };
  useEffect(() => {
    if (company) {
      form.setFieldsValue({
        name: company.name,
        phoneNumber: company.phoneNumber,
        industryId: company.industryId,
        color: company.color,
        logoUrl: company.logoUrl,
        website: company.website,
        streetAddress: company.address?.streetAddress,
        countryId: company.address?.countryId,
        stateId: company.address?.stateId,
        lgaId: company.address?.lgaId,
        timezone: company.address?.timezone,
      });
      setCountryId(company.address?.countryId);
      setStateId(company.address?.stateId);
    }
  }, [form, company]);

  return (
    <Skeleton active loading={isFetchingCompany} paragraph={{ rows: 8 }}>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        form={form}
        onFinish={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Form.Item
              label="Company Name"
              rules={generalValidationRules}
              name="name"
            >
              <Input placeholder="Enter Company name" />
            </Form.Item>
            <Form.Item
              label="Website (optional)"
              name="website"
              rules={[{ required: false }, urlValidationRule]}
            >
              <Input placeholder="Enter Company website" />
            </Form.Item>
            <FormIndustryInput
              Form={Form}
              control={{ name: "industryId", label: "Industry" }}
            />
            <Form.Item
              label="Contact Phone"
              rules={generalValidationRules}
              name="phoneNumber"
            >
              <Input placeholder="contact phone" />
            </Form.Item>

            <Form.Item
              label="Street Address"
              rules={generalValidationRules}
              name="streetAddress"
            >
              <Input placeholder="Enter Address Details" />
            </Form.Item>
            <FormCountryInput
              Form={Form}
              control={{ label: "Country", name: "countryId" }}
              handleSelect={(id) => setCountryId(id)}
            />
            <FormStateInput
              Form={Form}
              countryId={countryId ?? 0}
              control={{ name: "stateId", label: "State" }}
              handleSelect={(id) => setStateId(id)}
            />
            <FormLGAInput
              Form={Form}
              stateId={stateId ?? 0}
              control={{ name: "lgaId", label: "Local Government" }}
            />
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <AppButton label="Save" isLoading={isLoading} type="submit" />
            </Form.Item>
          </div>
        </div>
      </Form>
    </Skeleton>
  );
};

export default CompanyInformationForm;
