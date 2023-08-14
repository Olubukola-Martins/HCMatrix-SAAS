import { RecruitmentSettingsIntro } from '../components/RecruitmentSettingsIntro'
import { appRoutes } from 'config/router/paths'

const EmailTemplate = () => {
  return (
    <>
    <RecruitmentSettingsIntro
      title="Email Template"
      description={"Customize email templates to send to candidates on your ATS."}
      nextLink={appRoutes.recruitmentOfferTemplate}
    />
  </>
  )
}

export default EmailTemplate