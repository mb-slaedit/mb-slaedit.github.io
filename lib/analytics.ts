/**
 * Analytics Instrumentation — GA4 + Plausible + Consent Mode v2
 * Auto-gerado por analytics-setup skill
 * NÃO EDITE MANUALMENTE — rode `analytics:instrument` para atualizar
 */

// Consent Mode v2 — default deny, update via consent banner
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    plausible: { (event: string, options?: { props?: Record<string, any> }): void; queue?: Array<[string, any]> };
  }
}

const GA4_ID = "G-XXXX";
const PLAUSIBLE_DOMAIN = "";
const CONSENT_ENDPOINT = "/api/consent";

/** Inicializa dataLayer e gtag */
export function initAnalytics() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Default consent — deny all until user consents
  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });

  // GA4 config
  window.gtag("js", new Date());
  window.gtag("config", GA4_ID, {
    send_page_view: false, // manual page_view via router
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_flags: "SameSite=Lax;Secure",
    cookie_expires: 63072000, // 2 anos
  });

  // Plausible (se configurado)
  if (PLAUSIBLE_DOMAIN) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = PLAUSIBLE_DOMAIN;
    script.dataset.api = "/api/plausible/event";
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
    window.plausible = function plausible(event, options) {
      if (window.plausible && window.plausible.queue) {
        window.plausible.queue.push([event, options]);
      }
    };
    window.plausible.queue = window.plausible.queue || [];
  }

  console.log("[analytics] initialized", { ga4: GA4_ID, plausible: PLAUSIBLE_DOMAIN || "disabled" });
}

/** Atualiza consentimento (chamado pelo banner) */
export function updateConsent(consent: {
  ad_storage?: "granted" | "denied";
  analytics_storage?: "granted" | "denied";
  ad_user_data?: "granted" | "denied";
  ad_personalization?: "granted" | "denied";
  functionality_storage?: "granted" | "denied";
  personalization_storage?: "granted" | "denied";
}) {
  if (typeof window === "undefined") return;
  window.gtag("consent", "update", consent);
  // Persist consent
  try {
    localStorage.setItem("analytics_consent", JSON.stringify(consent));
  } catch {}
}

/** Carrega consentimento salvo */
export function loadSavedConsent() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("analytics_consent") || "null");
  } catch {
    return null;
  }
}

/** Eventos padronizados — use estes nomes */
export const AnalyticsEvents = {
  // Navigation
  page_view: (params: { page_path: string; page_title: string; page_location: string }) => ({
    event: "page_view",
    ...params,
  }),

  // CTA clicks — single intent "contact"
  cta_click: (params: {
    intent: "contact";
    location: "hero" | "trust_strip" | "services" | "faq" | "final_cta" | "catalog_card" | "nav" | "footer";
    cta_text: string;
    destination: "whatsapp";
  }) => ({ event: "cta_click", ...params }),

  // Catalog interactions
  catalog_view: (params: { product_id: string; product_name: string; category: string }) => ({
    event: "catalog_view",
    ...params,
  }),

  catalog_cta_click: (params: {
    product_id: string;
    product_name: string;
    category: string;
    cta_text: string;
  }) => ({ event: "catalog_cta_click", ...params }),

  // Scroll depth
  scroll_depth: (params: { depth: 25 | 50 | 75 | 100; page_path: string }) => ({
    event: "scroll_depth",
    ...params,
  }),

  // Form interactions (se houver)
  form_start: (params: { form_name: string; form_location: string }) => ({
    event: "form_start",
    ...params,
  }),

  form_submit: (params: { form_name: string; form_location: string; success: boolean }) => ({
    event: "form_submit",
    ...params,
  }),

  // Video interactions
  video_play: (params: { video_name: string; video_location: string }) => ({
    event: "video_play",
    ...params,
  }),

  video_pause: (params: { video_name: string; video_location: string }) => ({
    event: "video_pause",
    ...params,
  }),

  video_complete: (params: { video_name: string; video_location: string }) => ({
    event: "video_complete",
    ...params,
  }),

  // External links
  external_link_click: (params: { url: string; link_text: string; location: string }) => ({
    event: "external_link_click",
    ...params,
  }),

  // Search (se houver)
  search: (params: { search_term: string; results_count: number }) => ({
    event: "search",
    ...params,
  }),

  // Error tracking
  error: (params: { error_message: string; error_location: string; error_stack?: string }) => ({
    event: "error",
    ...params,
  }),
};

/** Envia evento para GA4 + Plausible */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  const enriched = {
    ...params,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    user_id: getUserId(),
  };

  // GA4
  if (window.gtag) {
    window.gtag("event", eventName, enriched);
  }

  // Plausible
  if (window.plausible && PLAUSIBLE_DOMAIN) {
    window.plausible(eventName, { props: enriched });
  }

  // Debug
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] trackEvent", eventName, enriched);
  }
}

/** Page view manual (Next.js App Router) */
export function trackPageView(pathname: string, title: string) {
  trackEvent("page_view", {
    page_path: pathname,
    page_title: title,
    page_location: window.location.href,
  });
}

/** Session ID simples (localStorage) */
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let sid = sessionStorage.getItem("analytics_session_id");
    if (!sid) {
      sid = "sid_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
      sessionStorage.setItem("analytics_session_id", sid);
    }
    return sid;
  } catch {
    return "";
  }
}

/** User ID anônimo (localStorage, 1 ano) */
function getUserId(): string {
  if (typeof window === "undefined") return "";
  try {
    let uid = localStorage.getItem("analytics_user_id");
    if (!uid) {
      uid = "uid_" + Date.now() + "_" + Math.random().toString(36).slice(2, 12);
      localStorage.setItem("analytics_user_id", uid);
    }
    return uid;
  } catch {
    return "";
  }
}

/** Hook para Next.js App Router — use em layout.tsx */
export function useAnalyticsRouter() {
  if (typeof window === "undefined") return;
  const pathname = window.location.pathname;
  const title = document.title;
  trackPageView(pathname, title);

  // Scroll depth tracking
  let maxDepth = 0;
  const depths = [25, 50, 75, 100];
  const onScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const depth = Math.round((scrollTop / docHeight) * 100);
    const nextDepth = depths.find(d => depth >= d && maxDepth < d);
    if (nextDepth) {
      maxDepth = nextDepth;
      trackEvent("scroll_depth", { depth: nextDepth, page_path: pathname });
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export default { initAnalytics, updateConsent, loadSavedConsent, trackEvent, trackPageView, AnalyticsEvents };
