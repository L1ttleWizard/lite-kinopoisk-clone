import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useFilterContext } from "../context/FilterContext";

export const Header = () => {
  const { lastFilters } = useFilterContext();
  const mainPageRoute = `/${lastFilters ? `?${lastFilters}` : ""}`;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to={mainPageRoute}
          sx={{
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          Кинопоиск Lite
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to={mainPageRoute}>
            Главная
          </Button>
          <Button color="inherit" component={RouterLink} to="/favorites">
            Избранное
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
