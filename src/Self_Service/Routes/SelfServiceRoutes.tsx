import { appRoutes } from "AppRoutes";
import { RequireAuth } from "react-auth-kit";
import { Routes, Route } from "react-router-dom";
import AssetDetails from "Self_Service/Pages/Assets/AssetDetails";
import Assets from "Self_Service/Pages/Assets/Assets";
import AssetTypeDetails from "Self_Service/Pages/Assets/AssetTypeDetails";
import CRBHome from "Self_Service/Pages/ConferenceRoomBooking.js/CRBHome";
import HandOver from "Self_Service/Pages/HandOver/HandOver";
import HandOverDetails from "Self_Service/Pages/HandOver/HandOverDetails";
import NewForm from "Self_Service/Pages/HandOver/NewForm";
import HealthAccessHome from "Self_Service/Pages/HealthAccess/HealthAccessHome";
import HealthAccessSettings from "Self_Service/Pages/HealthAccess/HealthAccessSettings";
import HRLetters from "Self_Service/Pages/HRLetters/HRLetters";
import LeaveHome from "Self_Service/Pages/Leave/LeaveHome";
import LeaveSettings from "Self_Service/Pages/Leave/LeaveSettings";
import LoanHome from "Self_Service/Pages/Loan/LoanHome";
import LoanPolicies from "Self_Service/Pages/Loan/LoanPolicies";
import LoanRequest from "Self_Service/Pages/Loan/LoanRequest";
import Monetary from "Self_Service/Pages/Monetary";
import Onboarding from "Self_Service/Pages/Onboarding/Onboarding";
import StartOnboarding from "Self_Service/Pages/Onboarding/StartOnboarding";
import Reimbursements from "Self_Service/Pages/Reimbursements";
import Requisition from "Self_Service/Pages/Requisition";
import SelfServiceHome from "Self_Service/Pages/SelfServiceHome";
import NewSurveyForm from "Self_Service/Pages/Survey/NewSurveyForm";
import SingleSurveyForm from "Self_Service/Pages/Survey/SingleSurveyForm";
import SurveyHome from "Self_Service/Pages/Survey/SurveyHome";
import VehicleBookingHome from "Self_Service/Pages/VehicleBooking/VehicleBookingHome";
import VehicleDetails from "Self_Service/Pages/VehicleBooking/VehicleDetails";

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
