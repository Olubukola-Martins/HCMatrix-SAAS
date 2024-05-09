import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TAssetRequisition } from "features/self-service/features/requisitions/types/asset";
import { useCancelAssetRequest } from "../../hooks/useCancelAssetRequest";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS } from "features/self-service/features/requisitions/hooks/asset/useGetAssetRequisitions";
import { QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE } from "../../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";

interface IProps extends IModalProps {
  data?: TAssetRequisition;
}
export const CancelAssetRequistion: React.FC<IProps> = ({
  open,
  handleClose,
  data,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useCancelAssetRequest();

  const handleDelete = () => {
    if (!data) return;
    mutate(
      {
        id: data.id,
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
            queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Cancel Asset Requisition"
      entity={{
        type: `asset requisition`,
        name: `${data?.asset?.name}`,
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
