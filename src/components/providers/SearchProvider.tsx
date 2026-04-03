'use client'

import { createContext, useContext, useRef } from "react";

type SearchContextType = {
  inputRef: React.RefObject<HTMLInputElement | null>;
  focusInput: () => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearch = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside provider");
  return ctx;
};

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <SearchContext.Provider value={{ inputRef, focusInput }}>
      {children}
    </SearchContext.Provider>
  );
};