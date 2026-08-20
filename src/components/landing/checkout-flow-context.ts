import { createContext, useContext } from "react";

export type CheckoutFlowContextValue = {
  openBasicOffer: () => void;
};

export const CheckoutFlowContext = createContext<CheckoutFlowContextValue | null>(null);

export function useCheckoutFlow() {
  const context = useContext(CheckoutFlowContext);
  if (!context) {
    throw new Error("useCheckoutFlow deve ser usado dentro de CheckoutFlowProvider");
  }
  return context;
}
