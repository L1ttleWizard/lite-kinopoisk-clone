import { useSearchParams } from "react-router-dom";
import { Box, Slider, Typography, Paper, Button } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import React, { useState, useEffect } from "react";
import { api } from "../api";
import { CustomGenreSelect } from "./CustomGenreSelect";

interface IGenre {
  name: string;
  slug: string;
}

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [allGenres, setAllGenres] = useState<IGenre[]>([]);
  const [ratingValue, setRatingValue] = useState<number[]>([0.1, 10]);
  const [yearValue, setYearValue] = useState<number[]>([
    1990,
    new Date().getFullYear(),
  ]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  useEffect(() => {
    api
      .get("/v1/movie/possible-values-by-field", {
        params: { field: "genres.name" },
      })
      .then((response) => setAllGenres(response.data))
      .catch((error) => console.error("Ошибка при загрузке жанров:", error));
  }, []);

  useEffect(() => {
    if (!searchParams.has("rating.kp") && !searchParams.has("year")) {
      const defaultParams = new URLSearchParams();
      defaultParams.set("rating.kp", "0.1-10");
      defaultParams.set("year", `1990-${new Date().getFullYear()}`);
      setSearchParams(defaultParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setRatingValue(
      (searchParams.get("rating.kp") || "0.1-10").split("-").map(Number)
    );
    setYearValue(
      (searchParams.get("year") || `1990-${new Date().getFullYear()}`)
        .split("-")
        .map(Number)
    );
    setSelectedGenres(searchParams.getAll("genres.name"));
  }, [searchParams]);

  const handleRatingChangeCommitted = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(
      "rating.kp",
      `${(newValue as number[])[0]}-${(newValue as number[])[1]}`
    );
    setSearchParams(newSearchParams);
  };

  const handleYearChangeCommitted = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(
      "year",
      `${(newValue as number[])[0]}-${(newValue as number[])[1]}`
    );
    setSearchParams(newSearchParams);
  };

  const handleGenreChange = (newGenres: string[]) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("genres.name");
    newGenres.forEach((genre) => newSearchParams.append("genres.name", genre));
    setSearchParams(newSearchParams);
  };

  const handleResetFilters = () => {
    const defaultParams = new URLSearchParams();
    defaultParams.set("rating.kp", "0.1-10");
    defaultParams.set("year", `1990-${new Date().getFullYear()}`);
    setSearchParams(defaultParams);
  };

  return (
    <Paper
      elevation={3}
      sx={{ mb: 4, p: 3, display: "flex", flexDirection: "column", gap: 3 }}
    >
      <CustomGenreSelect
        allGenres={allGenres}
        selectedGenres={selectedGenres}
        onGenreChange={handleGenreChange}
      />

      <Box>
        <Typography gutterBottom>
          Рейтинг (от {ratingValue[0]} до {ratingValue[1]})
        </Typography>
        <Slider
          value={ratingValue}
          onChange={(_event: Event, newValue: number | number[]) =>
            setRatingValue(newValue as number[])
          }
          onChangeCommitted={handleRatingChangeCommitted}
          valueLabelDisplay="auto"
          min={0.1}
          max={10}
          step={0.1}
        />
      </Box>

      <Box>
        <Typography gutterBottom>
          Год выпуска (от {yearValue[0]} до {yearValue[1]})
        </Typography>
        <Slider
          value={yearValue}
          onChange={(_event: Event, newValue: number | number[]) =>
            setRatingValue(newValue as number[])
          }
          onChangeCommitted={handleYearChangeCommitted}
          valueLabelDisplay="auto"
          min={1990}
          max={new Date().getFullYear()}
        />
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        startIcon={<RestartAltIcon />}
        onClick={handleResetFilters}
        fullWidth
        sx={{ mt: 1 }}
      >
        Сбросить фильтры
      </Button>
    </Paper>
  );
};
