import React from "react";

import { motion } from "framer-motion";
import {
  Dropdown,
  Menu,
  Pagination,
  PaginationProps,
  TablePaginationConfig,
} from "antd";
import { TBranch } from "../types";

interface IProps {
  data: TBranch[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editBranch: (val: TBranch) => void;
  viewBranch: (val: TBranch) => void;
  deleteBranch: (val: TBranch) => void;
}

// TO DO: Use the grid component in components folder instead

export const BranchesGridView = ({
  data,
  loading,
  pagination,
  onChange,
  editBranch,
  viewBranch,
  deleteBranch,
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <Box
            key={item.id}
            data={item}
            editBranch={editBranch}
            viewBranch={viewBranch}
            deleteBranch={deleteBranch}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div>
    </motion.div>
  );
};

const Box = ({
  data,
  editBranch,
  viewBranch,
  deleteBranch,
}: {
  data: TBranch;
  editBranch: (val: TBranch) => void;
  viewBranch: (val: TBranch) => void;
  deleteBranch: (val: TBranch) => void;
}) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between items-center gap-3">
          <h6 className="text-base font-thin capitalize">{data.name}</h6>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => editBranch(data)}>Edit</Menu.Item>
                <Menu.Item onClick={() => viewBranch(data)}>View</Menu.Item>
                <Menu.Item onClick={() => deleteBranch(data)}>Delete</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <i className="fa-solid fa-ellipsis cursor-pointer"></i>
          </Dropdown>
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
