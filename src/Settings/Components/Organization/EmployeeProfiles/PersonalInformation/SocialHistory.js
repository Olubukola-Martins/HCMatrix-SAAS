import React from "react";

const SocialHistory = () => {
  return (
    <div>
      <div>
        <h5 className="pb-4">Do you Smoke ?</h5>
        <div className="flex items-center gap-6 flex-wrap">
          <label
            htmlFor="sometimes"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Sometimes</span>
            <input type="radio" name="smoke" id="sometimes" />
          </label>
          <label
            htmlFor="yes"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Yes, regularly</span>
            <input type="radio" name="smoke" id="yes" />
          </label>
          <label
            htmlFor="never"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Never</span>
            <input type="radio" name="smoke" id="never" />
          </label>

          <label
            htmlFor="askMe"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Ask me</span>
            <input type="radio" name="smoke" id="askMe" />
          </label>
        </div>
      </div>

{/* Do you drink alcohol */}
      <div className="my-10">
        <h5 className="pb-4">Do you drink Alcohol ?</h5>
        <div className="flex items-center gap-6 flex-wrap">
          <label
            htmlFor="socially"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Socially</span>
            <input type="radio" name="alcohol" id="socially" />
          </label>
          <label
            htmlFor="frequently"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Frequently</span>
            <input type="radio" name="alcohol" id="frequently" />
          </label>
          <label
            htmlFor="alcoholNever"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Never</span>
            <input type="radio" name="alcohol" id="alcoholNever" />
          </label>

          <label
            htmlFor="alcoholAskMe"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Ask me</span>
            <input type="radio" name="alcohol" id="alcoholAskMe" />
          </label>
        </div>
      </div>

      {/* Do you do sports */}
      <form>
        <h5 className="pb-4">Do you do sports ?</h5>
        <div className="flex items-center gap-6 flex-wrap">
          <label
            htmlFor="sportsSometimes"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Sometimes</span>
            <input type="radio" name="sports" id="sportsSometimes" />
          </label>
          <label
            htmlFor="active"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Active</span>
            <input type="radio" name="sports" id="active" />
          </label>
          <label
            htmlFor="sportNever"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Almost Never</span>
            <input type="radio" name="sports" id="sportNever" />
          </label>

          <label
            htmlFor="sportsAskMe"
            className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
          >
            <span>Ask me</span>
            <input type="radio" name="sports" id="sportsAskMe" />
          </label>
        </div>
        <button className="button mt-7">Submit</button>
      </form>

    </div>
  );
};

export default SocialHistory;
