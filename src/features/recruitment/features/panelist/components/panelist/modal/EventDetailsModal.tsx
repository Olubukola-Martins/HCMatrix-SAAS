import React from "react";
import { Modal } from "antd";
import { InterviewEvent } from "../InterviewCalendar";

interface EventDetailsModalProps {
  visible: boolean;
  event: InterviewEvent | null;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ visible, onClose, event }) => {
  return (
    <Modal title="Event Action" open={visible} onCancel={onClose} footer={null}>
      <p onClick={() => console.log("applicant", event?.person)} className="cursor-pointer w-full hover:bg-gray-100 hover:rounded px-2 py-2">
        View Details
      </p>
    </Modal>
  );
};

export default EventDetailsModal;
