import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  file: any;
};

type TUploadFileApiResponse = {
  message: string;
  data: string;
};

export const uploadFile = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TUploadFileApiResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/file`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.postForm(url, data, config);
  const fetchedData: TUploadFileApiResponse = response.data;

  return fetchedData;
};

export const bulkUploadFiles = async (props: {
  data: {
    files: any[];
  };
  auth: ICurrentCompany;
}): Promise<string[]> => {
  const uploadFileUrls: string[] = [];
  for (const item of props.data.files) {
    const fileUploadResponse = await uploadFile({
      data: {
        file: item?.originFileObj,
      },
      auth: { token: props.auth.token, companyId: props.auth.companyId },
    });
    uploadFileUrls.push(fileUploadResponse.data);
  }
  return uploadFileUrls;
};
export const useUploadFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData }) =>
    uploadFile({
      data: props.data,
      auth: { token, companyId },
    })
  );
};
