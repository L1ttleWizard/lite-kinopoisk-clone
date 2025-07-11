/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
interface SearchContextType {
  search: string;
  setSearch: (search: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
