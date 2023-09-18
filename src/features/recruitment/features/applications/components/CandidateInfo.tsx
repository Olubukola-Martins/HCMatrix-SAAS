import "../../../assets/style.css";

export const CandidateInfo = () => {
  return (
    <>
      <div className="rounded md:p-5 p-3">
        <div className="applicantInfoPage">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 lg:gap-52">
            <div>
              <h2>Experience</h2>
              <p className="applicantInfoPageParagraph">
                SNAPNET NIGERIA LIMITED
              </p>
            </div>
            <div>
              <h2 className="text-card">lorem</h2>
              <p className=" applicantInfoPageParagraph">Snapnet.com</p>
            </div>
          </div>
          <div className="mt-5">
            <h2>Duration</h2>
            <p className="applicantInfoPageParagraph">--/--/-- to --/--/--</p>
          </div>
          <div className="mt-5">
            <h2>Role</h2>
            <p className="applicantInfoPageParagraph lg:w-[59rem] md:w-[42rem] w-[17rem] h-[7rem]"></p>
          </div>
        </div>

        <div className="applicantInfoPage">
          <div className="md:flex items-center md:gap-8 lg:gap-52">
            <div>
              <h2>Education</h2>
              <p className="applicantInfoPageParagraph">University of Lagos</p>
            </div>
            <div>
              <h2 className="text-card">lorem</h2>
              <p className=" applicantInfoPageParagraph">BS.c Accounting</p>
            </div>
          </div>
          <div className="md:flex items-center md:gap-8 lg:gap-52 mt-5">
            <div>
              <h2>Date</h2>
              <p className="applicantInfoPageParagraph">--/--/---</p>
            </div>
            <div>
              <h2 className="text-card">lorem</h2>
              <p className=" applicantInfoPageParagraph">First Class Honor</p>
            </div>
          </div>
        </div>

        <div className="applicantInfoPage">
          <div className="md:flex items-center md:gap-8 lg:gap-52">
            <div>
              <h2>Date Available</h2>
              <p className="applicantInfoPageParagraph ">--/--/--</p>
            </div>
            <div className="mt-5">
              <h2>Desired Pay</h2>
              <p className=" applicantInfoPageParagraph">Desired Pay</p>
            </div>
          </div>
        </div>

        <div className="applicantInfoPage">
          <div>
            <h2>Website, Blog or Portfolio URL</h2>
            <p className="applicantInfoPageParagraph lg:w-[59rem] md:w-[42rem] w-[17rem] text-caramel underline hover:no-underline">
              www.website.com
            </p>
          </div>
        </div>

        <div className="applicantInfoPage">
          <div>
            <h2>LinkedIn URL</h2>
            <p className="applicantInfoPageParagraph lg:w-[59rem] md:w-[42rem] w-[17rem] text-caramel underline hover:no-underline">
              www.LinkedIn/Profile/you.com
            </p>
          </div>
        </div>

        <div className="applicantInfoPage">
          <div>
            <h2>Why do you want to work for SNAPNET NIGERIA LIMITED?</h2>
            <p className="applicantInfoPageParagraph lg:w-[59rem] md:w-[42rem] w-[17rem]">
              Lorem ipsum dolor sit amet consectetur. Eu tristique venenatis
              aliquet amet convallis. Vulputate velit ut consectetur tortor mi
              at amet egestas in. Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
