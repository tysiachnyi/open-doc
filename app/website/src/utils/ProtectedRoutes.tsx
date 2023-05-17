import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// @ts-ignore
// const ProtectedRoutes = () => {
//   const auth = new Cookies().get("TOKEN");
//   console.log(auth);

//   return auth ? <Outlet /> : <Navigate to="/login" />;
// };
// export default ProtectedRoutes;

const ProtectedRoutes = () => {
  const auth = new Cookies().get("TOKEN");
  console.log(auth);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
