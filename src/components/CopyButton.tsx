"use client";
import { useState } from "react";
import { Check } from "@phosphor-icons/react";

export function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="btn btn-secondary mt-4 w-full sm:w-auto"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); } catch {}
        setDone(true); setTimeout(() => setDone(false), 2200);
      }}>
      {done && <Check key="ok" size={18} weight="bold" aria-hidden className="copiado" />}
      <span aria-live="polite">{done ? "Código copiado" : "Copiar código Pix"}</span>
    </button>
  );
}
