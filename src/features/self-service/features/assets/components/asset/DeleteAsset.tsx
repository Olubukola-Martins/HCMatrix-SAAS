import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { TAsset } from "../../types";
import { QUERY_KEY_FOR_ASSETS } from "../../hooks/useGetAssets";
import { QUERY_KEY_FOR_ASSET_ANALYTICS } from "../../hooks/useGetAssetAnalytics";
import { useDeleteAsset } from "../../hooks/useDeleteAsset";

interface IProps extends IModalProps {
  asset?: TAsset;
}
export const DeleteAsset: React.FC<IProps> = ({ open, handleClose, asset }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeleteAsset();
  const navigate = useNavigate();
  const handleDelete = () => {
    if (!asset) return;
    mutate(
      {
        id: asset.id,
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
            queryKey: [QUERY_KEY_FOR_ASSETS],
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
      title="Delete asset"
      entity={{
        type: "asset",
        name: asset?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
