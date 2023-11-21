import React, { useState } from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  IImportEntityModalProps,
  ImportEntityModal,
} from "components/entity/ImportEntityModal";
import { QUERY_KEY_FOR_HOSPITALS } from "../../../hooks/hospital/useGetHospitals";
import { QUERY_KEY_FOR_HOSPITALS_4_EMPLOYEE_WITH_HMO } from "../../../hooks/hospital/useGetHospitalsForEmployeeWithHMO";
import { useGetBulkHospitalImportTemplate } from "../../../hooks/hospital/bulk/useGetBulkHospitalImportTemplate";
import { useImportBulkHospital } from "../../../hooks/hospital/bulk/useImportBulkHospital";
import { AppButton } from "components/button/AppButton";

interface IProps extends IModalProps {}
export const ImportHospitals: React.FC<IProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateGetTemplate, isLoading: isLoadingGetTemplate } =
    useGetBulkHospitalImportTemplate();

  const handleGetTemplate = () => {
    mutateGetTemplate(
      {
        data: {},
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
  const { mutate, isLoading } = useImportBulkHospital();

  const handleSubmit: IImportEntityModalProps["handleSubmit"]["fn"] = ({
    file,
  }) => {
    mutate(
      {
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
            queryKey: [QUERY_KEY_FOR_HOSPITALS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_HOSPITALS_4_EMPLOYEE_WITH_HMO],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <ImportEntityModal
      title="Import Hospitals"
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

export const ImportHospitalBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ImportHospitals open={open} handleClose={() => setOpen(false)} />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Import Hospital"
      />
    </>
  );
};
