import { Popover } from "antd";
import { useState } from "react";
import Themes from "./Themes";
import CustomerComplaintModal from "./customerComplaint/CustomerComplaintModal";
import AIChatBotModal from "features/ai-bot/components/AIChatBotModal";
import SearchAIChatBotModal from "features/ai-bot/components/SearchAIChatBotModal";
import SettingsAIChatBotModal from "features/ai-bot/components/SettingsAIChatBotModal";
import NewChatAIChatBotModal from "features/ai-bot/components/NewChatAIChatBotModal";

type TModal = 'ai-modal' | 'search-modal' | 'settings-modal' | 'new-chat-modal';

const GlobalSupport = () => {
  const [hovered, setHovered] = useState(false);
  const [queryModal, setQueryModal] = useState(false);
  const [currentModal, setCurrentModal] = useState<TModal>();
  const [chatId, setChatId] = useState<string>("");

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleHoverChange = (open: boolean) => {
    setHovered(open);
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

  return (
    <>
      <Popover
        openClassName="support"
        // style={{ width: 200, margin: "0 20px" }}
        title={
          <div className="flex items-center gap-x-10  font-medium text-white" style={{ background: 'var(--caramel)', width: '100%', padding: '10px' }}>
            <span>HCMatrix Quick Links</span>
            <i
              className="ri-close-line cursor-pointer"
              onClick={() => setHovered(false)}
            ></i>
          </div>
        }
        open={hovered}
        onOpenChange={handleHoverChange}
        trigger="click"
        content={
          <Themes>
            <div className="rounded-md">
              <div className=" font-medium">
                <ul className="flex flex-col gap-y-3">
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-movie-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://snapnet.sharepoint.com/:f:/s/hcmatrix3userguide/EvWZGPYnhV5MraKLKZvJJHcBHzcRCvjbUiAlv-YvGQEqHA?e=ReptHw"
                      className="group-hover:text-caramel"
                    >
                      Help Videos
                    </a>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-book-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://user-guide-frontend-h3-0.vercel.app/"
                      className="group-hover:text-caramel"
                    >
                      User Guide
                    </a>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-phone-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://snapnet.3cx.ng/LiveChat397407"
                      className="group-hover:text-caramel"
                    >
                      Call
                    </a>
                  </li>
                  <li className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group">
                    <i className="ri-whatsapp-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://api.whatsapp.com/send?phone=1%20(254)%20244-0305&text=Hello,%20I%20have%20a%20question%20about%20http%3A%2F%2Flocalhost%3A3000%2F"
                      className="group-hover:text-green-500"
                    >
                      WhatsApp
                    </a>
                  </li>
                  <li
                    // onClick={() => setQueryModal(true)}
                    className="flex items-center gap-x-5 border-b-2 pb-1  cursor-pointer group"
                  >
                    <i className="ri-mail-line text-xl"></i>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://hcmatrixsupport.powerappsportals.com/Account/Login/Register?returnUrl=%2Fsupport%2Fcreate-case%2F"
                      className="group-hover:text-green-500"
                    >
                      Drop Complaint
                    </a>
                    {/* <span className="group-hover:text-caramel">
                      Drop Complaint
                    </span> */}
                  </li>
                  <li
                    onClick={() => handleOpenModal('ai-modal')}
                    className="flex items-center gap-x-5 pb-1 cursor-pointer group"
                  >
                    <i className="ri-robot-line text-xl"></i>
                    <span className="group-hover:text-caramel">AI Chatbot</span>
                  </li>
                </ul>
              </div>
            </div>
          </Themes>
        }
      >
        <i
          style={{ borderWidth: "6px" }}
          className="ri-question-mark text-lg z-50 cursor-pointer font-semibold text-caramel border-caramel bg-white h-10 w-10 flex items-center rounded-full justify-center fixed bottom-10 right-3"
        ></i>
      </Popover>

      <CustomerComplaintModal
        open={queryModal}
        handleClose={() => setQueryModal(false)}
      />

      <AIChatBotModal 
        open={currentModal === 'ai-modal'}
        handleClose={handleCloseModal}
        openSearchModal={() => handleOpenModal('search-modal')}
        openSettingsModal={() => handleOpenModal('settings-modal')}
        openNewChatModal={(chatId) => handleOpenModal('new-chat-modal', chatId)}
      />

      <SearchAIChatBotModal
        open={currentModal === 'search-modal'}
        handleClose={handleCloseModal}
      />

      <SettingsAIChatBotModal 
       open={currentModal === 'settings-modal'}
       handleClose={handleCloseModal}
      />

      <NewChatAIChatBotModal 
        open={currentModal === 'new-chat-modal'}
        handleClose={handleCloseModal}
        chatId={chatId}
      />
    </>
  );
};

export default GlobalSupport;
