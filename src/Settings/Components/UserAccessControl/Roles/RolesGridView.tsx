import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TRole } from "../../../../AppTypes/DataEntitities";
import {
  Pagination,
  TableProps,
  TablePaginationConfig,
  Dropdown,
  Menu,
  Tooltip,
} from "antd";
import type { PaginationProps } from "antd";

interface IProps {
  data: TRole[];
  loading: boolean;
  pagination?: TablePaginationConfig;
  onChange: TableProps<TRole>["onChange"];
}

export const RolesGridView = ({
  data,
  loading,
  pagination,
  onChange,
}: IProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-5">
        {data.map((item) => (
          <RoleBox key={item.id} data={item} />
        ))}
      </div>
      {/* <div className="mt-4 flex justify-end">
        <Pagination {...pagination} onChange={onChange} size="small" />
      </div> */}
    </div>
  );
};

const RoleBox = ({ data }: { data: TRole }) => {
  return (
    <>
      {/* view */}
      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3">
          <h4 className="font-medium text-lg">Account Owner</h4>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">Date Created: 01 January 2022</p>
              <p>Last Modified: 31 March 2022</p>
            </div>
            <div className="border-r-2" />
            <div className="py-7">
              <p className="pb-2">Number of Record</p>
              <span className="bg-card px-3 rounded-lg font-medium">0</span>
            </div>
          </div>
          <Tooltip
            trigger={["click"]}
            overlayInnerStyle={{ background: "var(--card)", padding: "10px" }}
            title={
              <div className="">
                <h4 className="text-sm font-semibold">
                  You can set-up permissions from here
                </h4>
                <p className="text-xs pt-2 pb-3 text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
                  sequi maiores .
                </p>
                <Link to="/settings/roles/create" className="button">
                  Next
                </Link>
              </div>
            }
          >
            <button className="rounded-xl font-medium py-1 px-2 my-5 text-green-700 text-xs bg-green-100">
              Set-up Permission
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <h4 className="font-medium text-lg">Line Manager</h4>
          <div className="flex gap-2">
            <i className="ri-pencil-line text-lg cursor-pointer"></i>
            <i className="ri-delete-bin-line text-lg cursor-pointer"></i>
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex gap-5 text-sm">
            <div className="py-7">
              <p className="pb-2">Date Created: 01 January 2022</p>
              <p>Last Modified: 31 March 2022</p>
            </div>
            <div className="border-r-2" />
            <div className="py-7">
              <p className="pb-2">Number of Record</p>
              <span className="bg-card px-3 rounded-lg font-medium">0</span>
            </div>
          </div>
          <button className="rounded-xl font-medium py-1 px-2 my-5 text-green-700 text-xs bg-green-100">
            Set-up Permission
          </button>
        </div>
      </div>
    </>
  );
};
