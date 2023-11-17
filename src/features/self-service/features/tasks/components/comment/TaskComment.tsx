import { Button, Drawer } from "antd";
import React from "react";
import { IModalProps } from "types";
import { MessageBox, Input, MessageList } from "react-chat-elements";
import { SendOutlined } from "@ant-design/icons";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";

interface IProps extends IModalProps {
  taskId?: number;
  taskName?: string;
}
const TaskComment: React.FC<IProps> = ({ open, handleClose, taskName }) => {
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      footer={null}
      size="large"
      title={`${taskName}'s Comments`}
    >
      <div className="flex flex-col gap-4 h-full justify-between">
        <div>
          <MessageList
            children={<div>teset me</div>}
            dataSource={[
              {
                text: "Following the Ant Design specification, we developed a React UI library antd that contains a set of high quality components and demos for building rich, interactive user interfaces.",
                title: "Logan Odedww",
                date: new Date(),
                type: "text",
                id: "o",
                titleColor: "red",
                position: "left",
                focus: false,
                forwarded: false,
                replyButton: false,
                removeButton: false,
                retracted: false,
                notch: false,
                status: "read",
                letterItem: {
                  id: "ew",
                  letter: "L",
                },
              },
            ]}
            lockable
            referance={null}
          />
          {/* TODO: Create a message list comp */}
        </div>
        <div className="bg-gray-100 px-4 py-2">
          <Input
            placeholder="Type here..."
            multiline={true}
            maxHeight={400}
            minHeight={50}
            rightButtons={
              <div className="flex gap-4">
                <Button icon={<SendOutlined />} type="text" />
              </div>
            }
          />
        </div>
      </div>
    </Drawer>
  );
};

export default TaskComment;
