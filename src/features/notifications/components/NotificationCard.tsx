import React, { useState } from "react";
import { TNotification } from "../types";
import { Badge, Dropdown } from "antd";
import moment from "moment";
import { useReadSingleAlert } from "../hooks/read/useReadSingleAlert";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_NOTIFICATIONS } from "../hooks/useGetAlerts";
import { useQueryClient } from "react-query";
import { DeleteNotification } from "./DeleteNotification";
import { LoadingOutlined } from "@ant-design/icons";
import ViewNotification from "./ViewNotification";

type TAction = "delete" | "view";
export const NotificationCard: React.FC<{ item: TNotification }> = ({
  item,
}) => {
  const queryClient = useQueryClient();

  const { mutate: readMut, isLoading } = useReadSingleAlert();
  const [content, setContent] = useState<TNotification["content"]>();

  const handleRead = () => {
    readMut(
      {
        alertId: item.id,
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
        onSuccess: (res) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.setQueriesData(
            [QUERY_KEY_FOR_NOTIFICATIONS],
            (val: unknown): { data: TNotification[]; total: number } => {
              const data = val as { data: TNotification[]; total: number };
              const updateData = data.data.map((notification) =>
                notification.id === item.id
                  ? {
                      ...notification,
                      isRead: true,
                    }
                  : notification
              );
              return { data: updateData, total: data.total };
            }
          );
        },
      }
    );
  };
  const [action, setAction] = useState<TAction>();
  const handleDel = () => {
    setAction("delete");
  };
  const onClear = () => {
    setAction(undefined);
  };
  return (
    <>
      <DeleteNotification
        open={action === "delete"}
        data={item}
        handleClose={onClear}
      />
      <ViewNotification
        handleClose={onClear}
        open={action === "view"}
        content={content}
      />
      <div className="border rounded mt-4 px-3 py-3 cursor-pointer hover:bg-card flex md:justify-between gap-x-5">
        <div className="flex items-center gap-3">
          <Badge dot={!item.isRead}>
            <i className="ri-notification-3-line text-lg"></i>
          </Badge>
          <div>
            <h5 className="text-xs md:text-sm">
              {item.title} : {item.message}
            </h5>
            <span className="text-xs md:hidden pt-2 block">
              {moment(item.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="md:flex items-center hidden gap-2 text-accent">
            <i className="ri-timer-line text-base"></i>
            <span>{moment(item.createdAt).fromNow()}</span>
          </div>
          <Dropdown
            getPopupContainer={(triggerNode) =>
              triggerNode.parentElement as HTMLElement
            }
            overlay={
              <div className="bg-mainBg flex flex-col gap-2 rounded shadow-sm py-3 px-2 text-xs border font-medium">
                {!item.isRead ? (
                  <div
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={handleRead}
                  >
                    <i className="ri-chat-check-line"></i>
                    <span className="group-hover:text-caramel">
                      Mark as read
                    </span>
                    {isLoading ? <LoadingOutlined /> : null}
                  </div>
                ) : null}
                <div
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={handleRead}
                >
                  <i className="ri-eye-line"></i>
                  <span
                    className="group-hover:text-caramel"
                    onClick={() => {
                      setAction("view");
                      setContent(item.content);
                    }}
                  >
                    View Notification
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 cursor-pointer group mt-2"
                  onClick={handleDel}
                >
                  <i className="ri-delete-bin-line"></i>
                  <span className="group-hover:text-caramel">
                    Delete Notification
                  </span>
                </div>
              </div>
            }
            trigger={["click"]}
          >
            <i className="ri-more-2-fill text-lg"></i>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
