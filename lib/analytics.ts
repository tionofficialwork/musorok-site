declare global {
  interface Window {
    ym?: (...args: any[]) => void;
  }
}

const YM_COUNTER_ID = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 0);

export function reachGoal(
  target: string,
  params?: Record<string, string | number | boolean | null>
) {
  if (typeof window === "undefined") return;
  if (!YM_COUNTER_ID) return;
  if (typeof window.ym !== "function") return;

  if (params) {
    window.ym(YM_COUNTER_ID, "reachGoal", target, params);
    return;
  }

  window.ym(YM_COUNTER_ID, "reachGoal", target);
}

export function trackPhoneClick() {
  reachGoal("click_phone");
}

export function trackWhatsappClick() {
  reachGoal("click_whatsapp");
}

export function trackTelegramClick() {
  reachGoal("click_telegram");
}

export function trackFormStart() {
  reachGoal("form_start");
}

export function trackStep1Complete() {
  reachGoal("step_1_complete");
}

export function trackStep2Complete() {
  reachGoal("step_2_complete");
}

export function trackStep3Complete() {
  reachGoal("step_3_complete");
}

export function trackOrderSubmit() {
  reachGoal("order_submit");
}

export function trackOrderSuccess() {
  reachGoal("order_success");
}