import React from 'react';

interface IPreviousChatItemProps {
  title: string;
  date: string;
}

const PreviousChatCard: React.FC<IPreviousChatItemProps> = ({ title, date }) => {
  return (
    <div className="flex justify-between items-center bg-slate-100 border border-gray-300 text-sm p-2 rounded-md shadow-sm cursor-pointer hover:bg-white">
      <span>{title}</span>
      <span>{date}</span>
    </div>
  );
};

export default PreviousChatCard;