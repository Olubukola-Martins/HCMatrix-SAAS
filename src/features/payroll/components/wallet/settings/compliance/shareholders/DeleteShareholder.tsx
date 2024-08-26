import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TShareholdersCompliance } from "features/payroll/types/compliance";
import { useSaveShareholdersCompliance } from "features/payroll/hooks/compliance/shareholder/useSaveShareholdersCompliance";
import { QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE } from "features/payroll/hooks/compliance/shareholder/useGetShareholdersCompliance";

interface IProps extends IModalProps {
  shareholders?: TShareholdersCompliance["shareholders"];
  shareholder?: TShareholdersCompliance["shareholders"][number] & {
    id: number;
  };
}
export const DeleteShareholder: React.FC<IProps> = ({
  open,
  handleClose,
  shareholder,
  shareholders = [],
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useSaveShareholdersCompliance();
  const handleDelete = () => {
    if (!shareholder) return;
    mutate(
      {
        shareholders:
          shareholders?.filter((_, i) => shareholder?.id !== i) ?? [],
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
            queryKey: [QUERY_KEY_FOR_WALLET_SHAREHOLDERS_COMPLIANCE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Shareholder"
      entity={{
        type: "shareholder",
        name: shareholder?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
