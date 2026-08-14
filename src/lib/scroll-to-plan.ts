export type PlanId = "plan-essential" | "plan-pro";

const HIGHLIGHT_CLASS: Record<PlanId, string> = {
  "plan-essential": "highlight-blue",
  "plan-pro": "highlight-gold",
};

function applyHighlight(el: HTMLElement, planId: PlanId) {
  const highlightClass = HIGHLIGHT_CLASS[planId];
  el.classList.remove(highlightClass);
  // Force reflow so the animation restarts if the same plan is clicked again quickly.
  void el.offsetWidth;
  el.classList.add(highlightClass);
  const onEnd = (event: AnimationEvent) => {
    if (event.target !== el) return;
    el.classList.remove(highlightClass);
    el.removeEventListener("animationend", onEnd);
  };
  el.addEventListener("animationend", onEnd);
}

export function scrollToPlan(planId: PlanId) {
  const el = document.getElementById(planId);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });

  if ("onscrollend" in window) {
    const onScrollEnd = () => {
      applyHighlight(el, planId);
      window.removeEventListener("scrollend", onScrollEnd);
    };
    window.addEventListener("scrollend", onScrollEnd);
  } else {
    window.setTimeout(() => applyHighlight(el, planId), 700);
  }
}
