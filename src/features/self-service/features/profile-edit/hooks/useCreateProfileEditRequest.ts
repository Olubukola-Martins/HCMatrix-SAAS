import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { CreateProfileEditRequestInput } from "../types";
import { getSingleBranch } from "features/core/branches/hooks/useFetchSingleBranch";
import { getSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getSingleExchangeRate } from "features/payroll/hooks/exhangeRates/useGetSingleExchangeRate";
import { getLgas } from "hooks/useFetchLGAs";
import { getCountries } from "hooks/useFetchCountries";
import { getStates } from "hooks/useFetchStates";
import { getSingleTaxAuthority } from "features/payroll/hooks/organization/taxAuthorities/useGetSingleTaxAuthority";
import { getSingleItfAuthority } from "features/payroll/hooks/organization/itfAuthorities/useGetSingleITFAuthority";
import { getSingleNsitfAuthority } from "features/payroll/hooks/organization/nsitfAuthorities/useGetSingleNSITFAuthority";

type TCreateProps = CreateProfileEditRequestInput;

const createData = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/profile-edit-request`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };
  switch (data.category) {
    case "personal-information":
      const state = (await getStates({}))?.find(
        (l) => l.id === data.content.address.stateId
      );
      data.content.address.stateName = state?.name || "";
      const country = (await getCountries())?.find(
        (l) => l.id === data.content.address.countryId
      );
      data.content.address.countryName = country?.name || "";
      if (data.content.address.lgaId) {
        const lga = (await getLgas({}))?.find(
          (l) => l.id === data.content.address.lgaId
        );
        data.content.address.lgaName = lga?.name || "";
      } else {
        data.content.exchangeRateName = undefined;
      }
      if (data.content.exchangeRateId) {
        const exchangeRate = await getSingleExchangeRate({
          auth: props.auth,
          data: {
            id: data.content.exchangeRateId,
          },
        });
        data.content.exchangeRateName = exchangeRate.currency;
      } else {
        data.content.exchangeRateName = undefined;
      }

      break;
    case "bank-detail":
      // const banks = await getBanksFromPaystack({});
      // const bank = banks?.data.find((b) => b.code === data.content.bankCode);
      // data.content.bankName = bank?.name || "";

      break;
    case "nsitf":
      const nsitfAuthority = await getSingleNsitfAuthority({
        auth: props.auth,
        data: {
          id: data.content.nsitfAuthorityId,
        },
      });
      data.content.nsitfAuthorityName = nsitfAuthority.name;

      break;
    case "itf":
      const itfAuthority = await getSingleItfAuthority({
        auth: props.auth,
        data: {
          id: data.content.itfAuthorityId,
        },
      });
      data.content.itfAuthorityName = itfAuthority.name;

      break;
    case "pension":
      const pensionAuthority = await getSingleTaxAuthority({
        auth: props.auth,
        data: {
          id: data.content.pensionAdministratorId,
        },
      });
      data.content.pensionAdministratorName = pensionAuthority.name;

      break;
    case "tax":
      const taxAuthority = await getSingleTaxAuthority({
        auth: props.auth,
        data: {
          id: data.content.taxAuthorityId,
        },
      });
      data.content.taxAuthorityName = taxAuthority.name;

      break;
    case "job-information":
      const branch = await getSingleBranch({
        auth: props.auth,
        props: {
          branchId: data.content.branchId,
        },
      });
      data.content.branchName = branch.name;
      const lineManager = await getSingleEmployee({
        ...props.auth,
        employeeId: data.content.lineManagerId,
      });
      data.content.lineManagerName = getEmployeeFullName(lineManager);

      break;

    default:
      break;
  }

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateProfileEditRequest = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
