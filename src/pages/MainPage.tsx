import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { api } from "../api";
import type{ IMovie } from "../types/movie";
import { useObserver } from "../hooks/useObserver";
import { useFilterContext } from "../context/FilterContext";
import { Filters } from "../components/Filters";
import { MovieGridItem } from "../components/MovieGridItem";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";

const MOVIES_PER_PAGE = 50;

export const MainPage = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchParams] = useSearchParams();
  const { setLastFilters } = useFilterContext();
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = useCallback(async () => {
    if (!searchParams.has("rating.kp")) {
      return;
    }

    setIsLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    params.set("limit", String(MOVIES_PER_PAGE));

    try {
      const response = await api.get("/v1.4/movie", { params });
      const filteredDocs = response.data.docs.filter(
        (movie: IMovie) => movie.rating.kp > 0
      );

      if (page === 1) {
        setMovies(filteredDocs);
      } else {
        setMovies((prev) => [...prev, ...filteredDocs]);
      }
      setTotalMovies(response.data.total);
    } catch (error) {
      console.error("Ошибка при загрузке фильмов:", error);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, searchParams]);

  useEffect(() => {
    setLastFilters(searchParams.toString());
  }, [searchParams, setLastFilters]);

  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useObserver({
    targetRef: lastElementRef,
    canLoad: movies.length > 0 && movies.length < totalMovies && !isLoading,
    isLoading,
    callback: () => {
      setPage((prevPage) => prevPage + 1);
    },
  });

  return (
    <Box>
      <Filters />
      <Grid container spacing={3}>
        {isLoading && movies.length === 0
          ? Array.from(new Array(12)).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          : movies.map((movie) => (
              <MovieGridItem key={movie.id} movie={movie} />
            ))}
      </Grid>
      <div ref={lastElementRef} style={{ height: "20px" }} />
      {isLoading && movies.length > 0 && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading && movies.length === 0 && searchParams.has("rating.kp") && (
        <Typography variant="h5" textAlign="center" sx={{ mt: 5 }}>
          Фильмы не найдены. Попробуйте изменить фильтры.
        </Typography>
      )}
    </Box>
  );
};
