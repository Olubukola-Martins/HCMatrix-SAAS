import { Button, Empty, Input, Modal, Skeleton } from "antd";
import { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Themes from "components/Themes";
import SendMessageIcon from "assets/svg-components/SendMessageIcon/SendMessageIcon";
import { useGetChatHistory } from "../hooks/useGetChatHistory";
import { useAddChatText } from "../hooks/useAddChatText";
// import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
// import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import SpeechToText from "components/audio/SpeechToText";
import { TbMicrophone, TbMicrophoneOff } from "react-icons/tb";

interface IProps {
  open: boolean;
  handleClose: Function;
  chatId: string;
}

const NewChatAIChatBotModal = ({ open, handleClose, chatId }: IProps) => {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState<string>();
  const [isListening, setIsListening] = useState<boolean>(false);

  const suggestedQuestions = [
    "Who is my line manager?",
    "Where can I apply for leave?",
    "Where can I find the company handbook?",
  ];

  // const { currentCompanyEmployeeDetails: employee } = useMostRecentApiAuth();
  // const employeeId = employee?.id;
  // const { data: singleEmployee } = useFetchSingleEmployee({employeeId: employeeId || 0 });
  const { data: chatHistory, isLoading: isLoadingHistory } = useGetChatHistory({
    employee_id: "372",
    company_id: "53",
    chat_id: chatId,
    // company_id: singleEmployee?.companyId.toString() || "",
    // chat_id: chatId || "",
    // employee_id: employeeId?.toString() || "",
  });
  const { mutate: sendChatMessage, isLoading: isSendingText } =
    useAddChatText();

  const aiBotSettings = JSON.parse(
    localStorage.getItem("aiBotSettings") || "{}"
  );

  const handleSendMessage = () => {
    if (!message) return;

    const newMessage = {
      user_query: message,
      audio: aiBotSettings.enableVoiceResponse || false,
      chat_id: chatId,
      employee_metadata: {
        department_id: "43",
        role_id: "323",
        group_id: "54",
        company_id: "53",
        id: "372",
        // department_id: singleEmployee?.designation?.department?.id.toString() || "",
        // role_id: singleEmployee?.roleId.toString() || "",
        // group_id: singleEmployee?.userGroups?.[0]?.id.toString() || "",
        // company_id: singleEmployee?.companyId.toString() || "",
        // id: singleEmployee?.id.toString() || "",
      },
    };
    sendChatMessage(newMessage, {
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

        const existingChatList = JSON.parse(
          localStorage.getItem("chatList") || "[]"
        );
        const updatedChatList = [...existingChatList, chatObject];
        localStorage.setItem("chatList", JSON.stringify(updatedChatList));

        setMessage("");
        queryClient.invalidateQueries({
          queryKey: ["chat-history"],
        });
      },
    });
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setMessage(question);
    handleSendMessage();
  };

  const handleMicClick = () => {
    setIsListening((prev) => !prev);
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
            <IoIosArrowBack />
          </button>
          <h5 className="text-sm font-medium text-center">New Chat</h5>
        </div>
        <div className="flex flex-col gap-4 h-full justify-between relative ">
          <div className="mb-18 px-6 pt-4 max-h-[450px] overflow-y-auto">
            <Skeleton
              loading={isLoadingHistory}
              active
              paragraph={{ rows: 14 }}
            >
              {chatHistory && chatHistory.length > 0 ? (
                <div className="flex flex-col">
                  {chatHistory.map((item, index) => (
                    <div key={index}>
                      {item.employee_metadata.id === "372" && (
                        // === employee?.id?.toString() ? (
                        <RightMessage message={item.question} />
                      )}
                      <LeftMessage
                        message={item.answer}
                        audio={item.audio_response}
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
          {aiBotSettings.enableSuggestion && (
            <div className="mb-2 px-6 text-right">
              <h6 className="text-sm font-medium">AI Suggest</h6>
              <ul className="space-y-2">
                {suggestedQuestions?.map((question, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestedQuestionClick(question)}
                    className="cursor-pointer text-orange-600 hover:text-gray-600 block"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <SpeechToText
            onTranscript={(transcript) => setMessage(transcript)}
            startListening={isListening}
          />

          <div className="px-6 pt-4 pb-10 flex gap-2 sticky bg-white shadow-2xl bottom-0 w-full right-0 left-0">
            <div className="flex gap-4 flex-1">
              <Input
                className="rounded-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Start Chat"
                onPressEnter={handleSendMessage}
                disabled={isSendingText}
              />
              <Button
                icon={<SendMessageIcon />}
                type="text"
                onClick={handleSendMessage}
                loading={isSendingText}
              />
              <Button
                icon={isListening ? <TbMicrophoneOff /> : <TbMicrophone />}
                type="text"
                onClick={handleMicClick}
              />
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

const LeftMessage: React.FC<{ message: string; audio?: string | null }> = ({
  message,
  audio,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (audio && audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex justify-start mb-4">
      <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
        {audio ? (
          <>
            <button onClick={handlePlayAudio} className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                />
              </svg>
            </button>
            <audio ref={audioRef} src={audio} />
          </>
        ) : (
          message
        )}
      </div>
    </div>
  );
};

const RightMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="mr-2 py-3 px-4 bg-caramel rounded-bl-3xl rounded-br-3xl rounded-tl-xl text-white">
        {message}
      </div>
    </div>
  );
};

export default NewChatAIChatBotModal;
