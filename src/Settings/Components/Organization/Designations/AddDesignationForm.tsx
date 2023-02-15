import { Form, Input, Select, Skeleton, Spin } from "antd";
import React, { useContext, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

import {
  createDesignation,
  ICreateDegProps,
} from "../../../../ApiRequesHelpers/Utility/designations";

import { useFetchDepartments } from "../../../../APIRQHooks/Utility/departmentHooks";
import { useCreateDesignation } from "../../../../APIRQHooks/Utility/designationHooks";
import { IAuthDets } from "../../../../AppTypes/Auth";
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

const AddDesignationForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [form] = Form.useForm();

  const [depSearch, setDepSearch] = useState<string>("");

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
    searchParams: {
      name: depSearch,
    },

    token,
  });

  const { mutate, isLoading } = useCreateDesignation();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateDegProps = {
        companyId,
        name: data.name,
        departmentId: data.departmentId,
        token,
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
        },
      });
    }
  };
  return (
    <>
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
            onSearch={(val) => setDepSearch(val)}
            showSearch
            value={depSearch}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            // onChange={handleChange}
            notFoundContent={null}
          >
            {isSuccess ? (
              departmentData.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Spin size="small" />
              </div>
            )}
          </Select>
        </Form.Item>

        <button className="button" type="submit">
          {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
        </button>
      </Form>
    </>
  );
};

export default AddDesignationForm;
