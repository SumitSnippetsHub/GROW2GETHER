const CONSENT_KEY = "grow2gether-cookie-consent";

type Params = Record<string, string>;

export function track(name: string, params?: Params) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CONSENT_KEY) !== "accepted") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
