// import { PageIntro } from "components/layout/PageIntro";
// import { appRoutes } from "config/router/paths";
// import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
// import LoanSettings from "../components/settings/LoanSettings";
// import PageSubHeader from "components/layout/PageSubHeader";
// import { useGetLoanSettings } from "../hooks/setting/useGetLoanSettings";
// import { Form, Skeleton } from "antd";
// import { useSaveLoanSettings } from "../hooks/setting/useSaveLoanSettings";
// import { openNotification } from "utils/notifications";
// import { useEffect } from "react";

// const LoanPolicies = () => {
//   const { data: setting, isFetching } = useGetLoanSettings();

//   const [form] = Form.useForm();
//   const { mutate, isLoading } = useSaveLoanSettings();
//   useEffect(() => {
//     if (!setting) {
//       form.setFieldValue("maxAllowedLoanApplications", 1);
//       form.setFieldValue("maxLoansDuringRepayment", 0);
//       return;
//     }

//     form.setFieldsValue({
//       workflowId: setting.workflowId,
//       costCentreId: setting.costCentreId,
//       maxLoanPercentage: setting.maxLoanPercentage, // min: 1, max: 100
//       loanLimit: setting.cannotExceedMaxLoanPercentage
//         ? `cannotExceedMaxLoanPercentage`
//         : `shouldFillGuarantorsForm`,
//       maxAllowedLoanApplications: setting.maxAllowedLoanApplications, // default of 1
//       maxLoansDuringRepayment: setting.maxLoansDuringRepayment, // default of 0
//     });
//   }, [form, setting]);

//   const handleSubmit = (data: any) => {
//     mutate(
//       {
//         workflowId: data.workflowId,
//         costCentreId: data.costCentreId,
//         maxLoanPercentage: data.maxLoanPercentage, // min: 1, max: 100
//         cannotExceedMaxLoanPercentage:
//           data.loanLimit === "cannotExceedMaxLoanPercentage",
//         shouldFillGuarantorsForm: data.loanLimit === "shouldFillGuarantorsForm",
//         maxAllowedLoanApplications: data.maxAllowedLoanApplications, // default of 1
//         maxLoansDuringRepayment: data.maxLoansDuringRepayment, // default of 0
//       },
//       {
//         onError: (err: any) => {
//           openNotification({
//             state: "error",
//             title: "Error Occurred",
//             description:
//               err?.response.data.message ?? err?.response.data.error.message,
//           });
//         },
//         onSuccess: (res: any) => {
//           openNotification({
//             state: "success",

//             title: "Success",
//             description: res.data.message,
//             // duration: 0.4,
//           });
//         },
//       }
//     );
//   };

//   return (
//     <>
//       <SelfServiceSubNav />
//       <div className="Container">
//         <PageIntro title="Loan Settings" link={appRoutes.loans} />
//         <PageSubHeader
//           description={"Configure your loan setting"}
//           hideBackground
//           actions={[
//             {
//               handleClick: () => form.submit(),
//               name: "Save",

//               loading: isLoading,
//             },
//           ]}
//         />

//         <Skeleton loading={isFetching} active paragraph={{ rows: 12 }}>
//           <LoanSettings Form={Form} handleSubmit={handleSubmit} form={form} />
//         </Skeleton>
//       </div>
//     </>
//   );
// };

// export default LoanPolicies;

import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import { useState } from "react";
import { LoanTabsActionProps } from "../types/setting";
import { LoanSettingSide } from "../components/settings/LoanSettingSide";
import { SetUpApprovalProcess } from "../components/settings/SetUpApprovalProcess";
import LoanTypeSetup from "../components/settings/loanTypes/LoanTypeSetup";

const LoanPolicies = () => {
  const [action, setAction] = useState<LoanTabsActionProps>("approval-process");

  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <PageIntro title="Loans Settings" link={appRoutes.loans} />
        <p className="text-accent text-sm pt-3">Configure your loan settings</p>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 border-t">
          <div className="col-span-1 border-r pt-8">
            <LoanSettingSide setAction={setAction} action={action} />
          </div>
          <div className="col-span-2 pt-8 pl-3">
            {action === "approval-process" ? <SetUpApprovalProcess /> : null}
            {action === "loan-types" ? <LoanTypeSetup /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanPolicies;
