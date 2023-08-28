import React from "react";
import { Link } from "react-router-dom";

interface IProps {
  data: { name: string; title: string; link?: string };
  handleDelete?: { fn: () => void; loading?: boolean };
  handleEdit?: { fn: () => void; loading?: boolean };
}
const DATA_NAME_CLASS_NAME =
  "font-semibold text-base text-caramel cursor-pointer hover:text-black";
export const TemplateCard: React.FC<IProps> = ({
  data,
  handleDelete,
  handleEdit,
}) => {
  return (
    <div className="bg-card shadow py-3 px-2 rounded text-center flex flex-col gap-16">
      <p className="text-sm">{data.title}</p>
      {data.link ? (
        <Link to={data.link}>
          <h4 className={DATA_NAME_CLASS_NAME}>{data.name}</h4>
        </Link>
      ) : (
        <h4 className={DATA_NAME_CLASS_NAME}>{data.name}</h4>
      )}
      <div className="flex items-center justify-between text-sm">
        {handleEdit?.loading ? (
          "loading ..."
        ) : (
          <span
            className="text-accent hover:underline cursor-pointer"
            onClick={() => handleEdit?.fn?.()}
          >
            Edit
          </span>
        )}
        {handleDelete?.loading ? (
          "loading ..."
        ) : (
          <span
            className="text-accent hover:underline cursor-pointer"
            onClick={() => handleDelete?.fn?.()}
          >
            Delete
          </span>
        )}
      </div>
    </div>
  );
};
