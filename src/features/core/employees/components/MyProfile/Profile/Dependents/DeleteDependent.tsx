import React from "react";
import { IModalProps } from "types";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { TSingleEmployee } from "features/core/employees/types";

interface IProps extends IModalProps {
  dependent: TSingleEmployee["dependents"][0];
  employeeId: number;
  onSubmit: {
    fn: (
      dependent: TSingleEmployee["dependents"][0],
      successCallBack?: () => void
    ) => void;
    isLoading?: boolean;
  };
}
export const DeleteDependent: React.FC<IProps> = ({
  open,
  handleClose,
  dependent,
  employeeId,
  onSubmit,
}) => {
  const handleDelete = () => {
    onSubmit.fn(dependent, () => {
      handleClose();
    });
  };
  return (
    <DeleteEntityModal
      title="Delete Dependent"
      entity={{ type: "dependent", name: dependent.fullName }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: onSubmit?.isLoading }}
    />
  );
};
