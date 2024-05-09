import peachBg from "../assets/images/peachBg.png";
// import greenBg from "../assets/images/greenBg.png";
import lightBg from "../assets/images/lightBg.png";
import logo from "../assets/images/logo.png";
import microsoft from "../assets/images/microsoft.svg";
import google from "../assets/images/google.svg";
import office from "../assets/images/office.svg";
import linkedin from "../assets/images/linkedin.svg";
import { Divider } from "antd";
import "../style/style.css";

import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useIsAuthenticated } from "react-auth-kit";
import VerificationStatus from "../components/VerificationStatus";

export const VerifyAdminEmail = () => {
  const isAuthenticated = useIsAuthenticated();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const uid = searchParams.get("uid") ?? "";

  // validate the users token
  // if correct proceed to login
  // if it isnt notify and tell user to try login instead
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
                  Welcome back to HCMatrix!
                </h2>
                <p className="pt-6 pb-4">
                  Unable to verify email address?{" "}
                  <br className="hidden md:flex" />
                  please login with your personal information to stay
                  <br className="hidden md:flex" /> connected with us.
                </p>
                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="border justify-center flex items-center gap-3 border-white rounded px-16 py-1 text-white hover:border-gray-700 font-medium text-base transition duration-300 ease-in-out"
                  >
                    <i className="ri-arrow-left-line"></i> <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="Container w-full h-screen py-10 bg-cover bg-no-repeat text-center relative overflow-y-auto"
          style={{ backgroundImage: `url(${lightBg})` }}
        >
          <div className="formWrap pt-12 lg:pt-14" style={{ maxWidth: 500 }}>
            <div>
              <div
                // data-aos="zoom-in"
                style={{
                  boxShadow:
                    "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
                }}
                className="pb-5 pt-6 rounded-md px-6"
              >
                <h2 className="text-xl md:text-2xl font-bold">
                  Verifying Email Address
                </h2>
                <p className="pt-2 pb-7">
                  Wait a second, while we verify your email
                </p>
                <div className="lg:px-14">
                  <VerificationStatus token={token} uid={uid} />

                  <Divider>
                    <span className="text-sm">Sign in with</span>
                  </Divider>
                  <div className="flex items-center justify-center gap-6">
                    <img
                      src={microsoft}
                      alt="microsoft"
                      className="cursor-pointer"
                      title="Microsoft"
                    />
                    <img
                      src={google}
                      alt="google"
                      className="cursor-pointer"
                      title="Google"
                    />
                    <img
                      src={linkedin}
                      alt="microsoft"
                      className="cursor-pointer"
                      title="Linkedin"
                    />
                    <img
                      src={office}
                      alt="microsoft"
                      className="-ml-4 cursor-pointer"
                      title="Microsoft"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex items-center gap-2 justify-center text-xs py-5"
              style={{ color: "var(--authPrimary)" }}
            >
              <span>Privacy Policy</span>
              <span className="text-black font-semibold text-xl">.</span>
              <span>Terms of service</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
