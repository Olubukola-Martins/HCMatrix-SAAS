import { Checkbox, DatePicker, Form, Input, Skeleton } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  dateHasToBeGreaterThanOrEqualToCurrentDayRule,
  generalValidationRules,
  generalValidationRulesOp,
  textInputValidationRules,
  textInputValidationRulesOp,
} from "utils/formHelpers/validation";
import { useCreateExitHandOverForm } from "../hooks/useCreateExitHandOverForm";
import { QUERY_KEY_FOR_EXIT_HAND_OVER_FORMS } from "../hooks/useGetExitHandOverForms";
import { openNotification } from "utils/notifications";
import { useApiAuth } from "hooks/useApiAuth";
import { useGetAssetRequisitions } from "../../requisitions/hooks/asset/useGetAssetRequisitions";
import { useGetResignationPolicy } from "features/core/policies/hooks/useGetResignationPolicy";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { TTHandOverForm } from "../types";
import moment from "moment";

const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
const boxTitle = "font-medium text-base pb-1";
const inputStyle =
  "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-slate-400";
const assetCheckListWrap = "flex flex-col";

type IProps = {
  handover?: TTHandOverForm;
  isLoading?: boolean;
};
export const EmployeeHandOverForm: React.FC<IProps> = ({
  handover,
  isLoading: isLoadingHandover,
}) => {
  const queryClient = useQueryClient();

  const supportingDocumentUrl = useCurrentFileUploadUrl(
    "supportingDocumentUrl"
  );
  const supervisorClearanceUrl = useCurrentFileUploadUrl(
    "supervisorClearanceUrl"
  );
  const { token, companyId, currentUserEmployeeId } = useApiAuth();

  const { mutate, isLoading } = useCreateExitHandOverForm();
  const [form] = Form.useForm();
  useEffect(() => {
    if (!handover) return;
    form.setFieldsValue({
      ...handover,
      separationDate: moment(handover.separationDate),
      assetChecklist: handover.assetChecklist.map(
        (item) => item.assetRequisitionId
      ),
    });
  }, [handover, form]);
  const { data: resignationPolicy, isFetching: isFetchingResignationPolicy } =
    useGetResignationPolicy();
  const { data: assets, isFetching: isFetchingAssests } =
    useGetAssetRequisitions({
      token,
      companyId,
      employeeId: currentUserEmployeeId,
      status: "approved",
    });

  const handleSubmit = (data: any) => {
    mutate(
      {
        reasonForLeaving: data.reasonForLeaving,
        separationDate: data.separationDate,
        supervisorClearanceUrl: supervisorClearanceUrl,
        supportingDocumentUrl: supportingDocumentUrl,
        assetChecklist: data.assetChecklist.map((item: number) => ({
          assetRequisitionId: item,
          isReturned: true,
        })),
        whatDidYouLikeTheMost: data.whatDidYouLikeTheMost,
        whatDoYouThinkNeedsImprovement: data.whatDoYouThinkNeedsImprovement,
        otherComments: data.otherComments,
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
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_EXIT_HAND_OVER_FORMS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Skeleton
      loading={
        isLoadingHandover || isFetchingAssests || isFetchingResignationPolicy
      }
      active
      paragraph={{ rows: 24 }}
    >
      <Form
        className="bg-card px-5 py-7  rounded-md mt-7 "
        form={form}
        onFinish={handleSubmit}
        disabled={!!handover}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-accent">
          {/* first grid */}
          <div className="flex flex-col gap-4">
            <div className={boxStyle}>
              <h5 className={boxTitle}>Separation Date</h5>
              <Form.Item
                name="separationDate"
                rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRule]}
              >
                <DatePicker
                  format={DEFAULT_DATE_FORMAT}
                  placeholder={"Seperation Date"}
                  className={`${inputStyle} w-full`}
                />
              </Form.Item>
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>Notice Period</h5>
              <input
                type="text"
                className={`${inputStyle}  font-semibold border-red-400`}
                value={`${resignationPolicy?.noticePeriod} weeks`}
                disabled
              />
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>Reason for leaving</h5>
              <Form.Item
                name="reasonForLeaving"
                rules={textInputValidationRules}
              >
                <Input
                  type="text"
                  className={inputStyle}
                  placeholder="Reason for Leaving"
                />
              </Form.Item>
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>
                What about the company did you like the most?
              </h5>
              <Form.Item
                name="whatDidYouLikeTheMost"
                rules={textInputValidationRules}
              >
                <Input
                  type="text"
                  className={inputStyle}
                  placeholder="Preferences"
                />
              </Form.Item>
            </div>

            <div className={boxStyle}>
              <h5 className={boxTitle}>
                What do you think the company should do to enhance employees
                welfare?
              </h5>
              <Form.Item
                name="whatDoYouThinkNeedsImprovement"
                rules={textInputValidationRules}
              >
                <Input
                  type="text"
                  className={inputStyle}
                  placeholder="Welfare"
                />
              </Form.Item>
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>
                Any other thing you wish to share with us?
              </h5>
              <Form.Item
                name="otherComments"
                rules={textInputValidationRulesOp}
              >
                <Input
                  type="text"
                  className={inputStyle}
                  placeholder="Comments"
                />
              </Form.Item>
            </div>
          </div>

          {/* second grid */}
          <div className="flex flex-col gap-4">
            <div className={`${boxStyle} `}>
              <h5 className={boxTitle}>Asset Checklist</h5>
              <Form.Item
                name="assetChecklist"
                className="w-full"
                rules={
                  assets && assets?.total > 0
                    ? generalValidationRules
                    : generalValidationRulesOp
                }
              >
                <Checkbox.Group className="w-full">
                  <div className="px-4 py-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* 1 */}
                    {assets &&
                      assets.data?.map((item, i) => (
                        <div className={`${assetCheckListWrap}  gap-2`} key={i}>
                          <div className="flex gap-2  pb-2">
                            <Checkbox value={item.id} />
                            <AssetDetail
                              {...{
                                ID: item.asset.uid,
                                uid: item.asset.uid,
                                name: item.asset.name,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </Checkbox.Group>
              </Form.Item>
            </div>

            <div className={boxStyle}>
              <h5 className={boxTitle}>Upload Supporting Document</h5>
              <div className={boxStyle}>
                <FileUpload
                  allowedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "application/pdf",
                  ]}
                  fileKey="supportingDocumentUrl"
                  textToDisplay="Upload Supporting Document"
                  displayType="form-space-between"
                />
              </div>
            </div>
            <div className={boxStyle}>
              <h5 className={boxTitle}>Manager/Supervisor Clearance</h5>
              <div className={boxStyle}>
                <FileUpload
                  allowedFileTypes={[
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "application/pdf",
                  ]}
                  fileKey="supervisorClearanceUrl"
                  textToDisplay="Upload Supervisor Clearance"
                  displayType="form-space-between"
                />
              </div>
            </div>
          </div>
        </div>
        {!handover && (
          <div className="flex justify-between items-center mt-5">
            <AppButton label="cancel" type="button" variant="transparent" />
            <AppButton label="Submit" type="submit" isLoading={isLoading} />
          </div>
        )}
      </Form>
    </Skeleton>
  );
};
const AssetDetail: React.FC<{
  uid: string;
  name: string;
  ID: string;
}> = ({ uid, name, ID }) => {
  return (
    <div className={`${assetCheckListWrap} gap-1`}>
      <span>
        UID: <span className="font-semibold">{uid}</span>
      </span>
      <span>
        Name: <span className="font-semibold">{name}</span>
      </span>
      <span>
        ID: <span className="font-semibold">{ID}</span>
      </span>
    </div>
  );
};
