import peachBg from "../assets/images/peachBg.png";
import lightBg from "../assets/images/lightBg.png";
import logo from "../assets/images/logo.png";
import "../style/style.css";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useIsAuthenticated } from "react-auth-kit";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

export const ResetPassword = () => {
  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const uid = searchParams.get("uid") ?? "";

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <>
      {isAuthenticated() && <Navigate to="/" replace={true} />}

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          className="Container w-full text-white py-2 bg-cover bg-no-repeat authIntro"
          style={{ backgroundImage: `url(${peachBg})` }}
        >
          <div>
            <img src={logo} alt="logo" className="h-16" />
            <div className="flex items-center justify-center authIntroInner">
              <div className="text-center">
                <h2
                  data-aos="fade-down"
                  className="text-white text-xl font-bold"
                >
                  Great To Have You Back!
                </h2>
                <p className="pt-6 pb-4">
                  We provide you with a better and more dependable approach to
                  <br className="hidden md:flex" /> operating your business to
                  boost profits and productivity.
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/register"
                    className="border justify-center flex items-center gap-3 border-white rounded px-16 py-1 text-white hover:border-gray-700 font-medium text-base transition duration-300 ease-in-out"
                  >
                    <i className="ri-arrow-left-line"></i> <span>Sign Up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="Container w-full h-screen py-10 bg-cover bg-no-repeat text-center relative overflow-x-hidden overflow-y-auto"
          style={{ backgroundImage: `url(${lightBg})` }}
        >
          <div className="formWrap pt-10" style={{ maxWidth: 500 }}>
            <div>
              <div
                data-aos="fade-left"
                style={{
                  boxShadow:
                    "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                }}
                className="pb-5 pt-10 rounded-md px-6"
              >
                <h2 className="text-xl md:text-2xl font-bold">
                  Reset Your Password
                </h2>
                <p className="pt-2 pb-7">Please create a new password</p>
                <div className="lg:px-14">
                  <ResetPasswordForm token={token} uid={uid} />
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-2 justify-center text-xs py-5"
              style={{ color: "var(--authPrimary)" }}
            >
              <a
                href="https://hcmatrix.com/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:underline"
              >
                Privacy Policy
              </a>
              <span className="text-black font-semibold text-xl">.</span>
              <a
                href="https://hcmatrix.com/terms-of-use/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:underline"
              >
                Terms of service
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
