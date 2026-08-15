import { useEffect, useState } from "react";
import { HOTMART_LOCALIZED_PRICES, type PlanId } from "./hotmart-prices";

export type { PlanId } from "./hotmart-prices";

type CurrencyInfo = { code: string; locale: string };

// Cubre todos los países de habla hispana en Latinoamérica (más Brasil y España).
const COUNTRY_CURRENCY: Record<string, CurrencyInfo> = {
  CO: { code: "COP", locale: "es-CO" },
  MX: { code: "MXN", locale: "es-MX" },
  CL: { code: "CLP", locale: "es-CL" },
  PE: { code: "PEN", locale: "es-PE" },
  AR: { code: "ARS", locale: "es-AR" },
  BR: { code: "BRL", locale: "pt-BR" },
  UY: { code: "UYU", locale: "es-UY" },
  PY: { code: "PYG", locale: "es-PY" },
  BO: { code: "BOB", locale: "es-BO" },
  CR: { code: "CRC", locale: "es-CR" },
  GT: { code: "GTQ", locale: "es-GT" },
  DO: { code: "DOP", locale: "es-DO" },
  ES: { code: "EUR", locale: "es-ES" },
  VE: { code: "VES", locale: "es-VE" },
  HN: { code: "HNL", locale: "es-HN" },
  NI: { code: "NIO", locale: "es-NI" },
  // Países que usan el dólar estadounidense como moneda oficial: no hay
  // conversión real que hacer, el precio local ya es el precio base en USD.
  EC: { code: "USD", locale: "es-EC" },
  PA: { code: "USD", locale: "es-PA" },
  SV: { code: "USD", locale: "es-SV" },
  PR: { code: "USD", locale: "es-PR" },
};

// Mapa de zona horaria -> país (cubre los mercados objetivo).
const TZ_COUNTRY: Record<string, string> = {
  "America/Bogota": "CO",
  "America/Mexico_City": "MX",
  "America/Monterrey": "MX",
  "America/Cancun": "MX",
  "America/Tijuana": "MX",
  "America/Santiago": "CL",
  "America/Lima": "PE",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Argentina/Cordoba": "AR",
  "America/Argentina/Mendoza": "AR",
  "America/Sao_Paulo": "BR",
  "America/Bahia": "BR",
  "America/Fortaleza": "BR",
  "America/Recife": "BR",
  "America/Manaus": "BR",
  "America/Montevideo": "UY",
  "America/Asuncion": "PY",
  "America/La_Paz": "BO",
  "America/Costa_Rica": "CR",
  "America/Guatemala": "GT",
  "America/Santo_Domingo": "DO",
  "Europe/Madrid": "ES",
  "America/Caracas": "VE",
  "America/Tegucigalpa": "HN",
  "America/Managua": "NI",
  "America/Guayaquil": "EC",
  "Pacific/Galapagos": "EC",
  "America/Panama": "PA",
  "America/El_Salvador": "SV",
  "America/Puerto_Rico": "PR",
};

// Tasas de respaldo aproximadas (se sobrescriben con tasas en vivo).
// Solo se usan como ÚLTIMO recurso, cuando el país no tiene un precio real
// de Hotmart configurado en hotmart-prices.ts.
const FALLBACK_RATES: Record<string, number> = {
  COP: 4000,
  MXN: 18,
  CLP: 950,
  PEN: 3.7,
  ARS: 1200,
  BRL: 5.4,
  UYU: 40,
  PYG: 7300,
  BOB: 6.9,
  CRC: 520,
  GTQ: 7.8,
  DOP: 60,
  EUR: 0.92,
  HNL: 24.7,
  NIO: 36.6,
  // VES (Venezuela) queda fuera a propósito: es una moneda hiperinflacionaria y
  // cualquier tasa fija quedaría desactualizada en semanas. Sin una tasa de
  // respaldo, si la API en vivo tampoco la trae, el sitio muestra el precio
  // base en USD en vez de arriesgar un valor local muy desactualizado.
};

// Monedas que se muestran sin decimales (ni en el valor real ni en el aproximado).
const ZERO_DECIMAL_CURRENCIES = ["COP", "CLP", "PYG", "ARS", "CRC"];

// Precio base en USD por plan — única fuente de verdad para el valor "oficial".
const PLAN_BASE_USD: Record<PlanId, { now: number; before: number }> = {
  essential: { now: 7, before: 67 },
  pro: { now: 17, before: 117 },
};

