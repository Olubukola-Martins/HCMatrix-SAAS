import { Button } from "antd";
import React, { useState } from "react";
import NewCRBBooking from "./NewCRBBooking";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

import { SettingFilled } from "@ant-design/icons";
import NewMeetingRoom from "./NewMeetingRoom";

interface IProps {
  title?: string;
  backLink: string;
}

enum EAction {
  NEW_BOOKING = "New Booking",
  NEW_MEETING_ROOM = "New Meeting Room",
}

const CRBHeader = ({ title = "Conference Rooms", backLink }: IProps) => {
  const [action, setAction] = useState<EAction>();
  const handleAction = (val: EAction) => {
    setAction(val);
  };
  return (
    <>
      <NewCRBBooking
        open={action === EAction.NEW_BOOKING}
        handleClose={() => setAction(undefined)}
      />
      <NewMeetingRoom
        open={action === EAction.NEW_MEETING_ROOM}
        handleClose={() => setAction(undefined)}
      />

      {/* TO DO: Refactor to use the comp header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 font-extrabold ">
          <Link to={backLink}>
            <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel" />
          </Link>
          <h2 className="text-xl md:text-2xl text-accent">{title}</h2>
        </div>
        <div className="flex gap-2 items-center">
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
          <Link to={appRoutes.conferenceRoomBookingSetting}>
            <Button icon={<SettingFilled />} type="text" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CRBHeader;
