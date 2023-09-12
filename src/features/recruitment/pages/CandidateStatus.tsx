import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { Form, Switch, Input, Skeleton } from "antd";
import "../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { useDefaultSettingsCall } from "../hooks/useDefaultSettingsCall";
import { useEffect, useState } from "react";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";

interface CandidateStatusType {
  companyId: number;
  createdAt: string;
  isActive: boolean;
  isDefault: boolean;
  id: number;
  name: string;
  label: string;
  updatedAt: string;
}

const CandidateStatus = () => {
  const [form] = Form.useForm();

  useDefaultSettingsCall();

  const [candidateStatus, setCandidateStatus] = useState<CandidateStatusType[]>(
    []
  );

  const [formLoaded, setFormLoaded] = useState(false);

  const { companyId, token } = useApiAuth();

  const endpointUrl = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses`;

  // Get request
  useEffect(() => {
    const getCandidateStatus = async () => {
      await axios
        .get(endpointUrl, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-company-id": companyId,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            const candidateData = response.data.data.result;
            setCandidateStatus(candidateData);
            setFormLoaded(true);
          }
        })
        .catch((err) => {
          console.log(err.message);
          console.log(err);
        });
    };
    getCandidateStatus();
  }, []);

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
          console.log("Response");
        })
        .catch((error) => {
          console.error("Error:", error);
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
        .then((response) => {})
        .catch((error) => {}));
  };

  // Post request
  const handleSubmit = async (values: any) => {
    if (!values.newStatus) {
      console.log("test empty new status");
      return;
    }

    const formData = values.newStatus.map((status: any) => ({
      name: status.statusName,
    }));

    for (let i = 0; i < formData.length; i++) {
      await axios
        .post(
          `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses/`,
          formData[i],
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
              "x-company-id": companyId,
            },
          }
        )
        .then((response) => {
          console.log(response);
          const postResponse = response.data.data;
          console.log(postResponse);
          setCandidateStatus((prevArray) => [...prevArray, postResponse]);
          console.log(candidateStatus);
        })
        .catch((err) => {});
    }
    form.resetFields();
  };

  // Delete request
  const deleteSwitch = async (itemId: number) => {
    await axios
      .delete(
        `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/application-statuses/${itemId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-company-id": companyId,
          },
        }
      )
      .then((response) => {
        console.log("Delete response:", response);
        const deleteResponse = response.data;
        console.log(deleteResponse);
        setCandidateStatus((prevArray) =>
          prevArray.filter((item) => item.id !== itemId)
        );
      })
      .catch((err) => {
        console.log("Delete error:", err);
      });
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
            {!formLoaded ? (
              <Skeleton active />
            ) : (
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleSubmit}
              >
                {candidateStatus?.map((item, index) => (
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
                      {/* {!item.isActive && (
                        <i
                          className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                          onClick={() => deleteSwitch(item.id)}
                        ></i>
                      )} */}
                      {/* {index >= 9 && (
                        <i
                          className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                          onClick={() => deleteSwitch(item.id)}
                        ></i>
                      )} */}
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
                  <AppButton type="submit" label="Add" />
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateStatus;
