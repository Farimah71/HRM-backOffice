import { Navigate, Outlet } from "react-router-dom";
import { getDataFromJwtToken } from "../helpers/get-data-from-jwt";
import { useDispatch } from "react-redux";
import { setStep } from "../redux/reducers/auth";

const Index = () => {
  // -------- hook -----------
  const dispatch = useDispatch();

  // -------- variables --------
  const token = localStorage.token;
  const tenantId = getDataFromJwtToken("TenantId");
  const tokenExpireTimestamp = getDataFromJwtToken("exp");
  const tokenExpireDate = new Date(tokenExpireTimestamp * 1000);
  // -------- code to be executed ---------
  if (tokenExpireDate < new Date()) {
    localStorage.token = "";
    dispatch(setStep(0));
  }

  // ---------- render jsx ----------
  return token && tenantId ? <Outlet /> : <Navigate to="/login" />;
};

export default Index;
