"use client";
import { createContext, useContext } from "react";
import type { Locale } from "../../lib/i18n";
import type { Dictionary } from "../../lib/dictionaries";
const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);
export function LocaleProvider({ locale, t, children }: { locale: Locale; t: Dictionary; children: React.ReactNode }) {
  return <LocaleContext.Provider value={{ locale, t }}>{children}</LocaleContext.Provider>;
}
export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleProvider is required");
  return value;
}
