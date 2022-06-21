import React, {useState} from "react";
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
import LoginSuccessModal from "../Components/LoginSuccessModal";
import ResetPasswordModal from "../Components/ResetPasswordModal";

const Login = () => {
  const [showComp,setShowComp] = useState('');
  
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [otp, setOTP] = useState('');
  
  const handleEmail = (e) => {
    setEmail(e.target.value)

  }
  const handleOTP = (e) => {
    setOTP(e.target.value)

  }
  const handlePwd = (e) => {
    setPassword(e.target.value)

  }
  const validateEmail = (emailVal) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(emailRegex.test(emailVal)){
      return true;

    }
    return false;

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(email !== '' && validateEmail(email) && showComp !== 'otp'){
      setShowComp('password')

    }
    // password
    if(email !== '' && validateEmail(email) && password !== ''){
      // make  call to api
      showLoginModal(true)


    }
    // otp
    if(email !== '' && validateEmail(email) && otp !== ''){
      // make  call to api
     showLoginModal(true)


    }


  }
  const [openLoginModal,setOpenLoginModal] = useState(false);
  const showLoginModal = (val) => {
    setOpenLoginModal(val);
  }
  const [openResetModal,setOpenResetModal] = useState(false);
  const showResetModal = (val) => {
    setOpenResetModal(val);
  }

  return (
    <div className="landingBg">
      <LoginSuccessModal open = {openLoginModal} handleClose = {() => showLoginModal(false)}/>
      <ResetPasswordModal open = {openResetModal} handleClose = {() => showResetModal(false)}/>
      <div className="signCard">
        <div className="flex justify-end">
          <img src={logo} alt="logo" className="h-6" />
        </div>
        <div className="pb-10 pt-12 px-1 md:px-7 text-center">
          <p className="text-sm text-right">
            Don't have an account?
            <Link className="text-red-600 font-semibold pl-3" to = '/register'>
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
          <form className = 'flex flex-col'>
          {showComp === '' &&<input
              type="email"
              placeholder="Email or Phone"
              value = {email}
              onChange = {handleEmail}
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none"
            />}
       
          {showComp === 'password' &&  <div className="flex flex-col align-start mb-6">
            <div className="text-sm mb-2 self-start"> 
            <span>{email}</span>
            <span className="text-orange-400 underline ml-2 cursor-pointer" onClick={() => setShowComp('')}>Change</span>
            </div>
            <input
              type="password"
              placeholder="Password*"
              value = {password}
              onChange = {handlePwd}
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none "
            />
            <div className="flex justify-between mt-2 text-sm">
            <span className="text-orange-400 cursor-pointer" onClick = {() => showResetModal(true)}>Forgot Password?</span>
              <span className="text-orange-400 cursor-pointer" onClick={() => setShowComp('otp')}>Sign In using OTP</span>
            </div>
            
            </div>}
          {showComp === 'otp' &&  <div className="flex flex-col align-start mb-6">
            <div className="text-sm mb-2 self-start"> 
            <span>{email}</span>
            <span className="text-orange-400 underline ml-2 cursor-pointer" onClick={() => setShowComp('')}>Change</span>
            </div>
            <input
              type="text"
              placeholder="Enter OTP"
              value = {otp}
              onChange = {handleOTP}
              className="w-full rounded-md py-2 px-3 border border-gray-400 focus:outline-none "
            />
            <div className="flex justify-between mt-2 text-sm">
            <span className="text-orange-400 cursor-pointer" onClick = {() => showResetModal(true)}>Forgot Password?</span>
            
              <span>Resend in 42s</span>
            </div>
            
            </div>}
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-red-600 rounded hover:bg-opacity-70 transition ease-in duration-300 w-full text-white py-2 font-semibold mt-6"
            >
            
              {showComp === 'password' && 'Sign in'}
              {showComp === 'otp' && 'Verify'}
              {showComp === '' && 'NEXT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
