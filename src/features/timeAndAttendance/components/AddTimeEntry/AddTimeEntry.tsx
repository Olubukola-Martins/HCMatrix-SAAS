import { Modal, Tabs } from "antd";
import { IModalProps } from "types";
import { TimeEntryForm } from "./TimeEntryForm";
import { HourEntryForm } from "./HourEntryForm";

export const AddTimeEntry = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Manual Time Entry"
      style={{ top: 15 }}
    >
      <Tabs
        defaultActiveKey="1"
        centered
        items={[
          {
            key: "1",
            label: (
              <div className="flex items-center gap-2 text-base">
                <span>Time Entry</span>
                <i className="ri-error-warning-line"></i>
              </div>
            ),
            children: <TimeEntryForm />,
          },
          {
            key: "2",
            label: (
              <div className="flex items-center gap-2 text-base">
                <span>Hour Entry</span>
                <i className="ri-error-warning-line"></i>
              </div>
            ),
            children: <HourEntryForm />,
          },
        ]}
      />
    </Modal>
  );
};
