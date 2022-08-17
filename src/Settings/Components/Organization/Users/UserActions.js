import React from "react";

const UserActions = () => {
  return (
    <div className="Container">
      <div className="bg-card mb-2">
        {/* <div className="flex justify-end">
          <span className="pr-3 pb-2 cursor-pointer">x</span>
        </div> */}
        <div className="px-3 py-4 text-caramel font-semibold text-sm grid grid-cols-5 gap-x-8 gap-y-4 flex-wrap">
          <button className="rounded border py-1 border-caramel">
            Delete Users
          </button>

          <button className="rounded border py-1 border-caramel">
            Resend Invitations
          </button>
          {/* <button className="rounded border py-1 border-caramel">Others</button> */}
          <button className="rounded border py-1 border-caramel">
            Convert to Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserActions;
