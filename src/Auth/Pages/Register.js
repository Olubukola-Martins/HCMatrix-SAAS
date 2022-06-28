import React, {useState} from "react";
import "../Style/style.css";
import logo from "../Assets/Images/logo.png";
import { Link } from "react-router-dom";
// import microSoft from "../Assets/Images/microsoft.png";
import slack from "../Assets/Images/slack.png";
import linkedIn from "../Assets/Images/linkedIn.png";
import yahoo from "../Assets/Images/yahoo.png";
import facebook from "../Assets/Images/facebook.png";
import office365 from "../Assets/Images/office365.png";
import google from "../Assets/Images/google.png";
import twiter from "../Assets/Images/twiter.png";
import apple from "../Assets/Images/apple.png";
import EmailVerificationModal from "../Components/EmailVerificationModal";

const Register = () => {
  const [openModal,setOpenModal] = useState(false);
  const [inputType, setInputType] = useState('password');
  const showModal = (val) => {
    setOpenModal(val);
  }
  const handleClick = (e) => {
    e.preventDefault();
    showModal(true)

  }
  const handleType = () => {
    if(inputType === 'password'){
      setInputType('text')
    }
    if(inputType === 'text'){
      setInputType('password')
    }

  }

  return (
    <div className="landingBg">
      <EmailVerificationModal open = {openModal} handleClose = {() => showModal(false)}/>
      <div className="signCard">
        <div className="flex md:justify-end justify-center">
          <img src={logo} alt="logo" className="h-6" />
        </div>
        <div className="pb-10 pt-12 px-1 md:px-7 text-center">
          <p className="text-sm text-center md:text-right">
            Have an account?
            <Link className="text-red-600 font-semibold pl-3" to = '/login'>
              SIGN IN
            </Link>
          </p>

          <h1 className="text-2xl pt-5">Start free trial</h1>
          <p className="text-sm text-gray-400">Getting started is easy</p>
          <div className="grid grid-cols-3 gap-4 mt-5 social_wrap">
            {/* <img src={microSoft} alt="" /> */}
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
          <form className = 'flex flex-col'>
           
            <input
              type="text"
              placeholder="Full Name*"
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none mb-6"
            />
            <input
              type="text"
              placeholder="Organization*"
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none mb-6"
            />
            <input
              type="email"
              placeholder="Business Email*"
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none mb-6"
            />
       
            <div class="relative w-full mb-6">
              {/* the toggler */}
    <div class="absolute inset-y-0 right-0 flex items-center px-2" onClick={handleType}>
    
      <label class="px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">
        {inputType === 'password' ? <i className="fa fa-eye-slash" aria-hidden="true"></i>: <i className="fa fa-eye" aria-hidden="false"></i>}</label>
    </div>
    <input class="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none" id="password" type={inputType}autocomplete="off"
    />
  </div>
            <div className="flex align-start">
              <input type = 'checkbox' className="mt-1 mr-1"/>
              <p className = 'max-w-fit text-sm text-gray-400 text-left'>By continuing you indicate that you have read and agreed to the <Link to = '/terms-of-use' className = 'text-red-500'>TERMS OF USE</Link>  and  <Link className = 'text-red-500' to= '/privacy-policy'>PRIVACY POLICY</Link></p>
            </div>
            <button
              onClick={handleClick}
              type="submit"
              className="bg-red-600 capitalize rounded hover:bg-opacity-70 transition ease-in duration-300 w-full text-white py-2 font-semibold mt-6"
            >
              Free SignUp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
