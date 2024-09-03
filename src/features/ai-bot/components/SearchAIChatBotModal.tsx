import { Empty, Modal } from "antd";
import Themes from "components/Themes";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import PreviousChatCard from "./PreviousChatCard";

interface IProps {
  open: boolean;
  handleClose: () => void;
}

const SearchAIChatBotModal = ({ open, handleClose }: IProps) => { 
  const [searchTerm, setSearchTerm] = useState("");
  const [chatList, setChatList] = useState<
    { chatId: string; question: string; time: string }[]
  >([]);
  const [filteredChats, setFilteredChats] = useState<
    { chatId: string; question: string; time: string }[]
  >([]);

  useEffect(() => {
    const storedChatList = localStorage.getItem("chatList");
    if (storedChatList) {
      const chatList = JSON.parse(storedChatList);
      setChatList(chatList);
      setFilteredChats(chatList); // Initialize with all chats
    }
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = chatList.filter((chat) =>
        chat.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats([]); // Clear results if search term is empty
    }
  }, [searchTerm, chatList]);

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
          <h5 className="text-sm font-medium text-center">Search</h5>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-9 text-sm border rounded-full focus:outline-none focus:border-blue-400"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <i className="ri-search-line text-gray-400"></i>
          </div>
        </div>
        <div className="space-y-3">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <PreviousChatCard
                key={chat.chatId}
                title={chat.question}
                date={new Date(chat.time).toLocaleDateString()}
                chatId={chat.chatId}
                onClick={() => {
                  handleClose(); // Close the search modal
                  // You can handle the click event here or pass a prop to handle it
                }}
              />
            ))
          ) : searchTerm ? (
            <div className="flex flex-col h-full items-center justify-center">
              <Empty description="No matching chats found" />
            </div>
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <Empty description="Start typing to search for chats" />
            </div>
          )}
        </div>
      </Themes>
    </Modal>
  );
};

export default SearchAIChatBotModal;
