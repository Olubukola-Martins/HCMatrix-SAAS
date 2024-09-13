import { useState } from "react";
import AIChatBotModal from "features/ai-bot/components/AIChatBotModal";
import SearchAIChatBotModal from "features/ai-bot/components/SearchAIChatBotModal";
import SettingsAIChatBotModal from "features/ai-bot/components/SettingsAIChatBotModal";
import NewChatAIChatBotModal from "features/ai-bot/components/NewChatAIChatBotModal";

type TModal = "ai-modal" | "search-modal" | "settings-modal" | "new-chat-modal";

const AIChatBotManager = () => {
  const [currentModal, setCurrentModal] = useState<TModal | undefined>();
  const [chatId, setChatId] = useState<string>("");

  const handleOpenModal = (modal: TModal, chatId?: string) => {
    if (chatId) {
      setChatId(chatId);
    }
    setCurrentModal(modal);
  };

  const handleCloseModal = () => {
    setCurrentModal(undefined);
    setChatId("");
  };

  const handleSelectChat = (selectedChatId: string) => {
    handleCloseModal();
    handleOpenModal("new-chat-modal", selectedChatId);
  };

  return (
    <>
      <div
        className="sideBarItemWrap cursor-pointer"
        onClick={() => handleOpenModal("ai-modal")}
      >
        <div className="flex justify-center">
          <i className="ri-robot-line text-xl sideBarList"></i>
        </div>
        <span className="sideBarName">AI Chatbot</span>
      </div>
      <AIChatBotModal
        open={currentModal === "ai-modal"}
        handleClose={handleCloseModal}
        openSearchModal={() => handleOpenModal("search-modal")}
        openSettingsModal={() => handleOpenModal("settings-modal")}
        openNewChatModal={(chatId) => handleOpenModal("new-chat-modal", chatId)}
      />

      <SearchAIChatBotModal
        open={currentModal === "search-modal"}
        handleClose={handleCloseModal}
        onSelectChat={handleSelectChat}
      />

      <SettingsAIChatBotModal
        open={currentModal === "settings-modal"}
        handleClose={handleCloseModal}
      />

      <NewChatAIChatBotModal
        open={currentModal === "new-chat-modal"}
        handleClose={handleCloseModal}
        chatId={chatId}
      />
    </>
  );
};

export default AIChatBotManager;
