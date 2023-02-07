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
import { appRoutes } from "AppRoutes";

const SelfServiceRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path={appRoutes.selfServiceHome}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <SelfServiceHome />
            </RequireAuth>
          }
        />

        <Route
          path={appRoutes.selfServiceRequisition}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Requisition />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.selfServiceReimbursement}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Reimbursements />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.selfServiceMonetary}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Monetary />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.selfServiceAssets}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Assets />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.assetTypeDetails().format}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <AssetTypeDetails />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.assetDetails}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <AssetDetails />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.loans}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <LoanHome />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.loanRequests}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <LoanRequest />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.loanPolicies}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <LoanPolicies />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.vehicleBooking}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <VehicleBookingHome />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.vehicleDetails}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <VehicleDetails />
            </RequireAuth>
          }
        />

        {/* survey */}
        <Route
          path={appRoutes.surveyHome}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <SurveyHome />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.newSurvey}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <NewSurveyForm />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.singleSurveyForm().format}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <SingleSurveyForm />
            </RequireAuth>
          }
        />
        {/* conference room */}
        <Route
          path={appRoutes.conferenceRoomBooking}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <CRBHome />
            </RequireAuth>
          }
        />

        {/* leave */}
        <Route
          path={appRoutes.leaveHome}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <LeaveHome />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.leaveSettings}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <LeaveSettings />
            </RequireAuth>
          }
        />
        {/* health access */}
        <Route
          path={appRoutes.healthAccessHome}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HealthAccessHome />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.healthAccessSettings}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HealthAccessSettings />
            </RequireAuth>
          }
        />

        {/* Onboarding */}
        <Route
          path={appRoutes.onbording}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <Onboarding />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.startOnBoarding().format}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <StartOnboarding />
            </RequireAuth>
          }
        />

        {/* Handover */}
        <Route
          path={appRoutes.handOver}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HandOver />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.newHandOverForm}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <NewForm />
            </RequireAuth>
          }
        />
        <Route
          path={appRoutes.handOverDetails().format}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HandOverDetails />
            </RequireAuth>
          }
        />

        {/* HR Letters */}
        <Route
          path={appRoutes.hRLetters}
          element={
            <RequireAuth loginPath={appRoutes.login}>
              <HRLetters />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};

export default SelfServiceRoutes;
