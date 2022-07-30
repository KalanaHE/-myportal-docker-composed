import React from "react";
import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, Stack } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

const Breadcrumbs = ({ router }) => {
  const {
    location: { pathname },
    navigate,
  } = router;

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Stack spacing={2}>
      <MuiBreadcrumbs
        separator="›"
        aria-label="breadcrumb"
        style={
          pathnames.length > 0
            ? {
                backgroundColor: "rgba(205, 205, 205, 0.59)",
                padding: "0.5rem",
                paddingLeft: "1rem",
                borderRadius: "0.5rem",
              }
            : {}
        }
      >
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Typography key={routeTo}>{pathname}</Typography>
          ) : (
            <Link
              underline="hover"
              key="1"
              color="inherit"
              onClick={() => {
                navigate(routeTo);
              }}
            >
              {pathname}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Stack>
  );
};

export default withRouter(Breadcrumbs);
