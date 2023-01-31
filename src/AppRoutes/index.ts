// These object helps to ensure that the routes in the application are not manually hardcorded and littered everywhere
// rather they are managed by a single file
export const appRoutes = {
  // auth routes
  login: `/login`,
  register: `/register`,
  verify: `/verify`,
  verifyEmployee: `/verify-employee`,
  forgotPassword: `/forgot-password`,
  resetPassword: `/reset-password`,
  invitedEmployee: `/invited-employee-form`,
  //home routes
  home: `/`,
};
