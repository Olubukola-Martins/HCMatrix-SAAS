import { Form, Input, Select, Skeleton, Spin } from "antd";
import pagination from "antd/lib/pagination";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  createDepartment,
  getDepartments,
  ICreateDepProps,
} from "../../../../ApiRequesHelpers/Utility/departments";
import {
  createDesignation,
  ICreateDegProps,
  IUpdateDegProps,
} from "../../../../ApiRequesHelpers/Utility/designations";
import {
  createEmployee,
  ICreateEmpProps,
} from "../../../../ApiRequesHelpers/Utility/employee";
import { useFetchDepartments } from "../../../../APIRQHooks/Utility/departmentHooks";
import {
  useCreateDesignation,
  useFetchSingleDesignation,
  useUpdateDesignation,
} from "../../../../APIRQHooks/Utility/designationHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
import { TDepartment } from "../../../../AppTypes/DataEntitities";
import { ISearchParams } from "../../../../AppTypes/Search";
import {
  EGlobalOps,
  GlobalContext,
} from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  emailValidationRules,
  generalValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const EditDesignationForm = ({
  handleClose,
  id,
}: {
  handleClose: Function;
  id: number;
}) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const { data, isSuccess: isDesgSuccess } = useFetchSingleDesignation({
    token,
    companyId,
    designationId: id,
  });

  const {
    data: departmentData,
    isError,
    isFetching,
    isSuccess,
  } = useFetchDepartments({
    companyId,
    pagination: {
      limit: 100, //temp suppose to allow search
      offset: 0,
    },
    token,
  });

  useEffect(() => {
    if (isDesgSuccess) {
      form.setFieldsValue({
        name: data.name,
        departmentId: data.department.id,
      });
    }
  }, [isDesgSuccess, data, isSuccess]);
  const [form] = Form.useForm();

  const { mutate, isLoading } = useUpdateDesignation();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: IUpdateDegProps = {
        companyId,
        name: data.name,
        departmentId: data.departmentId,
        token,
        id,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          handleClose();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });

          queryClient.invalidateQueries({
            queryKey: ["designations"],
          });
          queryClient.invalidateQueries({
            queryKey: ["single-designation", id],
          });
        },
      });
    }
  };
  return (
    <>
      <Skeleton loading={!isSuccess || isFetching} active>
        {isSuccess && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="name"
              label="Designation Name"
              rules={textInputValidationRules}
            >
              <Input placeholder="Designation" />
            </Form.Item>

            <Form.Item
              name="departmentId"
              label="Department"
              rules={generalValidationRules}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder="Department"
                options={departmentData.data.map((item) => ({
                  label: item.name,
                  value: item.id,
                }))}
              />
            </Form.Item>

            <button className="button" type="submit">
              {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
            </button>
          </Form>
        )}
      </Skeleton>

      {isError && "error illustration"}
    </>
  );
};

export default EditDesignationForm;
