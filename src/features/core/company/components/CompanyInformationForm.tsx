import { Form, Input, Select } from "antd";
import { useFetchCountries } from "hooks/useFetchCountries";
import { useFetchIndustries } from "hooks/useFetchIndutries";
import React, { useContext } from "react";
import { useAuthUser } from "react-auth-kit";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import { generalValidationRules } from "utils/formHelpers/validation";

const CompanyInformationForm = () => {
  const auth = useAuthUser();

  const authDetails = auth();

  const companies = authDetails?.companies;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const currentCompanyId = globalState.currentCompany?.id;
  const currentCompany = companies.find(
    (item: any) => (item.id = currentCompanyId)
  );
  const { data: industries, isSuccess: isISuccess } = useFetchIndustries();
  const { data: countries, isSuccess: isCSuccess } = useFetchCountries();
  return (
    <div>
      <Form
        requiredMark={false}
        labelCol={{ span: 24 }}
        initialValues={{
          companyName: currentCompany?.name,
          industryId: currentCompany?.industryId,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Form.Item
              label="Company Name"
              rules={generalValidationRules}
              name="companyName"
            >
              <Input placeholder="Enter Company name" disabled />
            </Form.Item>
            <Form.Item label="Website (optional)" name="website">
              <Input placeholder="Enter Company website" />
            </Form.Item>
            <Form.Item
              label="Industry"
              rules={generalValidationRules}
              name="industryId"
            >
              <Select
                disabled
                placeholder="Enter industry"
                options={
                  isISuccess
                    ? industries.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              />
            </Form.Item>
            <Form.Item
              label="Contact Phone"
              rules={generalValidationRules}
              name="contactPhone"
            >
              <Input placeholder="contact phone" />
            </Form.Item>
            <Form.Item
              label="Contact Email"
              rules={generalValidationRules}
              name="contactEmail"
            >
              <Input placeholder="contact Email" />
            </Form.Item>
            <Form.Item
              label="Company Address"
              rules={generalValidationRules}
              name="companyAddress"
            >
              <Input placeholder="Enter Address Details" />
            </Form.Item>
            <Form.Item label="City" rules={generalValidationRules} name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              label="State/Province"
              rules={generalValidationRules}
              name="state"
            >
              <Input placeholder="Enter city" />
            </Form.Item>
            <Form.Item
              label="Country"
              rules={generalValidationRules}
              name="country"
            >
              <Select
                placeholder="Select Country"
                options={
                  isCSuccess
                    ? countries.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))
                    : []
                }
              />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <button className="button" type="submit">
                Save
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CompanyInformationForm;
