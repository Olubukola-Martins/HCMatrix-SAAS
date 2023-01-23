import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

interface fileProps extends ICurrentCompany {
  fileValue: string;
}

// const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//     if (!isJpgOrPng) {
//       message.error("You can only upload JPG/PNG file!");
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error("Image must smaller than 2MB!");
//     }
//     return false;
//   };

//   const props = {
//     name: "file",
//     multiple: false,
//     accept: "image/*",
//     onChange(info) {
//       setFilelist(info.fileList);
//     },
//   };

export const uploadFile = async (props: fileProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/file`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data = {
    file: props.fileValue,
  };

  const response = await axios.post(url, data, config);
  return response;
};
