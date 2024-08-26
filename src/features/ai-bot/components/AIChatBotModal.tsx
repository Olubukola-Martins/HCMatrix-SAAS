import { Modal, Button } from "antd";
import Themes from "components/Themes";
import PreviousChatCard from "./PreviousChatCard";
import { IoIosArrowBack } from "react-icons/io";
import { randomNumber } from "../utils/randomNumber";
import { useEffect, useState } from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
  openSearchModal: () => void;
  openSettingsModal: () => void;
  openNewChatModal: (chatId: string) => void;
}

const AIChatBotModal = ({
  open,
  handleClose,
  openSearchModal,
  openSettingsModal,
  openNewChatModal,
}: IProps) => {
  const [chatList, setChatList] = useState<{ chatId: string; question: string; time: string; }[]>([]);

  useEffect(() => {
    const storedChatList = localStorage.getItem('chatList');
    if (storedChatList) {
      const chatList = JSON.parse(storedChatList);
      const sortedChatList = chatList.sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime());
      const latestChats = sortedChatList.slice(0, 5);

      setChatList(latestChats);
    }
  }, []);

  const handleStartNewChat = () => {
    const newChatId = randomNumber();
    openNewChatModal(newChatId);
  }

  const handleCardClick = (chatId: string) => {
    openNewChatModal(chatId);
  }

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 500, top: 10 }}
      footer={null}
      closable={false}
    >
      <Themes>
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => handleClose()}>
                <IoIosArrowBack  />
            </button>
            <h5 className="text-lg font-medium pl-9">HCMatrix AI Chatbot</h5>
            <div className="flex gap-2">
              <i
                onClick={() => openSearchModal()}
                className="ri-search-line text-xl cursor-pointer"
              ></i>
              <i
                onClick={() => openSettingsModal()}
                className="ri-settings-3-line text-xl cursor-pointer"
              ></i>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <button onClick={handleStartNewChat} className="button">
              + Start New Chat
            </button>
          </div>
          <div className="text-center text-sm font-normal mb-2">
            <span>Previous Chat</span>
          </div>
          <div className="space-y-3">
          {chatList.length > 0 ? (
            chatList.map((chat) => (
            <PreviousChatCard 
            key={chat.chatId}
            title={chat.question} 
            date={new Date(chat.time).toLocaleDateString()}
            chatId={chat.chatId}
            onClick={handleCardClick} 
            />
          ))
        ) : (
          <div className="text-center text-sm">No previous chats found.</div>
        )}
            <Button type="link" block>
              View all
            </Button>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default AIChatBotModal;
