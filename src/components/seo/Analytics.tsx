"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "grow2gether-cookie-consent";
const GA_ID = process.env["NEXT_PUBLIC_GA_ID"];

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const read = () => setAllowed(window.localStorage.getItem(CONSENT_KEY) === "accepted");
    read();
    window.addEventListener("grow2gether-consent", read);
    return () => window.removeEventListener("grow2gether-consent", read);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
