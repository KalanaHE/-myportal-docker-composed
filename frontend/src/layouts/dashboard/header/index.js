import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, LinearProgress } from "@mui/material";
import useOffSetTop from "../../../hooks/useOffSetTop";
import useResponsive from "../../../hooks/useResponsive";
import cssStyles from "../../../utils/cssStyles";
import { HEADER, NAVBAR } from "../../../config";
import Iconify from "../../../components/Iconify";
import { IconButtonAnimate } from "../../../components/animate";
import Searchbar from "./Searchbar";
import AccountPopover from "./AccountPopover";
import { useSelector } from "react-redux";
import Image from "../../../components/Image";

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isCollapse" && prop !== "isOffset" && prop !== "verticalLayout",
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: "none",
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(["width", "height"], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up("lg")]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: "100%",
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const isDesktop = useResponsive("up", "lg");
  const isLoading = useSelector((state) => state.common.loading);
  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Toolbar
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && (
          <Image
            alt={"logo"}
            src={require("../../../assets/logo/Logo.png")}
            sx={{ width: 40, height: 40, mr: 2.5 }}
          />
        )}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: "text.primary" }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
