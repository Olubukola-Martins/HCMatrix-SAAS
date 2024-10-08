import { Button, Drawer, Empty, Skeleton, Input } from "antd";
import React, { useState } from "react";
import { IModalProps } from "types";
import SendMessageIcon from "assets/svg-components/SendMessageIcon/SendMessageIcon";
// import PhotoIcon from "assets/svg-components/PhotoIcon/PhotoIcon";
// import AttachmentIcon from "assets/svg-components/AttachmentIcon/AttachmentIcon";
import {
  QUERY_KEY_FOR_SINGLE_TASK_COMMENTS,
  useGetAllTaskComments,
} from "../../hooks/comment/useGetAllTaskComments";
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
            {data && data?.total > 0
              ? data.data.map((item, i) =>
                  employee?.id !== item.commenter.id ? (
                    <LeftMessage
                      comment={item.comment}
                      avatarUrl={item.commenter.avatarUrl}
                    />
                  ) : (
                    <RightMessage
                      comment={item.comment}
                      avatarUrl={item.commenter.avatarUrl}
                    />
                  )
                )
              : null}
          </Skeleton>
        </div>
        <div className="px-6 pt-4 pb-10 flex gap-2 sticky bg-white shadow-2xl bottom-0 w-full right-0 left-0">
          {/* <div className="flex gap-4">
            <Button icon={<PhotoIcon />} type="text" />
            <Button icon={<AttachmentIcon />} type="text" />
          </div> */}
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

const LeftMessage: React.FC<{ comment: string; avatarUrl?: string }> = ({
  avatarUrl,
  comment,
}) => {
  return (
    <div className="flex justify-start mb-4">
      <img
        src={avatarUrl}
        className="object-cover h-8 w-8 rounded-full self-end"
        alt=""
        loading="lazy"
      />
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {comment}
      </div>
    </div>
  );
};
const RightMessage: React.FC<{ comment: string; avatarUrl?: string }> = ({
  avatarUrl,
  comment,
}) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="mr-2 py-3 px-4 bg-caramel rounded-bl-3xl rounded-br-3xl rounded-tl-xl text-white">
        {comment}
      </div>
      <img
        src={avatarUrl}
        className="object-cover h-8 w-8 rounded-full self-start -top-2 relative"
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default TaskComment;
