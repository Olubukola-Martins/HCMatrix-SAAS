import peachBg from "../assets/images/peachBg.png";
// import greenBg from "../assets/images/greenBg.png";
import lightBg from "../assets/images/lightBg.png";
import logo from "../assets/images/logo.png";
import microsoft from "../assets/images/microsoft.svg";
// import google from "../assets/images/google.svg";
// import office from "../assets/images/office.svg";
// import linkedin from "../assets/images/linkedin.svg";
import { Divider } from "antd";
import "../style/style.css";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useIsAuthenticated } from "react-auth-kit";
import UserLoginForm from "../components/UserLoginForm";
import { loginUserWithMicrosoft } from "../hooks/useLoginWithMicrosoft";
import { appRoutes } from "config/router/paths";

export const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  // const { mutate } = useMutation(loginUserWithMicrosoft);

  const handleMicro = () => {
    loginUserWithMicrosoft()
      .then((res) => {
        const link = res.data.data;
        window.location.replace(link);
      })
      .catch((err) => {});
  };
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <>
      {isAuthenticated() && <Navigate to={appRoutes.home} replace={true} />}

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
                    to={appRoutes.register}
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
                  Login to your account
                </h2>
                <p className="pt-2 pb-7">Getting started made easy</p>
                <div className="lg:px-14">
                  {email && password ? (
                    <UserLoginForm autoLoginDetails={{ email, password }} />
                  ) : (
                    <UserLoginForm />
                  )}
                  <div className="flex justify-between mb-6 pt-2 text-slate-500">
                    <Link
                      to={appRoutes.register}
                      className="cursor-pointer text-sm hover:text-caramel hover:underline"
                    >
                      Sign up
                    </Link>
                    <Link
                      to={appRoutes.forgotPassword}
                      className="cursor-pointer text-sm hover:text-caramel hover:underline"
                    >
                      Forgot password ?
                    </Link>
                  </div>
                  <Divider>
                    <span className="text-sm">Sign In with</span>
                  </Divider>
                  <div className="flex items-center justify-center gap-6">
                    <img
                      src={microsoft}
                      alt="microsoft"
                      className="cursor-pointer"
                      title="Microsoft"
                      onClick={handleMicro}
                    />

                    {/* <img
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
                    /> */}
                  </div>
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
