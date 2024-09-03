import { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate } from "react-simple-captcha";

const Recaptcha = () => {
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  return (
    <div>
      <LoadCanvasTemplate />
    </div>
  );
};

export default Recaptcha;
