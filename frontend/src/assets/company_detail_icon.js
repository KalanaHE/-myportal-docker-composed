import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function CompanyDetailIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 21.5H7V7.5H8V6C8 4.61929 9.11929 3.5 10.5 3.5H13.5C14.8807 3.5 16 4.61929 16 6V7.5H17V21.5ZM10.5 5.5C10.2239 5.5 10 5.72386 10 6V7.5H14V6C14 5.72386 13.7761 5.5 13.5 5.5H10.5Z"
          fill="#767676"
        />
        <path d="M19 7.5V21.5C20.6569 21.5 22 20.1569 22 18.5V10.5C22 8.84315 20.6569 7.5 19 7.5Z" fill="#767676" />
        <path d="M5 7.5C3.34315 7.5 2 8.84315 2 10.5V18.5C2 20.1569 3.34315 21.5 5 21.5V7.5Z" fill="#767676" />
      </svg>
    </Box>
  );
}
