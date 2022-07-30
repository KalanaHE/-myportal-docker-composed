import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function CreditCardIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#F4D0F0" />
        <path
          d="M42.6667 21.333H21.3334C19.8534 21.333 18.6801 22.5197 18.6801 23.9997L18.6667 39.9997C18.6667 41.4797 19.8534 42.6663 21.3334 42.6663H42.6667C44.1467 42.6663 45.3334 41.4797 45.3334 39.9997V23.9997C45.3334 22.5197 44.1467 21.333 42.6667 21.333ZM42.6667 39.9997H21.3334V31.9997H42.6667V39.9997ZM42.6667 26.6663H21.3334V23.9997H42.6667V26.6663Z"
          fill="#AB187D"
        />
      </svg>
    </Box>
  );
}
