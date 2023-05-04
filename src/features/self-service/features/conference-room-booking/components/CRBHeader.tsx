import { Modal } from "antd";
import React, { useState } from "react";
import NewCRBBooking from "./NewCRBBooking";
import NewMeetingRoomForm from "./NewMeetingRoomForm";

interface IProps {
  title?: string;
}

enum EAction {
  NEW_BOOKING = "New Booking",
  NEW_MEETING_ROOM = "New Meeting Room",
  NO_ACTION = "",
}

const CRBHeader = ({ title = "Meeting Rooms" }: IProps) => {
  const [showD, setShowD] = useState(false);
  const [action, setAction] = useState<EAction>(EAction.NO_ACTION);
  const handleAction = (val: EAction) => {
    setAction(val);
    setShowD(true);
  };
  return (
    <>
      <Modal
        visible={showD}
        onCancel={() => setShowD(false)}
        title={action}
        footer={null}
      >
        {action === EAction.NEW_BOOKING && (
          <NewCRBBooking handleClose={() => setShowD(false)} />
        )}
        {action === EAction.NEW_MEETING_ROOM && (
          <NewMeetingRoomForm handleClose={() => setShowD(false)} />
        )}
      </Modal>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-extrabold ">
          <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          <h2 className="text-xl md:text-2xl text-accent">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            className="button"
            onClick={() => handleAction(EAction.NEW_BOOKING)}
          >
            New Booking
          </button>
          <button
            className="borderButton"
            onClick={() => handleAction(EAction.NEW_MEETING_ROOM)}
          >
            Add Meeting Room
          </button>
        </div>
      </div>
    </>
  );
};

export default CRBHeader;
