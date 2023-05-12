import React, { useState } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { TLeaveType } from "../types";
import { Button, Dropdown, Menu } from "antd";
import useDeleteLeaveType from "../hooks/useDeleteLeaveType";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "../hooks/useFetchLeaveTypes";
import { useQueryClient } from "react-query";
import ViewOrEditLeaveType from "./ViewOrEditLeaveType";

export const LeaveTypeCard: React.FC<{ data: TLeaveType }> = ({ data }) => {
  const queryClient = useQueryClient();
  const { mutate } = useDeleteLeaveType();
  const handleDelete = () => {
    mutate(
      {
        id: data.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LEAVE_TYPES],
            // exact: true,
          });
        },
      }
    );
  };
  const [showM, setShowM] = useState(false);
  const [type, setType] = useState<"view" | "edit">("view");
  return (
    <>
      <ViewOrEditLeaveType
        data={data}
        open={showM}
        handleClose={() => setShowM(false)}
        type={type}
      />
      <div className="bg-card py-4 px-3 flex justify-between align-center rounded-md">
        <h5 className="text-base ">{data.name}</h5>
        <Dropdown
          overlay={
            <Menu>
              {[
                {
                  label: "View",
                  onClick: () => {
                    setType("view");
                    setShowM(true);
                  },
                },
                {
                  label: "Edit",
                  onClick: () => {
                    setType("edit");
                    setShowM(true);
                  },
                },
                {
                  label: "delete",
                  onClick: () => {
                    handleDelete();
                  },
                },
              ].map((item) => (
                <Menu.Item key={item.label} onClick={item.onClick}>
                  <span className="capitalize">{item.label}</span>
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      </div>
    </>
  );
};
