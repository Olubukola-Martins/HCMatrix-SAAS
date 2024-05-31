import { useEffect } from "react";
import { GOOGLE_ANALYTICS_PARAMETERS } from "config/enviroment";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

// initialize react-ga to track page views on google analytics
export const useInitializeGoogleAnalyticsTracking = () => {
  useEffect(() => {
    ReactGA.initialize(
      GOOGLE_ANALYTICS_PARAMETERS.GOOGLE_ANALYTICS_TRACKING_ID
    );
  });
};

// track pages with google analaytics (please note this has to be called within react router as it uses useLocation)
export const useSendGoogleAnalyticsPageView = () => {
  const location = useLocation();
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
      title: location.pathname + location.search,
    });
  }, [location]);
};
