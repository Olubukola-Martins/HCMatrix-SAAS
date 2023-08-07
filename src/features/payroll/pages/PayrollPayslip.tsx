import React, { useState } from "react";
import PayrollSubNav from "../components/PayrollSubNav";

import { AppButton } from "components/button/AppButton";
import { PageIntro } from "components/layout/PageIntro";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import DeleteEntityModal from "components/entity/DeleteEntityModal";
import { useDeletePayslipTemplate } from "../hooks/payslips/templates/useDeletePayslipTemplate";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_PAY_GRADES } from "../hooks/payGrades/useGetPayGrades";
import PageSubHeader from "components/layout/PageSubHeader";
import { Pagination, Skeleton } from "antd";
import { useGetPayslipTemplates } from "../hooks/payslips/templates/useGetPayslipTemplates";
import { usePagination } from "hooks/usePagination";

export const PayrollPayslip = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container flex flex-col gap-2">
        <PageIntro title="Payslips" />
        <PageSubHeader
          description={
            "You can manage payslip templates and view employee payslips"
          }
          hideBackground
        />
        <PayslipContainer />
      </div>
    </>
  );
};

const PayslipContainer = () => {
  //TO DO: add pagination, and hook for fetching templates, as well as skeleton
  const { pagination, onChange } = usePagination();
  const { data, isFetching } = useGetPayslipTemplates({
    pagination,
  });
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-end gap-3">
          <Link to={appRoutes.createPayslipTemplate}>
            <AppButton label="Create template" />
          </Link>
          <Link to={appRoutes.employeePayslips}>
            <AppButton label="View Payslips" variant="transparent" />
          </Link>
        </div>
        <Skeleton loading={isFetching} paragraph={{ rows: 8 }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
            {Array(4)
              .fill(5)
              .map((item, i) => ({ name: `Template ${i + 1}`, id: i }))
              .map((item) => (
                <PayslipTemplateCard
                  {...{
                    data: { ...item },
                    key: item.id,
                    isDefault: item.id === 1,
                  }}
                />
              ))}
          </div>
        </Skeleton>
      </div>

      <div className="mt-4 flex justify-end">
        <Pagination
          {...{ ...pagination, total: data?.total }}
          onChange={onChange}
          size="small"
        />
      </div>
    </>
  );
};

const PayslipTemplateCard: React.FC<{
  data: { name: string; id: number };
  isDefault: boolean;
}> = ({ data, isDefault }) => {
  const { name, id } = data;
  const [action, setAction] = useState<"delete">();
  const handleDelete = () => {
    setAction("delete");
  };
  return (
    <>
      <DeletePayslipTemplate
        open={action === "delete"}
        template={{ name, id }}
        handleClose={() => setAction(undefined)}
      />
      <div className="bg-card p-4 rounded-md text-center text-accent shadow">
        <div className="flex justify-end">
          {isDefault ? (
            <AppButton disabled label="Default" variant="transparent" />
          ) : (
            <AppButton label="Make Default" />
          )}
        </div>
        <span className="block text-xs pt-8 pb-2">Payslip</span>

        <h2 className="font-semibold pb-20 text-base">{name}</h2>

        <div className="flex items-center justify-between text-sm">
          <Link to={appRoutes.editPayslipTemplate(id).path}>
            <span className="text-caramel underline cursor-pointer">Edit</span>
          </Link>
          <span
            className="text-neutral underline cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

type TPayslipTemplate = { name: string; id: any };

interface IDelProps extends IModalProps {
  template: TPayslipTemplate;
}
const DeletePayslipTemplate: React.FC<IDelProps> = ({
  open,
  handleClose,
  template,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useDeletePayslipTemplate();

  const handleDelete = () => {
    mutate(
      {
        id: template.id,
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            duration: 2,
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PAY_GRADES],
            // exact: true,
          });
          handleClose();
        },
      }
    );
  };
  return (
    <DeleteEntityModal
      title="Delete Payslip Template"
      entity={{ type: "payslip template", name: template.name }}
      handleClose={handleClose}
      open={open}
      handleDelete={{ fn: handleDelete, isLoading: isLoading }}
    />
  );
};
