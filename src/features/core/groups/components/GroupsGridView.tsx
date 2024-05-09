import {
  Pagination,
  TablePaginationConfig,
  Dropdown,
  Menu,
  Skeleton,
} from "antd";
import type { PaginationProps } from "antd";
import { TGroup } from "../types";
import { motion } from "framer-motion";

interface IProps {
  groups?: TGroup[];
  loading?: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editGroup: (val: TGroup) => void;
  deleteGroup: (val: TGroup) => void;
}

const GroupsGridView = ({
  groups,
  loading,
  pagination,
  onChange,
  editGroup,
  deleteGroup,
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {groups?.map((item) => (
            <GroupBox
              key={item.id}
              group={item}
              editGroup={editGroup}
              deleteGroup={deleteGroup}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Pagination {...pagination} onChange={onChange} size="small" />
        </div>
      </motion.div>
    </Skeleton>
  );
};

const GroupBox = ({
  group,
  editGroup,
  deleteGroup,
}: {
  group: TGroup;
  editGroup: (val: TGroup) => void;
  deleteGroup: (val: TGroup) => void;
}) => {
  return (
    <>
      {/* view */}

      <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
        <div className="flex justify-between">
          <h6 className="text-xl font-thin capitalize">{group.name}</h6>

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => editGroup(group)}>Edit</Menu.Item>
                <Menu.Item onClick={() => deleteGroup(group)}>Delete</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <i className="fa-solid fa-ellipsis cursor-pointer"></i>
          </Dropdown>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm">{group.email}</p>
        </div>
      </div>
    </>
  );
};

export default GroupsGridView;
