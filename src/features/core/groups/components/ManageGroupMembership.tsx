import { Button } from "antd";
import React, { useState } from "react";
import { AddMemberToGroupForm } from "./AddMemberToGroupForm";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useApiAuth } from "hooks/useApiAuth";
import { useFetchSingleGroupMembers } from "../hooks/useFetchSingleGroupMembers";
import { TGroup } from "../types";
import { GroupMembers } from "./GroupMembers";

interface IProps {
  group: TGroup;
}

export const ManageGroupMembership: React.FunctionComponent<IProps> = ({
  group,
}) => {
  const [add, setAdd] = useState(false);

  const { token, companyId } = useApiAuth();

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
