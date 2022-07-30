import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function NoObjectionIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2 0C0.906937 0 0 0.906937 0 2V16C0 17.0931 0.906937 18 2 18H16C17.0931 18 18 17.0931 18 16V9H16V16H2V2H9V0H2ZM11 0V2H14.5859L5.29297 11.293L6.70703 12.707L16 3.41406V7H18V0H11Z"
          fill="#0057A8"
        />
      </svg>
    </Box>
  );
}
