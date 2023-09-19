import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import { Form, Switch, Input, Skeleton, Popconfirm, FormInstance } from "antd";
import "../../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useDefaultSettingsCall } from "../../hooks/useDefaultSettingsCall";
import { useRef, useState } from "react";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  QUERY_KEY_FOR_CANDIDATE_STATUS,
  useGetCandidateStatus,
} from "../hooks/useGetCandidateStatus";
import { useCreateCandidateStatus } from "../hooks/useCreateCandidateStatus";
import { useQueryClient } from "react-query";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";

const CandidateStatus = () => {
  const [form] = Form.useForm();
  useDefaultSettingsCall();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetCandidateStatus();
  const { mutate } = useCreateCandidateStatus();
  const { removeData } = useDeleteRecruitmentItem({
    queryKey: QUERY_KEY_FOR_CANDIDATE_STATUS,
    deleteEndpointUrl: "application-statuses",
  });

  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const { companyId, token } = useApiAuth();
  const formRef = useRef<FormInstance | null>(null);
  formRef.current?.resetFields(["newStatus"]);

  // Post request
  const handleSubmit = (values: any) => {
    if (!values.newStatus) {
      return;
    }
    const newStatusName = values.newStatus?.map((item: any) => item.statusName);
    for (let i = 0; i < newStatusName.length; i++) {
      const name = newStatusName[i];
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
            openNotification({
              state: "success",
              title: "Success",
              description: "Application successfully added!",
            });
            queryClient.invalidateQueries([QUERY_KEY_FOR_CANDIDATE_STATUS]);
            formRef.current?.resetFields();
          },
        }
      );
    }
  };

  // Patch request
  const handleSwitchValue = async (checked: boolean, itemId: number) => {
    checked &&
      (await axios
        .patch(
          `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses/${itemId}/activate`,
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
          const currentStatus = response.data.data.name;
          openNotification({
            title: "Success",
            state: "success",
            description: <p>{currentStatus} has been successfully activated</p>,
            duration: 5,
          });
        })
        .catch((error) => {
          openNotification({
            state: "error",
            title: "An error occured",
            description: error.response.data.message,
            duration: 5,
          });
        }));

    !checked &&
      (await axios
        .patch(
          `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses/${itemId}/deactivate`,
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
          const currentStatus = response.data.data.name;
          openNotification({
            title: "Success",
            state: "success",
            description: (
              <p>{currentStatus} has been successfully de-activated</p>
            ),
            duration: 5,
          });
        })
        .catch((error) => {
          openNotification({
            state: "error",
            title: "An error occured",
            description: error.response.data.message,
            duration: 5,
          });
        }));
  };

  const handleAddField = () => {
    const newStatus = form.getFieldValue("newStatus") || [];
    const initialStatus = { statusName: "", allowStatus: true };
    form.setFieldsValue({ newStatus: [...newStatus, initialStatus] });
  };

  const handleRemoveField = (index: number) => {
    const newStatus = form.getFieldValue("newStatus") || [];
    form.setFieldsValue({
      newStatus: newStatus.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <>
      <RecruitmentSettingsIntro
        title="Candidate Status"
        description={"Welcome on board, set up your candidate status."}
        nextLink={appRoutes.candidateSources}
      />

      <div className="Container mt-5">
        <div className="bg-card rounded md:p-5 p-3">
          <h2 className="pb-5 font-medium text-base">Status</h2>
          <div className="bg-mainBg py-4 px-4 rounded">
            <Skeleton active loading={isLoading}>
              <Form
                ref={formRef}
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
              >
                {data?.map((item) => (
                  <div className="recruitmentSettingsForm">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex gap-4 items-center justify-center">
                      <Form.Item
                        name={item.label}
                        className="flex justify-end items-end"
                        noStyle
                      >
                        <Switch
                          defaultChecked={item.isActive}
                          onChange={(checked) =>
                            handleSwitchValue(checked, item.id)
                          }
                        />
                      </Form.Item>
                      {!item.isDefault && (
                        <Popconfirm
                          title={`Are you sure to delete ${item.name} ?`}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => removeData(item.id)}
                        >
                          <i className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"></i>
                        </Popconfirm>
                      )}
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
                          label="+ Add status"
                          handleClick={() => handleAddField()}
                        />
                      </>
                    )}
                  </Form.List>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <button
                    className="text-base font-medium hover:text-caramel"
                    type="reset"
                  >
                    Cancel
                  </button>
                  <AppButton
                    type="submit"
                    label="Add"
                    isLoading={loadingStatus}
                  />
                </div>
              </Form>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateStatus;
