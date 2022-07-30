import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Card, Typography, Box } from "@mui/material";
import { fShortenNumber } from "../../utils/formatNumber";

const RootStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2, 2, 2, 3),
}));

export default function WidgetSummary({ title, total, icon, selected }) {
  return (
    <RootStyle
      style={{
        backgroundColor: selected ? "#f5f5f5" : "transparent",
      }}
    >
      <div>
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: "50%",
          bgcolor: "background.neutral",
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  );
}

WidgetSummary.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string,
  total: PropTypes.number,
  selected: PropTypes.bool,
};
