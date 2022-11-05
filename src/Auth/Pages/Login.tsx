import peachBg from "../Assets/Images/peachBg.png";
import lightBg from "../Assets/Images/lightBg.png";

export const Login = () => {
  return (
    <div className="flex">
      <div
        className="Container w-full h-screen text-white"
        style={{ backgroundImage: `url(${peachBg})` }}
      >
        <div>
          <div className="text-center">
            <h2 className="text-white">Welcome To HCMatrix!</h2>
            <p>
              Already have an account? <br className="hidden md:flex" /> please
              login with your personal information to stay
              <br className="hidden md:flex" /> connected with us.
            </p>
            <button className="border border-white rounded px-3 py-1 text-white">
              Sign In
            </button>
          </div>
        </div>
      </div>
      <div
        className="Container w-full h-screen"
        style={{ backgroundImage: `url(${lightBg})` }}
      >
        Hello
      </div>
    </div>
  );
};
