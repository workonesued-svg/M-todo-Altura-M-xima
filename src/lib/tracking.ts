type MetaPixel = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: MetaPixel;
  }
}

export function trackInitiateCheckout() {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;

  try {
    window.fbq("track", "InitiateCheckout");
  } catch {
    // Tracking failures must never interrupt the checkout navigation.
  }
}
