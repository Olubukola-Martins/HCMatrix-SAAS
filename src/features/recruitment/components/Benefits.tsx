import React, { useEffect, useRef, useState } from "react";
import { Form, Switch, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import "../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { appRoutes } from "config/router/paths";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";

export const Benefits = () => {
  interface result {
    companyId: number;
    createdAt: string;
    id: number;
    isActive: boolean;
    isDefault: boolean;
    label: string;
    name: string;
    updatedAt: string;
  }

  const [form] = Form.useForm();
  const formItemRef = useRef(null);
  const [IsActive, setIsActive] = useState<boolean>(true);
  const [benefitsData, setBenefitsData] = useState<result[]>();

  const { companyId, token } = useApiAuth();
  const endpointUrl = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/employment-benefits`;

  //  GET request
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(endpointUrl, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-company-id": companyId,
          },
        })
        .then((response) => {
          console.log("Response data data:", response.data.data.result);
          const results = response.data.data.result;
          setBenefitsData(results);
        })
        .catch((error) => {
          console.log("Error message:", error);
        });
    }

    fetchData();
  }, []);

  // PATCH request
  const handleSwitchChange = async (checked: boolean, itemId: number) => {

    if (!checked) {
      await axios
        .patch(
          `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/employment-benefits/${itemId}/activate`,
          null,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-company-id": companyId,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response);
        })
        .catch((error) => {
          console.log("Error message:", error);
        });
    } else if (checked) {
      await axios
        .patch(
          `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/employment-benefits/${itemId}/deactivate`,
          null,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-company-id": companyId,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response);
        })
        .catch((error) => {
          console.log("Error message:", error);
        });
    }
  };

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
  };

  const handleAddField = () => {
    const newBenefit = form.getFieldValue("newBenefit") || [];
    const initialBenefits = { benefitName: "", allowBenefit: true };
    form.setFieldsValue({ newBenefit: [...newBenefit, initialBenefits] });
  };

  const handleRemoveField = (index: number) => {
    const newBenefit = form.getFieldValue("newBenefit") || [];
    form.setFieldsValue({
      newBenefit: newBenefit.filter((_: any, i: number) => i !== index),
    });
  };
  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base">Benefits</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="benefitsSettings"
          >
            {benefitsData?.map((result) => (
              <div className="recruitmentSettingsForm" key={result.id}>
                <h3 className="font-medium">{result.name}</h3>
                <Form.Item
                  name={result.name}
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch
                    checked={result.isActive}
                    onChange={(checked) =>
                      handleSwitchChange(checked, result.id)
                    }
                  />
                </Form.Item>
              </div>
            ))}
            {/* <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Dental Insurance</h3>
              <Form.Item
                name="Dental Insurance"
                className="flex justify-end items-end"
                noStyle
                // ref={formItemRef}
              >
                <Switch
                  checked={IsActive}
                  // onChange={ }
                />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Flexibility Schedule</h3>
              <Form.Item
                name="Flexibility Schedule"
                className="flex justify-end items-end"
                noStyle
                // ref={formItemRef}
              >
                <Switch
                  checked={IsActive}
                  // onChange={ }
                />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Health Insurance</h3>
              <Form.Item
                name="Health Insurance"
                className="flex justify-end items-end"
                noStyle
                // ref={formItemRef}
              >
                <Switch
                  checked={IsActive}
                  // onChange={ }
                />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Pay Off Time</h3>
              <Form.Item
                name="Pay Off Time"
                className="flex justify-end items-end"
                noStyle
                // ref={formItemRef}
              >
                <Switch
                  checked={IsActive}
                  // onChange={ }
                />
              </Form.Item>
            </div>

            <div className="recruitmentSettingsForm ">
              <h3 className="font-medium">Vision Insurance</h3>
              <Form.Item
                name="Vision Insurance"
                className="flex justify-end items-end"
                noStyle
                // ref={formItemRef}
              >
                <Switch
                  checked={IsActive}
                  // onChange={ }
                />
              </Form.Item>
            </div>
 */}
            <div>
              <h2 className="pb-5 font-medium text-base">Benefit name</h2>
              <Form.List name="newBenefit">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="grid grid-cols-2 ">
                        <Form.Item
                          {...field}
                          name={[field.name, "benefitName"]}
                          label="Name"
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Enter benefit name" />
                        </Form.Item>
                        <div className="flex gap-5 items-center justify-end">
                          <Form.Item
                            {...field}
                            name={[field.name, "allowBenefit"]}
                            noStyle
                            valuePropName="checked"
                          >
                            <Switch
                              checked={IsActive}
                              // onChange={ }
                            />
                          </Form.Item>
                          <i
                            className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                            onClick={() => handleRemoveField(index)}
                          ></i>
                        </div>
                      </div>
                    ))}

                    <AppButton
                      variant="transparent"
                      label="+ Add Benefit"
                      handleClick={() => handleAddField()}
                    />
                  </>
                )}
              </Form.List>
            </div>
            <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
              <button
                className="text-base font-medium hover:text-caramel"
                type="reset"
              >
                Cancel
              </button>
              <AppButton type="submit" label="Add" />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
