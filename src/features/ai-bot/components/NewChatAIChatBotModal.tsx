import { Button, Empty, Input, Modal } from "antd";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Themes from "components/Themes";
import AttachmentIcon from "assets/svg-components/AttachmentIcon/AttachmentIcon";
import SendMessageIcon from "assets/svg-components/SendMessageIcon/SendMessageIcon";

interface IProps {
  open: boolean;
  handleClose: Function;
}

const NewChatAIChatBotModal = ({ open, handleClose }: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
      closable={false}
    >
      <Themes>
        <div className="relative mb-4">
          <button onClick={() => handleClose()} className="absolute left-0">
            <IoIosArrowBack  />
          </button>
          <h5 className="text-sm font-medium text-center">New Chat</h5>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between relative ">
        <div className="mb-24 px-6 pt-4">
          {/* <Skeleton loading={isLoading} active paragraph={{ rows: 14 }}> */}
            {/* {data && data?.total === 0 ? (
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
              : null} */}
          {/* </Skeleton> */}
          <Empty description="No chat yet" />
        </div>
        <div className="px-6 pt-4 pb-10 flex gap-2 sticky bg-white shadow-2xl bottom-0 w-full right-0 left-0">
          <div className="flex gap-4">
            <Button icon={<AttachmentIcon />} type="text" />
          </div>
          <div className="flex gap-4 flex-1">
            <Input
              className="rounded-full"
            //   value={message}
            //   onChange={(e) => setMessage(e.target.value)}
              placeholder="Start Chat"
            //   onPressEnter={handleSend}
            //   disabled={isSending}
            />
            <Button
              icon={<SendMessageIcon />}
              type="text"
            //   onClick={handleSend}
            //   loading={isSending}
            />
          </div>
        </div>
      </div>

      
      </Themes>
    </Modal>
  );
};

export default NewChatAIChatBotModal;
