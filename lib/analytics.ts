declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const YM_COUNTER_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

function track(goal: string) {
  if (typeof window === "undefined") return;
  if (typeof window.ym !== "function") return;
  if (!YM_COUNTER_ID) return;

  window.ym(YM_COUNTER_ID, "reachGoal", goal);
}

export function trackFormStart() {
  track("form_start");
}

export function trackStep1Complete() {
  track("step_1_complete");
}

export function trackStep2Complete() {
  track("step_2_complete");
}

export function trackStep3Complete() {
  track("step_3_complete");
}

export function trackOrderSubmit() {
  track("order_submit");
}

export function trackOrderSuccess() {
  track("order_success");
}

export function trackAppStoreClick() {
  track("appstore_click");
}

export function trackPlayMarketClick() {
  track("playmarket_click");
}

export function trackQrClick() {
  track("qr_click");
}