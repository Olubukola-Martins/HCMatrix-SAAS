import {
  createCompanyFromSocialAuth,
  getCompanyParameters,
  saveCompanyParameter,
} from "ApiRequesHelpers/Utility/company";
import { TCompanyParameter } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { useSignOut } from "react-auth-kit";

import { useMutation, useQuery } from "react-query";

export const useSaveCompanyParameter = () => {
  return useMutation(saveCompanyParameter);
};
export const useCreateCompanyFromSocialAuth = () => {
  return useMutation(createCompanyFromSocialAuth);
};

interface IFRQDataProps {
  pagination?: IPaginationProps;
  companyId: string;
  onSuccess?: Function;
  token: string;
}

export const useFetchCompanyParameters = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["company-paramaters", pagination?.current, pagination?.limit],
    () =>
      getCompanyParameters({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },

      select: (res: any) => {
        const item = res.data.data;

        const data: TCompanyParameter = {
          //confirm wether is an array => TODO
          administrator: {
            adminEmail: item.administrator.adminEmail,
          },
          emailSettings: {
            defaultFromAddress: item.emailSettings.defaultFromAddress,
          },
          locationSettings: {
            country: item.locationSettings.country,
            timezone: item.locationSettings.timezone,
          },
          dateAndTimeSettings: {
            dateFormat: item.dateAndTimeSettings.dateFormat,
            timeFormat: item.dateAndTimeSettings.timeFormat,
          },
          profilePhotoSettings: {
            modifyUsersProfile: {
              administrator:
                item.profilePhotoSettings.modifyUsersProfile.administrator,
              employee: item.profilePhotoSettings.modifyUsersProfile.employee,
            },
          },
          notificationSettings: {
            email: item.notificationSettings.email,
            inApp: item.notificationSettings.inApp,
            sms: item.notificationSettings.sms,
          },
          employeeSettings: {
            hideBirthday: item.employeeSettings.hideBirthday,
            hidePhoneNumber: item.employeeSettings.hidePhoneNumber,
            hideWorkAnniversary: item.employeeSettings.hideWorkAnniversary,
          },
        };

        return data;
      },
    }
  );

  return queryData;
};
