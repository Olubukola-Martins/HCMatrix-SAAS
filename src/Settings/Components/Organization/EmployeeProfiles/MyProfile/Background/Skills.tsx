import Search from "antd/lib/input/Search";
import { Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { SaveSkill } from "./SaveSkill";
import { TEmployee, TSkill } from "AppTypes/DataEntitities";
import { useDeleteEmployeeSkill } from "APIRQHooks/Utility/employeeHooks";
import { LoadingOutlined } from "@ant-design/icons";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { openNotification } from "NotificationHelpers";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";

interface IProps {
  employee?: TEmployee;
}

export const Skills = ({ employee }: IProps) => {
  const queryClient = useQueryClient();

  const [skill, setSkill] = useState<TSkill>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const editSkill = (val: TSkill) => {
    setSkill(val);
    setOpenDrawer(true);
  };
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const { mutate, isLoading } = useDeleteEmployeeSkill();
  const [deleteId, setDeleteId] = useState(0);
  const deleteSkill = (skillId: number) => {
    setDeleteId(skillId);
    if (companyId && employee) {
      mutate(
        {
          companyId,

          token,
          employeeId: employee.id,
          skillId,
        },
        {
          onError: (err: any) => {
            openNotification({
              state: "error",
              title: "Error Occured",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
          onSuccess: (res: any) => {
            openNotification({
              state: "success",

              title: "Success",
              description: res?.data?.message,
            });
            queryClient.invalidateQueries({
              queryKey: ["single-employee", employee.id],
              // exact: true,
            });
            setDeleteId(0);
          },
        }
      );
    }
  };
  const columns: ColumnsType<TSkill> = [
    {
      title: "Skill",
      dataIndex: "skill",
      // width: 150,
    },
    {
      title: "Competency",
      dataIndex: "competency",
      // width: 150,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <i
            className="ri-pencil-line text-xl cursor-pointer"
            onClick={() => editSkill(record)}
          />
          {isLoading && deleteId === record.id ? (
            <LoadingOutlined />
          ) : (
            <i
              className="ri-delete-bin-line text-lg cursor-pointer"
              onClick={() => deleteSkill(record.id as number)}
            />
          )}
        </Space>
      ),
    },
  ];
  const handleClose = () => {
    setOpenDrawer(false);
    setSkill(undefined);
  };

  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Skills</h2>
        </div>
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Skill
            </button>
          </div>
        </div>

        <SaveSkill
          open={openDrawer}
          handleClose={handleClose}
          employeeId={employee?.id}
          skill={skill}
        />

        <Table
          columns={columns}
          dataSource={employee?.skills?.map((item) => ({
            ...item,
            key: item.skill,
          }))}
          pagination={{ pageSize: 4, total: employee?.skills?.length }}
          scroll={{ y: 240 }}
          size="small"
        />
      </div>
    </div>
  );
};
