/**
 * Utilidades del blog que pueden usarse tanto en servidor como en cliente
 */

/**
 * Formatea la fecha según el idioma
 */
export function formatBlogDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

