"use client";
import type { Tipo } from "@/lib/whatsapp";

export const HIRE_EVENT = "pl:contratar";

/**
 * Abre o formulário de contratação, que mora no cabeçalho de toda página.
 * É um link para `#contratar` para que abrir em outra aba continue funcionando.
 */
export function HireButton({ tipo, className = "btn btn-primary", children = "Contratar", onClick }: {
  tipo?: Tipo; className?: string; children?: React.ReactNode; onClick?: () => void;
}) {
  return (
    <a
      href="#contratar"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        window.dispatchEvent(new CustomEvent(HIRE_EVENT, { detail: tipo }));
      }}
    >
      {children}
    </a>
  );
}
