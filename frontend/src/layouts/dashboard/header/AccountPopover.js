import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem, Avatar } from "@mui/material";
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";
import { capitalCase } from "change-case";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const MENU_OPTIONS = [
  {
    label: "Home",
    linkTo: "/home",
  },
  {
    label: "Profile",
    linkTo: "my-profile",
  },
  {
    label: "Settings",
    linkTo: "/",
    disabled: true,
  },
];

export default function AccountPopover() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(null);
  const { firstName, lastName, email } = user;
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar>{`${capitalCase(firstName.charAt(0))}${capitalCase(lastName.charAt(0))}`}</Avatar>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              disabled={option.disabled}
              key={option.label}
              to={option.linkTo}
              onClick={() => {
                navigate(option.linkTo);
                handleClose();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem sx={{ m: 1 }} onClick={() => logout()}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
