import { Modal, Button } from "antd";
import Themes from "components/Themes";
import PreviousChatCard from "./PreviousChatCard";
import { IoIosArrowBack } from "react-icons/io";

interface IProps {
  open: boolean;
  handleClose: Function;
  openSearchModal: Function;
  openSettingsModal: Function;
  openNewChatModal: Function;
}

const AIChatBotModal = ({
  open,
  handleClose,
  openSearchModal,
  openSettingsModal,
  openNewChatModal,
}: IProps) => {
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
            <button onClick={() => openNewChatModal()} className="button">
              + Start New Chat
            </button>
          </div>
          <div className="text-center text-sm font-normal mb-2">
            <span>Previous Chat</span>
          </div>
          <div className="space-y-3">
            <PreviousChatCard title="Login Issue...." date="19 - 03 - 2024" />
            <PreviousChatCard
              title="Clarification about ...."
              date="19 - 03 - 2024"
            />
            <PreviousChatCard
              title="Clarification about ...."
              date="19 - 03 - 2024"
            />
            <PreviousChatCard
              title="Clarification about ...."
              date="19 - 03 - 2024"
            />
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
