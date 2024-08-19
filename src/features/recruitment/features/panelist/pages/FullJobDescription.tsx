import { PageIntro } from 'components/layout/PageIntro'
import { useParams } from 'react-router-dom';

const FullJobDescription = () => {
    const {id} = useParams()
  return (
    <div className="Container">
      <PageIntro title="Back" link />
      <div className="mt-5 flex flex-col gap-y-7">
        <div>
          <p className="text-lg font-bold">UI/UX Designer</p>
          <p>SNAPNET NIGERIA LIMITED</p>
          <p>Full time - Remote</p>
        </div>

        <div>
          <h2>Full Job Description </h2>
          <p>
            We are seeking a talented and experienced Lead UI/UX Designer to join our growing fintech startup. As the lead designer, you will be responsible for the overall look, feel, and usability of our auto loan marketplace platform. 
          </p>
        </div>

        <div>
          <p>Key Responsibilities:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Own the design and development of a visually stunning and intuitive user interface for our auto loan marketplace platform</li>
            <li>Work closely with our product and engineering teams to ensure that the platform meets the needs and expectations of our users</li>
            <li>Conduct user research and testing to gather insights and iterate on the design of the platform</li>
            <li>Create wireframes, prototypes, and high-fidelity mockups to communicate design concepts and gather feedback</li>
            <li>Develop and maintain design systems, style guides, and pattern libraries to ensure consistent and cohesive design across the platform</li>
            <li>Collaborate with cross-functional teams, including product management, engineering, and customer support, to ensure that the platform delivers an excellent user experience</li>
          </ul>
        </div>

        <div>
          <p>Qualifications:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bachelor's Degree in Human Computer Interaction or a related field</li>
            <li>3+ years of experience in UI/UX design, with a strong portfolio of design work</li>
            <li>Proficiency in design tools such as Sketch, Figma, or Adobe Creative Suite</li>
            <li>Experience with user research and testing methodologies</li>
            <li>Strong understanding of HTML and CSS. Javascript a plus</li>
            <li>Excellent communication and collaboration skills</li>
            <li>Marketing experience a plus</li>
            <li>Experience in banking or fintech industry a plus</li>
          </ul>
        </div>

        <div>
          <h2>Benefits:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Dental insurance</li>
            <li>Flexible schedule</li>
            <li>Health insurance</li>
            <li>Paid time off</li>
            <li>Parental leave</li>
            <li>Vision insurance</li>
          </ul>
        </div>

        <div>
          <h2>Experience level:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>3 years</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FullJobDescription