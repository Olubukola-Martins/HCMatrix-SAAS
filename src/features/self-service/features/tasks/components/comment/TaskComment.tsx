import { Button, Drawer, Empty, Skeleton, Input } from "antd";
import React, { useState } from "react";
import { IModalProps } from "types";
import { MessageList } from "react-chat-elements";
import SendMessageIcon from "assets/svg-components/SendMessageIcon/SendMessageIcon";
import PhotoIcon from "assets/svg-components/PhotoIcon/PhotoIcon";
import AttachmentIcon from "assets/svg-components/AttachmentIcon/AttachmentIcon";
import {
  QUERY_KEY_FOR_SINGLE_TASK_COMMENTS,
  useGetAllTaskComments,
} from "../../hooks/comment/useGetAllTaskComments";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddTaskComment } from "../../hooks/comment/useAddTaskComment";

interface IProps extends IModalProps {
  taskId?: number;
  taskName?: string;
}
const TaskComment: React.FC<IProps> = ({
  open,
  handleClose,
  taskName,
  taskId,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetAllTaskComments({ taskId });
  const { currentCompanyEmployeeDetails: employee } = useMostRecentApiAuth();
  const { mutate, isLoading: isSending } = useAddTaskComment();
  const [message, setMessage] = useState<string>();
  const handleSend = () => {
    if (!taskId || !message) return;
    mutate(
      {
        taskId,
        body: {
          comment: message,
        },
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
          setMessage(undefined);
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_TASK_COMMENTS, taskId],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      footer={null}
      size="large"
      title={`${taskName}'s Comments`}
      bodyStyle={{ padding: 0, margin: 0 }}
    >
      <div className="flex flex-col gap-4 h-full justify-between relative ">
        <div className="mb-24 px-6 pt-4">
          <Skeleton loading={isLoading} active paragraph={{ rows: 14 }}>
            {data && data?.total === 0 ? (
              <div className="flex flex-col h-full items-center justify-center">
                <Empty description="No comments yet" />
              </div>
            ) : null}
            <MessageList
              toBottomHeight={"100%"}
              className="message-list"
              dataSource={
                !data
                  ? []
                  : data?.data.map((comment) => ({
                      avatar: comment.commenter.avatarUrl,
                      text: comment.comment,
                      title: getEmployeeFullName(comment.commenter),
                      date: new Date(comment.createdAt),
                      type: "text",
                      id: comment.id,
                      titleColor: "red",
                      position:
                        comment.commenter.id === employee?.id
                          ? "left"
                          : "right",
                      focus: false,
                      forwarded: false,
                      replyButton: false,
                      removeButton: false,
                      retracted: false,
                      notch: false,
                      status: "read",
                    }))
              }
              referance={null}
              lockable
            />
          </Skeleton>
        </div>
        <div className="px-6 pt-4 pb-10 flex gap-2 sticky bg-white shadow-2xl bottom-0 w-full right-0 left-0">
          <div className="flex gap-4">
            <Button icon={<PhotoIcon />} type="text" />
            <Button icon={<AttachmentIcon />} type="text" />
          </div>
          <div className="flex gap-4 flex-1">
            <Input
              className="rounded-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter comment"
              onPressEnter={handleSend}
              disabled={isSending}
            />
            <Button
              icon={<SendMessageIcon />}
              type="text"
              onClick={handleSend}
              loading={isSending}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default TaskComment;
