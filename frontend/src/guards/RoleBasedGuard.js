import PropTypes from "prop-types";
import { Container, Alert, AlertTitle } from "@mui/material";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['view_user_profile', 'view_user_home']
  children: PropTypes.node,
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const {
    user: { permissions },
  } = useAuth();

  const isAuthorized = accessibleRoles.every((element) => permissions.indexOf(element) !== -1);


  if (!isAuthorized) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
    // return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
}
