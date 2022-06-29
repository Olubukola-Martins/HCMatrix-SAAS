import React from "react";
import { Link } from "react-router-dom";
import errorPage from "../Images/404.png";
import DashboardLayout from "../DashboardLayout";

const NotFoundPage = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-10 pb-10">
        <div className="flex justify-center items-center text-center">
          <div>
            <img src={errorPage} alt="not found page" />
            <h4
              className="text-lg font-semibold pb-10 pt-5 text-accent"
            >
              Opps! Page Not Found
            </h4>
            <Link to="/" className="button">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotFoundPage;
