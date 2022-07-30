/* eslint-disable react-hooks/rules-of-hooks */
import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/dashboard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
import LoadingScreen from "../components/LoadingScreen";
import AuthGuard from "../guards/AuthGuard";
import RoleBasedGuard from "../guards/RoleBasedGuard";

const Loadable = (Component) => (props) => {
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}>
      <Component {...props} />
    </Suspense>
  );
};

// Authentication
const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));

// Pages
const MyProfile = Loadable(lazy(() => import("../pages/profile")));
const Home = Loadable(lazy(() => import("../pages/home")));
const PageOne = Loadable(lazy(() => import("../pages/PageOne")));
const PageTwo = Loadable(lazy(() => import("../pages/PageTwo")));

const NotFound = Loadable(lazy(() => import("../pages/Page404")));
const NoPermission = Loadable(lazy(() => import("../pages/Page403")));
const ServerError = Loadable(lazy(() => import("../pages/Page500")));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const ComingSoon = Loadable(lazy(() => import("../pages/ComingSoon")));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/home" replace />, index: true }, //initially navigate to this page
        // { path: "/dashboard", element: <Navigate to="/dashboard/one" replace />, index: true },
        {
          path: "/home",
          element: (
            <RoleBasedGuard accessibleRoles={["VIEW_GENERAL_USER_HOME"]}>
              <Home />
            </RoleBasedGuard>
          ),
        },
        {
          path: "/my-profile",
          element: (
            <RoleBasedGuard accessibleRoles={["VIEW_GENERAL_USER_HOME"]}>
              <MyProfile />
            </RoleBasedGuard>
          ),
        },
        {
          path: "/page-one",

          element: (
            <RoleBasedGuard accessibleRoles={["VIEW_GENERAL_USER_PAGE_ONE"]}>
              <PageOne />
            </RoleBasedGuard>
          ),
        },
        {
          path: "/page-two",
          element: (
            <RoleBasedGuard accessibleRoles={["VIEW_GENERAL_USER_PAGE_TWO"]}>
              <PageTwo />
            </RoleBasedGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "coming-soon", element: <ComingSoon /> },
        { path: "maintenance", element: <Maintenance /> },
        { path: "500", element: <ServerError /> },
        { path: "404", element: <NotFound /> },
        { path: "403", element: <NoPermission /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
