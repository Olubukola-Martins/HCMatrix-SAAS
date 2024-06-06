import { Button } from "antd";
import React, { useState } from "react";
import NewCRBBooking from "./NewCRBBooking";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

import { SettingFilled } from "@ant-design/icons";
import NewMeetingRoom from "./NewMeetingRoom";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";
import { PageIntro } from "components/layout/PageIntro";

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
  const { userPermissions } = useGetUserPermissions();
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
        <PageIntro link={backLink} title={title} />
        <div className="flex gap-2 items-center">
          <button
            className="button"
            onClick={() => handleAction(EAction.NEW_BOOKING)}
          >
            New Booking
          </button>
          {canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["manage-conference-room"],
          }) && (
            <button
              className="borderButton"
              onClick={() => handleAction(EAction.NEW_MEETING_ROOM)}
            >
              Add Meeting Room
            </button>
          )}
          {canUserAccessComponent({
            userPermissions,
            requiredPermissions: ["manage-conference-room-settings"],
          }) && (
            <Link to={appRoutes.conferenceRoomBookingSetting}>
              <Button icon={<SettingFilled />} type="text" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CRBHeader;
