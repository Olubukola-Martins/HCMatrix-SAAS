// import { AppButton } from "components/button/AppButton";
// import { RecruitmentSettingsIntro } from "features/recruitment/components/RecruitmentSettingsIntro";
// import { RecruitmentMappedVariables } from "../components/RecruitmentMappedVariables.";
// import { useState } from "react";
// import { RecruitmentEmailsDescription } from "../components/RecruitmentEmailsDescription";

// const additionalEmailTemplates = [
//   {
//     emailSubject: "Invitation for Interview as a Panelist",
//     emailBody: "Thank you for applying at Lefff......",
//   },
//   {
//     emailSubject: "Invite for Panelist Acceptance",
//     emailBody: "Thank you for applying at Lefff......",
//   },
//   {
//     emailSubject: "Send A Job Opening Invite",
//     emailBody: "Thank you for applying at Lefff......",
//   },
// ];

// export const RecruitmentEmailTemplate = () => {
//   const [openMappedVariables, setOpenDrawerVariables] =
//     useState<boolean>(false);
//   return (
//     <div>
//       <RecruitmentSettingsIntro
//         title="Email Template"
//         description="Customize email templates to send to candidates. Variables are being matched to help streamline your application. Click on “Mapped Variables” button to view."
//       />
//       <div className="Container">
//         <RecruitmentMappedVariables
//           handleClose={() => setOpenDrawerVariables(false)}
//           open={openMappedVariables}
//         />
//         <div className="flex gap-8 p-3 m-2 items-center">
//           <button
//             className="underline underline-offset-8 text-caramel font-bold"
//             onClick={() => {
//               setOpenDrawerVariables(true);
//             }}
//           >
//             Mapped Variables
//           </button>
//           <AppButton
//             label="+ Add Email Template"
//             variant="transparent"
//             additionalClassNames={["font-bold"]}
//           />
//         </div>
//         <p className="px-4 pb-3">
//           This email template will automatically be sent to applicants when they
//           submit an application.
//         </p>
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


export const RecruitmentEmailTemplate = () => {
  return (
    <div>RecruitmentEmailTemplate</div>
  )
}
