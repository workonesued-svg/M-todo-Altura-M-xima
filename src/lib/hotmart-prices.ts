/**
 * Precios reales del checkout de Hotmart, por país.
 *
 * La API de cambio (currency.ts) da solo una conversión APROXIMADA — el checkout
 * de Hotmart aplica su propia tasa, spread e impuestos locales, así que el valor
 * final casi siempre es distinto. Cuando el país del visitante tiene un valor
 * confirmado acá, ese valor se muestra tal cual (sin ninguna conversión encima).
 *
 * Cómo agregar un país nuevo:
 * 1. Confirma el valor exacto que Hotmart muestra en su checkout para ese país.
 * 2. Agrega una entrada con el código de país (ISO 3166-1 alpha-2), la moneda,
 *    el locale para el formato y el valor de cada plan que ya tengas confirmado.
 * 3. Si todavía no tienes el valor real de un plan, simplemente omite esa clave
 *    (essential/pro) — el sitio usará automáticamente una conversión aproximada
 *    como respaldo y avisará al usuario que es un valor aproximado.
 *
 * Ejemplo:
 *   MX: { currency: "MXN", locale: "es-MX", pro: 350 },
 */

export type PlanId = "essential" | "pro";

export type HotmartLocalizedPrice = {
  currency: string;
  locale: string;
  /** Valor real y exacto que Hotmart cobra en el checkout, en moneda local. */
  essential?: number;
  pro?: number;
};

export const HOTMART_LOCALIZED_PRICES: Record<string, HotmartLocalizedPrice> = {
  BR: { currency: "BRL", locale: "pt-BR", pro: 97.6 },
  CO: { currency: "COP", locale: "es-CO", pro: 56512 },
};
