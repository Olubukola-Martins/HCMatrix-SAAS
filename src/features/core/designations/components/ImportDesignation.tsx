import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  IImportEntityModalProps,
  ImportEntityModal,
} from "components/entity/ImportEntityModal";
import { useGetOvertimeSheetTemplate } from "features/payroll/hooks/payroll/overtimeSheet/useGetOvertimeSheetTemplate";
import { useAddOvertimeSheet } from "features/payroll/hooks/payroll/overtimeSheet/useAddOvertimeSheet";
import { QUERY_KEY_FOR_DESIGNATIONS } from "../hooks/useFetchDesignations";

interface IProps extends IModalProps {}

export const ImportDesignation: React.FC<IProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateGetTemplate, isLoading: isLoadingGetTemplate } =
    useGetOvertimeSheetTemplate();

  const handleGetTemplate = () => {
    mutateGetTemplate(
      {
        data: {
          payrollId: 0,
        },
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
        },
      }
    );
  };
  const { mutate, isLoading } = useAddOvertimeSheet();

  const handleSubmit: IImportEntityModalProps["handleSubmit"]["fn"] = ({
    file,
  }) => {
    mutate(
      {
        payrollId: 0,
        data: {
          csvFile: file,
        },
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <ImportEntityModal
      title="Import Designations"
      handleClose={handleClose}
      open={open}
      handleDownloadTemplate={{
        fn: handleGetTemplate,
        isLoading: isLoadingGetTemplate,
      }}
      handleSubmit={{ fn: handleSubmit, isLoading: isLoading }}
    />
  );
};
