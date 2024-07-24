import { TDBCard } from "../types";
import { FaAngleRight } from "react-icons/fa";

const RecruitmentDBCards = ({ count, link, title }: TDBCard) => {
  return (
    <div className={`h-[140px] w-64 rounded-2xl cursor-pointer flex items-center`} style={{ boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)" }} className="mx-2 my-[13px] rounded-2xl px-4 py-5 h-28 w-60 flex flex-col justify-between">
        <p>{title}</p>
        <div className="flex flex-row justify-between align-middle items-center">
          <p className="font-bold text-3xl opacity-70">{count}</p>
          <FaAngleRight size={18} className="align-middle text-accent " />
        </div>
      </div>
    </div>
  );
};

export default RecruitmentDBCards;
