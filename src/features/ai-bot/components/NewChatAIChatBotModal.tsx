import { Button, Empty, Input, Modal, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Themes from "components/Themes";
import AttachmentIcon from "assets/svg-components/AttachmentIcon/AttachmentIcon";
import SendMessageIcon from "assets/svg-components/SendMessageIcon/SendMessageIcon";
import { useGetChatHistory } from "../hooks/useGetChatHistory";
import { useAddChatText } from "../hooks/useAddChatText";
// import { useGetChatAudio } from "../hooks/useGetChatAudio";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";

interface IProps {
  open: boolean;
  handleClose: Function;
  chatId: string;
}

const NewChatAIChatBotModal = ({ open, handleClose, chatId }: IProps) => {
  
  console.log("Received chatId in NewChatAIChatBotModal:",chatId);
  const queryClient = useQueryClient();
  
  const [message, setMessage] = useState<string>();
  const [localChatHistory, setLocalChatHistory] = useState<any[]>([]);

  // const { currentCompanyEmployeeDetails: employee } = useMostRecentApiAuth();
  // const employeeId = employee?.id;
  // const { data: singleEmployee } = useFetchSingleEmployee({employeeId: employeeId || 0 });
  const { data: chatHistory, isLoading: isLoadingHistory } = useGetChatHistory({
    employee_id:"372",
    company_id: "53",
    chat_id: chatId,
    // company_id: singleEmployee?.companyId.toString() || "",
    // chat_id: chatId || "",
    // employee_id: employeeId?.toString() || "",
  });
  const { mutate: sendChatMessage, isLoading: isSendingText } = useAddChatText();
  // const { mutate: sendVoiceMessage, isLoading: isSendingVoice } = useGetChatAudio();

  useEffect(() => {
    const storedChatHistory = localStorage.getItem(`chat-history-${chatId}`);
    if (storedChatHistory) {
      setLocalChatHistory(JSON.parse(storedChatHistory));
    } else if (chatHistory) {
      setLocalChatHistory(chatHistory);
    }
  }, [chatHistory, chatId]);


  const handleSendMessage = () => {
    if (!message) return;

    const newMessage = {
      user_query: message,
        audio: false,
        chat_id: chatId,
        employee_metadata: {
          department_id: "43",
          role_id: "323",
          group_id:  "54",
          company_id:  "53",
          id: "372",
          // department_id: singleEmployee?.designation?.department?.id.toString() || "",
          // role_id: singleEmployee?.roleId.toString() || "",
          // group_id: singleEmployee?.userGroups?.[0]?.id.toString() || "",
          // company_id: singleEmployee?.companyId.toString() || "",
          // id: singleEmployee?.id.toString() || "",
      },
    };
    sendChatMessage(
      newMessage,
       {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
        const chatObject = {
          chatId: res.chat_id, 
          question: res.question,
          time: res.timestamp,
        };

        const existingChatList = JSON.parse(localStorage.getItem('chatList') || '[]');
        const updatedChatList = [...existingChatList, chatObject];
        localStorage.setItem('chatList', JSON.stringify(updatedChatList));

          setMessage(undefined);
          queryClient.invalidateQueries({
            queryKey: ["chat-history", chatId],
            // exact: true,
          });
        },
      });
  };

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
           <Skeleton loading={isLoadingHistory} active paragraph={{ rows: 14 }}>
              {chatHistory && chatHistory.length > 0 ? (
                <div className="flex flex-col">
                {chatHistory.map((item, index) => (
                  <div key={index}>
                  {item.employee_metadata.id === "372" && (
                  // === employee?.id?.toString() ? ( 
                    <RightMessage
                      message={item.question}
                    />
                   ) }
                    <LeftMessage
                      message={item.answer}
                    />
                   </div>
                ))} 
               </div> 
             ) : ( 
              <div className="flex flex-col h-full items-center justify-center">
                <Empty description="No chat yet" />
              </div>
               )}
          </Skeleton> 
        </div>
        <div className="px-6 pt-4 pb-10 flex gap-2 sticky bg-white shadow-2xl bottom-0 w-full right-0 left-0">
          <div className="flex gap-4">
            <Button icon={<AttachmentIcon />} type="text" />
          </div>
          <div className="flex gap-4 flex-1">
            <Input
              className="rounded-full"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Start Chat"
              onPressEnter={handleSendMessage}
              disabled={isSendingText }
            />
            <Button
              icon={<SendMessageIcon />}
              type="text"
              onClick={handleSendMessage}
              loading={isSendingText }
            />
          </div>
        </div>
      </div>

      
      </Themes>
    </Modal>
  );
};

const LeftMessage: React.FC<{ message: string;  }> = ({
  message,
}) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {message}
      </div>
    </div>
  );
};
const RightMessage: React.FC<{ message: string; }> = ({
  message,
}) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="mr-2 py-3 px-4 bg-caramel rounded-bl-3xl rounded-br-3xl rounded-tl-xl text-white">
        {message}
      </div>
    </div>
  );
};

export default NewChatAIChatBotModal;
