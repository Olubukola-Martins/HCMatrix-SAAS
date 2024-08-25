import { PageIntro } from "components/layout/PageIntro";
import CandidateInfoCard from "../components/candidates/CandidateInfoCard";

const CandidateInfoPage = () => {
  return (
    <div className="Container flex flex-col gap-y-6">
      <PageIntro link={true} title="Candidate Information" />
      <CandidateInfoCard name="Adeshina Samuel" email="Samuel@gmail.com" phone_number="+234705243521" city="Lagos" state="Lagos" country="Nigeria" score={0} address="Chales okorocha street" candidateImg="https://res.cloudinary.com/dryuek31u/image/upload/v1682008960/samples/people/smiling-man.jpg" />
    </div>
  );
};

export default CandidateInfoPage;
