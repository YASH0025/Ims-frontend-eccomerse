// context.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface SearchQueryContextType {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchQueryContext = createContext<SearchQueryContextType | undefined>(
  undefined
);

export const useSearchQuery = () => {
  const context = useContext(SearchQueryContext);
  if (!context) {
    throw new Error("useSearchQuery must be used within a SearchQueryProvider");
  }
  return context;
};

export const SearchQueryProvider: React.FC = ({ children }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
};
