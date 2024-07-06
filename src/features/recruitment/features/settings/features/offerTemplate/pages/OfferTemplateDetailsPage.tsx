import { EmailFormPage } from "../../../components/EmailFormPage";

const OfferTemplateDetailsPage = () => {
  const handleSubmit = (val: any) => {
    console.log("values of form:", val);
  };

  return (
    <div>
      <EmailFormPage
        pageDescription=""
        pageTitle="Offer Template"
        templateLabel="Offer Template Subject"
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default OfferTemplateDetailsPage;
