import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TDirectorsCompliance } from "features/payroll/types/compliance";
import { QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE } from "features/payroll/hooks/compliance/director/useGetDirectorsCompliance";
import { useSaveDirectorsCompliance } from "features/payroll/hooks/compliance/director/useSaveDirectorsCompliance";

interface IProps extends IModalProps {
  directors?: TDirectorsCompliance["directors"];
  director?: TDirectorsCompliance["directors"][number] & { id: number };
}
export const DeleteComplianceDirector: React.FC<IProps> = ({
  open,
  handleClose,
  director,
  directors,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useSaveDirectorsCompliance();
  const handleDelete = () => {
    if (!director) return;
    mutate(
      {
        directors: directors?.filter((_, i) => director?.id !== i) ?? [],
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
            queryKey: [QUERY_KEY_FOR_WALLET_DIRECTORS_COMPLIANCE],
            // exact: true,
          });

          handleClose();
        },
      }
    );
  };

  return (
    <DeleteEntityModal
      title="Delete Director"
      entity={{
        type: "director",
        name: director?.name ?? "",
      }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
