/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useState,
  useEffect,
  
  useContext,
} from "react";
import type { IMovie } from "../types/movie";
import type { ReactNode } from "react";
interface FavoritesContextType {
  favorites: IMovie[];
  addFavorite: (movie: IMovie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<IMovie[]>(() => {
    try {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Ошибка при чтении избранного из localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Ошибка при записи избранного в localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (movie: IMovie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((m) => m.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
