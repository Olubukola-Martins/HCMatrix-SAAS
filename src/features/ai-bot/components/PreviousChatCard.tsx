import React from 'react';

interface IPreviousChatItemProps {
  title: string;
  date: string;
  chatId: string;
  onClick: (chatId: string) => void;
}

const PreviousChatCard: React.FC<IPreviousChatItemProps> = ({ title, date, chatId, onClick }) => {
  return (
    <div
      onClick={()=> onClick(chatId)} 
      className="flex justify-between items-center bg-slate-100 border border-gray-300 text-sm p-2 rounded-md shadow-sm cursor-pointer hover:bg-white"
      >
      <span>{title}</span>
      <span>{date}</span>
    </div>
  );
};

export default PreviousChatCard;