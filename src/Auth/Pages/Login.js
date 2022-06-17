import React from "react";
import "../Style/style.css";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
import microSoft from "../Assets/Images/microsoft.png";
import slack from "../Assets/Images/slack.png";
import linkedIn from "../Assets/Images/linkedIn.png";
import yahoo from "../Assets/Images/yahoo.png";
import facebook from "../Assets/Images/facebook.png";
import office365 from "../Assets/Images/office365.png";
import google from "../Assets/Images/google.png";
import twiter from "../Assets/Images/twiter.png";
import apple from "../Assets/Images/apple.png";

const Login = () => {
  return (
    <div className="landingBg">
      <div className="signCard">
        <div className="flex justify-end">
          <img src={logo} alt="logo" className="h-6" />
        </div>
        <div className="pb-10 pt-12 px-1 md:px-7 text-center">
          <p className="text-sm text-right">
            Don't have an account?
            <Link to="#!" className="text-red-600 font-semibold pl-3">
              SIGN UP
            </Link>
          </p>

          <h1 className="text-2xl pt-5">Start free trial</h1>
          <p className="text-sm text-gray-400">Getting started is easy</p>
          <div className="grid grid-cols-3 gap-4 mt-5 social_wrap">
            <img src={microSoft} alt="" />
            <img src={slack} alt="" />
            <img src={linkedIn} alt="" />
            <img src={yahoo} alt="" />
            <img src={facebook} alt="" />
            <img src={office365} alt="" />
            <img src={google} alt="" />
            <img src={twiter} alt="" />
            <img src={apple} alt="" />
          </div>
          <div className="grid grid-cols-3 place-items-center my-4">
            <div className="w-4/5 bg-gray-400" style={{ height: "1px" }} />
            <span className="text-sm">Or continue with</span>
            <div className="w-4/5 bg-gray-400" style={{ height: "1px" }} />
          </div>
          <form>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-red-600 rounded hover:bg-opacity-70 transition ease-in duration-300 w-full text-white py-2 font-semibold mt-6"
            >
              NEXT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
