import RecruitmentSubNav from "features/recruitment/components/RecruitmentSubNav";
import ApplicantDetailsCard from "../components/ApplicantDetailsCard";
import ApplicationReceivedByDepartmentCard from "../components/ApplicationReceivedByDepartmentCard";
import EmploymentTypeAnalyticsCard from "../components/EmploymentTypeAnalyticsCard";
import RecruitmentDBCards from "../components/RecruitmentDBCards";
import RecruitmentDBChatsCard from "../components/RecruitmentDBChatsCard";
import { cardData } from "../utils/data/recruitDBCardsData";

// TODO: Recruitment:: Link to paths and routes, the child components should be properly fleshed out as well
const RecruitmentDBPage = () => {
  return (
    <>
      <RecruitmentSubNav />
      <div className="Container">
        <h3 className="text-xl mb-7 text-accent">Welcome to the recruitment module</h3>

        <div className="flex flex-col gap-y-8">
          <section about="recruitment dashboard cards" className="grid grid-cols-1 max-sm:max-h-[50vh] soverflow-auto overflow-x-auto gap-x-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between  gap-y-5">
            {cardData.map((card) => {
              const { cardCount, cardName, link } = card;
              return <RecruitmentDBCards title={cardName} count={cardCount} link={link} />;
            })}
          </section>

          <section about="recruitment dashboard charts " className="grid grid-cols-5 lg:grid-cols-8 mx-auto justify-between gap-y-5 gap-x-6 max-sm:mt-2">
            <div className="lg:col-span-3 md:col-span-2 col-span-5 h-full ">
              <EmploymentTypeAnalyticsCard />
            </div>
            <div className=" lg:col-span-5 md:col-span-3 col-span-5 h-full">
              <ApplicationReceivedByDepartmentCard />
            </div>

            <div className="lg:col-span-6 md:col-span-3 col-span-5 ">
              <ApplicantDetailsCard />
            </div>

            <div className="lg:col-span-2 md:col-span-2 col-span-5">
              <RecruitmentDBChatsCard />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default RecruitmentDBPage;
