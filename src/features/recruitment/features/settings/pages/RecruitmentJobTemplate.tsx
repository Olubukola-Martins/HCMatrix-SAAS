// import { AppButton } from "components/button/AppButton";
// import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
// import { useState } from "react";
// import { RecruitmentEmailsDescription } from "../components/RecruitmentEmailsDescription";
// import { RecruitmentMappedVariables } from "../components/RecruitmentMappedVariables.";
// import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";
// import { Form } from "antd";

// const additionalEmailTemplates = [
//   {
//     emailSubject: "UI/UX Designer",
//     emailBody: "We are seeking a talented UI/UX Designer.......",
//   },
//   {
//     emailSubject: "Frontend Developer (JS)",
//     emailBody: "We are seeking a talented Frontend Developer.......",
//   },
//   {
//     emailSubject: "Mobile Developer",
//     emailBody: "We are seeking a talented Mobile Developer.......",
//   },
// ];

// export const RecruitmentJobTemplate = () => {
//   const [openMappedVariables, setOpenDrawerVariables] =
//     useState<boolean>(false);
//   return (
//     <div>
//       <RecruitmentSettingsIntro
//         title="Job Template"
//         description="Set up your Job template for each designation in all department. Click on the “Add New Template” button to get started."
//       />
//       <div className="Container">
//         <RecruitmentMappedVariables
//           handleClose={() => setOpenDrawerVariables(false)}
//           open={openMappedVariables}
//         />
//         <div className="flex p-3 m-2 items-center justify-between">
//           <div className="w-1/3">
//             <FormDepartmentInput Form={Form} showLabel={false} />
//           </div>
//           <AppButton
//             label="+ Add Email Template"
//             variant="transparent"
//             additionalClassNames={["font-bold"]}
//           />
//         </div>

//         <RecruitmentEmailsDescription
//           emailMessage="Thank you for applying at ... "
//           emailSubject="Application Confirmation Email"
//           candidateStatus="Applied"
//         />
//         <p className="px-4">
//           These are additional email templates required by a candidate or
//           application selection.
//         </p>
//         {additionalEmailTemplates.map((item) => (
//           <RecruitmentEmailsDescription
//             emailMessage={item.emailBody}
//             emailSubject={item.emailSubject}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };


export const RecruitmentJobTemplate = () => {
  return (
    <div>RecruitmentJobTemplate</div>
  )
}
