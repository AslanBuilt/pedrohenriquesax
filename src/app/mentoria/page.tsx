import type { Metadata } from "next";
import { Chrome } from "@/components/Chrome";
import { Mentoria } from "@/components/home/Mentoria";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Aula de saxofone online",
  description: "Mentoria individual de saxofone, online e semanal, de 50 minutos a 1h15. Material de apoio e cronograma personalizado.",
  alternates: { canonical: "/mentoria" },
};

export default async function MentoriaPage() {
  return (
    <Chrome>
      <Mentoria />
      {/* A seção de transcrições saiu: o Pedro vai publicá-las como PDF aqui
          dentro, junto dos e-books, sem vídeo dele tocando. */}
    </Chrome>
  );
}
