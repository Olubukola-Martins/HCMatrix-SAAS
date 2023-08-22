import { useState } from 'react';
import { RecruitTemplateVariables } from '../components/RecruitTemplateVariables '
import { RecruitmentSettingsIntro } from '../components/RecruitmentSettingsIntro'
import { appRoutes } from 'config/router/paths'

const EmailTemplate = () => {
  const [openVariables, setOpenVariables] = useState(false);

  return (
    <>
      <RecruitTemplateVariables
        open={openVariables}
        handleClose={() => setOpenVariables(false)}
      />
      <RecruitmentSettingsIntro
        title="Email Template"
        description={
          "Customize email templates to send to candidates on your ATS."
        }
        nextLink={appRoutes.recruitmentOfferTemplate}
      />
    </>
  );
}

export default EmailTemplate