import {  Form,  Drawer, Select } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
} from "utils/formHelpers/validation";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions";
import { useCreatePromotionRequisition } from "../../requisitions/hooks/promotion/useCreatePromotionRequisition";
import { QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../requisitions/hooks/promotion/useGetPromotionRequisitions4AuthEmployee";
import { QUERY_KEY_FOR_APPROVAL_REQUESTS } from "features/core/workflows/hooks/useFetchApprovalRequests";
import { QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT } from "features/notifications/hooks/unRead/useGetUnReadNotificationCount";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "features/notifications/hooks/useGetAlerts";
import { FormUnlicensedEmployeeSSRequestInput } from "features/core/employees/components/FormEmployeeInput";
import { PROFILE_EDIT_REQUEST_TYPES } from "../constants";
import { TProfileEditRequestType } from "../types";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { useApiAuth } from "hooks/useApiAuth";
import { EditJobInformationRequest } from "./category/EditJobInformationRequest";

export const NewProfileEditRequest: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  const queryClient = useQueryClient();

  const [category, setCategory] = useState<TProfileEditRequestType>('profile-edit/job-information')
  const { mutate, isLoading } = useCreatePromotionRequisition();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");
  const handleSubmit = (data: any) => {
    mutate(
      {
        employeeId: data?.employeeId,
        date: data.date.toString(),
        preferredStartDate: data.preferredStartDate.toString(),
        proposedDesignationId: data.proposedDesignationId,
        justification: data.justification,
        attachmentUrls: !!documentUrl ? [documentUrl] : [],
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
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PROMOTION_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_APPROVAL_REQUESTS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_NOTIFICATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
            // exact: true,
          });
        },
      }
    );
  };
  const { currentUserEmployeeId } = useApiAuth();
  const {
    data: employee,
    isLoading: isLoadingEmployee,
    isError,
    error,
  } = useFetchSingleEmployee({
    employeeId: currentUserEmployeeId
  });
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      footer={null}
      title={"New Profile Edit Request"}
      style={{ top: 20 }}
      width={`75%`}
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <FormUnlicensedEmployeeSSRequestInput
          Form={Form}
          control={{
            name: "employeeId",
            label: "Select Unlinsenced Employee",
          }}
        />
   
       
        <Form.Item
          rules={generalValidationRules}
          name="category"
          label="Category"
        >
          <Select onSelect={(_, {value}) => setCategory(value)} options={PROFILE_EDIT_REQUEST_TYPES.map((item, i) => ({
            value: item.type,
            label: <span className="capitalize">{item.name}</span>
          }))} placeholder="Select Category" />
        </Form.Item>
        {category === 'profile-edit/job-information' &&
          <EditJobInformationRequest employeeId={currentUserEmployeeId} jobInformation={employee?.jobInformation}/>
        }

       
      </Form>
    </Drawer>
  );
};
