import { Input, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useDeleteEmployeeEducationDetail } from "APIRQHooks/Utility/employeeHooks";
import { TEducationDetail, TEmployee } from "AppTypes/DataEntitities";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

import { useContext, useState } from "react";
import { SaveEducationDetails } from "./SaveEducationDetails";
import { IAuthDets } from "AppTypes/Auth";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import { openNotification } from "NotificationHelpers";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";

interface IProps {
  employee?: TEmployee;
}
export const EducationDetails = ({ employee }: IProps) => {
  const queryClient = useQueryClient();

  const [educationDetail, setEducationDetail] = useState<TEducationDetail>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const editEducationDetail = (val: TEducationDetail) => {
    setEducationDetail(val);
    setOpenDrawer(true);
  };
  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const { mutate, isLoading } = useDeleteEmployeeEducationDetail();
  const [deleteId, setDeleteId] = useState(0);
  const deleteDetail = (detailId: number) => {
    setDeleteId(detailId);
    if (companyId && employee) {
      mutate(
        {
          companyId,

          token,
          employeeId: employee.id,
          detailId,
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
  const columns: ColumnsType<TEducationDetail> = [
    {
      title: "School/Institute",
      dataIndex: "school",
      // width: 150,
    },
    {
      title: "Degree",
      dataIndex: "degree",
      // width: 150,
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      // width: 150,
    },
    {
      title: "Started On",
      dataIndex: "startDate",
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },
    {
      title: "Ended",
      dataIndex: "endDate",
      render: (val) => moment(val).format("DD/MM/YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <i
            className="ri-pencil-line text-xl cursor-pointer"
            onClick={() => editEducationDetail(record)}
          />
          {isLoading && deleteId === record.id ? (
            <LoadingOutlined />
          ) : (
            <i
              className="ri-delete-bin-line text-lg cursor-pointer"
              onClick={() => deleteDetail(record.id as number)}
            />
          )}
        </Space>
      ),
    },
  ];
  const handleClose = () => {
    setOpenDrawer(false);
    setEducationDetail(undefined);
  };
  return (
    <div>
      <div className="bg-card p-3 rounded">
        <div className="border-b border-gray-400 w-full mb-7">
          <h2 className="text-accent text-base pb-1">Education Details</h2>
        </div>
        <div className="flex md:items-center gap-5  flex-col-reverse md:flex-row md:justify-between my-3">
          <Input.Search
            placeholder="input search text"
            style={{ width: 200 }}
            className="rounded"
          />
          <div>
            <button className="button" onClick={() => setOpenDrawer(true)}>
              Add Education Details
            </button>
          </div>
        </div>

        <SaveEducationDetails
          open={openDrawer}
          handleClose={handleClose}
          educationDetail={educationDetail}
          employeeId={employee?.id}
        />

        <Table
          columns={columns}
          dataSource={employee?.educationDetails}
          pagination={{
            pageSize: 4,
            total: employee?.educationDetails?.length,
          }}
          scroll={{ y: 240 }}
          size={"small"}
        />
      </div>
    </div>
  );
};
