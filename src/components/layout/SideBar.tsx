import { NavLink, useLocation } from "react-router-dom";
import "./style/style.css";
import { useGenerateDBSidebarLinks } from "hooks/dashboard/useGenerateDBSidebarLinks";
import { Skeleton } from "antd";
import { useState } from "react";
import AIChatBotModal from "features/ai-bot/components/AIChatBotModal";
import SearchAIChatBotModal from "features/ai-bot/components/SearchAIChatBotModal";
import SettingsAIChatBotModal from "features/ai-bot/components/SettingsAIChatBotModal";
import NewChatAIChatBotModal from "features/ai-bot/components/NewChatAIChatBotModal";

type TModal = "ai-modal" | "search-modal" | "settings-modal" | "new-chat-modal";

const SideBar = () => {
  const [currentModal, setCurrentModal] = useState<TModal>();
  const [chatId, setChatId] = useState<string>("");
  const { pathname } = useLocation();
  const { sidebarRoutes, isLoading } = useGenerateDBSidebarLinks();
  const isActiveRoute = (matcherKeys?: string[]) => {
    return matcherKeys?.some(
      (item) => pathname.toLowerCase().indexOf(item.toLowerCase()) !== -1
    );
  };

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
      <Skeleton loading={isLoading} paragraph={{ rows: 7 }}>
        <div className="h-screen overflow-y-auto flex-col bg-card flex items-center px-2 text-center pb-32 scrollBar">
          {sidebarRoutes
            .filter((item) => item.hidden === false)
            .map((route) => {
              const isActive = isActiveRoute(route.matcherKeys);

              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={`sideBarItemWrap ${isActive ? "active" : ""}`}
                >
                  <div className="flex justify-center">
                    <span className="sideBarList">{route.icon}</span>
                  </div>
                  <span className="sideBarName">{route.name}</span>
                </NavLink>
              );
            })}
          <div
            className="sideBarItemWrap cursor-pointer"
            onClick={() => handleOpenModal("ai-modal")}
          >
            <div className="flex justify-center">
              <i className="ri-robot-line text-xl sideBarList"></i>
            </div>
            <span className="sideBarName">AI Chatbot</span>
          </div>
        </div>
      </Skeleton>

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

export default SideBar;
