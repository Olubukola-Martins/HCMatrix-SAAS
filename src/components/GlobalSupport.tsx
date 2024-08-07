import { Popover } from "antd";
import { useState } from "react";
import Themes from "./Themes";
import CustomerComplaintModal from "./customerComplaint/CustomerComplaintModal";
import AIChatBotModal from "features/ai-bot/components/AIChatBotModal";
import SearchAIChatBotModal from "features/ai-bot/components/SearchAIChatBotModal";
import SettingsAIChatBotModal from "features/ai-bot/components/SettingsAIChatBotModal";
import NewChatAIChatBotModal from "features/ai-bot/components/NewChatAIChatBotModal";

const GlobalSupport = () => {
  const [hovered, setHovered] = useState(false);
  const [queryModal, setQueryModal] = useState(false);
  const [aiModal, setAiModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [newChatModal, setNewChatModal] = useState(false);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  const handleOpenSearchModal =() => {
    setAiModal(false);
    setSearchModal(true);
  }

  const handleCloseSearchModal =() => {
    setSearchModal(false);
          setAiModal(true);
  }

  const handleOpenSettingsModal =() => {
    setAiModal(false);
    setSettingsModal(true);
  }

  const handleCloseSettingsModal =() => {
    setSettingsModal(false);
          setAiModal(true);
  }

  const handleOpenNewChatModal =() => {
    setAiModal(false);
    setNewChatModal(true);
  }

  const handleCloseNewChatModal =() => {
    setNewChatModal(false);
          setAiModal(true);
  }

  return (
    <>
      <Popover
        openClassName="support"
        // style={{ width: 200, margin: "0 20px" }}
        title={
          <div className="flex items-center gap-x-10  font-medium text-white">
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
                    <span className="group-hover:text-caramel">Help Video</span>
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
                    onClick={() => setAiModal(true)}
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
        open={aiModal} 
        handleClose={() => setAiModal(false)} 
        openSearchModal={handleOpenSearchModal}
        openSettingsModal={handleOpenSettingsModal}
        openNewChatModal={handleOpenNewChatModal}
      />

      <SearchAIChatBotModal
        open={searchModal}
        handleClose={handleCloseSearchModal}
      />

      <SettingsAIChatBotModal 
      open={settingsModal}
      handleClose={handleCloseSettingsModal}
      />

      <NewChatAIChatBotModal 
        open={newChatModal}
        handleClose={handleCloseNewChatModal}
      />
    </>
  );
};

export default GlobalSupport;
