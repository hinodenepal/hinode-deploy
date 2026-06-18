export type Locale = "ja" | "en";

export const locales: Locale[] = ["ja", "en"];
export const defaultLocale: Locale = "ja";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/** Returns the opposite locale for the toggle button */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "ja" ? "en" : "ja";
}

/** Returns the label to show on the toggle button (always shows the target language) */
export function getToggleLabel(locale: Locale): string {
  return locale === "ja" ? "View in English" : "日本語で見る";
}

/** Swaps the locale segment in a pathname */
export function switchLocaleInPath(pathname: string, targetLocale: Locale): string {
  // If we are currently on English
  if (pathname.startsWith("/en")) {
    if (targetLocale === "ja") return pathname.replace(/^\/en/, "") || "/";
    return pathname;
  }

  // If we are currently on Japanese (no /ja prefix anymore)
  if (targetLocale === "en") {
    return pathname === "/" ? "/en" : `/en${pathname}`;
  }

  return pathname;
}

/** Strips the locale prefix from a path */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  if (segments.length >= 2 && isValidLocale(segments[1])) {
    return "/" + segments.slice(2).join("/");
  }
  return pathname;
}

/** SEO: hreflang alternate links for a given path (without locale) */
export function getAlternateLinks(basePath: string, baseUrl = "https://hinodenepal.jp") {
  return locales.map((locale) => ({
    hrefLang: locale,
    href: locale === "ja" ? `${baseUrl}${basePath}` : `${baseUrl}/${locale}${basePath}`,
  }));
}
