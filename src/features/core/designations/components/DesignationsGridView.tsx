import React from "react";

import { motion } from "framer-motion";
import {
  Dropdown,
  Menu,
  Pagination,
  PaginationProps,
  Skeleton,
  TablePaginationConfig,
} from "antd";
import { TDesignation } from "../types";

interface IProps {
  data?: TDesignation[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editDesignation: (val: TDesignation) => void;
  viewDesignation: (val: TDesignation) => void;
  deleteDesignation: (val: TDesignation) => void;
}

export const DesignationsGridView = ({
  data,
  loading,
  pagination,
  onChange,
  editDesignation,
  deleteDesignation,
  viewDesignation,
}: IProps) => {
  return (
    <Skeleton loading={loading} paragraph={{ rows: 20 }}>
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
          {data?.map((item) => (
            <Box
              key={item.id}
              data={item}
              editDesignation={editDesignation}
              viewDesignation={viewDesignation}
              deleteDesignation={deleteDesignation}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Pagination {...pagination} onChange={onChange} size="small" />
        </div>
      </motion.div>
    </Skeleton>
  );
};

const Box = ({
  data,
  editDesignation,
  viewDesignation,
  deleteDesignation,
}: {
  data: TDesignation;
  editDesignation: (val: TDesignation) => void;
  viewDesignation: (val: TDesignation) => void;
  deleteDesignation: (val: TDesignation) => void;
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
                <Menu.Item onClick={() => editDesignation(data)}>
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => viewDesignation(data)}>
                  View
                </Menu.Item>
                <Menu.Item onClick={() => deleteDesignation(data)}>
                  Delete
                </Menu.Item>
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
