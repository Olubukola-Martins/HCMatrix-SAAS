import { useMutation } from "react-query";
import { IDelEmpSkillProps } from "../types";
import axios from "axios";

export const deleteEmployeeSkill = async (props: IDelEmpSkillProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/skill/${props.skillId}`;

  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteEmployeeSkill = () => {
  return useMutation(deleteEmployeeSkill);
};
