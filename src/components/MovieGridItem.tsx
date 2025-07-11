import { Grid } from '@mui/material';
import type { IMovie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridItemProps {
  movie: IMovie;
}

export const MovieGridItem = ({ movie }: MovieGridItemProps) => {
  return (
   
    <Grid size={{xs:12, sm:6, md:4, lg:3}}>
      <MovieCard movie={movie} />
    </Grid>
  );
};