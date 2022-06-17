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
          <img src={logo} alt="logo" />
        </div>
        <div className="pb-10 pt-12 px-10 text-center">
          <p className="text-sm text-right">
            Don't have an account?
            <Link to="#!" className="text-red-800 font-semibold pl-3">
              SIGN UP
            </Link>
          </p>

          <h1 className="text-2xl pt-5">Start free trial</h1>
          <p className="text-sm text-gray-400">Getting started is easy</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
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
          <div className="flex gap-2">
            <div className="h-1 w-full bg-gray-400"/>
            <span>Or continue with</span>
            <div className="h-1 w-full bg-gray-400"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
