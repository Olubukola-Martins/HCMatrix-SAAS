import { Form, DatePicker } from "antd";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useApiAuth } from "hooks/useApiAuth";
import moment from "moment";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { generalValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useSaveResumptionInformation from "../hooks/useSaveResumptionInformation";
import { TOnboarding } from "../types";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { FormBranchInput } from "features/core/branches/components/FormBranchInput";

interface IProps {
  setNewTaskDrawer: (val: boolean) => void;
  onboarding: TOnboarding;
}

export const ResumptionInformation = ({
  setNewTaskDrawer,
  onboarding,
}: IProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (onboarding.resumptionInformation) {
      const data = onboarding.resumptionInformation;
      form.setFieldsValue({
        resumptionDateAndTime: data.resumptionDateAndTime
          ? moment(data.resumptionDateAndTime)
          : null,
        whoToCallId: data.whoToCallId,
        branchId: data.branchId,
      });
    }
  }, [onboarding, form]);
  const queryClient = useQueryClient();

  const { token, companyId } = useApiAuth();

  const { mutate, isLoading } = useSaveResumptionInformation();
  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleFinish = (data: any) => {
    if (companyId) {
      mutate(
        {
          token,
          companyId,
          branchId: data.branchId,
          documentUrl: !!documentUrl
            ? documentUrl
            : onboarding?.resumptionInformation?.documentUrl ?? "",
          resumptionDateAndTime: data.resumptionDateAndTime
            ? moment(data.resumptionDateAndTime).toISOString()
            : "",
          whoToCallId: data.whoToCallId,
          id: onboarding.id,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
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
              queryKey: ["single-onboarding"], // pass in id later
            });
            setNewTaskDrawer(true);
          },
        }
      );
    }
  };
  return (
    <div className="bg-mainBg rounded-md px-2 md:px-4 pt-4 pb-6 shadow-sm mt-5">
      <h6 className="text-sm font-medium pb-3">Resumption Information</h6>
      <Form
        className="bg-card px-3 py-4 rounded-md"
        labelCol={{ span: 24 }}
        form={form}
        onFinish={handleFinish}
        disabled={!!onboarding.resumptionInformation}
        requiredMark={onboarding.resumptionInformation ? false : true}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Form.Item
            label="Resumption Date & Time"
            name="resumptionDateAndTime"
            rules={generalValidationRules}
          >
            <DatePicker showTime allowClear className="w-full" />
          </Form.Item>

          <FormBranchInput Form={Form} />
          <FormEmployeeInput
            Form={Form}
            control={{ label: "Who to call", name: "whoToCallId" }}
          />

          <Form.Item label="Supporting Document">
            <FileUpload
              allowedFileTypes={[
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/jpeg",
              ]}
              fileKey="documentUrl"
            />
            {onboarding?.resumptionInformation?.documentUrl && (
              <a
                href={onboarding?.resumptionInformation?.documentUrl}
                className="text-caramel hover:underline text-xs block mt-2"
              >
                Download supporting document
              </a>
            )}
          </Form.Item>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Link to="/self-service/onboarding" className="transparentButton">
            Cancel
          </Link>
          {!onboarding?.resumptionInformation && (
            <AppButton
              label="Save & Set Tasks"
              type="submit"
              isLoading={isLoading}
            />
          )}
          {onboarding?.resumptionInformation && (
            <AppButton
              label="Add Task"
              handleClick={() => setNewTaskDrawer(true)}
            />
          )}
        </div>
      </Form>
    </div>
  );
};
