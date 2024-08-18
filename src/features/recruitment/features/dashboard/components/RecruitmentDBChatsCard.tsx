import CardWrapper from "./CardWrapper";
import ChatSlip from "./ChatSlip";

const RecruitmentDBChatsCard = () => {
  return (
    <CardWrapper>
      <div className="flex flex-col gap-5 py-2">
        <h3 className="text-base font-bold">Chats</h3>
        <div className="flex flex-col">
          {Array.from({ length: 5 }).map((_, index) => (
            <ChatSlip key={index} name="Samuel Adewusi" lastMsg="Hello Recruiter, I want to ask about the next stage and what to expect" link="" />
          ))}
        </div>
      </div>
    </CardWrapper>
  );
};

export default RecruitmentDBChatsCard;