function detectCountry(): string | null {
  try {
    // Permite forzar un país por query param para previsualizar precios,
    // ej: ?preview_country=CO. No afecta a los usuarios reales.
    const preview = new URLSearchParams(window.location.search)
      .get("preview_country")
      ?.toUpperCase();
    if (preview && COUNTRY_CURRENCY[preview]) return preview;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const byTz = tz ? TZ_COUNTRY[tz] : undefined;
    if (byTz) return byTz;
    const lang = navigator.language || "";
    const region = lang.split("-")[1]?.toUpperCase();
    if (region && COUNTRY_CURRENCY[region]) return region;
  } catch {
    /* noop */
  }
  return null;
}

function roundApprox(value: number, code: string) {
  if (ZERO_DECIMAL_CURRENCIES.includes(code)) {
    return Math.round(value / 100) * 100;
  }
  return Math.round(value);
}

// Formatea un valor EXACTO (precio real de Hotmart, o su "antes" proporcional).
function formatExact(value: number, code: string, locale: string) {
  const fractionDigits = ZERO_DECIMAL_CURRENCIES.includes(code) ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

// Formatea un valor APROXIMADO (conversión por tasa de cambio, sin precio real configurado).
function formatApprox(value: number, code: string, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(roundApprox(value, code));
}

export type PlanPriceView = {
  now: string;
  before: string;
  /** Precio base fijo en USD (referencia estable, independiente de la moneda local). */
  usdNow: string;
  /** true = conversión por tasa de cambio (no es el precio real del checkout). */
  isApproximate: boolean;
};

export type PriceInfo = {
  essential: PlanPriceView;
  pro: PlanPriceView;
  /** true = se está mostrando en una moneda local (exacta o aproximada), no en USD. */
  isLocal: boolean;
};

function usdView(plan: PlanId): PlanPriceView {
  const base = PLAN_BASE_USD[plan];
  const usd = `US$ ${base.now}`;
  return { now: usd, before: `US$ ${base.before}`, usdNow: usd, isApproximate: false };
}

const USD_FALLBACK: PriceInfo = {
  essential: usdView("essential"),
  pro: usdView("pro"),
  isLocal: false,
};

function buildPriceInfo(country: string, rate: number | null): PriceInfo {
  const currencyInfo = COUNTRY_CURRENCY[country];
  const realPrices = HOTMART_LOCALIZED_PRICES[country];
  const plans: PlanId[] = ["essential", "pro"];
  const result = {} as Record<PlanId, PlanPriceView>;

  for (const plan of plans) {
    const base = PLAN_BASE_USD[plan];
    const realNow = realPrices?.[plan];
    const usdNow = `US$ ${base.now}`;

    if (typeof realNow === "number") {
      // Precio real confirmado del checkout de Hotmart: se muestra tal cual,
      // sin aplicar ninguna conversión encima.
      const ratio = realNow / base.now;
      const before = base.before * ratio;
      result[plan] = {
        now: formatExact(realNow, currencyInfo.code, currencyInfo.locale),
        before: formatExact(before, currencyInfo.code, currencyInfo.locale),
        usdNow,
        isApproximate: false,
      };
    } else if (rate) {
      // Sin precio real configurado todavía: conversión aproximada como respaldo.
      result[plan] = {
        now: formatApprox(base.now * rate, currencyInfo.code, currencyInfo.locale),
        before: formatApprox(base.before * rate, currencyInfo.code, currencyInfo.locale),
        usdNow,
        isApproximate: true,
      };
    } else {
      result[plan] = usdView(plan);
    }
  }

  return { essential: result.essential, pro: result.pro, isLocal: true };
}

export function useLocalPrice(): PriceInfo {
  const [country, setCountry] = useState<string | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const detected = detectCountry();
    if (!detected) return;
    setCountry(detected);
    const currencyInfo = COUNTRY_CURRENCY[detected];
    setRate(FALLBACK_RATES[currencyInfo.code] ?? null);

    let alive = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d: { rates?: Record<string, number> }) => {
        const live = d?.rates?.[currencyInfo.code];
        if (alive && typeof live === "number" && live > 0) setRate(live);
      })
      .catch(() => {
        /* mantiene el respaldo */
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!country) return USD_FALLBACK;
  return buildPriceInfo(country, rate);
}
