import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  //   console.log(auth);
  return (
    <>
      {1 ? (
        <>
          <div className="">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
}
