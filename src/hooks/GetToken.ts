export const GetToken = () => {
  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("hcmatrix_app_state")
      : null;
  const userInfo = user ? JSON.parse(user) : null;
  const token = userInfo?.userToken;

  const currentCompany = userInfo?.companies?.find(
    (item: any) => item.companyId
  );
  
  const companyId = currentCompany.companyId;

  return { token, companyId };
};
