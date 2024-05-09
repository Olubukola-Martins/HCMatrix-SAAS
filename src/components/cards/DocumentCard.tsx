import React from "react";

interface IProps {
  data: { name: string; title: string; link: string };
  handleDelete?: { fn: () => void; loading?: boolean };
  handleDownload?: () => void;
}

export const DocumentCard: React.FC<IProps> = ({ data, handleDelete }) => {
  return (
    <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
      <p className="text-sm">{data.title}</p>
      <h4>{data.name}</h4>
      <div className="flex items-center justify-between text-sm">
        {handleDelete?.loading ? (
          "loading ..."
        ) : (
          <span
            className="text-neutral cursor-pointer"
            onClick={() => handleDelete?.fn?.()}
          >
            Delete
          </span>
        )}
        <a href={data.link} target="_blank" rel="noreferrer">
          <span className="text-caramel cursor-pointer">Download</span>
        </a>
      </div>
    </div>
  );
};
