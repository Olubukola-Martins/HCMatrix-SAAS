import { ICurrentCompany, TPermission } from "AppTypes/DataEntitities";

import axios from "axios";
import { useQuery } from "react-query";
import { TDelegation } from "./useFetchDelegations";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  id: number;
}

const getDelegation = async (props: IGetDataProps): Promise<TDelegation> => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/delegation/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TDelegation = {
    id: item.id,
    delegator: {
      companyId: item.delegator.companyId,
      avatarUrl: item.delegator.avatarUrl,

      createdAt: item.delegator.createdAt,
      deletedAt: item.delegator.deletedAt,
      designation: item.delegator.designation, //adhered to backend
      designationId: item.delegator.designationId,
      email: item.delegator.email,
      empUid: item.delegator.empUid,
      firstName: item.delegator.firstName,
      hasSelfService: item.delegator.hasSelfService,
      id: item.delegator.id,
      jobInformation: item.delegator.jobInformation,
      lastName: item.delegator.lastName,
      personalInformation: item.delegator.personalInformation,
      role: item.delegator.role,
      roleId: item.delegator.roleId,
      status: item.delegator.status,
      updatedAt: item.delegator.updatedAt,
      userId: item.delegator.userId,
    },
    delegatee: {
      companyId: item.delegatee.companyId,
      avatarUrl: item.delegatee.avatarUrl,

      createdAt: item.delegatee.createdAt,
      deletedAt: item.delegatee.deletedAt,
      designation: item.delegatee.designation, //adhered to backend
      designationId: item.delegatee.designationId,
      email: item.delegatee.email,
      empUid: item.delegatee.empUid,
      firstName: item.delegatee.firstName,
      hasSelfService: item.delegatee.hasSelfService,
      id: item.delegatee.id,
      jobInformation: item.delegatee.jobInformation,
      lastName: item.delegatee.lastName,
      personalInformation: item.delegatee.personalInformation,
      role: item.delegatee.role,
      roleId: item.delegatee.roleId,
      status: item.delegatee.status,
      updatedAt: item.delegatee.updatedAt,
      userId: item.delegatee.userId,
    },
    startDate: item.startDate,
    endDate: item.endDate,
    permissions: item?.permissions
      ? item?.permissions?.map(
          (item: any): TPermission => ({
            permissionId: item.permissionId,
            name: item.permission.name,
            label: item.permission.label,
            categoryId: item.permission.categoryId,
            description: item.permission.description,

            id: item.permission.id,
          })
        )
      : [],
    description: item.description,
  };

  return data;
};

export const useFetchSingleDelegation = (props: IGetDataProps) => {
  const queryData = useQuery(
    ["delegations", props.id],
    () =>
      getDelegation({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
