import { Box, Grid, Typography } from "@mui/material";
import { useFavorites } from "../context/FavoritesContext";
import { MovieGridItem } from "../components/MovieGridItem";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Избранные фильмы
      </Typography>
      {favorites.length === 0 ? (
        <Typography sx={{ mt: 3 }}>Ваш список избранного пуст.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <MovieGridItem key={movie.id} movie={movie} />
          ))}
        </Grid>
      )}
    </Box>
  );
};
