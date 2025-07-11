import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { api } from "../api";
import type { IMovieDetails } from "../types/movie";
import { useFavorites } from "../context/FavoritesContext";
import { ConfirmationModal } from "../components/ConfirmationModal";

export const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    api
      .get(`/v1.4/movie/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Ошибка загрузки фильма:", error))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <Typography variant="h5">Фильм не найден</Typography>;
  }

  const isAlreadyFavorite = isFavorite(movie.id);

  const handleFavoriteClick = () => {
    if (!isAlreadyFavorite) {
      setModalOpen(true);
    } else {
      removeFavorite(movie.id);
    }
  };

  const handleConfirmAdd = () => {
    addFavorite(movie);
    setModalOpen(false);
  };

  return (
    <Paper sx={{ p: 3, mt: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <img
            src={
              movie.poster?.url || "https://placehold.co/400x600?text=No+Image"
            }
            alt={movie.name}
            style={{ width: "100%", borderRadius: "8px", display: "block" }}
          />
        </Grid>
        <Grid size={{xs:12,md:4}}>
          <Typography variant="h3" gutterBottom>
            {movie.name} ({movie.year})
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Рейтинг Кинопоиска: {movie.rating.kp.toFixed(1)}
          </Typography>
          <Box my={2}>
            {movie.genres.map((g) => (
              <Chip key={g.name} label={g.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            {movie.description || "Описание отсутствует."}
          </Typography>
          <Button
            variant="contained"
            color={isAlreadyFavorite ? "secondary" : "primary"}
            onClick={handleFavoriteClick}
            sx={{ mt: 2 }}
          >
            {isAlreadyFavorite
              ? "Удалить из избранного"
              : "Добавить в избранное"}
          </Button>
        </Grid>
      </Grid>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmAdd}
        title="Подтверждение"
        message={`Вы уверены, что хотите добавить фильм "${movie.name}" в избранное?`}
      />
    </Paper>
  );
};
