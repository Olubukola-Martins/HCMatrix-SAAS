import { Button } from "antd";
import React, { useContext, useState } from "react";
import { AddMemberToGroupForm } from "./AddMemberToGroupForm";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { TGroup } from "AppTypes/DataEntitities";
import { GroupMembers } from "./GroupMembers";
import { useFetchSingleGroupMembers } from "APIRQHooks/Utility/groupHooks";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { useAuthUser } from "react-auth-kit";

interface IProps {
  group: TGroup;
}

export const ManageGroupMembership: React.FunctionComponent<IProps> = ({
  group,
}) => {
  const [add, setAdd] = useState(false);

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const {
    data: membersData,

    isLoading,
  } = useFetchSingleGroupMembers({
    companyId,
    id: group.id as number,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },

    token,
  });
  return (
    <div className="flex flex-col gap-4">
      {/* add member to group form */}
      <div className="flex justify-end">
        <Button
          type="ghost"
          icon={!add ? <PlusOutlined /> : <MinusOutlined />}
          onClick={() => setAdd((val) => !val)}
        >
          {!add ? "Add Member" : "Done"}
        </Button>
      </div>
      {add && <AddMemberToGroupForm group={group} />}
      {/* list of members and ability to edit */}
      {
        <GroupMembers
          data={membersData?.data}
          loading={isLoading}
          group={group}
        />
      }
    </div>
  );
};
