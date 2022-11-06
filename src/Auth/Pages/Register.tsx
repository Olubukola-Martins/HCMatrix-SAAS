import peachBg from "../Assets/Images/peachBg.png";
import lightBg from "../Assets/Images/lightBg.png";
import logo from "../Assets/Images/logo.png";

export const Register = () => {
  return (
    <div className="flex">
      <div
        className="Container w-full h-screen text-white py-2"
        style={{ backgroundImage: `url(${peachBg})` }}
      >
        <div>
          <img src={logo} alt="logo" className="h-14" />
          <div
            className="flex items-center justify-center"
            style={{ height: "80vh" }}
          >
            <div className="text-center">
              <h2 className="text-white text-xl font-bold">
                Welcome To HCMatrix!
              </h2>
              <p className="pt-6 pb-4">
                Already have an account? <br className="hidden md:flex" />
                please login with your personal information to stay
                <br className="hidden md:flex" /> connected with us.
              </p>
              <button className="border border-white rounded px-16 py-1 text-white font-medium text-base">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="Container w-full h-screen py-2"
        style={{ backgroundImage: `url(${lightBg})` }}
      >
        Hello
      </div>
    </div>
  );
};
