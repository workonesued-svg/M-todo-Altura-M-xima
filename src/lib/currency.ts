import { useEffect, useState } from "react";

type CurrencyInfo = { code: string; locale: string };

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
};

// Tasas de respaldo aproximadas (se sobrescriben con tasas en vivo).
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
};

function detectCurrency(): CurrencyInfo | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const byTz = tz ? TZ_COUNTRY[tz] : undefined;
    if (byTz) return COUNTRY_CURRENCY[byTz]!;
    const lang = navigator.language || "";
    const region = lang.split("-")[1]?.toUpperCase();
    if (region && COUNTRY_CURRENCY[region]) return COUNTRY_CURRENCY[region]!;
  } catch {
    /* noop */
  }
  return null;
}

function roundLocal(value: number, code: string) {
  if (["COP", "CLP", "PYG", "ARS", "CRC"].includes(code)) {
    return Math.round(value / 100) * 100;
  }
  return Math.round(value);
}

export type PriceFormatter = {
  format: (usd: number) => string;
  isLocal: boolean;
};

export function useLocalPrice(): PriceFormatter {
  const [info, setInfo] = useState<CurrencyInfo | null>(null);
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const detected = detectCurrency();
    if (!detected) return;
    setInfo(detected);
    setRate(FALLBACK_RATES[detected.code] ?? null);

    let alive = true;
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => r.json())
      .then((d: { rates?: Record<string, number> }) => {
        const live = d?.rates?.[detected.code];
        if (alive && typeof live === "number" && live > 0) setRate(live);
      })
      .catch(() => {
        /* mantiene el respaldo */
      });
    return () => {
      alive = false;
    };
  }, []);

  if (!info || !rate) {
    return { format: (usd) => `US$ ${usd}`, isLocal: false };
  }

  return {
    isLocal: true,
    format: (usd) =>
      new Intl.NumberFormat(info.locale, {
        style: "currency",
        currency: info.code,
        maximumFractionDigits: 0,
      }).format(roundLocal(usd * rate, info.code)),
  };
}
