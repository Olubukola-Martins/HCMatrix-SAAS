import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  data: { name: string; title: string; link?: string };
  handleDelete?: { fn: () => void; loading?: boolean };
  handleEdit?: { fn: () => void; loading?: boolean };
}

export const TemplateCard: React.FC<IProps> = ({
  data,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
      <p className="text-sm">{data.title}</p>
      {data.link ? (
        <Link
          to={data.link}
          className="text-card hover:text-caramel underline "
        >
          <h4>{data.name}</h4>
        </Link>
      ) : (
        <h4>{data.name}</h4>
      )}
      <div className="flex items-center justify-between text-sm">
        {handleEdit?.loading ? (
          "loading ..."
        ) : (
          <span
            className="text-neutral cursor-pointer"
            onClick={() => handleEdit?.fn?.()}
          >
            Edit
          </span>
        )}
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
      </div>
    </div>
  );
};
