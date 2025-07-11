import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import type { IMovie } from "../types/movie";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card
      sx={{ height: "100%", textDecoration: "none" }}
      component={Link}
      to={`/movie/${movie.id}`}
    >
      <CardMedia
        component="img"
        height="450"
        image={
          movie.poster?.previewUrl ||
          "https://placehold.co/300x450?text=No+Image"
        }
        alt={movie.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.name || "Название неизвестно"}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {movie.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Рейтинг: {movie.rating.kp.toFixed(1)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
