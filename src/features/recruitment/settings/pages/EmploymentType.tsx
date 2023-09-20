import React, { useRef } from "react";
import { Form, Switch, Input, Popconfirm, Skeleton } from "antd";
import { AppButton } from "../../../../components/button/AppButton";
import "../../assets/style.css";
import { textInputValidationRules } from "../../../../utils/formHelpers/validation";
import {
  QUERY_KEY_FOR_EMPLOYMENT_TYPES,
  useGetEmploymentTypes,
} from "../hooks/useGetEmploymentTypes";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";
import { usePatchRecruitmentItem } from "../hooks/usePatchRecruitmentSettings";
import { useCreateEmploymentTypes } from "../hooks/useCreateEmploymentTypes";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";
import { FormInstance } from "antd/es/form";
import { openNotification } from "utils/notifications";

export const EmploymentType = () => {
  const uniqueEndPoint = "employment-types";
  const { removeData } = useDeleteRecruitmentItem({
    queryKey: QUERY_KEY_FOR_EMPLOYMENT_TYPES,
    deleteEndpointUrl: uniqueEndPoint,
  });
  const { patchData } = usePatchRecruitmentItem({
    patchEndpointUrl: uniqueEndPoint,
    queryKey: QUERY_KEY_FOR_EMPLOYMENT_TYPES,
  });
  const { mutate, isLoading: postLoading } = useCreateEmploymentTypes();
  const { companyId, token } = useApiAuth();
  const queryClient = useQueryClient();
  const formRef = useRef<FormInstance | null>(null);

  const [form] = Form.useForm();

  //  GET request: Load all employment types
  const { data, isLoading, error } = useGetEmploymentTypes();

  // PATCH request:Activating and de-activating the employment type
  const handleSwitchChange = (checked: boolean, itemId: number) => {
    patchData(itemId, checked);
  };
  // DELETE request: deleting a non-default employment type -- check removeData(result.id)

  // POST request: Adding a new employment type
  const handleSubmit = (values: any) => {
    if (!values.newType) {
      return;
    }
    const newTypeName = values.newType?.map((item: any) => item.typeName);
    for (let i = 0; i < newTypeName.length; i++) {
      const name = newTypeName[i];
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
            queryClient.invalidateQueries([QUERY_KEY_FOR_EMPLOYMENT_TYPES]);
            formRef.current?.resetFields(["newType"]);
          },
        }
      );
    }
  };

  const handleAddField = () => {
    const newType = form.getFieldValue("newType") || [];
    const initialEmploymentType = { typeName: "", allowEmploymentType: true };
    form.setFieldsValue({ newType: [...newType, initialEmploymentType] });
  };

  const handleRemoveField = (index: number) => {
    const newType = form.getFieldValue("newType") || [];
    form.setFieldsValue({
      newType: newType.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <>
      <div className="bg-card rounded md:p-5 p-3">
        <h2 className="pb-5 font-medium text-base">Employment type</h2>
        <div className="bg-mainBg py-4 px-4 rounded">
          <Form
            ref={formRef}
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            name="employmentTypeSettings"
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
                  <h2 className="pb-5 font-medium text-base">Type name</h2>
                  <Form.List name="newType">
                    {(fields) => (
                      <>
                        {fields.map((field, index) => (
                          <div key={field.key} className="grid grid-cols-2 ">
                            <Form.Item
                              {...field}
                              name={[field.name, "typeName"]}
                              label="Name"
                              rules={textInputValidationRules}
                            >
                              <Input placeholder="Enter status name" />
                            </Form.Item>
                            <div className="flex gap-5 items-center justify-end">
                              <Form.Item
                                {...field}
                                name={[field.name, "allowEmploymentType"]}
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
                          label="+ Add Employment type"
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

// <Form
//   ref={formRef}
//   form={form}
//   layout="vertical"
//   requiredMark={false}
//   onFinish={handleSubmit}
//   name="benefitsSettings"
// >
//   {isLoading ? (
//     <div className="recruitmentSettingsForm flex flex-col sm:gap-6 gap-9 ">
//       <Skeleton active />
//       <Skeleton active />
//     </div>
//   ) : error ? (
//     <p className="text-red-600 text-xl">ERROR</p>
//   ) : (
//     <>
//       {data?.map((result) => (
//         <div className="recruitmentSettingsForm" key={result.id}>
//           <h3 className="font-medium">{result.name}</h3>
//           <div className="flex gap-5 items-center justify-end">
//             <Form.Item
//               valuePropName="checked"
//               name={result.name}
//               className="flex justify-end items-end"
//               noStyle
//             >
//               <Switch
//                 defaultChecked={result.isActive}
//                 onChange={(checked) =>
//                   handleSwitchChange(checked, result.id)
//                 }
//               />
//             </Form.Item>
//             <Popconfirm
//               title={`Are you sure to delete ${result.name} ?`}
//               icon={
//                 <QuestionCircleOutlined style={{ color: "red" }} />
//               }
//               onConfirm={() => removeData(result.id)}
//               okText="Yes"
//               cancelText="No"
//             >
//               <i
//                 className={
//                   !result.isDefault
//                     ? "ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
//                     : "ri-delete-bin-line text-xl invisible"
//                 }
//               ></i>
//             </Popconfirm>
//           </div>
//         </div>
//       ))}
//       <div>
//         <h2 className="pb-5 font-medium text-base">Benefit name</h2>
//         <Form.List name="newBenefit">
//           {(fields) => (
//             <>
//               {fields.map((field, index) => (
//                 <div key={field.key} className="grid grid-cols-2 ">
//                   <Form.Item
//                     {...field}
//                     name={[field.name, "benefitName"]}
//                     label="Name"
//                     rules={textInputValidationRules}
//                   >
//                     <Input placeholder="Enter benefit name" />
//                   </Form.Item>
//                   <div className="flex gap-5 items-center justify-end">
//                     <Form.Item
//                       {...field}
//                       name={[field.name, "allowBenefit"]}
//                       noStyle
//                       valuePropName="checked"
//                     >
//                       <Switch defaultChecked={IsActive} />
//                     </Form.Item>
//                     <i
//                       className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
//                       onClick={() => handleRemoveField(index)}
//                     ></i>
//                   </div>
//                 </div>
//               ))}

//               <AppButton
//                 variant="transparent"
//                 label="+ Add Benefit"
//                 handleClick={() => handleAddField()}
//               />
//             </>
//           )}
//         </Form.List>
//       </div>
//       <div className="flex justify-between self-center mt-5 w-96 ml-auto max-sm:w-full max-lg:w-80">
//         <button
//           className="text-base font-medium hover:text-caramel"
//           type="reset"
//         >
//           Cancel
//         </button>
//         <AppButton
//           type="submit"
//           label="Add"
//           isLoading={postLoading}
//         />
//       </div>
//     </>
//   )}
// </Form>;
