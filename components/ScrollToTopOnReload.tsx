"use client";

import { useEffect } from "react";

/**
 * Volta ao topo em todo reload — menos no /catalogo,
 * onde o usuário pode estar no meio da lista e recarregar.
 * Desliga a restauração automática de scroll do navegador.
 */
export function ScrollToTopOnReload() {
  useEffect(() => {
    const path = window.location.pathname.replace(/\/+$/, "");
    if (path === "/catalogo") return;
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);
  return null;
}
