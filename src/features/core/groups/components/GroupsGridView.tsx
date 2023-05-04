import { Pagination, TablePaginationConfig, Dropdown, Menu } from "antd";
import type { PaginationProps } from "antd";
import { TGroup } from "../types";

interface IProps {
  groups: TGroup[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: PaginationProps["onChange"];
  editGroup: (val: number) => void;
  deleteGroup: (val: number) => void;
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
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
        {groups.map((item) => (
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
    </div>
  );
};

const GroupBox = ({
  group,
  editGroup,
  deleteGroup,
}: {
  group: TGroup;
  editGroup: (val: number) => void;
  deleteGroup: (val: number) => void;
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
                <Menu.Item onClick={() => editGroup(group?.id as number)}>
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => deleteGroup(group?.id as number)}>
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
          <p className="text-sm">{group.email}</p>
        </div>
      </div>
    </>
  );
};

export default GroupsGridView;
