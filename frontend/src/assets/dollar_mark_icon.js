import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function DollarMarkIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="16" fill="#C5E3FF" />
        <path
          d="M31.7334 30.5333C28.7068 29.7467 27.7334 28.9333 27.7334 27.6667C27.7334 26.2133 29.0801 25.2 31.3334 25.2C33.7068 25.2 34.5868 26.3333 34.6668 28H37.6134C37.5201 25.7067 36.1201 23.6 33.3334 22.92V20H29.3334V22.88C26.7468 23.44 24.6668 25.12 24.6668 27.6933C24.6668 30.7733 27.2134 32.3067 30.9334 33.2C34.2668 34 34.9334 35.1733 34.9334 36.4133C34.9334 37.3333 34.2801 38.8 31.3334 38.8C28.5868 38.8 27.5068 37.5733 27.3601 36H24.4268C24.5868 38.92 26.7734 40.56 29.3334 41.1067V44H33.3334V41.1333C35.9334 40.64 38.0001 39.1333 38.0001 36.4C38.0001 32.6133 34.7601 31.32 31.7334 30.5333Z"
          fill="#0057A8"
        />
      </svg>
    </Box>
  );
}
