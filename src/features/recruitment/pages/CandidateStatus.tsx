import { appRoutes } from "config/router/paths";
import { RecruitmentSettingsIntro } from "../components/RecruitmentSettingsIntro";
import { Form, Switch, Input } from "antd";
import "../assets/style.css";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useEffect, useState } from "react";
import { ApplyDefaultSettings } from "../components/ApplyDefaultSettings";
import { useDefaultSettingsCall } from "../hooks/useDefaultSettingsCall";

const CandidateStatus = () => {
  const [form] = Form.useForm();
  useDefaultSettingsCall();

  const { companyId, token } = useApiAuth();
  const endpointUrl = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/default-settings/apply`;

  const activateDefaultSettings = async () => {
    await axios
      .post(endpointUrl, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "x-company-id": companyId,
        },
      })
      .then((response) => {
        console.log("Response data:", response);
      })
      .catch((error) => {
        console.log("Error message:", error);
      });
  };

  const handleSubmit = (values: any) => {
    console.log("Received values of form:", values);
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
            <Form
              form={form}
              layout="vertical"
              requiredMark={false}
              onFinish={handleSubmit}
            >
              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Reviewed</h3>
                <Form.Item
                  name="reviewed"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Schedule Interview</h3>
                <Form.Item
                  name="scheduleInterview"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Put on Hold</h3>
                <Form.Item
                  name="putOnHold"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Not a Fit</h3>
                <Form.Item
                  name="notAFit"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Declined Offer</h3>
                <Form.Item
                  name="declinedOffer"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Not Qualified</h3>
                <Form.Item
                  name="notQualified"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

              <div className="recruitmentSettingsForm ">
                <h3 className="font-medium">Over Qualified</h3>
                <Form.Item
                  name="overQualified"
                  className="flex justify-end items-end"
                  noStyle
                >
                  <Switch />
                </Form.Item>
              </div>

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
                <AppButton type="submit" label="Save" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateStatus;
