import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Link, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../redux/selectors/userSelector";
import { capitalCase } from "change-case";
import { useTheme } from "@mui/material/styles";
import Label from "../../../components/Label";
const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {
  const theme = useTheme();
  const { firstName, lastName, userType } = useSelector(selectLoggedInUser);
  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        <Avatar>{`${capitalCase(firstName.charAt(0))}${capitalCase(lastName.charAt(0))}`}</Avatar>
        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {`${capitalCase(firstName)} ${capitalCase(lastName)}`}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            <Label variant={theme.palette.mode === "light" ? "ghost" : "filled"} color="warning">
              {capitalCase(userType)}
            </Label>
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
