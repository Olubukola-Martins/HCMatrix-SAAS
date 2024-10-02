import { useEffect } from "react";
import { RxReload } from "react-icons/rx";
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload } from "react-simple-captcha";

const Recaptcha = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const reloadCaptcha = () => {
    loadCaptchaEnginge(6);
  };
  return (
    <div className="flex justify-between py-3  align-middle">
      <div className=" w-60 h-10 rounded-md border border-gray-400 flex justify-center py-1 ">
        <LoadCanvasTemplateNoReload />
      </div>
      <RxReload onClick={reloadCaptcha} className="text-caramel border border-caramel rounded-md h-[39px] w-16 p-2 cursor-pointer" size={16}/>
    </div>
  );
};

export default Recaptcha;
