/* eslint-disable no-loop-func */
import React, { useEffect, useRef, useState } from "react";
import { Form, Switch, Input, Skeleton, Popconfirm } from "antd";
import { AppButton } from "components/button/AppButton";
import "../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

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
  const [IsActive, setIsActive] = useState<boolean>(true);
  const [benefitsData, setBenefitsData] = useState<result[]>([]);
  const [loading, setLoading] = useState(true);
  const [addBenefitLoading, setAddBenefitLoading] = useState<boolean>(false);
  const formRef = useRef<FormInstance | null>(null);

  const [error, setError] = useState(null);

  const { companyId, token } = useApiAuth();
  const endpointUrl = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/employment-benefits`;

  //  GET request: Load all benefits
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
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error message:", error);
          setLoading(false);
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
          setError(error);
        });
    }
    fetchData();
  }, []);

  // PATCH request:Activating and de-activating the benefit
  const handleSwitchChange = async (checked: boolean, itemId: number) => {
    checked &&
      (await axios
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
          const currentItem = benefitsData.filter((item) => item.id === itemId);

          openNotification({
            state: "success",
            title: "Success",
            duration: 5,
            description: (
              <p>{currentItem[0].name} has been successfully activated !</p>
            ),
          });
        })
        .catch((error) => {
          console.log("Error message:", error);
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        }));

    !checked &&
      (await axios
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
          const currentItem = benefitsData.filter((item) => item.id === itemId);

          response.status === 200 &&
            openNotification({
              state: "success",
              title: "Success",
              duration: 3,
              description: (
                <p>
                  {currentItem[0].name} has been successfully de-activated !
                </p>
              ),
            });
        })
        .catch((error) => {
          console.log("Error message:", error);
        }));
  };

  // POST request: Adding a new benefit
  const handleSubmit = async (values: any) => {
    if (!values.newBenefit) {
      return;
    }
    setAddBenefitLoading(true);

    const newBenefitsArray = values.newBenefit;
    for (let i = 0; i < newBenefitsArray.length; i++) {
      const fieldName = ["newBenefit", i, "benefitName"];
      await axios
        .post(
          endpointUrl,
          {
            name: newBenefitsArray[i].benefitName,
          },
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
          const newData = response.data.data;
          setAddBenefitLoading(false);
          openNotification({
            state: "success",
            title: "Success",
            description: <p>Employment benefit added successfully</p>,
          });
          setBenefitsData((prevArray) => prevArray.concat(newData));
          formRef.current?.resetFields(fieldName);
        })
        .catch((error) => {
          console.log("Error message 11:", error);
          setAddBenefitLoading(false);
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        });
    }
  };

  // DELETE request: deleting a non-default benefit
  const handleSettingRemove = async (index: number) => {
    await axios
      .delete(`${endpointUrl}/${index}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-company-id": companyId,
        },
      })
      .then((response) => {
        console.log("Response:", response);
        benefitsData &&
          setBenefitsData(
            benefitsData.filter((newData) => newData.id !== index)
          );
        const currentItem = benefitsData.filter((item) => item.id === index);
        openNotification({
          state: "success",
          title: "Successful Removal",
          description: (
            <p>{currentItem[0].name} has been removed successfully</p>
          ),
        });
      })
      .catch((error) => {
        console.log("Error message:", error);
        openNotification({
          state: "error",
          title: "Error Occured",
          description: error.response.data.message,
          duration: 5,
        });
      });
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
            ref={formRef}
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="benefitsSettings"
          >
            {loading ? (
              <div className="recruitmentSettingsForm flex flex-col sm:gap-6 gap-9 ">
                <Skeleton active />
                <Skeleton active />
              </div>
            ) : error ? (
              <p className="text-red-600">Error</p>
            ) : (
              <>
                {benefitsData?.map((result) => (
                  <div className="recruitmentSettingsForm" key={result.id}>
                    <h3 className="font-medium">{result.name}</h3>
                    <div className="flex gap-5 items-center justify-end">
                      <Form.Item
                        valuePropName="checked"
                        name={result.name}
                        className="flex justify-end items-end"
                        noStyle
                      >
                        <Switch
                          defaultChecked={result.isActive}
                          onChange={(checked) =>
                            handleSwitchChange(checked, result.id)
                          }
                        />
                      </Form.Item>
                      {!result.isDefault && (
                        <Popconfirm
                          title={`Are you sure to delete ${result.name} ?`}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          onConfirm={() => handleSettingRemove(result.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <i className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"></i>{" "}
                        </Popconfirm>
                      )}
                    </div>
                  </div>
                ))}
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
                                <Switch defaultChecked={IsActive} />
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
              </>
            )}
            <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
              <button
                className="text-base font-medium hover:text-caramel"
                type="reset"
              >
                Cancel
              </button>
              <AppButton
                type="submit"
                label="Add"
                isLoading={addBenefitLoading}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
