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
import { useEffect } from "react";

import { FormIndustryInput } from "components/generalFormInputs/FormIndustryInput";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { QUERY_KEY_FOR_AUTHENTICATED_USER } from "features/authentication/hooks/useGetAuthUser";

const CompanyInformationForm = () => {
  const queryClient = useQueryClient();

  const { data: company, isFetching: isFetchingCompany } = useGetCompany();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateCompany();

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
          ...data.address,
        },

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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_COMPANY],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_AUTHENTICATED_USER],
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
        address: {
          streetAddress: company.address?.streetAddress,
          countryId: company.address?.countryId,
          stateId: company.address?.stateId,
          lgaId: company.address?.lgaId ?? undefined, //Done to prevent sending null, instead send undefined
          timezone: company.address?.timezone,
        },
      });
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <FormAddressInput
              Form={Form}
              form={form}
              className="md:col-span-3"
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
