import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import {
  IImportEntityModalProps,
  ImportEntityModal,
} from "components/entity/ImportEntityModal";
import { QUERY_KEY_FOR_ASSET_ANALYTICS } from "../../hooks/useGetAssetAnalytics";
import { useGetImportAssetTypesTemplate } from "../../hooks/asset-type/bulk/useGetImportAssetTypesTemplate";
import { useImportAssetTypes } from "../../hooks/asset-type/bulk/useImportAssetTypes";
import { QUERY_KEY_FOR_ASSET_TYPES } from "../../hooks/asset-type/useGetAssetTypes";

interface IProps extends IModalProps {}
export const ImportAssetTypes: React.FC<IProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const { mutate: mutateGetTemplate, isLoading: isLoadingGetTemplate } =
    useGetImportAssetTypesTemplate();

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
  const { mutate, isLoading } = useImportAssetTypes();

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
            queryKey: [QUERY_KEY_FOR_ASSET_TYPES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ASSET_ANALYTICS],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <ImportEntityModal
      title="Import Asset Types"
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
