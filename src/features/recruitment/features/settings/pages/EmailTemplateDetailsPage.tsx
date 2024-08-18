import { EmailFormPage } from "../components/EmailFormPage";

// interface IEmailTemplateDetailsPageProps {
//   isNewTemplate: boolean;
// }
const EmailTemplateDetailsPage =() => {
  const handleSubmit = (val: any) => {
    console.log("values of form:", val);
  };

  return (
    <div>
      <EmailFormPage
        templateLabel="Email Template Subject"
        candidateStatusLabel="Select Application Candidate Status"
        panelistSwitch={true}
        handleSubmit={handleSubmit}
        pageDescription="Note: If the panelist toggle is off, the candidate status can be attached to the email, indicating it's only for the candidate and not the panelist."
        // pageTitle={`${isNewTemplate ? "New Email Template" : "Email Template"}`}
        pageTitle="Email Template"
      />
    </div>
  );
};

export default EmailTemplateDetailsPage;
