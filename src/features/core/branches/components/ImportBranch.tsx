import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  IImportEntityModalProps,
  ImportEntityModal,
} from "components/entity/ImportEntityModal";
import { QUERY_KEY_FOR_BRANCHES } from "../hooks/useFetchBranches";
import { useGetImportBranchesTemplate } from "../hooks/bulk/useGetImportBranchesTemplate";
import { useImportBranches } from "../hooks/bulk/useImportBranches";

interface IProps extends IModalProps {}
export const ImportBranch: React.FC<IProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateGetTemplate, isLoading: isLoadingGetTemplate } =
    useGetImportBranchesTemplate();

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
  const { mutate, isLoading } = useImportBranches();

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
            queryKey: [QUERY_KEY_FOR_BRANCHES],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <ImportEntityModal
      title="Import Branches"
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
