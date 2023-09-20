/* eslint-disable no-loop-func */
import React, {  useRef, useState } from "react";
import { Form, Switch, Input, Skeleton, Popconfirm } from "antd";
import { AppButton } from "components/button/AppButton";
import "../../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import {  QuestionCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";
import {
  QUERY_KEY_FOR_BENEFITS,
  useGetBenefits,
} from "../hooks/useGetBenefits";
import { useQueryClient } from "react-query";
import { useCreateBenefits } from "../hooks/useCreateBenefits";
import { usePatchRecruitmentItem } from "../hooks/usePatchRecruitmentSettings";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";

export const Benefits = () => {
  const { mutate, isLoading: postLoading } = useCreateBenefits();
  const { companyId, token } = useApiAuth();
  const { removeData } = useDeleteRecruitmentItem({
    queryKey: QUERY_KEY_FOR_BENEFITS,
    deleteEndpointUrl: "employment-benefits",
  });
  const { patchData } = usePatchRecruitmentItem({
    patchEndpointUrl: "employment-benefits",
    queryKey: QUERY_KEY_FOR_BENEFITS,
  });

  const [IsActive, setIsActive] = useState<boolean>(true);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance | null>(null);

  //  GET request: Load all benefits
  const { data, isLoading, error } = useGetBenefits();

  // POST request: Adding a new benefit
  const handleSubmit = (values: any) => {
    if (!values.newBenefit) {
      return;
    }
    const newBenefitName = values.newBenefit?.map(
      (item: any) => item.benefitName
    );
    for (let i = 0; i < newBenefitName.length; i++) {
      const name = newBenefitName[i];
      mutate(
        {
          name,
          companyId,
          token,
        },
        {
          onError: (error: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description: error.response.data.message,
              duration: 5,
            });
          },
          onSuccess: (res: any) => {
            console.log(res);
            openNotification({
              state: "success",
              title: "Success",
              description: res.data.message,
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_BENEFITS]);
            formRef.current?.resetFields(["newBenefit"]);
          },
        }
      );
    }
  };

  // PATCH request:Activating and de-activating the benefit
  const handleSwitchChange = (checked: boolean, itemId: number) => {
    patchData(itemId, checked);
  };

  // DELETE request: deleting a non-default benefit -- check removeData(result.id)

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
            {isLoading ? (
              <div className="recruitmentSettingsForm flex flex-col sm:gap-6 gap-9 ">
                <Skeleton active />
                <Skeleton active />
              </div>
            ) : error ? (
              <p className="text-red-600 text-xl">ERROR</p>
            ) : (
              <>
                {data?.map((result) => (
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
                      <Popconfirm
                        title={`Are you sure to delete ${result.name} ?`}
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                        onConfirm={() => removeData(result.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <i
                          className={
                            !result.isDefault
                              ? "ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                              : "ri-delete-bin-line text-xl invisible"
                          }
                        ></i>
                      </Popconfirm>
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
                    isLoading={postLoading}
                  />
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};
