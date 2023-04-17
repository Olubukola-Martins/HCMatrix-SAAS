import { Form, Input, Select, Skeleton, Spin } from "antd";
import { useFetchDepartments } from "features/core/departments/hooks/useFetchDepartments";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import {
  QUERY_KEY_FOR_SINGLE_DESIGNATION,
  useFetchSingleDesignation,
} from "../hooks/useFetchSingleDesignation";
import { useUpdateDesignation } from "../hooks/useUpdateDesignation";
import { IUpdateDegProps } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_DESIGNATIONS } from "../hooks/useFetchDesignations";

const EditDesignationForm = ({
  handleClose,
  id,
}: {
  handleClose: Function;
  id: number;
}) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();

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
  const [form] = Form.useForm();

  useEffect(() => {
    if (isDesgSuccess) {
      form.setFieldsValue({
        name: data.name,
        departmentId: data.department.id,
      });
    }
  }, [isDesgSuccess, data, isSuccess, form]);

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
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_DESIGNATIONS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_DESIGNATION, id],
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
