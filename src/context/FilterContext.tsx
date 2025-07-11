/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
interface FilterContextType {
  lastFilters: string;
  setLastFilters: (filters: string) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext должен использоваться внутри FilterProvider"
    );
  }
  return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [lastFilters, setLastFilters] = useState("");
  const value = { lastFilters, setLastFilters };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
