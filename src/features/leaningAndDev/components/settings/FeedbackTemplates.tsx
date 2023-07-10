const style = "border border-slate-400 rounded-lg p-2";
export const TrainingEvaluation = () => {
  return (
    <div className="font-medium flex flex-col gap-y-3">
      <div className={style}>
        <p>Q1 - The course content supported the learning objectives.</p>
      </div>
      <div className={style}>
        <p>Q2 - The course length was sufficient to deliver the content. </p>
      </div>
      <div className={style}>
        <p>
          Q3 - The course design (e.g., materials and learning activities)
          encouraged my participation in the class.
        </p>
      </div>
      <div className={style}>
        <p>
          Q4 - The course provided opportunities to practice and reinforce what
          was taught.
        </p>
      </div>
      <div className={style}>
        <p>
          Q4 - The course information was at an appropriate level to understand
          the learning objectives.
        </p>
      </div>
    </div>
  );
};

export const TrainingTool = () => {
  return (
    <div className="font-medium flex flex-col gap-y-3">
      <div className={style}>
        <p>
          Q1 - The quiz questions helped me to learn the course information.
        </p>
      </div>
      <div className={style}>
        <p>
          Q2 - The learning aids (e.g., workbooks, hand-outs, role-playing
          exercises, PowerPoint slides, software) assisted my learning{" "}
        </p>
      </div>
      <div className={style}>
        <p>Q3 - The technology equipment was working properly.</p>
      </div>
    </div>
  );
};

export const Instructor = () => {
  return (
    <div className="font-medium flex flex-col gap-y-3">
      <div className={style}>
        <p>Q1 - The instructor was knowledgeable about the course content.</p>
      </div>
      <div className={style}>
        <p>Q2 - The instructor was responsive to participants needs.</p>
      </div>
      <div className={style}>
        <p>
          Q3 - The instructor presented the content in an interesting manner.
        </p>
      </div>
      <div className={style}>
        <p>
          Q4 - The instructor encouraged a participatory and interactive
          learning environment.
        </p>
      </div>
      <div className={style}>
        <p>
          Q5 - The training facilities were suitable for learning and had
          adequate room for all.
        </p>
      </div>
      <div className={style}>
        <p>Q6 - The training location was easy to locate.</p>
      </div>
    </div>
  );
};

export const OverallBenefit = () => {
  return (
    <div className="font-medium flex flex-col gap-y-3">
      <div className={style}>
        <p>
          Q1 - The training was relevant to improving the knowledge/skills I
          need to accomplish my job.
        </p>
      </div>
      <div className={style}>
        <p>
          Q2 - The practical exercises were good simulations of the tasks that I
          perform on my job.
        </p>
      </div>
      <div className={style}>
        <p>
          Q3 - There was more than one training style used that was conducive to
          my learning style (e.g. straight lecture, lecture with visual aids.
        </p>
      </div>
      <div className={style}>
        <p>Q4 - Overall, I am satisfied with the Training course.</p>
      </div>
      <div className={style}>
        <p>Q5 - Overall, I am satisfied with the instructor(s).</p>
      </div>
      <div className={style}>
        <p>Q6 - Overall, I am satisfied with the training environment.</p>
      </div>
    </div>
  );
};
