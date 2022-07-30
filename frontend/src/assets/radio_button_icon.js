import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function RadioButtonIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10.5" r="9" fill="white" stroke="#0057A8" strokeWidth="2" />
        <circle cx="10" cy="10.5" r="5" fill="#0057A8" />
      </svg>
    </Box>
  );
}
