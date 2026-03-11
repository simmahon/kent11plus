"use client";

import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("[SW] Registered, scope:", registration.scope);
        })
        .catch((err) => {
          console.warn("[SW] Registration failed:", err);
        });
    }
  }, []);

  // Also listen for online/offline to auto-reload when connection restored
  useEffect(() => {
    function handleOnline() {
      // If user is on the offline page, reload to get back to the app
      if (window.location.pathname === "/offline") {
        window.location.reload();
      }
    }

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return null;
}
