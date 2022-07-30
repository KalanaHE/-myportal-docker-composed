import { Button, Stack, Typography } from "@mui/material";
import { DocIllustration } from "../../../assets";
import useAuth from "../../../hooks/useAuth";

export default function NavbarDocs() {
  const {
    user: { firstName, lastName },
  } = useAuth();
  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        textAlign: "center",
        display: "block",
      }}
    >
      <DocIllustration sx={{ width: 1 }} />
      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {firstName + " " + lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Need help?
          <br /> Please check our docs
        </Typography>
      </div>

      <Button href="https://www.linkedin.com/in/kalanahe/" target="_blank" rel="noopener" variant="contained">
        Documentation
      </Button>
    </Stack>
  );
}
