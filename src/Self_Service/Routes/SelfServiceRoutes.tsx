import React from "react";
import { Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";

import AssetDetails from "../Pages/Assets/AssetDetails";
import Assets from "../Pages/Assets/Assets";
import AssetTypeDetails from "../Pages/Assets/AssetTypeDetails";
import LoanHome from "../Pages/Loan/LoanHome";
import LoanPolicies from "../Pages/Loan/LoanPolicies";
import LoanRequest from "../Pages/Loan/LoanRequest";
import Monetary from "../Pages/Monetary";
import Reimbursements from "../Pages/Reimbursements";
import Requisition from "../Pages/Requisition";
import SelfServiceHome from "../Pages/SelfServiceHome";
import SurveyHome from "../Pages/Survey/SurveyHome";
import VehicleBookingHome from "../Pages/VehicleBooking/VehicleBookingHome";
import VehicleDetails from "../Pages/VehicleBooking/VehicleDetails";
// leave
import LeaveHome from "../Pages/Leave/LeaveHome";
import LeaveSettings from "../Pages/Leave/LeaveSettings";
import HealthAccessHome from "../Pages/HealthAccess/HealthAccessHome";
import HealthAccessSettings from "../Pages/HealthAccess/HealthAccessSettings";
import NewSurveyForm from "../Pages/Survey/NewSurveyForm";
import SingleSurveyForm from "../Pages/Survey/SingleSurveyForm";
import CRBHome from "../Pages/ConferenceRoomBooking.js/CRBHome";
import Onboarding from "../Pages/Onboarding/Onboarding.js";
import StartOnboarding from "../Pages/Onboarding/StartOnboarding";
import HandOver from "../Pages/HandOver/HandOver";
import NewForm from "../Pages/HandOver/NewForm";
import HandOverDetails from "../Pages/HandOver/HandOverDetails";
import HRLetters from "../Pages/HRLetters/HRLetters";

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/self-service/home"
          element={
            <RequireAuth loginPath={"/login"}>
              <SelfServiceHome />
            </RequireAuth>
          }
        />

        <Route
          path="/self-service/requisition"
          element={
            <RequireAuth loginPath={"/login"}>
              <Requisition />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/reimbursements"
          element={
            <RequireAuth loginPath={"/login"}>
              <Reimbursements />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/monetary"
          element={
            <RequireAuth loginPath={"/login"}>
              <Monetary />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/assets"
          element={
            <RequireAuth loginPath={"/login"}>
              <Assets />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/assets/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <AssetTypeDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/assets-details"
          element={
            <RequireAuth loginPath={"/login"}>
              <AssetDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/loan"
          element={
            <RequireAuth loginPath={"/login"}>
              <LoanHome />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/loan-request"
          element={
            <RequireAuth loginPath={"/login"}>
              <LoanRequest />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/loan-policies"
          element={
            <RequireAuth loginPath={"/login"}>
              <LoanPolicies />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/vehicle-booking"
          element={
            <RequireAuth loginPath={"/login"}>
              <VehicleBookingHome />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/vehicle-details"
          element={
            <RequireAuth loginPath={"/login"}>
              <VehicleDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/vehicle-details"
          element={
            <RequireAuth loginPath={"/login"}>
              <VehicleDetails />
            </RequireAuth>
          }
        />

        {/* survey */}
        <Route
          path="/self-service/survey"
          element={
            <RequireAuth loginPath={"/login"}>
              <SurveyHome />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/survey/new"
          element={
            <RequireAuth loginPath={"/login"}>
              <NewSurveyForm />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/survey-form/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <SingleSurveyForm />
            </RequireAuth>
          }
        />
        {/* conference room */}
        <Route
          path="self-service/conference-room-booking"
          element={
            <RequireAuth loginPath={"/login"}>
              <CRBHome />
            </RequireAuth>
          }
        />

        {/* leave */}
        <Route
          path="/self-service/leave"
          element={
            <RequireAuth loginPath={"/login"}>
              <LeaveHome />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/leave/settings"
          element={
            <RequireAuth loginPath={"/login"}>
              <LeaveSettings />
            </RequireAuth>
          }
        />
        {/* health access */}
        <Route
          path="/self-service/health-access"
          element={
            <RequireAuth loginPath={"/login"}>
              <HealthAccessHome />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/health-access/settings"
          element={
            <RequireAuth loginPath={"/login"}>
              <HealthAccessSettings />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/health-access/settings"
          element={
            <RequireAuth loginPath={"/login"}>
              <HealthAccessSettings />
            </RequireAuth>
          }
        />

        {/* Onboarding */}
        <Route
          path="/self-service/onboarding"
          element={
            <RequireAuth loginPath={"/login"}>
              <Onboarding />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/onboarding/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <StartOnboarding />
            </RequireAuth>
          }
        />

        {/* Handover */}
        <Route
          path="/self-service/handover-form"
          element={
            <RequireAuth loginPath={"/login"}>
              <HandOver />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/handover-new-form"
          element={
            <RequireAuth loginPath={"/login"}>
              <NewForm />
            </RequireAuth>
          }
        />
        <Route
          path="/self-service/handover-form/:id"
          element={
            <RequireAuth loginPath={"/login"}>
              <HandOverDetails />
            </RequireAuth>
          }
        />

        {/* HR Letters */}
        <Route
          path="/self-service/hr-letters"
          element={
            <RequireAuth loginPath={"/login"}>
              <HRLetters />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default SelfServiceRoutes;
