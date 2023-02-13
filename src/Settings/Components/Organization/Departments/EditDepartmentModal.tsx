import { Modal } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";

import EditDepartmentForm from "./EditDepartmentForm";

interface IProps extends IModalProps {
  departmentId: number;
}

export const EditDepartmentModal = ({
  open,
  handleClose,
  departmentId,
}: IProps) => {
  return (
    <Modal
      title="Edit Department"
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 20 }}
    >
      {departmentId !== 0 && (
        <EditDepartmentForm
          handleClose={handleClose}
          departmentId={departmentId}
        />
      )}
    </Modal>
  );
};
