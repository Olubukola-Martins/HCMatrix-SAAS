import { FaAngleRight } from "react-icons/fa";
import { IChatSlipProps } from "../types";

const ChatSlip = ({ imgSrc = "https://res.cloudinary.com/dryuek31u/image/upload/v1720043152/HCmatric%202.0/chatpic_nxziau.png", name, lastMsg,link }: IChatSlipProps) => {
  return (
    <div className="border-t-2 border-dashed border-[#AFAFAF]  ">
      <div className="my-3 flex flex-row justify-between gap-5 items-center">
        <img alt="profile" height={26} width={26} src={imgSrc} className="rounded-[50%] object-cover" />
        <div className="w-[167px]">
          <h4 className="text-sm line-clamp-1 font-medium">{name}</h4>
          <p className="text-xs line-clamp-1">{lastMsg}</p>
        </div>
        <FaAngleRight size={20} className="cursor-pointer text-accent font-light" onClick={()=>link} />
      </div>
    </div>
  );
};

export default ChatSlip;
