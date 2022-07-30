import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Image from "../components/Image";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: "100%",
  position: "absolute",
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Image
          disabledEffect={true}
          alt={"logo"}
          src={require("../assets/logo/Logo-hz.png")}
          sx={{ width: 64, height: 64, borderRadius: 1.5, flexShrink: 0 }}
        />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
