import { AppButton } from "components/button/AppButton";
import React from "react";

interface IProps {
  days: number;
  hours: number;
  minutes: number;
}

const InviteTimer = ({ days, hours, minutes }: IProps) => {
  return (
    <div className="w-fit mx-[2px] flex flex-col gap-y-2 items-center">
      <p className="opacity-85">You have</p>
      <p className="text-caramel whitespace-nowrap">
        <span className="text-3xl">{days}</span>day : <span className="text-3xl">{hours}</span>hr : <span className="text-3xl">{minutes}</span>min
      </p>
      <div className="flex gap-x-2">
        <AppButton label="Accept Invite" /> <AppButton label="Reject Invite" variant="transparent" />
      </div>
    </div>
  );
};

export default InviteTimer;
