import { Modal, Button, Empty } from "antd";
import Themes from "components/Themes";
import PreviousChatCard from "./PreviousChatCard";
import { IoIosArrowBack } from "react-icons/io";
import { randomNumber } from "../utils/randomNumber";
import { useEffect, useState } from "react";
import { usePagination } from "hooks/usePagination";

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
  const [chatList, setChatList] = useState<
    { chatId: string; question: string; time: string }[]
  >([]);
  const { pagination, onChange } = usePagination({ pageSize: 5 });

  useEffect(() => {
    const storedChatList = localStorage.getItem("chatList");
    if (storedChatList) {
      const chatList = JSON.parse(storedChatList);
      const sortedChatList = chatList.sort(
        (a: any, b: any) =>
          new Date(b.time).getTime() - new Date(a.time).getTime()
      );
      const chatMap = new Map<
        string,
        { chatId: string; question: string; time: string }
      >();

      sortedChatList.forEach(
        (chat: { chatId: string; question: string; time: string }) => {
          if (!chatMap.has(chat.chatId)) {
            chatMap.set(chat.chatId, chat);
          }
        }
      );
      const uniqueChatList = Array.from(chatMap.values());
      setChatList(uniqueChatList);
      onChange({ total: uniqueChatList.length });
    }
  }, []);

  const handleStartNewChat = () => {
    const newChatId = randomNumber();
    openNewChatModal(newChatId);
  };

  const handleCardClick = (chatId: string) => {
    openNewChatModal(chatId);
  };

  const startIndex = (pagination.current! - 1) * pagination.pageSize!;
  const endIndex = startIndex + pagination.pageSize!;
  const displayedChats = chatList.slice(startIndex, endIndex);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      style={{ maxWidth: 600, top: 10 }}
      footer={null}
      closable={false}
      width={600} 
    >
      <Themes>
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => handleClose()}>
              <IoIosArrowBack />
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
            {displayedChats.length > 0 ? (
              displayedChats.map((chat) => (
                <PreviousChatCard
                  key={chat.chatId}
                  title={chat.question}
                  date={new Date(chat.time).toLocaleDateString()}
                  chatId={chat.chatId}
                  onClick={handleCardClick}
                />
              ))
            ) : (
              <div className="flex flex-col h-full items-center justify-center">
                <Empty description="No previous chat" />
              </div>
            )}
            <div className="flex justify-between mt-4">
              {pagination.current! > 1 && (
                <Button
                  type="link"
                  block
                  onClick={() => onChange(pagination.current! - 1)}
                >
                  Back
                </Button>
              )}
              {endIndex < chatList.length && (
                <Button
                  type="link"
                  block
                  onClick={() => onChange(pagination.current! + 1)}
                >
                  View more
                </Button>
              )}
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default AIChatBotModal;
