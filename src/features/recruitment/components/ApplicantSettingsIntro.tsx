import { PageIntro } from "components/layout/PageIntro";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

interface IProps {
  title: string;
  nextLink?: string;
  description: string;
}

export const ApplicantSettingsIntro = ({
  description,
  title,
  nextLink,
}: IProps) => {
  return (
    <>
      <div className="Container my-5">
        <div className="flex justify-between">
          <div>
            <PageIntro title={title} link={appRoutes.applicationsList} />
            <p className="pt-1">{description}</p>
          </div>
          {nextLink ? (
            <div>
              <Link to={nextLink} className="button">
                {}
              </Link>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
};
