import React, { useRef, useState } from 'react'
import { Form, Switch, Input, Skeleton, Popconfirm, FormInstance } from "antd";
import { AppButton } from "components/button/AppButton";
import '../../assets/style.css'
import { textInputValidationRules } from "utils/formHelpers/validation";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useApiAuth } from 'hooks/useApiAuth';
import { useQueryClient } from 'react-query';
import { useGetJobStatusSettings } from '../hooks/useGetJobStatusSettings';



export const JobStatusSettings = () => {
  // const uniqueEndPoint = "experience-types";
  // const { removeData } = useDeleteRecruitmentItem({
  //   queryKey: QUERY_KEY_FOR_EXPERIENCE_TYPES,
  //   deleteEndpointUrl: uniqueEndPoint,
  // });
  // const { patchData } = usePatchRecruitmentItem({
  //   patchEndpointUrl: uniqueEndPoint,
  //   queryKey: QUERY_KEY_FOR_EXPERIENCE_TYPES,
  // });
  // const { mutate, isLoading: postLoading } = useCreateExperienceType();
  const { companyId, token } = useApiAuth();
  const queryClient = useQueryClient();
  const [IsActive, setIsActive] = useState<boolean>(true);
  const formRef = useRef<FormInstance | null>(null);
  const [form] = Form.useForm();

  // //  GET request: Load all employment types
  const { data, isLoading, error } = useGetJobStatusSettings();

  // // PATCH request:Activating and de-activating the employment type
  // const handleSwitchChange = (checked: boolean, itemId: number) => {
  //   patchData(itemId, checked);
  // };
  // // DELETE request: deleting a non-default employment type -- check removeData(result.id)

  // // POST request: Adding a new employment type
  // const handleSubmit = (values: any) => {
  //   if (!values.newType) {
  //     return;
  //   }
  //   const newTypeName = values.newExperienceType?.map(
  //     (item: any) => item.typeName
  //   );
  //   for (let i = 0; i < newTypeName.length; i++) {
  //     const name = newTypeName[i];
  //     mutate(
  //       {
  //         name,
  //         companyId,
  //         token,
  //       },
  //       {
  //         onError: (error: any) => {
  //           openNotification({
  //             state: "error",
  //             title: "Error Occured",
  //             description: error.response.data.message,
  //             duration: 5,
  //           });
  //         },
  //         onSuccess: (res: any) => {
  //           console.log(res);
  //           openNotification({
  //             state: "success",
  //             title: "Success",
  //             description: res.data.message,
  //           });
  //           queryClient.invalidateQueries([QUERY_KEY_FOR_EXPERIENCE_TYPES]);
  //           formRef.current?.resetFields(["newExperienceType"]);
  //         },
  //       }
  //     );
  //   }
  // };

  const handleAddField = () => {
    const newStatus = form.getFieldValue("newStatus") || [];
    const initialStatus = {
      statusName: "",
      allowStatus: true,
    };
    form.setFieldsValue({
      newStatus: [...newStatus, initialStatus],
    });
  };

  const handleRemoveField = (index: number) => {
    const newStatus = form.getFieldValue("newStatus") || [];
    form.setFieldsValue({
      newStatus: newStatus.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base">Job Status</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="jobStatusSettings"
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
                  <h2 className="pb-5 font-medium text-base">Status name</h2>
                  <Form.List name="newStatus">
                    {(fields) => (
                      <>
                        {fields.map((field, index) => (
                          <div key={field.key} className="grid grid-cols-2 ">
                            <Form.Item
                              {...field}
                              name={[field.name, "statusName"]}
                              label="Name"
                              rules={textInputValidationRules}
                            >
                              <Input placeholder="Enter benefit name" />
                            </Form.Item>
                            <div className="flex gap-5 items-center justify-end">
                              <Form.Item
                                {...field}
                                name={[field.name, "allowStatus"]}
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
                          label="+ Add Job Status"
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

            {/* <div>
              <h2 className="pb-5 font-medium text-base">Status name</h2>
              <Form.List name="newStatus">
                {(fields) => (
                  <>
                    {fields.map((field, index) => (
                      <div key={field.key} className="grid grid-cols-2 ">
                        <Form.Item
                          {...field}
                          name={[field.name, "statusName"]}
                          label="Name"
                          rules={textInputValidationRules}
                        >
                          <Input placeholder="Enter status name" />
                        </Form.Item>
                        <div className="flex gap-5 items-center justify-end">
                          <Form.Item
                            {...field}
                            name={[field.name, "allowStatus"]}
                            noStyle
                            valuePropName="checked"
                          >
                            <Switch />
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
                      label="+ Add Job Status"
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
            </div> */}
          </Form>
        </div>
      </div>
    </>
  );
}
