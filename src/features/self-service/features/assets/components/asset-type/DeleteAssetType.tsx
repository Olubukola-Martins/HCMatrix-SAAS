import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TAssetType } from "../../types";
import { QUERY_KEY_FOR_ASSET_ANALYTICS } from "../../hooks/useGetAssetAnalytics";
import { QUERY_KEY_FOR_ASSET_TYPES } from "../../hooks/asset-type/useGetAssetTypes";
import { useDeleteAssetType } from "../../hooks/asset-type/useDeleteAssetType";

interface IProps extends IModalProps {
  assetType?: Pick<TAssetType, "name" | "id">;
}
export const DeleteAssetType: React.FC<IProps> = ({
  open,
  handleClose,
  assetType,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteAssetType();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (!assetType) return;
    mutate(
      {
        id: assetType.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
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

          handleClose();
          navigate(appRoutes.selfServiceAssets);
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete asset type"
      entity={{
        type: "asset type",
        name: assetType?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
