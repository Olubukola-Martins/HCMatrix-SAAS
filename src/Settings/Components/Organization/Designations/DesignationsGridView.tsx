import React from "react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TDepartment, TDesignation } from "../../../../AppTypes/DataEntitities";
import {
  Pagination,
  PaginationProps,
  TablePaginationConfig,
  TableProps,
} from "antd";

interface IProps {
  data: TDesignation[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
}

export const DesignationsGridView = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  return (
    <motion.div
      className="mt-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={0}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((item) => (
          <Box key={item.id} data={item} />
        ))}
      </div>
      <div className="flex justify-end">
        <Pagination {...pagination} onChange={onChange} />
      </div>
    </motion.div>
  );
};

const Box = ({ data }: { data: TDesignation }) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{data.name}</h6>

          <i className="fa-solid fa-ellipsis"></i>
        </div>
        <div className="flex justify-between items-center">
          <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center ">
            <span className="text-sm">{data.employeeCount}</span>
          </div>
        </div>
      </div>
    </>
  );
};
